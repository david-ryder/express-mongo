const express = require('express');
const app = express();
const port = 3000;

// routes
app.get('/', (req, res) => {
    res.send('Hello API');
});

app.listen(port, () => {
    console.log(`Express app is running on port: ${port}`);
});