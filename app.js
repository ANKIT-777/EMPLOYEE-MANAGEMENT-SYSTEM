const express = require('express');
const app = express();
const port = 3000;

// Import routes
const employeeRoutes = require('./routes/employeeRoutes');

// Database connection
const connectDB = require('./config/database');
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/employees', employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
