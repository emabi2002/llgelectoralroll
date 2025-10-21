-- Biometrics tables
CREATE TABLE biometric_capture (
  id SERIAL PRIMARY KEY,
  person_id INT NOT NULL REFERENCES person(id) ON DELETE CASCADE,
  modality TEXT NOT NULL,
  file_path TEXT NOT NULL,
  device_model TEXT,
  device_serial TEXT,
  captured_at TIMESTAMPTZ DEFAULT now(),
  quality_score NUMERIC(4,1)
);
