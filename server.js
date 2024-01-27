const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Expense = require('./models/Expense'); // Create Expense model
const Income = require('./models/Income'); // Create Income model

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost/money_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  // Fetch expenses and income from MongoDB
  const expenses = await Expense.find();
  const income = await Income.find();
  
  // Render your HTML with expenses and income data
  res.render('index', { expenses, income });
});
// app.get('/', async (req, res) => {
//     // Fetch expenses and income from MongoDB
//     const expenses = await Expense.find();
//     const income = await Income.find();
    
//     // Render your HTML with expenses and income data
//     res.render('index', { expenses, income });
//   });
  
app.post('/add-expense', async (req, res) => {
  // Handle adding expenses to MongoDB
  const { description, amount } = req.body;
  const newExpense = new Expense({ description, amount });
  await newExpense.save();
  res.redirect('/');
});

app.post('/add-income', async (req, res) => {
  // Handle adding income to MongoDB
  const { description, amount } = req.body;
  const newIncome = new Income({ description, amount });
  await newIncome.save();
  res.redirect('/');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
