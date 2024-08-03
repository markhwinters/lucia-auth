# NextJS Lucia Auth Starter

This project is a starter template for building web applications using Next.js 14, Lucia Auth, Shadcn UI, Supabase, and Prisma

## Features

- **Next.js 14**: Utilizes the latest version of Next.js for server-side rendering and optimal performance.
- **Lucia Auth**: Implements authentication using Lucia for secure user management.
- **Shadcn UI**: Incorporates Shadcn UI for a sleek and customizable user interface.
- **Supabase**: Integrates Supabase as the backend database and authentication provider.
- **Prisma**: Uses Prisma as an ORM for database management and queries.
- **Password Reset**: Includes partial functionality for users to reset their passwords. (Note: Email sending for password reset is not yet implemented)
- **Theme Switching**: Supports both light and dark modes for user preference.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or later)
- npm or yarn
- A Supabase account and project

## Getting Started

1. Clone the repository: git clone https://github.com/yourusername/your-repo-name.git

2. Install dependencies:
   cd your-repo-name
   npm install

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   DATABASE_URL=your_database_url

4. Set up Prisma:
   npx prisma generate
   npx prisma db push

5. Run the development server:
   npm run dev

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

[You can add details about your project structure here]

## Authentication

This project uses Lucia Auth integrated with Supabase for user authentication. The following features are available:

- Sign up
- Sign in
- Sign out
- Password reset (partial implementation)

Note: The email sending functionality for password reset is not yet implemented. You will need to complete this part of the feature.

## UI Components

Shadcn UI is used for the user interface. You can find and customize components in the `components` directory.

## Theme Switching

The application supports both light and dark modes. Users can switch between themes based on their preference. The theme state is managed and persisted across sessions.

## Database

Supabase is used as the primary database for this project. Prisma is utilized as an ORM to manage database operations and queries.

Make sure to set up your Supabase project and tables accordingly, and keep your Prisma schema in sync with your database structure.

## Deployment

This project can be deployed on platforms that support Next.js, such as Vercel or Netlify. Make sure to set the environment variables in your deployment platform.

## TODO

- Implement email sending functionality for password reset
- [Add any other pending features or improvements]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
