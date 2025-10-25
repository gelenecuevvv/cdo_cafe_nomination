#!/bin/bash

# CDO Café Nomination System Setup Script
echo "☕ Setting up CDO Café Nomination & Map Explorer..."

# Check if XAMPP is running
if ! pgrep -x "httpd" > /dev/null; then
    echo "⚠️  Please start XAMPP before running this script"
    echo "   Start XAMPP and ensure Apache and MySQL are running"
    exit 1
fi

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p backend/public/uploads
chmod 755 backend/public/uploads

# Copy to XAMPP htdocs (if not already there)
if [ ! -d "/Applications/XAMPP/htdocs/cdo-cafe-nomination" ]; then
    echo "📋 Copying project to XAMPP htdocs..."
    cp -r . /Applications/XAMPP/htdocs/cdo-cafe-nomination/
    echo "✅ Project copied to /Applications/XAMPP/htdocs/cdo-cafe-nomination/"
else
    echo "ℹ️  Project already exists in XAMPP htdocs"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please update with your configuration."
else
    echo "ℹ️  .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Import the database schema from database/cdo_cafe_nomination.sql"
echo "2. Update .env with your Google Maps API key"
echo "3. Access the application at: http://localhost/cdo-cafe-nomination/frontend/"
echo ""
echo "Default admin credentials:"
echo "Username: admin"
echo "Password: admin123"
echo ""
echo "Happy café exploring! ☕"
