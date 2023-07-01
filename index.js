const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  // Read the image file
  const imagePath = 'logo.png';
  const image = fs.readFileSync(imagePath);

  // Set the appropriate headers for the image response
  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Content-Length', image.length);

  // Send the image as the response
  res.end(image);
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 3000');
});
