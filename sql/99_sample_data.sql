-- Sample Data for Testing (Optional - Run manually if needed)
-- This file provides sample data to test all modules of the system

-- Sample Provinces
INSERT INTO province (region_id, code, name) VALUES
  ((SELECT id FROM region WHERE code = 'NGI'), 'ENB', 'East New Britain'),
  ((SELECT id FROM region WHERE code = 'NGI'), 'WNB', 'West New Britain'),
  ((SELECT id FROM region WHERE code = 'MOMASE'), 'ESP', 'East Sepik'),
  ((SELECT id FROM region WHERE code = 'MOMASE'), 'MAD', 'Madang'),
  ((SELECT id FROM region WHERE code = 'HIGHLANDS'), 'EHP', 'Eastern Highlands'),
  ((SELECT id FROM region WHERE code = 'HIGHLANDS'), 'WHP', 'Western Highlands'),
  ((SELECT id FROM region WHERE code = 'SOUTHERN'), 'CEN', 'Central'),
  ((SELECT id FROM region WHERE code = 'SOUTHERN'), 'NCD', 'National Capital District')
ON CONFLICT (code) DO NOTHING;

-- Sample Districts
INSERT INTO district (province_id, code, name) VALUES
  ((SELECT id FROM province WHERE code = 'ENB'), 'RAB', 'Rabaul'),
  ((SELECT id FROM province WHERE code = 'ENB'), 'KOK', 'Kokopo'),
  ((SELECT id FROM province WHERE code = 'ESP'), 'WEW', 'Wewak'),
  ((SELECT id FROM province WHERE code = 'EHP'), 'GOR', 'Goroka'),
  ((SELECT id FROM province WHERE code = 'CEN'), 'ABU', 'Abau'),
  ((SELECT id FROM province WHERE code = 'NCD'), 'NCD', 'Port Moresby')
ON CONFLICT (code) DO NOTHING;

-- Sample LLGs
INSERT INTO llg (district_id, code, name, type) VALUES
  ((SELECT id FROM district WHERE code = 'RAB'), 'RAB-URB', 'Rabaul Urban', 'Urban'),
  ((SELECT id FROM district WHERE code = 'RAB'), 'RAB-RUR', 'Rabaul Rural', 'Rural'),
  ((SELECT id FROM district WHERE code = 'KOK'), 'KOK-URB', 'Kokopo Urban', 'Urban'),
  ((SELECT id FROM district WHERE code = 'WEW'), 'WEW-URB', 'Wewak Urban', 'Urban'),
  ((SELECT id FROM district WHERE code = 'GOR'), 'GOR-URB', 'Goroka Urban', 'Urban'),
  ((SELECT id FROM district WHERE code = 'NCD'), 'MSBY-NE', 'Moresby North-East', 'Urban'),
  ((SELECT id FROM district WHERE code = 'NCD'), 'MSBY-NW', 'Moresby North-West', 'Urban')
ON CONFLICT (code) DO NOTHING;

-- Sample Wards
INSERT INTO ward (llg_id, code, name) VALUES
  ((SELECT id FROM llg WHERE code = 'RAB-URB'), 'RAB-URB-W01', 'Ward 1 - Town'),
  ((SELECT id FROM llg WHERE code = 'RAB-URB'), 'RAB-URB-W02', 'Ward 2 - Harbour'),
  ((SELECT id FROM llg WHERE code = 'RAB-URB'), 'RAB-URB-W03', 'Ward 3 - Market'),
  ((SELECT id FROM llg WHERE code = 'KOK-URB'), 'KOK-URB-W01', 'Ward 1 - Central'),
  ((SELECT id FROM llg WHERE code = 'KOK-URB'), 'KOK-URB-W02', 'Ward 2 - Beach'),
  ((SELECT id FROM llg WHERE code = 'WEW-URB'), 'WEW-URB-W01', 'Ward 1'),
  ((SELECT id FROM llg WHERE code = 'GOR-URB'), 'GOR-URB-W01', 'Ward 1'),
  ((SELECT id FROM llg WHERE code = 'MSBY-NE'), 'MSBY-NE-W01', 'Ward 1 - Boroko'),
  ((SELECT id FROM llg WHERE code = 'MSBY-NE'), 'MSBY-NE-W02', 'Ward 2 - Hohola'),
  ((SELECT id FROM llg WHERE code = 'MSBY-NW'), 'MSBY-NW-W01', 'Ward 1 - Waigani')
ON CONFLICT (code) DO NOTHING;

