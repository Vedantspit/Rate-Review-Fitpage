const express = require('express');
const router = express.Router();
const db = require('../database');
const natural = require('natural');

const tokenizer = new natural.WordTokenizer();
const stopwords = natural.stopwords;

console.log("summary.js file loaded");

router.get('/:productId', (req, res) => {
    console.log("GET /api/summary/:productId route HIT");

    const { productId } = req.params;

    const sql = `
        SELECT rating, review FROM reviews WHERE productId = ?
    `;

    db.query(sql, [productId], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const tagCounts = {};

        results.forEach((row) => {
            const rating = parseInt(row.rating);
            if (rating >= 1 && rating <= 5) {
                ratingCounts[rating]++;
            }

            if (row.review && typeof row.review === 'string') {
                const words = tokenizer.tokenize(row.review.toLowerCase());

                words.forEach((word) => {
                    if (
                        word.length > 2 &&
                        /^[a-z]+$/.test(word) &&
                        !stopwords.includes(word)
                    ) {
                        tagCounts[word] = (tagCounts[word] || 0) + 1;
                    }
                });
            }
        });

        const topTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([word]) => word);

        console.log(`Top tags for product ${productId}:`, topTags);

        res.json({ ratingCounts, topTags });
    });
});

module.exports = router;
