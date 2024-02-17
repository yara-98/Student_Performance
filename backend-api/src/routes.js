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
router.get('/AverageScoreGen', (req, res) => {
  const sql2 = `SELECT 
    sex,
    (SUM(CASE WHEN G1 > 10 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS G1_percentage,
    (SUM(CASE WHEN G2 > 10 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS G2_percentage,
    (SUM(CASE WHEN G3 > 10 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS G3_percentage
FROM student
GROUP BY sex;`;
  db.all(sql2, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (rows.length === 0) {
      res.status(404).json({ error: 'No data found' });
      return;
    }
    const percent = rows.map((row) => ({
      sex: row.sex,
      G1: row.G1_percentage,
      G2: row.G2_percentage,
      G3: row.G3_percentage,
    }));
    res.json(percent);
  });
});
// performance by parental work
router.get('/parent', (req, res) => {
  const sql = `
 SELECT parent_job,
       SUM(CASE WHEN parent_type = 'Father' THEN count ELSE 0 END) AS father_count,
       SUM(CASE WHEN parent_type = 'Mother' THEN count ELSE 0 END) AS mother_count,
       SUM(count) AS total_count
FROM (
    SELECT 'Father' AS parent_type,
           Fjob_id AS parent_job,
           COUNT(*) AS count
    FROM student
    WHERE sex = 'F'
    GROUP BY Fjob_id

    UNION ALL

    SELECT 'Mother' AS parent_type,
           Mjob_id AS parent_job,
           COUNT(*) AS count
    FROM student
    WHERE sex = 'F'
    GROUP BY Mjob_id
) AS subquery
GROUP BY parent_job;
`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: 'No data found' });
      return;
    }

    const parents = rows.map((row) => ({
      parent_job: row.parent_job,
      count: row.total_count,
    }));

    res.json(parents);
  });
});
router.get('/parentM', (req, res) => {
  const sql5 = `
 SELECT parent_job,
       SUM(CASE WHEN parent_type = 'Father' THEN count ELSE 0 END) AS father_count,
       SUM(CASE WHEN parent_type = 'Mother' THEN count ELSE 0 END) AS mother_count,
       SUM(count) AS total_count_m
FROM (
    SELECT 'Father' AS parent_type,
           Fjob_id AS parent_job,
           COUNT(*) AS count
    FROM student
    WHERE sex = 'M'
    GROUP BY Fjob_id

    UNION ALL

    SELECT 'Mother' AS parent_type,
           Mjob_id AS parent_job,
           COUNT(*) AS count
    FROM student
    WHERE sex = 'M'
    GROUP BY Mjob_id
) AS subquery
GROUP BY parent_job;
`;
  db.all(sql5, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: 'No data found' });
      return;
    }

    const parents = rows.map((row) => ({
      parent_job: row.parent_job,
      total_count_m: row.total_count_m,
    }));

    res.json(parents);
  });
});

module.exports = router;
