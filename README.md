# The Grand Library 📚

## Introduction

The Grand Library is a modern, full-stack web application built with Next.js 14 that helps libraries manage their book collection, user accounts, and loan system. It features a sleek, dark-themed UI with intuitive navigation and real-time updates.

The application is designed to provide a seamless experience for both administrators and users, offering features like book management, wishlists, loan tracking, and user profiles.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mauroongena/thegrandlibrary.git
cd thegrandlibrary
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
Create a `.env` file in the root directory with:
```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Feature Overview

### 📖 Books Management
- Comprehensive book catalog with search functionality
- Book details including title, author, and availability status
- Admin features for adding, editing, and removing books
- Book cover image support

### 👥 User System
- User authentication with NextAuth.js
- Role-based access control (Admin/User)
- Personal user profiles
- User wishlist management

### 📚 Loan System
- Book borrowing functionality
- Loan period tracking
- Due date management
- Loan extension capability
- Admin loan overview

### ⭐ Key Features
- Real-time book availability status
- Advanced search with filtering options
- Responsive dark mode design
- Interactive UI with loading states
- Admin dashboard for user management
- Personal wishlist for users
- Book rating system

### 🛠 Technical Stack
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with custom UI components
- **Fonts**: Sora (headings) & Inter (body)

## Author

**Mauro Ongena**
- GitHub: [@mauroongena](https://github.com/mauroongena)
- Project developed for Programming 5 course at Artevelde University of Applied Sciences

---

*Built by using Next.js 14 and Prisma*
