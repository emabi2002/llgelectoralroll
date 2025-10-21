# Provincial & LLG Registry - Development Todos

## Completed ✅

- [x] Set up project structure with Next.js and PostgreSQL
- [x] Create database schema (all 7 schema files)
- [x] Implement ERP-style layout with sidebar and top menu
- [x] Build Dashboard with KPI cards
- [x] Create Geography module (Regions, Provinces, Districts, LLGs, Wards, Villages)
- [x] Implement Registry module (Persons, Households, Family Tree, Biometrics)
- [x] Build Vital Events module (Births, Deaths)
- [x] Create Baseline Surveys module
- [x] Implement Elections module
- [x] Build Verifications module
- [x] Create Reports module
- [x] Implement Data Admin module
- [x] Build System Administration module
- [x] Create API routes for core entities
- [x] Add comprehensive README documentation

## In Progress 🚧

- [ ] Add remaining CRUD operations for all geography entities
- [ ] Implement full persons form with ward/village lookups
- [ ] Build births registration page with person lookup
- [ ] Create feature flags management UI (started)

## To Do 📋

### High Priority
- [ ] Complete API routes for all entities (districts, villages, households, etc.)
- [ ] Add ward/village selector dropdowns in forms
- [ ] Implement household management with person linkage
- [ ] Build vital events forms (births and deaths)
- [ ] Create verifiers management page
- [ ] Implement verification workflow UI
- [ ] Build baseline survey forms

### Medium Priority
- [ ] Add data validation and error handling
- [ ] Implement search and filtering in tables
- [ ] Add pagination for large datasets
- [ ] Create roll building functionality
- [ ] Build CSV import/export functionality
- [ ] Add code tables management UI
- [ ] Implement duplicate detection reports

### Low Priority
- [ ] Add family tree visualization
- [ ] Create geographic data maps
- [ ] Implement audit log viewer
- [ ] Add device profiles management
- [ ] Build PDF export for official documents
- [ ] Add data quality dashboard
- [ ] Create comprehensive test coverage

## Future Enhancements 🚀

- [ ] User authentication and role-based access
- [ ] Biometric SDK integration
- [ ] Mobile app for Ward Recorders
- [ ] Offline sync protocol
- [ ] Multi-language support (Tok Pisin, Hiri Motu)
- [ ] Photo upload for persons
- [ ] Digital signatures for verifications
- [ ] SMS notifications for verifications
- [ ] Backup and restore functionality
- [ ] Data migration tools

## Notes 📝

- Database is configured to run in Docker for easy deployment
- All data operations are local (no cloud dependencies)
- Authentication is disabled for development (feature flag ready)
- System designed for offline operation
