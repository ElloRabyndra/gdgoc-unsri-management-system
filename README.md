# GDGOC Unsri Management System

This is a comprehensive management system for the Google Developer Group of Computing (GDGOC) at Sriwijaya University (Unsri). This system is designed to streamline the management of members, events, and other organizational activities. The live deployment can be accessed at [https://gdgoc-unsri-management-system.vercel.app/](https://gdgoc-unsri-management-system.vercel.app/).

## Features

This management system comes with a variety of features to help manage the GDGOC Unsri community effectively:

- **Authentication**: Secure login for administrators. The system is pre-configured with a single admin account.
- **Dashboard**: Provides a comprehensive overview of the community's statistics, including the total number of members, events, and divisions. It also features a chart visualizing the distribution of members across different divisions.
- **Members Management**: Allows administrators to view, add, edit, and delete member information. It includes features for searching, filtering by division, role, and status, and a responsive layout for both desktop and mobile devices.
- **Events Management**: Enables the creation, editing, and deletion of events. Administrators can view event details, including the committee members involved, and filter events by type (online/offline) and status (pending/on-going/done).
- **Leaderboard**: A gamified system to track and rank members based on their points. It includes features for updating points, searching for members, and filtering by division and status.
- **Attendance Tracking**: A robust system for tracking member attendance at events. It supports both a compact view for mobile devices and a detailed table view for desktop, and allows for easy toggling of attendance status.
- **Profile**: A dedicated page for the administrator to view their profile information.

## Tech Stack

This project is built with a modern and robust technology stack:

- **Framework**: [Next.js](https://nextjs.org/) - A React framework for building server-side rendered and static web applications.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) - A collection of re-usable components built with Radix UI and Tailwind CSS.
- **State Management**: [React Query](https://tanstack.com/query/v5) - For fetching, caching, and updating data in React applications.
- **Form Management**: [React Hook Form](https://react-hook-form.com/) - For flexible and extensible forms with easy-to-use validation.
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) - A flexible, scalable NoSQL cloud database to store and sync data.
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth) - Provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users.
- **Deployment**: [Vercel](https://vercel.com/) - A cloud platform for static sites and Serverless Functions.

## Folder Structure

The project follows a structured and organized folder layout:

```
.
├── app
│   ├── (protected)       # Protected routes that require authentication
│   ├── login             # Login page
│   └── ...
├── components
│   ├── attendance
│   ├── auth
│   ├── dashboard
│   ├── event
│   ├── layout
│   ├── leaderboard
│   ├── login
│   ├── members
│   ├── profile
│   ├── shared
│   └── ui                # Re-usable UI components from Shadcn/UI
├── context
│   └── AuthContext.tsx   # Authentication context for managing user state
├── firebase
│   └── config.ts         # Firebase configuration
├── hooks                 # Custom React hooks for business logic
├── lib                   # Utility functions and dummy data
├── public                # Static assets
└── types                 # TypeScript type definitions
```

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v20.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to get the project up and running on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ElloRabyndra/gdgoc-unsri-management-system.git
    cd gdgoc-unsri-management-system
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Firebase environment variables:**

    Create a `.env` file in the root of the project and add the following environment variables. Please contact the repository owner to get the required Firebase credentials.

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy....
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gdgoc-unsri-management-system.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=gdgoc-unsri-management-system
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gdgoc-unsri-management-system.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=186...
    NEXT_PUBLIC_FIREBASE_APP_ID=186...
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-W2...
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Log in to the application:**

    Open [http://localhost:3000](http://localhost:3000) in your browser and log in using the admin credentials provided by the repository owner.

## Troubleshooting

If you encounter any issues during the installation or setup process, please do not hesitate to contact the repository owner for assistance.

## Dedication

> "Semoga keterima jadi Core Team Front-End GDGoC Unsri..."