-- Sample Villages
INSERT INTO village (ward_id, name, latitude, longitude) VALUES
  ((SELECT id FROM ward WHERE code = 'RAB-URB-W01'), 'Matupit', -4.2167, 152.1833),
  ((SELECT id FROM ward WHERE code = 'RAB-URB-W01'), 'Raluana', -4.2000, 152.1700),
  ((SELECT id FROM ward WHERE code = 'RAB-URB-W02'), 'Karavia', -4.2200, 152.1900),
  ((SELECT id FROM ward WHERE code = 'KOK-URB-W01'), 'Takubar', -4.3400, 152.2600),
  ((SELECT id FROM ward WHERE code = 'KOK-URB-W02'), 'Malakuna', -4.3500, 152.2700),
  ((SELECT id FROM ward WHERE code = 'WEW-URB-W01'), 'Kreer', -3.5500, 143.6300),
  ((SELECT id FROM ward WHERE code = 'GOR-URB-W01'), 'Asaroka', -6.0819, 145.3917),
  ((SELECT id FROM ward WHERE code = 'MSBY-NE-W01'), 'Boroko', -9.4700, 147.1800),
  ((SELECT id FROM ward WHERE code = 'MSBY-NE-W02'), 'Hohola', -9.4600, 147.1700),
  ((SELECT id FROM ward WHERE code = 'MSBY-NW-W01'), 'Waigani', -9.4500, 147.1600)
ON CONFLICT (ward_id, name) DO NOTHING;

-- Sample Households
INSERT INTO household (village_id, household_code, head_full_name, gps_lat, gps_lng) VALUES
  ((SELECT id FROM village WHERE name = 'Matupit'), 'MAT-001', 'John Kavieng', -4.2167, 152.1833),
  ((SELECT id FROM village WHERE name = 'Matupit'), 'MAT-002', 'Mary Tobing', -4.2170, 152.1835),
  ((SELECT id FROM village WHERE name = 'Raluana'), 'RAL-001', 'Peter Tolai', -4.2000, 152.1700),
  ((SELECT id FROM village WHERE name = 'Takubar'), 'TAK-001', 'Sarah Vunapope', -4.3400, 152.2600),
  ((SELECT id FROM village WHERE name = 'Boroko'), 'BOR-001', 'Michael Wari', -9.4700, 147.1800),
  ((SELECT id FROM village WHERE name = 'Hohola'), 'HOH-001', 'Elizabeth Moresby', -9.4600, 147.1700)
ON CONFLICT (village_id, household_code) DO NOTHING;

-- Sample Persons
INSERT INTO person (household_id, given_names, surname, other_names, sex, date_of_birth, nid_number, civil_status, occupation, ward_id, village_id, is_alive) VALUES
  ((SELECT id FROM household WHERE household_code = 'MAT-001'), 'John', 'Kavieng', NULL, 'M', '1975-05-15', 'NID-001234567', 'MARRIED', 'Fisherman', (SELECT id FROM ward WHERE code = 'RAB-URB-W01'), (SELECT id FROM village WHERE name = 'Matupit'), TRUE),
  ((SELECT id FROM household WHERE household_code = 'MAT-001'), 'Anna', 'Kavieng', NULL, 'F', '1978-08-22', 'NID-001234568', 'MARRIED', 'Market vendor', (SELECT id FROM ward WHERE code = 'RAB-URB-W01'), (SELECT id FROM village WHERE name = 'Matupit'), TRUE),
  ((SELECT id FROM household WHERE household_code = 'MAT-001'), 'James', 'Kavieng', NULL, 'M', '2005-03-10', 'NID-001234569', 'SINGLE', 'Student', (SELECT id FROM ward WHERE code = 'RAB-URB-W01'), (SELECT id FROM village WHERE name = 'Matupit'), TRUE),
  ((SELECT id FROM household WHERE household_code = 'MAT-002'), 'Mary', 'Tobing', NULL, 'F', '1982-11-30', 'NID-001234570', 'WIDOWED', 'Farmer', (SELECT id FROM ward WHERE code = 'RAB-URB-W01'), (SELECT id FROM village WHERE name = 'Matupit'), TRUE),
  ((SELECT id FROM household WHERE household_code = 'RAL-001'), 'Peter', 'Tolai', NULL, 'M', '1970-01-20', 'NID-001234571', 'MARRIED', 'Teacher', (SELECT id FROM ward WHERE code = 'RAB-URB-W01'), (SELECT id FROM village WHERE name = 'Raluana'), TRUE),
  ((SELECT id FROM household WHERE household_code = 'TAK-001'), 'Sarah', 'Vunapope', NULL, 'F', '1995-07-08', 'NID-001234572', 'SINGLE', 'Nurse', (SELECT id FROM ward WHERE code = 'KOK-URB-W01'), (SELECT id FROM village WHERE name = 'Takubar'), TRUE),
  ((SELECT id FROM household WHERE household_code = 'BOR-001'), 'Michael', 'Wari', NULL, 'M', '1968-12-12', 'NID-001234573', 'MARRIED', 'Public servant', (SELECT id FROM ward WHERE code = 'MSBY-NE-W01'), (SELECT id FROM village WHERE name = 'Boroko'), TRUE),
  ((SELECT id FROM household WHERE household_code = 'HOH-001'), 'Elizabeth', 'Moresby', NULL, 'F', '1990-04-25', 'NID-001234574', 'SINGLE', 'Accountant', (SELECT id FROM ward WHERE code = 'MSBY-NE-W02'), (SELECT id FROM village WHERE name = 'Hohola'), TRUE)
