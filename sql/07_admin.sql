-- System Administration tables
CREATE TABLE feature_flag (
  key TEXT PRIMARY KEY,
  value BOOLEAN NOT NULL
);

INSERT INTO feature_flag(key, value) VALUES
  ('auth_enabled', FALSE),
  ('audit_enabled', TRUE);

CREATE TABLE code_table (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  code TEXT NOT NULL,
  label TEXT NOT NULL,
  UNIQUE(category, code)
);

CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  table_name TEXT,
  record_id TEXT,
  action TEXT,
  actor TEXT DEFAULT 'system',
  at TIMESTAMPTZ DEFAULT now(),
  diff JSONB
);

-- Sample code table entries
INSERT INTO code_table (category, code, label) VALUES
  ('civil_status', 'SINGLE', 'Single'),
  ('civil_status', 'MARRIED', 'Married'),
  ('civil_status', 'WIDOWED', 'Widowed'),
  ('civil_status', 'DIVORCED', 'Divorced'),
  ('civil_status', 'SEPARATED', 'Separated'),
  ('occupation', 'FARMER', 'Farmer'),
  ('occupation', 'TEACHER', 'Teacher'),
  ('occupation', 'STUDENT', 'Student'),
  ('occupation', 'UNEMPLOYED', 'Unemployed'),
  ('occupation', 'OTHER', 'Other');
