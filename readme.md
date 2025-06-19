# Product Rating and Review System

A responsive web application that allows users to rate products, write reviews, upload photos, and view insightful summaries like average ratings and top tags extracted from reviews.

---

## ✨ Features

-  Submit ratings, reviews, or both
-  Upload images with reviews
-  Prevents duplicate reviews per user per product
-  Displays average rating, rating distribution, and top tags per product
-  Responsive mobile-first UI

---

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Libraries**:
  - `axios`, `multer`, `natural`, `mysql2`

---

## 📂 Folder Structure

```
rate-review-system/
├── backend/
│   ├── index.js
│   ├── routes/
│   │   ├── review.js
│   │   └── summary.js
│   ├── database.js
│   └── uploads/  # stores uploaded images
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── components/
│   │       └── Card.jsx
├── schema.sql
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/rate-review-system.git
cd rate-review-system
```

### 2. Setup the MySQL Database

- Import `schema.sql` into your local MySQL server (e.g. using phpMyAdmin or CLI)
- Update DB credentials in `backend/database.js`

### 3. Run the Backend

```bash
cd backend
npm install
node index.js
```

### 4. Run the Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔹 API Endpoints

### Reviews

- `POST /api/review` - Submit review
- `GET /api/review/:productId` - Fetch reviews for a product

### Summary

- `GET /api/summary/:productId` - Get rating stats and top tags

---

## 📄 Database Schema
![image](https://github.com/user-attachments/assets/150fd666-944e-4595-89d1-2e457747c4a8)

### Tables:

- `users(id, username)`
- `products(id, name, description, image)`
- `reviews(id, userId, productId, rating, review, photo)`

### Constraints:

- Foreign keys on `userId` and `productId` in `reviews`
- Unique `(userId, productId)` to prevent multiple reviews

---

## 📷 Screenshots


---

## 📘 Notes

- Review photos are stored locally in `backend/uploads` 
- Top tags are extracted using NLP (via `natural` tokenizer)

---

## ✉️ Author

**Vedant Deshmukh**