ON CONFLICT DO NOTHING;

-- Sample Vital Events (Births)
INSERT INTO vital_event (person_id, event_type, event_date, ward_id, village_id, notes, recorded_by) VALUES
  ((SELECT id FROM person WHERE nid_number = 'NID-001234569'), 'BIRTH', '2005-03-10', (SELECT id FROM ward WHERE code = 'RAB-URB-W01'), (SELECT id FROM village WHERE name = 'Matupit'), 'Born at Nonga General Hospital', 'Ward Recorder - John Doe')
ON CONFLICT DO NOTHING;

-- Sample Verifiers
INSERT INTO verifier (role, full_name, phone, ward_id, village_id) VALUES
  ('PASTOR', 'Rev. David Kamal', '+675 7123 4567', (SELECT id FROM ward WHERE code = 'RAB-URB-W01'), (SELECT id FROM village WHERE name = 'Matupit')),
  ('MAGISTRATE', 'Hon. Grace Tavui', '+675 7234 5678', (SELECT id FROM ward WHERE code = 'KOK-URB-W01'), NULL),
  ('COUNCILLOR', 'Cllr. Paul Tokam', '+675 7345 6789', (SELECT id FROM ward WHERE code = 'RAB-URB-W02'), NULL),
  ('PRESIDENT', 'Mr. Steven Matane', '+675 7456 7890', NULL, NULL)
ON CONFLICT DO NOTHING;

-- Sample Polling Stations
INSERT INTO polling_station (ward_id, name, gps_lat, gps_lng) VALUES
  ((SELECT id FROM ward WHERE code = 'RAB-URB-W01'), 'Matupit Primary School', -4.2167, 152.1833),
  ((SELECT id FROM ward WHERE code = 'RAB-URB-W02'), 'Karavia Community Hall', -4.2200, 152.1900),
  ((SELECT id FROM ward WHERE code = 'KOK-URB-W01'), 'Takubar Elementary School', -4.3400, 152.2600),
  ((SELECT id FROM ward WHERE code = 'MSBY-NE-W01'), 'Boroko Police Station', -9.4700, 147.1800),
  ((SELECT id FROM ward WHERE code = 'MSBY-NE-W02'), 'Hohola Youth Centre', -9.4600, 147.1700)
ON CONFLICT DO NOTHING;

-- Sample Household Surveys
INSERT INTO household_survey (household_id, survey_date, water_source, sanitation, lighting, income_sources, num_males, num_females, notes) VALUES
  ((SELECT id FROM household WHERE household_code = 'MAT-001'), '2024-01-15', 'Tap water', 'Flush toilet', 'Electricity', 'Fishing, market sales', 2, 2, 'Well-maintained household'),
  ((SELECT id FROM household WHERE household_code = 'MAT-002'), '2024-01-15', 'Well', 'Pit latrine', 'Solar', 'Agriculture', 1, 2, 'Needs sanitation improvement'),
  ((SELECT id FROM household WHERE household_code = 'RAL-001'), '2024-01-16', 'Tap water', 'Flush toilet', 'Electricity', 'Wage employment', 3, 2, 'Good infrastructure'),
  ((SELECT id FROM household WHERE household_code = 'BOR-001'), '2024-02-01', 'Tap water', 'Flush toilet', 'Electricity', 'Public service', 2, 3, 'Urban household')
ON CONFLICT DO NOTHING;

-- Sample Village Facilities Surveys
INSERT INTO village_facilities_survey (village_id, survey_date, has_clinic, has_school, has_market, road_access, mobile_coverage, notes) VALUES
  ((SELECT id FROM village WHERE name = 'Matupit'), '2024-01-15', TRUE, TRUE, TRUE, 'All-weather', 'Digicel/Bmobile - Good', 'Well-developed village'),
  ((SELECT id FROM village WHERE name = 'Raluana'), '2024-01-16', FALSE, TRUE, FALSE, 'All-weather', 'Digicel - Fair', 'Needs health facility'),
  ((SELECT id FROM village WHERE name = 'Takubar'), '2024-01-20', TRUE, TRUE, TRUE, 'All-weather', 'Digicel/Bmobile - Excellent', 'Urban area'),
  ((SELECT id FROM village WHERE name = 'Boroko'), '2024-02-01', TRUE, TRUE, TRUE, 'All-weather', 'All networks - Excellent', 'NCD suburb')
ON CONFLICT DO NOTHING;

-- Note: To load this sample data, run:
-- docker exec -i pg-prov-llg psql -U postgres -d prov_llg_db < sql/99_sample_data.sql
