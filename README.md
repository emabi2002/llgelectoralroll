# Provincial & LLG Citizen Registry

A comprehensive offline-capable citizen registry system for Provincial Governments and Local-Level Governments (LLGs) in Papua New Guinea.

## Overview

This system maintains provincial and LLG-level citizen records including:
- **Geography**: Regions, Provinces, Districts, LLGs, Wards, Villages
- **Registry**: Persons, Households, Family Trees, Biometric Data
- **Vital Events**: Birth and Death Registrations
- **Baseline Surveys**: Household and Village Infrastructure Data
- **Elections**: Roll Building for Presidents and Ward Councillors
- **Verifications**: Official Attestations by Local Authorities
- **Reports**: Coverage, Demographics, and Data Quality

## Key Features

- **Offline Operation**: Runs entirely on local infrastructure with PostgreSQL
- **No Cloud Dependencies**: All data and biometrics stored locally
- **Ward Recorder Focus**: Designed for local data collection workflows
- **Official Verification**: Pastor, Magistrate, Councillor, President attestations
- **Biometric Support**: Capture and store fingerprint, face, iris, voice data
- **Hierarchical Geography**: Complete PNGEC/PNGNID geographic structure
- **Election Roll Building**: Automated roll generation with eligibility rules

## Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 16
- **Runtime**: Bun (Node.js compatible)

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Bun (or Node.js 18+)

### Setup Instructions

1. **Start the PostgreSQL database**:
   ```bash
   docker compose up -d
   ```
   This creates the database with all schema and sample data.

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure environment**:
   The `.env.local` file is already configured for local development:
   ```
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/prov_llg_db
   AUTH_ENABLED=false
   ```

4. **Run the development server**:
   ```bash
   bun run dev
   ```

5. **Access the application**:
   Open http://localhost:3000

## Database Schema

The system uses 7 schema files located in `sql/`:

1. **00_geography.sql** - Regional hierarchy (Region → Province → District → LLG → Ward → Village)
2. **01_registry.sql** - Person and household records
3. **02_biometrics.sql** - Biometric capture data
4. **03_vital_events.sql** - Birth and death registrations
5. **04_verification.sql** - Official verifications and verifiers
6. **05_baseline_surveys.sql** - Household and village facility surveys
7. **06_elections.sql** - Polling stations and election rolls
8. **07_admin.sql** - Feature flags, code tables, audit logs

## Main Modules

### 1. Geography Management
- Maintain hierarchical geography from regions down to villages
- GPS coordinates for villages
- LLG type classification (Urban/Rural)

### 2. Citizen Registry
- **Persons**: Individual records with NID numbers, civil status, occupation
- **Households**: Family units linked to villages
- **Family Tree**: Genealogical relationships
- **Biometrics**: Multi-modal biometric captures

### 3. Vital Events
- Birth registrations with supporting documents
- Death records
- Ward Recorder attribution
- Link to person records

### 4. Baseline Surveys
- **Household**: Water, sanitation, lighting, income, demographics
- **Village Facilities**: Clinics, schools, markets, roads, mobile coverage

### 5. Elections
- Eligibility rule definition (age, residency)
- Roll building by ward
- Separate rolls for Presidents and Councillors
- Polling station assignments
- CSV/PDF exports

### 6. Verifications
- Methods: Biometric, Attestation, or Both
- Authorized verifiers: Pastor, Magistrate, Councillor, President
- Status tracking: Pending → Approved/Rejected
- Biometric matching (stub implementation)

### 7. Reports
- Election roll extracts by ward
- Registration coverage statistics
- Duplicate detection
- Age/gender demographics

### 8. Data Administration
- CSV/Excel imports with templates
- Data exports (CSV, PDF)
- Code table management
- Data quality checks

### 9. System Administration
- Feature flags (auth_enabled, audit_enabled)
- Biometric device profiles
- Audit log viewer
- System configuration

## Data Import Templates

CSV templates available for bulk imports:

- **Persons**: given_names, surname, sex, date_of_birth, ward_code, village_name
- **Households**: village_name, household_code, head_full_name, gps_lat, gps_lng
- **Villages**: ward_code, village_name, latitude, longitude
- **Vital Events**: event_type, event_date, person_nid, ward_code, recorded_by
- **Baseline Surveys**: household_code, survey_date, water_source, sanitation

## Ward Recorder Workflow

1. Collect citizen data in wards and villages
2. Register persons and households
3. Record vital events (births, deaths)
4. Conduct baseline surveys
5. Capture biometric data (where devices available)
6. Submit for official verification
7. Build election rolls when required

## Verification Process

1. Ward Recorder submits person records
2. Local official (Pastor/Magistrate/Councillor/President) reviews
3. Biometric capture if available
4. Official attestation with signature
5. Status updated to APPROVED or REJECTED
6. Supporting documents attached

## Election Roll Building

1. Define eligibility rules (e.g., "18+ years and resident in ward")
2. System queries verified person records
3. Apply eligibility criteria
4. Generate roll entries by ward
5. Assign to polling stations
6. Export separate rolls for President and Councillor elections
7. Generate PDF summaries with official signatures

## Authentication & Security

- **Development Mode**: Authentication disabled by default
- **Production**: Enable via feature flag in System Administration
- **Audit Logging**: All database changes tracked when enabled
- **Local Storage**: All data remains on local infrastructure
- **No Cloud**: Zero external dependencies

## Offline Operation

The system is designed to run completely offline:

- Local PostgreSQL database
- Biometric files stored on local file paths
- No internet connectivity required
- Can sync between installations via CSV export/import

## Future Enhancements

- User authentication and role-based access control
- Biometric SDK integration for actual matching
- PDF generation for official documents
- Family tree visualization
- Geographic data visualization with maps
- Mobile app for Ward Recorders
- Sync protocol for distributed installations

## Support

For issues or questions about deployment, contact your system administrator or the development team.

## License

Proprietary - Provincial Government & LLG Use Only
