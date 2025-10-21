-- Vital Events tables
CREATE TABLE vital_event (
  id SERIAL PRIMARY KEY,
  person_id INT REFERENCES person(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('BIRTH','DEATH')),
  event_date DATE NOT NULL,
  ward_id INT REFERENCES ward(id),
  village_id INT REFERENCES village(id),
  notes TEXT,
  recorded_by TEXT,
  supporting_doc_path TEXT
);
