# 🎨 Ganesh Idol Booking - React.js Frontend

This directory contains the user interface and admin dashboards for the Ganesh Idol Booking eCommerce Platform. Built using **React.js, Vite, and Tailwind CSS**, this client-side application offers an interactive, visually stunning, responsive experience optimized across mobile, tablet, and desktop devices.

---

## 📅 Latest Frontend Update

- **Last Commit Date:** `Thu May 1 16:00:00 2025 +0530`
- **Commit Hash:** `93246c6`
- **Commit Message:** `code refactoring`

---


## 🗂️ Project Structure

```
Ganesh-Frontend/
├── 📁 public/                 # Static assets (favicons, images, logos)
├── 📁 src/                    # Primary source code
│   ├── 📁 admin/              # Admin application dashboard module
│   │   ├── 📁 assets/         # Admin icons & styles
│   │   ├── 📁 components/     # Custom dashboards, reports, CRUD forms
│   │   ├── AdminApp.jsx       # Wrapper for admin layouts
│   │   └── App.jsx            # Admin-specific route controllers
│   │
│   ├── 📁 user/               # Customer application module
│   │   ├── 📁 components/     # Shop grids, checkout steps, Gemini chat, bookings
│   │   ├── UserApp.jsx        # Wrapper for user client features
│   │   └── App.jsx            # User-specific route definitions
│   │
│   ├── App.jsx                # Main Application routing entry
│   ├── main.jsx               # React virtual DOM hook
│   └── index.css              # Global styling variables
│
├── .env                       # Client environment configuration
├── tailwind.config.js         # Tailwind styling overrides
├── vite.config.js             # Vite bundler configurations
└── package.json               # Package manifests and runner scripts
```

---

## 🔧 Environment Variables Config

Create a `.env` file in the root of the `Ganesh-Frontend` folder to point the frontend app to your API server and key integrations:

| Variable Name | Example Value | Description |
| :--- | :--- | :--- |
| `VITE_BACK_END_URL` | `http://localhost:3000` | The absolute URL of your Express API server. |
| `VITE_RAZORPAY_KEY_ID`| `rzp_test_9Sm5t60WMXg1z8`| Your Razorpay Checkout Public Key (used to load payment widgets). |

---

## 🚀 Available Scripts

In the frontend directory, you can run:

### `npm run dev`
Launches the local development server.
- Opens the React app in your default browser at `http://localhost:5173`.
- Changes to files trigger immediate hot module replacement (HMR) without reloading the page.

### `npm run build`
Bundles the React application into static files under the `dist/` directory, optimized for production deployment.
- Minimizes, tree-shakes, and compresses source files.

### `npm run preview`
Runs the build directory (`dist/`) locally to test the production build before shipping.

### `npm run lint`
Performs static analysis using ESLint to enforce code standards, find potential bugs, and ensure consistency.

---

## 💄 UI/UX Technologies Used

To deliver a premium, modern experience, the frontend utilizes these curated libraries:
- **Tailwind CSS:** Modern utility classes for custom UI.
- **Framer Motion:** Micro-animations and page transitions that make the interface feel responsive and alive.
- **Material UI (MUI):** Premium, feature-rich interactive dashboard components for robust charts, forms, and tables.
- **Lottie React:** Lightweight vector animations to indicate loading states and successful purchases.
- **Swiper & Slick Carousel:** Touch-responsive product slideshows and interactive banner carousels.
