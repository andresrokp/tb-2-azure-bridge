require('dotenv').config();
const express = require('express');
const azureRoutes = require('./routes/iothub-routes');

const app = express();
app.use(express.json());
app.use('/to-iothub-gateway', azureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
