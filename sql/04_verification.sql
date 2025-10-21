-- Verification tables
CREATE TABLE verifier (
  id SERIAL PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('PASTOR','MAGISTRATE','COUNCILLOR','PRESIDENT')),
  full_name TEXT NOT NULL,
  phone TEXT,
  ward_id INT REFERENCES ward(id),
  village_id INT REFERENCES village(id),
  signature_path TEXT
);

CREATE TABLE verification (
  id SERIAL PRIMARY KEY,
  person_id INT NOT NULL REFERENCES person(id) ON DELETE CASCADE,
  verifier_id INT NOT NULL REFERENCES verifier(id) ON DELETE RESTRICT,
  method TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PENDING','APPROVED','REJECTED')) DEFAULT 'PENDING',
  remarks TEXT,
  verified_at TIMESTAMPTZ
);

CREATE TABLE verification_biometric (
  verification_id INT REFERENCES verification(id) ON DELETE CASCADE,
  biometric_id INT REFERENCES biometric_capture(id) ON DELETE CASCADE,
  PRIMARY KEY (verification_id, biometric_id)
);
