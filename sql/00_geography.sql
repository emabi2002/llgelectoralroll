-- Geography hierarchy tables
CREATE TABLE region (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE province (
  id SERIAL PRIMARY KEY,
  region_id INT NOT NULL REFERENCES region(id) ON DELETE RESTRICT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE district (
  id SERIAL PRIMARY KEY,
  province_id INT NOT NULL REFERENCES province(id) ON DELETE RESTRICT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE llg (
  id SERIAL PRIMARY KEY,
  district_id INT NOT NULL REFERENCES district(id) ON DELETE RESTRICT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('Urban','Rural')) DEFAULT 'Rural'
);

CREATE TABLE ward (
  id SERIAL PRIMARY KEY,
  llg_id INT NOT NULL REFERENCES llg(id) ON DELETE RESTRICT,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE village (
  id SERIAL PRIMARY KEY,
  ward_id INT NOT NULL REFERENCES ward(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  latitude NUMERIC(9,6),
  longitude NUMERIC(9,6),
  UNIQUE(ward_id, name)
);

-- Sample seed data for testing
INSERT INTO region (code, name) VALUES
  ('NGI', 'New Guinea Islands'),
  ('MOMASE', 'Momase'),
  ('HIGHLANDS', 'Highlands'),
  ('SOUTHERN', 'Southern');
