-- Close the last AWS Security Specialty objective mis-tag: 2.2 and 2.4 do not
-- exist in SCS-C02. 20260715000116_retag_awsscs_objectives.sql documents
-- Domain 2 as exactly three objectives: 2.1 monitoring/alerting (incl. AWS
-- Config drift detection), 2.3 logging, 2.5 log analysis -- but left sc-q-012
-- on a non-existent 2.2. Its content (AWS Config evaluating resources and
-- tracking configuration drift) is 2.1's scope precisely. Retagged, not
-- deleted: only the `objective` column changes.

update questions
   set objective = '2.1'
 where cert = 'awsscs'
   and objective = '2.2';
