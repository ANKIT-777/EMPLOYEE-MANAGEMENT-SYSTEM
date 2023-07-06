const express = require('express');
const app = express();
const port = 3000;


const employeeRoutes = require('./routes/employeeRoutes');

const connectDB = require('./config/database');
connectDB();

app.use(express.json());


app.use('/employees', employeeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
