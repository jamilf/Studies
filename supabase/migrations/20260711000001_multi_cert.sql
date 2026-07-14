-- Multi-certification support: content and exam attempts are scoped to a
-- cert id; existing rows are Security+ (secplus). CISSP has 8 domains, so
-- the domain range widens from 1-5 to 1-8.

alter table public.flashcards add column cert text not null default 'secplus';
alter table public.questions add column cert text not null default 'secplus';
alter table public.exam_attempts add column cert text not null default 'secplus';

alter table public.flashcards drop constraint flashcards_domain_check;
alter table public.flashcards add constraint flashcards_domain_check check (domain between 1 and 8);
alter table public.questions drop constraint questions_domain_check;
alter table public.questions add constraint questions_domain_check check (domain between 1 and 8);

create index flashcards_cert_idx on public.flashcards (cert, deck);
create index questions_cert_idx on public.questions (cert, domain);
