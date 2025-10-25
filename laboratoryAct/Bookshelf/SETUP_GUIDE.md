# 🚀 Bookshelf Application - Complete Setup Guide

This guide will help you get your Bookshelf application running with the new NestJS backend and React frontend.

## 📋 Prerequisites

Before starting, make sure you have:

1. **Node.js** (v18 or higher) installed
2. **XAMPP** with MySQL running
3. **MySQL database** named `activity3_db` created

## 🗄️ Database Setup

### Step 1: Start MySQL

1. Open XAMPP Control Panel
2. Click "Start" for Apache and MySQL
3. Wait until both show "Running" status

### Step 2: Verify Database

1. Click "Admin" button next to MySQL in XAMPP
2. This opens phpMyAdmin in your browser
3. Check if `activity3_db` database exists in the left sidebar
4. If not, create it:
   - Click "New" in the left sidebar
   - Enter database name: `activity3_db`
   - Click "Create"

## 🔧 Backend Setup

### Step 1: Configure Environment

The backend `.env` file is located at: `backend/.env`

Default configuration:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=activity3_db
PORT=3000
```

**⚠️ Important**: If your MySQL has a password, update `DB_PASSWORD` in the `.env` file.

### Step 2: Install Dependencies (if not already done)

```powershell
cd "c:\xampp\htdocs\BOOKSHELF ACT 3\backend"
npm install
```

### Step 3: Start the Backend

```powershell
cd "c:\xampp\htdocs\BOOKSHELF ACT 3\backend"
npm run start:dev
```

You should see:
```
Application is running on: http://localhost:3000
```

**Keep this terminal window open!** The backend needs to run continuously.

## 🎨 Frontend Setup

### Step 1: Install Dependencies

Open a **NEW** terminal window (keep the backend running):

```powershell
cd "c:\xampp\htdocs\BOOKSHELF ACT 3"
npm install
```

### Step 2: Start the Frontend

```powershell
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

## 🌐 Access the Application

1. Open your browser
2. Navigate to: `http://localhost:5173`
3. You should see your Bookshelf application!

## 📝 API Endpoints Available

The backend provides these endpoints (all prefixed with `/api`):

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create a book (with image upload)
- `PATCH /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Authors
- `GET /api/authors` - Get all authors
- `POST /api/authors` - Create an author
- `PATCH /api/authors/:id` - Update an author
- `DELETE /api/authors/:id` - Delete an author

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a category
- `PATCH /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Genres
- `GET /api/genres` - Get all genres
- `POST /api/genres` - Create a genre
- `PATCH /api/genres/:id` - Update a genre
- `DELETE /api/genres/:id` - Delete a genre

## 🔍 Troubleshooting

### Backend won't start

**Error: "Cannot connect to database"**
- Check if MySQL is running in XAMPP
- Verify database name in `.env` matches your database
- Check MySQL username and password in `.env`

**Error: "Port 3000 is already in use"**
- Another application is using port 3000
- Change the `PORT` in `backend/.env` to a different port (e.g., 3001)
- Update the frontend `API_URL` in `src/apiClient.js` accordingly

### Frontend won't connect to backend

1. Check if backend is running (`http://localhost:3000/api/books` should return data)
2. Check browser console for CORS errors
3. Verify `API_URL` in `src/apiClient.js` is set to `http://localhost:3000/api`

### Database tables are empty

The application will automatically create tables on first run. If tables aren't created:
1. Check backend logs for errors
2. Verify `synchronize: true` is set in `backend/src/app.module.ts`
3. Restart the backend

## 🎯 Quick Start Commands

**Terminal 1 (Backend):**
```powershell
cd "c:\xampp\htdocs\BOOKSHELF ACT 3\backend"
npm run start:dev
```

**Terminal 2 (Frontend):**
```powershell
cd "c:\xampp\htdocs\BOOKSHELF ACT 3"
npm run dev
```

## 📊 Database Structure

The backend automatically creates these tables:

- **books** - Stores book information
- **authors** - Stores author information
- **categories** - Stores book categories
- **genres** - Stores book genres

## 💾 File Uploads

Book cover images are stored in: `backend/uploads/`

The backend automatically handles file uploads when you create or update a book with a cover image.

## 🛠️ Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload - changes are reflected automatically
2. **API Testing**: Use tools like Postman or Thunder Client to test API endpoints
3. **Database Inspection**: Use phpMyAdmin to view and manage database tables
4. **Logs**: Check terminal windows for errors and logs

## 📱 Testing the Application

1. Start both backend and frontend
2. Open `http://localhost:5173` in your browser
3. Try adding an author first
4. Then add a category
5. Finally, add a book with cover image
6. Test CRUD operations (Create, Read, Update, Delete)

## 🔐 Security Note

This setup is for development only. For production:
- Set `synchronize: false` in TypeORM config
- Use migrations for database changes
- Add authentication and authorization
- Use environment-specific configurations
- Secure file upload endpoints

## 📞 Need Help?

If you encounter issues:
1. Check the terminal logs for both frontend and backend
2. Verify all prerequisites are met
3. Ensure XAMPP MySQL is running
4. Check the database exists and is accessible
5. Review the `.env` file configuration

---

**Happy coding! 🎉**
