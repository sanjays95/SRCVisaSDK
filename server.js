const express = require('express');
const app = express();

// Serve static files in public folder
app.use(express.static('public'))
app.get('/checkout', (req, res) => {
    res.send('Hello World!')
  })
  
// Start server in given port
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
