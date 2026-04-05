# Sovereign Ledger | Premium Finance Dashboard

A clean, interactive, and high-end finance dashboard built for the Frontend Developer Intern assignment. Designed with a "Sovereign Ledger" aesthetic, featuring a full **Dark/Light Mode** system and smooth, production-grade responsiveness.

## 🚀 Quick Start

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

## ✨ Key Features

-   **🌓 Dynamic Theme System**: Seamlessly switch between a sleek **Sovereignty Dark** mode and a high-contrast **Light Mode**. All colors and glass effects adapt automatically via CSS variables.
-   **🎨 Premium Header (Reference-Perfect)**: A redesigned header matching the high-end reference, including a **Role Switcher (ADMIN/VIEWER)** and a stylized user profile card for "Alex Sterling".
-   **📱 Fully Responsive Design**: 
    -   **Mobile**: Slide-in sidebar drawer with backdrop-blur.
    -   **Tablet/Desktop**: Fluid grid systems that prevent layout overlap on different screen sizes (14" laptop, 16" laptop, and Ultrawide).
-   **📊 Dashboard Overview**: 
    -   Summary cards for Balance, Income, and Expenses.
    -   Interactive Area Chart for balance momentum (Income vs. Expenses).
    -   Categorical spending breakdown using a donut chart.
-   **📑 Transactions Management**:
    -   Table view with Horizontal scroll on mobile.
    -   Advanced filtering by category (including new "Health" and "Technology" segments), type, and search.
    -   Sortable by date for easy history tracking.
-   **🛡️ RBAC (Role-Based Access Control)**:
    -   **Admin Mode**: Full control to add, edit, or delete transactions.
    -   **Viewer Mode**: Read-only access to the dashboard and insights.
-   **🔄 Data Management**:
    -   **Persistent State**: Saved to `localStorage` (Role, Theme, Calculations).
    -   **Reset Defaults**: A dedicated button in the sidebar to instantly reload the 20 pre-populated dummy transactions for testing.
-   **📥 Export Support**: Export filtered transaction data as a JSON file.

## 🛠️ Tech Stack

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling**: Vanilla CSS with **Data-Theme** attributes for instant theme swapping.
-   **Charts**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🎨 Design Philosophy

This project follows a "Glassmorphism" Design Language:
-   **Elevation via Blur**: Structure is defined by `backdrop-filter: blur(20px)` and glass textures rather than heavy borders.
-   **Typography**: Using a dual-font approach with **Manrope** for bold data headlines and **Inter** for precision and legibility in tables.

## 📁 Project Structure

```text
src/
├── components/         # Dashboard, Transactions, Insights, Sidebar, Header
├── context/            # FinanceContext (State, RBAC, Theme, Reset Logic)
├── index.css           # Design tokens, Typography, and Layout utilities
├── App.jsx             # App layout & side-pane drawer logic
└── main.jsx            # Entry point
```

---
*Created for the Frontend Developer Intern Assignment.*
