
# 🛒 Product Management Dashboard (Frontend Assignment)

A responsive **Product Management Dashboard** built using **React and Tailwind CSS** as part of the frontend interview assignment for **Grey Scientific Labs**.

This application allows users to **view, search, add, edit, and paginate products** with support for both **Table (List) View** and **Card (Grid) View**, all managed completely in **client-side memory** (no backend).

---

## 🔗 Live Demo

👉 **Deployed Link:**
[*(Add your Vercel / Netlify URL here)*](https://product-management-dashboardx.netlify.app/)

---

## 📌 Features

### ✅ Product List Display

* Displays products in:

  * **Table View (List)**
  * **Card View (Grid)**
* Toggle option to switch between views seamlessly

### 🔍 Search with Debounce

* Real-time product name search
* **500ms debounce** to optimize performance and reduce unnecessary re-renders

### ➕ Add & ✏️ Edit Product

* Reusable form for **Add** and **Edit**
* Fields:

  * Name (required)
  * Price (required, number)
  * Category (required)
  * Stock (number)
  * Description (optional)
* Basic form validation with user-friendly error messages

### 📄 Pagination

* Client-side pagination
* Automatically updates with search results
* Clean and minimal navigation controls

### 🎨 UI & Responsiveness

* Built using **Tailwind CSS**
* Fully responsive (mobile, tablet, desktop)
* Clean and user-friendly design

---

## 🧠 Technical Implementation

* **React (Vite)** for fast development
* **Tailwind CSS** for styling and responsiveness
* **useState, useMemo, useEffect** for state management
* **Custom `useDebounce` hook** for optimized search
* All product data is stored **in memory only**, as required

---

## 📂 Project Structure

```
src/
│── components/
│   ├── ProductTable.jsx
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   ├── ViewToggle.jsx
│
│── hooks/
│   └── useDebounce.js
│
│── data/
│   └── initialProducts.js
│
│── App.jsx
│── main.jsx
│── index.css
```

---

## 🚀 Getting Started Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/product-management-dashboard.git
cd product-management-dashboard
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

Open your browser at:

```
http://localhost:5173
```

---

## 🧪 Assignment Requirements Mapping

| Requirement                  | Status |
| ---------------------------- | ------ |
| Product list display         | ✅ Done |
| Table & Card view            | ✅ Done |
| Toggle view                  | ✅ Done |
| Search with debounce (500ms) | ✅ Done |
| Add/Edit product             | ✅ Done |
| Form validation              | ✅ Done |
| In-memory data handling      | ✅ Done |
| Pagination                   | ✅ Done |
| Responsive UI                | ✅ Done |

---


## 📧 Submission Details

* **Assignment Type:** Frontend Assessment
* **Company:** Grey Scientific Labs
* **Submission Email:** [hr@greyscientificlabs.com](mailto:hr@greyscientificlabs.com)
* **Deadline:** 05 January 2026

---

## 👤 Author

**Name:** Sumangal Karan
**Role:** BCA Student / Frontend Developer
**Skills:** React, JavaScript, Tailwind CSS, HTML, CSS

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
