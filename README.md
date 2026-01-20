# Blanck Media Server

A Node.js Express server with Handlebars templating, featuring public pages and an admin panel with authentication.

## Features

- **Express.js** - Fast and minimalist web framework
- **Handlebars** - Logicless templating engine
- **Session Management** - Express session with secure cookie handling
- **Authentication** - Admin login with bcrypt password hashing
- **Public Pages** - Home, About, Services, Contact
- **Admin Panel** - Dashboard with login page

## Project Structure

```
BlanckMediaV3/
├── public/
│   ├── css/
│   │   ├── style.css        # Public site styles
│   │   └── admin.css        # Admin panel styles
│   └── js/
│       ├── main.js          # Public site scripts
│       └── admin.js         # Admin panel scripts
├── routes/
│   ├── public.js            # Public routes (home, about, services, contact)
│   └── admin.js             # Admin routes (login, dashboard, logout)
├── views/
│   ├── layouts/
│   │   ├── main.handlebars  # Main layout for public pages
│   │   └── admin.handlebars # Layout for admin panel
│   ├── home.handlebars
│   ├── about.handlebars
│   ├── services.handlebars
│   ├── contact.handlebars
│   ├── admin/
│   │   ├── login.handlebars
│   │   └── dashboard.handlebars
│   ├── 404.handlebars
│   └── error.handlebars
├── server.js                # Main application entry point
├── package.json
├── .env                     # Environment variables
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Routes

### Public Routes
- `/` - Home page
- `/about` - About Us page
- `/services` - Services page
- `/contact` - Contact page

### Admin Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (requires authentication)
- `/admin/logout` - Logout

## Admin Credentials

Default admin credentials (from .env):
- **Username**: admin
- **Password**: admin123

⚠️ **Important**: Change these credentials in production!

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
SESSION_SECRET=your_secret_key_change_this_in_production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=$2a$10$8QOvVJwU6G/pNnP5WrIj8u2LT5.PvJ5pDjJGJ7N5K9H7Z0B5L5P0e
```

## Dependencies

- **express** - Web framework
- **express-handlebars** - Handlebars templating engine
- **express-session** - Session management
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management

## Development

The project uses Nodemon for development. Changes to server files will automatically restart the server.

```bash
npm run dev
```

## Styling

- **Public site** - Modern responsive design with gradients and cards
- **Admin panel** - Professional dark interface with intuitive layout
- Both use CSS Grid and Flexbox for responsive layouts

## Security Notes

- Change the `SESSION_SECRET` in `.env`
- Update `ADMIN_PASSWORD` hash with your own password
- Use HTTPS in production
- Implement rate limiting for login attempts
- Add CSRF protection for forms
- Validate and sanitize all user inputs

## Future Enhancements

- Database integration (MongoDB/MySQL)
- User management system
- Dynamic page content management
- Email notifications
- File upload functionality
- Logging system
