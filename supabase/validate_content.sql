-- Content invariants for the study banks.
--
-- Every row returned by this file is a defect. A clean run returns nothing.
-- Run it against the full tables (not just newly-added rows) after any content
-- migration -- a batch can be internally valid and still collide with what is
-- already there.
--
-- These check the things review misses: a reviewer reads a question and judges
-- whether it teaches the objective, but will not notice that `answer` indexes
-- past the end of `choices`, which silently marks every candidate wrong.
-- The grading logic these must satisfy is app/src/lib/exam.ts (isCorrect).

\echo '== 1. objective must be <domain>.<n> and agree with the domain column =='
select 'bad-objective-format' as defect, cert, id, domain, objective
  from questions
 where objective !~ ('^' || domain || '\.[0-9]+$')
union all
select 'bad-objective-format', cert, id, domain, objective
  from flashcards
 where objective !~ ('^' || domain || '\.[0-9]+$');

\echo '== 2. mcq: answer is a plain integer inside the choices array =='
select 'mcq-answer-out-of-range' as defect, cert, id, answer, jsonb_array_length(choices) as n_choices
  from questions
 where qtype = 'mcq'
   and (jsonb_typeof(answer) <> 'number'
     or (answer)::int < 0
     or (answer)::int >= jsonb_array_length(choices));

\echo '== 3. multi: >=2 distinct indexes, all inside the choices array =='
select 'multi-answer-invalid' as defect, cert, id, answer, jsonb_array_length(choices) as n_choices
  from questions
 where qtype = 'multi'
   and (jsonb_typeof(answer) <> 'array'
     or jsonb_array_length(answer) < 2
     -- distinct
     or jsonb_array_length(answer) <> (
          select count(distinct e) from jsonb_array_elements(answer) e)
     -- in range
     or exists (
          select 1 from jsonb_array_elements(answer) e
           where jsonb_typeof(e) <> 'number'
              or (e)::int < 0
              or (e)::int >= jsonb_array_length(choices)));

\echo '== 4. ordering: answer is a permutation of 0..n-1 =='
select 'ordering-not-a-permutation' as defect, cert, id, answer, jsonb_array_length(choices) as n_choices
  from questions
 where qtype = 'ordering'
   and (jsonb_typeof(answer) <> 'array'
     or jsonb_array_length(answer) <> jsonb_array_length(choices)
     or (select count(distinct e) from jsonb_array_elements(answer) e)
          <> jsonb_array_length(choices)
     or exists (
          select 1 from jsonb_array_elements(answer) e
           where jsonb_typeof(e) <> 'number'
              or (e)::int < 0
              or (e)::int >= jsonb_array_length(choices)));

\echo '== 5. matching: one pick per left item, each inside the right array =='
select 'matching-answer-invalid' as defect, cert, id, answer
  from questions
 where qtype = 'matching'
   and (jsonb_typeof(choices) <> 'object'
     or choices -> 'left' is null
     or choices -> 'right' is null
     or jsonb_typeof(answer) <> 'array'
     or jsonb_array_length(answer) <> jsonb_array_length(choices -> 'left')
     or exists (
          select 1 from jsonb_array_elements(answer) e
           where jsonb_typeof(e) <> 'number'
              or (e)::int < 0
              or (e)::int >= jsonb_array_length(choices -> 'right')));

\echo '== 6. qtype must be one of the four the player renders =='
select 'unknown-qtype' as defect, cert, id, qtype
  from questions
 where qtype not in ('mcq', 'multi', 'ordering', 'matching');

\echo '== 7. duplicate stems / fronts within a cert =='
select 'duplicate-stem' as defect, cert, min(id) as kept, count(*) as copies, left(stem, 80) as text
  from questions group by cert, stem having count(*) > 1;
select 'duplicate-front' as defect, cert, min(id) as kept, count(*) as copies, left(front, 80) as text
  from flashcards group by cert, front having count(*) > 1;

\echo '== 8. empty explanation / front / back =='
select 'empty-explanation' as defect, cert, id from questions where btrim(explanation) = ''
union all
select 'empty-front', cert, id from flashcards where btrim(front) = ''
union all
select 'empty-back', cert, id from flashcards where btrim(back) = '';

\echo '== 9. deck must be one the Flashcards page filters on =='
select 'unknown-deck' as defect, cert, id, deck
  from flashcards
 where deck not in ('core', 'acronym', 'feynman');

\echo '== 10. every objective needs BOTH questions and flashcards =='
-- An objective with no questions can never appear in a quiz or an exam form,
-- however much study material sits behind it.
with objs as (
  select cert, domain, objective from questions
  union
  select cert, domain, objective from flashcards
)
select 'objective-one-sided' as defect, o.cert, o.domain, o.objective,
       coalesce(q.n, 0) as questions, coalesce(f.n, 0) as flashcards
  from objs o
  left join (select cert, objective, count(*) n from questions  group by 1, 2) q
         on q.cert = o.cert and q.objective = o.objective
  left join (select cert, objective, count(*) n from flashcards group by 1, 2) f
         on f.cert = o.cert and f.objective = o.objective
 where coalesce(q.n, 0) = 0 or coalesce(f.n, 0) = 0
 order by o.cert, o.domain, o.objective;
