const express = require('express');
const router = express.Router();
const db = require('../database');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.get('/:productId', (req, res) => {
  const { productId } = req.params;

  const sql = 'SELECT rating, review, photo, userId FROM reviews WHERE productId = ?';

  db.query(sql, [productId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching reviews', error: err });
    res.json(results);
  });
});


router.post('/review', upload.single('photo'), (req, res) => {
  const { userId, productId, rating, review } = req.body;
  const photoPath = req.file ? req.file.filename : null;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  db.query(
    'SELECT * FROM reviews WHERE userId = ? AND productId = ?',
    [userId, productId],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'DB SELECT error', error: err });
      if (result.length > 0) return res.status(400).json({ message: 'Already reviewed' });

      db.query(
        'INSERT INTO reviews (userId, productId, rating, review, photo) VALUES (?, ?, ?, ?, ?)',
        [userId, productId, rating || null, review || null, photoPath],
        (err2) => {
          if (err2) return res.status(500).json({ message: 'DB INSERT error', error: err2 });
          res.status(200).json({ message: 'Review with photo added successfully!' });
        }
      );
    }
  );
});

module.exports = router;
