# Quick Start Guide

Get the Provincial & LLG Citizen Registry running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- [ ] Docker Desktop installed and running
- [ ] Bun runtime installed (or Node.js 18+)
- [ ] At least 2GB free disk space
- [ ] Port 5432 and 3000 available

## Step 1: Start the Database (30 seconds)

```bash
cd prov-llg-registry
docker compose up -d
```

Wait for the database to initialize. You'll see:
```
✓ Container pg-prov-llg  Started
```

**What this does:**
- Creates a PostgreSQL 16 container
- Automatically runs all schema files in `sql/`
- Sets up sample regions and code tables
- Creates feature flags and audit tables

## Step 2: Install Dependencies (60 seconds)

```bash
bun install
```

Or if using Node.js:
```bash
npm install
```

## Step 3: Start the Application (10 seconds)

```bash
bun run dev
```

Or with Node.js:
```bash
npm run dev
```

You'll see:
```
✓ Ready in 2.5s
  ▲ Local: http://localhost:3000
```

## Step 4: Access the System

Open your browser to: **http://localhost:3000**

You should see the Dashboard with 8 KPI cards!

## Step 5: Load Sample Data (Optional)

To test with real-looking data:

```bash
docker exec -i pg-prov-llg psql -U postgres -d prov_llg_db < sql/99_sample_data.sql
```

This adds:
- 8 provinces across 4 regions
- 6 districts, 7 LLGs, 10 wards
- 10 villages with GPS coordinates
- 6 households
- 8 sample persons
- 1 birth registration
- 4 verifiers (Pastor, Magistrate, Councillor, President)
- 5 polling stations
- 4 household surveys
- 4 village facility surveys

Refresh the browser to see updated counts!

## Quick Tour of Main Features

### 1. Geography Management
**Navigation:** Sidebar → Geography → Regions

Try:
- View the 4 pre-loaded regions (NGI, MOMASE, HIGHLANDS, SOUTHERN)
- Click "Add Region" to create a new one
- Edit or delete existing regions

### 2. Person Registry
**Navigation:** Sidebar → Registry → Persons

Try:
- Click "Add Person" to register a new citizen
- Fill in: Given Names, Surname, Sex, Date of Birth
- Save and see the person appear in the table
- Note how age is automatically calculated

### 3. Geography Navigation
**Navigation:** Sidebar → Geography → Provinces

- Click on any submenu item (Regions, Provinces, Districts, LLGs, Wards, Villages)
- Each level shows its parent relationships
- Forms include dropdowns for parent selection

### 4. System Administration
**Navigation:** Sidebar → System Administration → Feature Flags

Try:
- Toggle "auth_enabled" (currently OFF for development)
- Toggle "audit_enabled" (currently ON)
- See immediate changes saved to database

### 5. Module Overview Pages

Each module has a landing page showing:
- Clickable cards for sub-modules
- Current record counts
- Helpful information panels

Try navigating to:
- Registry → shows Persons, Households, Family Tree, Biometrics
- Vital Events → shows Births, Deaths
- Elections → shows Roll Build, Eligibility Rules, Polling Stations, Exports

## Common First Steps

### Add Your First Region
1. Go to Geography → Regions
2. Click "Add Region"
3. Enter Code: `CUSTOM` and Name: `Custom Region`
4. Click Save
5. See it appear in the table

### Add Your First Province
1. Go to Geography → Provinces
2. You'll need a region first (use the one you just created)
3. Create province linked to that region

### Register Your First Person
1. Go to Registry → Persons
2. Click "Add Person"
3. Fill in required fields (Given Names, Surname, Sex)
4. Optional: Add Date of Birth to see age calculation
5. Save

### Build the Geography Hierarchy
Proper sequence:
1. Create Regions (already done: 4 sample regions)
2. Create Provinces (link to regions)
3. Create Districts (link to provinces)
4. Create LLGs (link to districts)
5. Create Wards (link to LLGs)
6. Create Villages (link to wards)

## Troubleshooting

### Database won't start
```bash
# Check if port 5432 is already in use
docker ps -a | grep 5432

# Stop any existing PostgreSQL
docker stop pg-prov-llg
docker rm pg-prov-llg

# Try again
docker compose up -d
```

### Can't connect to database
```bash
# Check if container is running
docker ps | grep pg-prov-llg

# Check logs
docker logs pg-prov-llg

# Verify environment variable
cat .env.local
```

### Application won't start
```bash
# Check if port 3000 is available
netstat -an | grep 3000

# Clear and reinstall
rm -rf node_modules
bun install
bun run dev
```

### No data showing in tables
1. Check browser console for errors (F12)
2. Verify database is running: `docker ps`
3. Load sample data: Run the sample data SQL
4. Refresh browser

## Next Steps

Once you're comfortable with the basics:

1. **Set up complete geography**
   - Add all your provinces
   - Create districts, LLGs, wards, villages

2. **Configure verifiers**
   - Add local pastors, magistrates, councillors
   - Include their contact details and ward assignments

3. **Start registering citizens**
   - Create households first
   - Link persons to households
   - Record vital events

4. **Conduct baseline surveys**
   - Survey households (water, sanitation, etc.)
   - Survey villages (facilities, infrastructure)

5. **Prepare for elections**
   - Define eligibility rules
   - Set up polling stations
   - Build election rolls

## Getting Help

### Documentation
- Main README: `README.md`
- Deployment Guide: `.same/DEPLOYMENT.md`
- Database Schema: Files in `sql/` directory

### Support Contacts
- Technical Issues: Check logs first
- Database Problems: Use Docker logs
- Application Bugs: Check browser console

## Development Tips

### Recommended Workflow
1. Start with geography (top-down: Regions → Provinces → ... → Villages)
2. Then add persons and households
3. Link persons to wards/villages
4. Add vital events as they occur
5. Conduct surveys periodically
6. Build election rolls when needed

### Best Practices
- Always link persons to a ward and village
- Keep NID numbers unique
- Verify data with local officials
- Conduct regular data quality checks
- Back up database regularly

### Keyboard Shortcuts (in development)
- Save form: Will add Ctrl+S support
- Search: Will add Ctrl+F in tables
- Navigate: Will add Alt+1-9 for sidebar items

## Sample Workflows

### Workflow 1: Register a Birth
1. Go to Registry → Persons → Add Person
2. Enter newborn details
3. Save person
4. Go to Vital Events → Births
5. Link to the person you just created
6. Record event date and location
7. Add recorder name

### Workflow 2: Conduct Household Survey
1. Ensure household exists in Registry → Households
2. Go to Baseline Surveys → Household
3. Select the household
4. Fill in water source, sanitation, lighting, income
5. Record male/female counts
6. Save survey

### Workflow 3: Build Election Roll
1. Verify persons are registered with wards
2. Go to Elections → Eligibility Rules
3. Check current rule (18+ and resident)
4. Go to Elections → Roll Build
5. Select ward(s) to include
6. Generate roll
7. Export to CSV

## You're Ready!

The system is now running and ready for use. Explore the different modules and start building your citizen registry!

Remember:
- Database persists in `dbdata/` directory
- All changes are saved immediately
- No cloud dependencies - runs completely offline
- Authentication is disabled for easy development
