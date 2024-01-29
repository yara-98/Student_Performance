const express = require('express');
const router = require('./src/routes.js');
const cors = require('cors');
// Connecting to the routes to call the database through the localhost
const app = express();
const port = 4000;
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    // parses the incoming url
    extended: true,
  })
);
app.use('/', router);
// middleware for error handeling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`); //listen to the hhtp request on port 4000
});
