
# Stock Image Platform - Frontend

A modern, responsive web application for browsing, uploading, editing, and downloading stock images. Built with React 19, TypeScript, and Vite, featuring a sleek UI powered by TailwindCSS.

## Features

- **User Authentication**: Secure login and registration functionality.
- **Image Gallery**: Browse a diverse collection of stock images with options to view details.
- **Image Upload**: Seamlessly upload new images to the platform.
- **Image Editor**: Integrated tools to edit images directly within the browser before use.
- **Download System**: Dedicated functionality for downloading images.
- **User Profile**: Manage user information and settings.
- **Responsive Design**: optimized for various screen sizes using TailwindCSS v4.
- **Drag & Drop**: Enhanced interactions using `@hello-pangea/dnd`.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [SweetAlert2](https://sweetalert2.github.io/)

## Project Structure

```bash
src/
├── app/          # Application configuration (store hooks, etc.)
├── modules/      # Feature-based logic
│   ├── Auth/     # Authentication components
│   ├── gallery/  # Image display components
│   └── ...
├── pages/        # Main route pages
│   ├── Auth/
│   ├── Home/
│   ├── PostImage/
│   ├── EditImage/
│   └── ...
├── services/     # API services and endpoints
├── shared/       # Shared UI components and utilities
├── types/        # TypeScript type definitions
└── utils/        # Helper functions
```

## Environment Configuration

Create a `.env` file in the root directory of the project to configure your environment variables. You can use the provided `.env.example` (if available) or create one with the following keys:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## ⚡ Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd FrontEnd
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will typically run at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📄 License

[MIT](LICENSE)
