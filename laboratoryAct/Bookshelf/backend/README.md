# Bookshelf Backend API

NestJS backend with TypeORM and MySQL for the Bookshelf application.

## Prerequisites

- Node.js (v18 or higher)
- MySQL database (XAMPP recommended)
- Database named `activity3_db`

## Environment Setup

The `.env` file is already configured with default values:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=activity3_db
PORT=3000
NODE_ENV=development
```

**Important**: Update the `.env` file if your MySQL configuration is different (especially `DB_PASSWORD`).

## Database Setup

1. Make sure XAMPP MySQL is running
2. The database `activity3_db` should already exist
3. The application will automatically create tables on first run (TypeORM synchronize is enabled)

## Installation

Dependencies are already installed. If needed, run:

```bash
npm install
```

## Running the Application

### Development Mode (with hot reload)

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Production Mode

```bash
npm run build
npm run start:prod
```

## API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book (supports file upload for cover image)
- `PATCH /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Authors
- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get a specific author
- `POST /api/authors` - Create a new author
- `PATCH /api/authors/:id` - Update an author
- `DELETE /api/authors/:id` - Delete an author

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category
- `POST /api/categories` - Create a new category
- `PATCH /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Genres
- `GET /api/genres` - Get all genres
- `GET /api/genres/:id` - Get a specific genre
- `POST /api/genres` - Create a new genre
- `PATCH /api/genres/:id` - Update a genre
- `DELETE /api/genres/:id` - Delete a genre

## File Uploads

Book cover images are stored in the `/uploads` directory. When creating or updating a book, you can send the cover image as `multipart/form-data` with the field name `coverImage`.

## CORS

CORS is enabled for:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000`

## Project Structure

```
backend/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── books/                  # Books module
│   │   ├── book.entity.ts
│   │   ├── books.controller.ts
│   │   ├── books.service.ts
│   │   ├── books.module.ts
│   │   └── dto/
│   ├── authors/                # Authors module
│   ├── categories/             # Categories module
│   └── genres/                 # Genres module
├── uploads/                    # Uploaded files directory
├── .env                        # Environment variables
├── package.json
└── tsconfig.json
```

## Notes

- TypeORM's `synchronize` option is set to `true` for development. In production, you should use migrations.
- Make sure your MySQL server is running before starting the application.
- The backend runs on port 3000 by default (configurable in `.env`).
