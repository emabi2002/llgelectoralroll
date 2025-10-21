-- Baseline Surveys tables
CREATE TABLE household_survey (
  id SERIAL PRIMARY KEY,
  household_id INT NOT NULL REFERENCES household(id) ON DELETE CASCADE,
  survey_date DATE NOT NULL,
  water_source TEXT,
  sanitation TEXT,
  lighting TEXT,
  income_sources TEXT,
  num_males INT,
  num_females INT,
  notes TEXT
);

CREATE TABLE village_facilities_survey (
  id SERIAL PRIMARY KEY,
  village_id INT NOT NULL REFERENCES village(id) ON DELETE CASCADE,
  survey_date DATE NOT NULL,
  has_clinic BOOLEAN,
  has_school BOOLEAN,
  has_market BOOLEAN,
  road_access TEXT,
  mobile_coverage TEXT,
  notes TEXT
);
