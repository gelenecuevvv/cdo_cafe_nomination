# CDO Café Nomination & Map Explorer ☕

A community-driven web application that allows users to nominate their favorite cafés in Cagayan de Oro (CDO) and explore them through an interactive Google Map with a leaderboard system.

## 🎯 Features

- **Café Nomination System**: Users can nominate up to 20 cafés with details like name, address, reason, and optional photos
- **Interactive Google Map**: Visual representation of all nominated cafés with markers
- **Leaderboard**: Top 10 most nominated cafés in CDO
- **Admin Dashboard**: Manage nominations, approve/reject submissions, and view analytics
- **Google Places Integration**: Autocomplete for accurate café addresses
- **Responsive Design**: Mobile-first design with café-themed UI
- **Facebook Integration**: Optional Facebook page links for cafés

## 🏗️ Project Structure

```
cdo-cafe-nomination/
├── backend/
│   ├── config/
│   │   └── db.php                 # Database configuration
│   ├── routes/
│   │   ├── cafes.php             # Cafés API endpoints
│   │   ├── nominations.php      # Nominations API endpoints
│   │   └── admin.php            # Admin API endpoints
│   ├── public/
│   │   ├── uploads/             # Uploaded café photos
│   │   └── index.php            # Main backend entry point
│   └── utils/
│       └── helpers.php          # Utility functions
├── frontend/
│   ├── index.html               # Landing page
│   ├── nominate.html           # Nomination form
│   ├── map.html               # Map and leaderboard
│   ├── admin.html             # Admin dashboard
│   └── assets/
│       ├── css/
│       │   └── style.css      # Custom styles
│       └── js/
│           └── utils.js       # JavaScript utilities
├── database/
│   └── cdo_cafe_nomination.sql # Database schema and sample data
├── .env.example               # Environment configuration template
├── package.json              # Project configuration
└── README.md                 # This file
```

## 🗄️ Database Schema

### Tables

- **users**: User accounts (user_id, name, email, password, created_at)
- **cafes**: Café information (cafe_id, cafe_name, address, latitude, longitude, facebook_link, image_path, created_at)
- **nominations**: User nominations (nomination_id, user_id, cafe_id, reason, status, created_at)
- **admin**: Admin accounts (admin_id, username, password, created_at)

### Key Features

- Unique constraints to prevent duplicate cafés
- Foreign key relationships for data integrity
- Indexes for optimal performance
- Sample data for testing

## 🚀 Setup Instructions

### Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- XAMPP (recommended for local development)
- Google Maps API key

### 1. Database Setup

1. Start XAMPP and ensure MySQL is running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Import the database schema:
   ```sql
   -- Run the contents of database/cdo_cafe_nomination.sql
   ```

### 2. Project Setup

1. Copy the project to your XAMPP htdocs directory:
   ```bash
   cp -r cdo-cafe-nomination /Applications/XAMPP/htdocs/
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Configure database connection in `backend/config/db.php`:
   ```php
   private $host = 'localhost';
   private $db_name = 'cdo_cafe_nomination';
   private $username = 'root';
   private $password = '';
   ```

### 3. Google Maps API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
4. Create credentials (API Key)
5. Update the API key in the frontend files:
   - `frontend/nominate.html`
   - `frontend/map.html`

### 4. File Permissions

```bash
chmod 755 backend/public/uploads/
```

### 5. Start the Application

1. Start XAMPP services (Apache and MySQL)
2. Access the application at: `http://localhost/cdo-cafe-nomination/frontend/`

## 🔧 Configuration

### Environment Variables (.env)

```env
# Database Configuration
DB_HOST=localhost
DB_NAME=cdo_cafe_nomination
DB_USER=root
DB_PASS=

# Google Maps API Configuration
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Application Configuration
APP_URL=http://localhost/cdo-cafe-nomination
UPLOAD_PATH=backend/public/uploads/
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Default Admin Credentials

- **Username**: admin
- **Password**: admin123

## 📱 Usage

### For Users

1. **Nominate a Café**:
   - Visit the nomination page
   - Fill in café details (name, address, reason)
   - Optionally add Facebook link and photo
   - Submit nomination (up to 20 per user)

2. **Explore the Map**:
   - View all nominated cafés on the interactive map
   - Click markers for café details
   - See the leaderboard of top cafés
   - Filter by different criteria

### For Admins

1. **Login to Dashboard**:
   - Use admin credentials
   - Access the admin dashboard

2. **Manage Nominations**:
   - Review pending nominations
   - Approve or reject submissions
   - Bulk actions available

3. **Manage Cafés**:
   - Edit café information
   - Delete cafés
   - Export data

4. **View Analytics**:
   - See statistics and trends
   - Top performing cafés
   - Recent activity

## 🎨 UI/UX Features

### Design Theme
- **Color Palette**: Warm café aesthetic (beige, brown, cream, gold)
- **Typography**: Inter font family for modern readability
- **Responsive**: Mobile-first design approach
- **Accessibility**: High contrast and clear navigation

### User Experience
- **Toast Notifications**: Success/error feedback
- **Loading States**: Visual feedback during operations
- **Form Validation**: Real-time validation with helpful messages
- **Progress Indicators**: Show nomination limits and progress

## 🔌 API Endpoints

### Cafés
- `GET /cafes` - Get all cafés
- `GET /cafes/leaderboard` - Get top cafés
- `POST /cafes` - Create new café
- `PUT /cafes` - Update café
- `DELETE /cafes` - Delete café

### Nominations
- `GET /nominations` - Get nominations (with status filter)
- `POST /nominations` - Create nomination
- `PATCH /nominations` - Update nomination status

### Admin
- `POST /admin/login` - Admin login
- `POST /admin/logout` - Admin logout
- `GET /admin/dashboard` - Get dashboard data
- `GET /admin/nominations` - Get all nominations

## 🛡️ Security Features

- **Input Sanitization**: All user inputs are sanitized
- **File Upload Validation**: Type and size restrictions
- **Session Management**: Secure admin sessions
- **CSRF Protection**: Form token validation
- **SQL Injection Prevention**: Prepared statements

## 📊 Sample Data

The database includes sample data:
- 5 sample cafés in Cagayan de Oro
- Sample nominations with different statuses
- Default admin account

## 🚀 Deployment

### Local Development
```bash
# Using PHP built-in server
php -S localhost:8000 -t backend/public

# Or using XAMPP
# Place in htdocs and access via http://localhost/cdo-cafe-nomination/
```

### Production Deployment
1. Set up a web server (Apache/Nginx)
2. Configure PHP and MySQL
3. Set up SSL certificates
4. Configure environment variables
5. Set proper file permissions
6. Enable error logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Marie Angelene C. Cuevo**
- Developed for fun ☕
- Inspired by community-driven café discovery

## 🙏 Acknowledgments

- Google Maps API for mapping functionality
- Tailwind CSS for styling framework
- PHP community for backend development
- CDO coffee community for inspiration

## 📞 Support

For support or questions:
- Create an issue on GitHub
- Contact: [Your Email]
- Documentation: [Your Documentation URL]

---

**Happy Café Exploring! ☕️**
