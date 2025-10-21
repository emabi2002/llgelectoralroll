-- Registry tables
CREATE TABLE household (
  id SERIAL PRIMARY KEY,
  village_id INT NOT NULL REFERENCES village(id) ON DELETE RESTRICT,
  household_code TEXT NOT NULL,
  head_full_name TEXT,
  gps_lat NUMERIC(9,6),
  gps_lng NUMERIC(9,6),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(village_id, household_code)
);

CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  household_id INT REFERENCES household(id) ON DELETE SET NULL,
  given_names TEXT NOT NULL,
  surname TEXT NOT NULL,
  other_names TEXT,
  sex CHAR(1) CHECK (sex IN ('M','F')),
  date_of_birth DATE,
  nid_number TEXT,
  civil_status TEXT,
  occupation TEXT,
  ward_id INT REFERENCES ward(id) ON DELETE SET NULL,
  village_id INT REFERENCES village(id) ON DELETE SET NULL,
  is_alive BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_person_name ON person (surname, given_names);
CREATE INDEX idx_person_village ON person (village_id);

CREATE TABLE person_identifier (
  id SERIAL PRIMARY KEY,
  person_id INT NOT NULL REFERENCES person(id) ON DELETE CASCADE,
  id_type TEXT NOT NULL,
  id_value TEXT,
  issued_by TEXT,
  issued_on DATE
);
