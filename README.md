# Resollect Loan Management System

A modern web application for managing loan portfolios, designed for banks and financial institutions to track loan statuses, manage documents, and streamline the loan management process.

## Tech Stack & Libraries

| Technology       | Version | Purpose                           |
| ---------------- | ------- | --------------------------------- |
| React            | 18.3.1  | Frontend UI library               |
| TypeScript       | 5.5.3   | Static typing for JavaScript      |
| Vite             | 5.4.8   | Build tool and development server |
| React Router DOM | Latest  | Routing and navigation            |
| Tailwind CSS     | 3.4.1   | Utility-first CSS framework       |
| Lucide React     | 0.344.0 | Icon library                      |

## Project Structure

```
src/
├── components/         # UI components organized by functionality
│   ├── layout/         # Layout components used across multiple pages
│   ├── modals/         # Modal and popup components
│   ├── portfolio/      # Portfolio-specific components
│   └── ui/             # Reusable UI elements
├── data/               # Static data sources and mock APIs
├── hooks/              # Custom React hooks
├── pages/              # Page components corresponding to routes
├── types/              # TypeScript interfaces and type definitions
├── utils/              # Utility functions and constants
├── App.tsx             # Main application component
└── main.tsx           # Entry point for the application
```

## Key Components

### Layout Components

- **Navbar**: Top navigation bar with user profile and branding.
- **Sidebar**: Navigation sidebar with links to different sections of the application.

### Portfolio Components

- **PortfolioHeader**: Header component for portfolio page with filter tabs and search functionality.
- **LoansTable**: Main data table for displaying and interacting with loan data.

### Modal Components

- **UploadSidebar**: Slide-in sidebar for document upload functionality with form validation.

### UI Components

- **ComingSoon**: Placeholder component for features in development.

## Utility Modules

- **helpers.ts**: Common utility functions like `formatCurrency`, `filterLoans`, and `truncateText`.
- **constants.ts**: Application-wide constants for API endpoints, filter options, and UI configuration.

## Type Definitions

- **Loan**: Interface for loan data structure including properties like id, borrower, amount, etc.
- **FilterTab**: Union type for different filtering categories in the portfolio.
- **Document**: Interface for document upload data structure.

## Filtering Logic

The application implements filtering functionality for loan data:

- **Pre Sarfaesi**: Loans with DPD (Days Past Due) < 90
- **NPA**: Loans with DPD >= 90
- **Search**: Filters loans by ID matching the search query

## Custom Hooks

- **useWindowSize**: Hook for responsive behavior based on viewport dimensions.

## Development

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is already in use).
