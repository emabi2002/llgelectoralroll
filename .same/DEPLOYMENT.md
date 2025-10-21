# Deployment Guide

## Local Development Setup

### 1. Install Prerequisites

**Required:**
- Docker Desktop (for PostgreSQL)
- Bun runtime (or Node.js 18+)

**Install Bun:**
```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Clone and Setup

```bash
# Navigate to project
cd prov-llg-registry

# Install dependencies
bun install

# Start PostgreSQL database
docker compose up -d

# Wait for database to initialize (first time only)
# Database will automatically run all SQL files in sql/ directory
sleep 10
```

### 3. Run Development Server

```bash
bun run dev
```

Access at: http://localhost:3000

## Production Deployment (Offline/Local Infrastructure)

### Option 1: Docker Compose (Recommended)

Create `docker-compose.prod.yml`:

```yaml
version: "3.9"
services:
  db:
    image: postgres:16
    container_name: prov-llg-registry-db
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_USER: postgres
      POSTGRES_DB: prov_llg_db
    volumes:
      - /var/lib/prov-llg-registry/data:/var/lib/postgresql/data
      - ./sql:/docker-entrypoint-initdb.d
    restart: unless-stopped
    networks:
      - prov-llg-network

  app:
    build: .
    container_name: prov-llg-registry-app
    environment:
      DATABASE_URL: postgresql://postgres:${DB_PASSWORD}@db:5432/prov_llg_db
      NODE_ENV: production
    ports:
      - "3000:3000"
    depends_on:
      - db
    restart: unless-stopped
    networks:
      - prov-llg-network

networks:
  prov-llg-network:
    driver: bridge
```

### Option 2: Standalone Server

**On Ubuntu/Debian Server:**

```bash
# 1. Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# 2. Create database and user
sudo -u postgres psql
CREATE DATABASE prov_llg_db;
CREATE USER prov_llg_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE prov_llg_db TO prov_llg_user;
\q

# 3. Run SQL schema files
for file in sql/*.sql; do
  sudo -u postgres psql -d prov_llg_db -f "$file"
done

# 4. Install Bun (or Node.js)
curl -fsSL https://bun.sh/install | bash

# 5. Build and run application
bun install
bun run build
DATABASE_URL="postgresql://prov_llg_user:your_secure_password@localhost:5432/prov_llg_db" \
  bun run start
```

### Option 3: Windows Server

**Install PostgreSQL:**
1. Download from https://www.postgresql.org/download/windows/
2. Run installer and note your password
3. Create database using pgAdmin or psql

**Run Application:**
1. Install Node.js from https://nodejs.org/
2. Open PowerShell in project directory
3. Run:
   ```powershell
   npm install
   npm run build
   $env:DATABASE_URL="postgresql://postgres:password@localhost:5432/prov_llg_db"
   npm start
   ```

## Data Backup Strategy

### Automated Daily Backups

Create backup script `/usr/local/bin/backup-prov-llg.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/prov-llg-registry"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup database
docker exec pg-prov-llg pg_dump -U postgres prov_llg_db | \
  gzip > "$BACKUP_DIR/db_backup_$DATE.sql.gz"

# Backup biometric files (if stored locally)
tar -czf "$BACKUP_DIR/biometrics_$DATE.tar.gz" /var/lib/prov-llg-registry/biometrics/

# Keep only last 30 days
find "$BACKUP_DIR" -type f -mtime +30 -delete

echo "Backup completed: $DATE"
```

Add to crontab:
```bash
0 2 * * * /usr/local/bin/backup-prov-llg.sh
```

## Restore from Backup

```bash
# Restore database
gunzip -c /var/backups/prov-llg-registry/db_backup_20250121_020000.sql.gz | \
  docker exec -i pg-prov-llg psql -U postgres prov_llg_db

# Restore biometric files
tar -xzf /var/backups/prov-llg-registry/biometrics_20250121_020000.tar.gz -C /
```

## Enable Authentication

1. Navigate to System Administration → Feature Flags
2. Toggle "auth_enabled" to ON
3. Restart application
4. Create admin user through database:

```sql
INSERT INTO users (username, password_hash, role, full_name)
VALUES ('admin', '$2b$10$...', 'ADMIN', 'System Administrator');
```

## Security Hardening

### Database Security
1. Change default PostgreSQL password
2. Restrict database access to localhost only
3. Enable SSL for database connections
4. Regular security updates

### Application Security
1. Enable authentication (feature flag)
2. Use HTTPS with proper SSL certificates
3. Implement role-based access control
4. Regular application updates
5. Configure firewall rules

### File System Security
1. Set proper permissions on biometric storage directory
2. Encrypt sensitive data at rest
3. Regular disk space monitoring
4. Implement access logging

## Network Configuration

### For LAN-only Access (No Internet)

Edit `/etc/hosts` on all workstations:
```
192.168.1.100  prov-llg-registry.local
```

Configure application to bind to LAN IP:
```bash
# In package.json
"start": "next start -H 0.0.0.0 -p 3000"
```

### VPN Access (Optional)

For remote access to offline systems:
1. Set up WireGuard or OpenVPN
2. Configure server on LAN
3. Distribute client configs to authorized users
4. Access via VPN tunnel

## Monitoring

### Database Health
```bash
# Check database size
docker exec pg-prov-llg psql -U postgres -d prov_llg_db -c "\
  SELECT pg_size_pretty(pg_database_size('prov_llg_db'));"

# Check table sizes
docker exec pg-prov-llg psql -U postgres -d prov_llg_db -c "\
  SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) \
  FROM pg_tables WHERE schemaname = 'public' ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"
```

### Application Logs
```bash
# View Docker logs
docker logs prov-llg-registry-app --tail 100 -f

# View system logs
journalctl -u prov-llg-registry -f
```

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep pg-prov-llg

# View PostgreSQL logs
docker logs pg-prov-llg

# Test connection
docker exec pg-prov-llg psql -U postgres -d prov_llg_db -c "SELECT version();"
```

### Application Won't Start
```bash
# Check environment variables
echo $DATABASE_URL

# Verify dependencies
bun install

# Check port availability
netstat -tulpn | grep 3000
```

### Performance Issues
```bash
# Check system resources
htop

# Monitor database queries
docker exec pg-prov-llg psql -U postgres -d prov_llg_db -c "\
  SELECT pid, now() - query_start as duration, state, query \
  FROM pg_stat_activity WHERE state != 'idle' ORDER BY duration DESC;"
```

## Support Contacts

For technical issues:
- System Administrator: admin@province.gov.pg
- Database Support: dba@province.gov.pg
- Application Support: support@province.gov.pg

For deployment assistance:
- Contact the Provincial IT Department
