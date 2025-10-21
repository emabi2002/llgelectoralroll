# CSV Import Templates

This directory contains CSV templates for bulk data import into the Provincial & LLG Citizen Registry.

## Available Templates

### 1. persons_template.csv
Import citizen records with the following fields:
- `given_names` (required)
- `surname` (required)
- `other_names` (optional)
- `sex` (required): M or F
- `date_of_birth` (optional): YYYY-MM-DD format
- `nid_number` (optional): National ID number
- `civil_status` (optional): SINGLE, MARRIED, WIDOWED, DIVORCED, SEPARATED
- `occupation` (optional)
- `ward_code` (optional): Must exist in ward table
- `village_name` (optional): Must exist for the specified ward

### 2. households_template.csv
Import household records:
- `village_name` (required): Must exist in village table
- `household_code` (required): Unique within village
- `head_full_name` (optional): Name of household head
- `gps_lat` (optional): Latitude in decimal degrees
- `gps_lng` (optional): Longitude in decimal degrees

### 3. villages_template.csv
Import village records:
- `ward_code` (required): Must exist in ward table
- `village_name` (required): Unique within ward
- `latitude` (optional): GPS latitude
- `longitude` (optional): GPS longitude

### 4. vital_events_template.csv
Import birth and death records:
- `event_type` (required): BIRTH or DEATH
- `event_date` (required): YYYY-MM-DD format
- `person_nid` (optional): Link to existing person by NID
- `ward_code` (optional): Ward where event occurred
- `village_name` (optional): Village where event occurred
- `notes` (optional): Additional information
- `recorded_by` (optional): Name of ward recorder

### 5. baseline_surveys_template.csv
Import household survey data:
- `household_code` (required): Must exist in household table
- `survey_date` (required): YYYY-MM-DD format
- `water_source` (optional): e.g., Tap water, Well, River
- `sanitation` (optional): e.g., Flush toilet, Pit latrine, None
- `lighting` (optional): e.g., Electricity, Solar, Kerosene
- `income_sources` (optional): Primary income sources
- `num_males` (optional): Number of males in household
- `num_females` (optional): Number of females in household
- `notes` (optional): Additional observations

## Import Process

### Using the Web Interface (Coming Soon)
1. Go to Data Admin → Imports
2. Select the data type (Persons, Households, etc.)
3. Choose your CSV file
4. Review validation results
5. Confirm import

### Using Direct Database Import (Current Method)

For **persons**:
```sql
COPY person(given_names, surname, other_names, sex, date_of_birth, nid_number, civil_status, occupation, ward_id, village_id)
FROM '/path/to/persons.csv'
DELIMITER ','
CSV HEADER;
```

Note: You'll need to resolve ward_code and village_name to their IDs first.

## Data Validation Rules

### Persons
- `given_names` and `surname` are required
- `sex` must be 'M' or 'F'
- `date_of_birth` must be a valid date in the past
- `nid_number` should be unique if provided
- `ward_code` must exist in the ward table
- `village_name` must exist within the specified ward

### Households
- `village_name` must exist in the village table
- `household_code` must be unique within the village
- GPS coordinates should be in decimal degrees format

### Vital Events
- `event_type` must be BIRTH or DEATH
- `event_date` must be a valid date
- If `person_nid` is provided, person must exist

## Best Practices

1. **Start with Geography**: Import in order
   - Regions (usually pre-loaded)
   - Provinces
   - Districts
   - LLGs
   - Wards
   - Villages

2. **Then Households and Persons**:
   - Import villages first
   - Then households
   - Finally persons (linking to households and villages)

3. **Data Quality**:
   - Use consistent naming conventions
   - Validate codes before import
   - Check for duplicates
   - Verify GPS coordinates

4. **Test First**:
   - Import a small batch first
   - Verify data appears correctly
   - Then proceed with full import

5. **Backup**:
   - Always backup database before large imports
   - Keep original CSV files

## Error Handling

Common errors and solutions:

**Foreign key constraint violation**:
- Ensure parent records exist (e.g., ward exists before importing villages)
- Check spelling of codes and names

**Duplicate key violation**:
- Check for duplicate codes or NID numbers
- Review uniqueness constraints in database

**Invalid date format**:
- Use YYYY-MM-DD format consistently
- Ensure dates are valid (e.g., not 2024-02-30)

**Character encoding issues**:
- Save CSV files as UTF-8
- Handle special characters properly

## Getting Help

If you encounter issues:
1. Check the error message carefully
2. Verify your CSV matches the template format
3. Ensure all referenced codes/names exist in the database
4. Review the database schema in `sql/` directory
5. Contact your system administrator

## Example Workflow

Complete import workflow for a new province:

```bash
# 1. Import province data
# (via Geography → Provinces in web interface)

# 2. Import districts for that province
# 3. Import LLGs for those districts
# 4. Import wards for those LLGs
# 5. Import villages using CSV template
# 6. Import households using CSV template
# 7. Import persons using CSV template
# 8. Import vital events using CSV template
# 9. Import baseline surveys using CSV template
```

Each step builds on the previous, creating the complete hierarchical structure.
