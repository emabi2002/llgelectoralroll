-- Elections tables
CREATE TABLE polling_station (
  id SERIAL PRIMARY KEY,
  ward_id INT NOT NULL REFERENCES ward(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  gps_lat NUMERIC(9,6),
  gps_lng NUMERIC(9,6)
);

CREATE TABLE roll_eligibility_rule (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE election_roll_entry (
  id SERIAL PRIMARY KEY,
  person_id INT NOT NULL REFERENCES person(id) ON DELETE CASCADE,
  ward_id INT NOT NULL REFERENCES ward(id) ON DELETE RESTRICT,
  election_type TEXT NOT NULL CHECK (election_type IN ('PRESIDENT','COUNCILLOR')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(person_id, ward_id, election_type)
);

-- Sample eligibility rule
INSERT INTO roll_eligibility_rule (name, description, is_active) VALUES
  ('Standard Eligibility', '18+ years and resident in ward', TRUE);
