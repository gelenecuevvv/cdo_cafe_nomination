# Database Setup Guide

## Step 1: Start XAMPP Services
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services

## Step 2: Create Database
1. Open phpMyAdmin (http://localhost/phpmyadmin)
2. Create a new database called `cdo_cafe_nomination`
3. Import the SQL file: `database/cdo_cafe_nomination.sql`

## Step 3: Start Backend Server
Run this command in the project directory:
```bash
cd backend/public
php -S localhost:8000
```

## Step 4: Test API
Visit: http://localhost:8000/nominations

## Step 5: Import Demo Data (Optional)
Import `database/demo_data.sql` for sample data.

## Troubleshooting
- Make sure MySQL is running in XAMPP
- Check that the database exists
- Verify the backend server is running on port 8000
- Check browser console for API errors
