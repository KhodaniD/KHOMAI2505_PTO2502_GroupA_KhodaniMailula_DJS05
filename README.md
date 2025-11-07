# DJS05 - Show Detail Page with Routing and Navigation 

---

## Project Title

**PPodcast Discovery App (Dynamic Routing & State Persistence)**

---

## Project Description

This project develops a **Single-Page Application (SPA)** that focuses on advanced client-side navigation, global state management, and detailed data display. Users can browse a large library of podcasts on the home page and navigate seamlessly to unique detail pages for specific shows.

The core challenge was implementing a robust system that meets key user stories: **dynamic data fetching based on the URL**, and ensuring **user preferences (filters/search) are instantly preserved** when navigating back to the listing page. This solution uses the **React Context API** for central state management and adheres to high standards of modularity and code quality (JSDoc, dedicated utility functions).

---

## Technologies Used

* **React (Vite)**: Core framework for component-based architecture and efficient development.
* **React Router DOM (v6)**: Manages dynamic routing, utilizing **dynamic route parameters (`/show/:showId`)** to manage unique URLs for each show.
* **React Context API**: Implements the **`FilterProvider`** as the central mechanism for state preservation, storing and sharing the user's search, sort, and pagination state across the entire application.
* **Core React & JS (ES6+)**:
    * **Hooks**: `useState`, `useEffect`, `useContext`, `useParams`, and `useMemo` for efficient component logic and state management.
    * **Asynchronous `fetch`**: Manages all API calls and gracefully handles the resulting promises, errors, and loading states.
* **CSS3 & Responsive Design**:
    * **CSS Grid**: Used on the home page to enforce the precise **7-card-per-row layout** requirement.
    * **Media Queries**: A desktop-first approach with robust mobile overrides (`@media`) ensures the application is fully responsive and matches mobile wireframes.
    * **Scoped Styles**: CSS is "scoped" to specific components (e.g., `.podcast-grid .podcast-card`) to prevent style "bleeding" between the homepage and detail pages.

---

## Core Feature Implementation

This section confirms how the specific project requirements were met.

### Dynamic Routing and State Persistence

| Requirement | Implementation Detail | Status |
| :--- | :--- | :--- |
| **Dynamic Routing** | **`App.jsx`** defines the route: `<Route path="/show/:showId" element={<ShowDetailPage />} />`. The ID is extracted using `useParams()` in the detail component. | **MET** |
| **State Preservation (Filters)** | **`FilterContext.jsx`** manages global state (search, sort, genre, page). **`HomePage.jsx`** reads this state on mount, and back navigation instantly reapplies the previous filters. | **MET** |
| **Data Fetching (Dynamic)** | **`ShowDetailPage.jsx`** executes a `fetch` request to the specific endpoint (`/id/:showId`) as a side-effect (`useEffect`) whenever the `showId` parameter changes. | **MET** |
| **Error Handling** | The **`<ErrorMessage />`** component provides detailed feedback for network failures ("Failed to fetch") and gracefully handles missing data. | **MET** |

### Homepage UI and Functionality

| Requirement | Implementation Detail | Status |
| :--- | :--- | :--- |
| **Filters & Search** | Implemented using controlled components in `HomePage.jsx` that dispatch updates to the `FilterContext`. Changes reset the **`currentPage`** to 1. | **MET** |
| **Pagination** | **`SHOWS_PER_PAGE`** is set to **14** in `HomePage.jsx`. The **`<Pagination />`** component displays 2 rows of 7 cards and handles page transitions via context. | **MET** |
| **Visual Layout (7-Column)** | **`HomePage.css`** uses the fixed `grid-template-columns: repeat(7, 1fr);` to strictly enforce the requested two rows of seven cards. | **MET** |
| **Mobile Responsiveness** | The homepage layout correctly collapses to a **1-column vertical card layout** on viewports `< 576px`, matching the mobile wireframe. | **MET** |

### Show Detail Page (`ShowDetailPage.jsx`)

| Requirement | Implementation Detail | Status |
| :--- | :--- | :--- |
| **Display Show Details** | All fields (Title, Image, Description) are fetched and displayed in a structured, responsive layout. | **MET** |
| **Genre Display** | Solved a key data-type mismatch. The component correctly renders genre names by mapping both **Numbers** (from the list API) and **Strings** (from the detail API) to the `GENRE_MAP`. | **MET** |
| **Season Navigation** | A stateful dropdown component (`<SeasonNavigation />`) dynamically renders the selected season and its complete episode list. | **MET** |
| **Episode Playback** | The native HTML5 **`<audio controls>`** element is used to provide simple, functional playback for each episode file. | **MET** |
| **Mobile Responsiveness** | The entire page stacks vertically on mobile, fixing all "cut-off" layout bugs and ensuring full readability. | **MET** |

### Code Quality and Maintainability

* **JSDoc Comments**: **Every major function and component** is comprehensively documented (e.g., `FilterProvider`, `HomePage`, `ShowDetailPage`) for clarity and professional maintenance.
* **Modular Structure**: Code is cleanly separated into concerns (`context`, `utils`, `pages`, `components`).
* **Aesthetic Cohesion**: Final CSS ensures the **typography, margins, and sizing are consistent** between the compact `HomePage` cards and the structured `ShowDetailPage` information blocks.

---

## Setup Instructions

To run this project locally, simply follow these steps:

1.  **Clone the repository and name the directory:**
    ```bash
    git clone https://github.com/KhodaniD/KHOMAI2505_PTO2502_GroupA_KhodaniMailula_DJS05 
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd KHOMAI25088_PTO2502_GroupA_KhodaniMailula_DJS05 # Replace with your actual project folder name if different 
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  **View the application:**
    Open your browser and navigate to the address displayed in the terminal (e.g., `http://localhost:5173/`).

---

## Known Limitations

* **API Instability**: The external podcast API used in this project can occasionally be slow or fail to connect. This is gracefully handled by the **`<ErrorMessage />`** component, which notifies the user of the failure.