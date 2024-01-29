// router.js
const express = require('express');
const StudetnController = require('./controller');
const db = require('./Database/table.js');

const router = express.Router();

// sql query will return all the values in
router.get('/', (req, res) => {
  db.all('SELECT * FROM student', (err, rows) => {
    if (err) {
      console.error('Error fetching data from database:', err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});
//sql query that will return the average value for the genders
router.get('/averageGenderScores', (req, res) => {
  const sql = `SELECT sex, (AVG(G1)+AVG(G2)+AVG(G3))/3 AS avg_score FROM student GROUP BY sex`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const formattedRows = rows.map((row) => ({
      sex: row.sex,
      Average_Score: row.avg_score,
    }));

    res.json(formattedRows);
  });
});
//sql query that will return the average value for the followin (G1,G2,G3)
router.get('/averageScores', (req, res) => {
  const sql4 = `
SELECT
      (SELECT AVG(G1) FROM student) AS G1,
      (SELECT AVG(G2) FROM student) AS G2,
      (SELECT AVG(G3) FROM student) AS G3`;
  db.all(sql4, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    // print the average value
    const avg_score = rows[0];
    res.json(avg_score);
  });
});

module.exports = router;
