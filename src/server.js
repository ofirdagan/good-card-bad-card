const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/good', express.static(path.join(__dirname, '../good-card')));
app.use('/bad', express.static(path.join(__dirname, '../bad-card')));
app.use((request, response, next) => {
  console.log(`GOT URL - ${request.url}`);
  next();
});

app.listen(port);
console.log(`Server running on http://localhost:${port}`);