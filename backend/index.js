const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const reviewRoutes = require('./routes/review');
const summaryRoutes = require('./routes/summary');


const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/summary', summaryRoutes);
app.use('/api', reviewRoutes);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
