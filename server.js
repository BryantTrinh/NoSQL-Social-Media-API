const express = require('express');

const db = require('./config/connection');

const routes = require('./routes');

const PORT = process.env.PORT || 3001; 

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.oonce('open', () => {
  app.listen(PORT, () => {
    console.log(`Server has started and is running on port ${PORT}`);
  });
});