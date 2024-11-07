const express = require('express');
const { title } = require('process');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

// **Create** - Add a new book
app.post('/books', (req, res) => {

});

// **Read** - Get all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// **Read** - Get a single book by ID
app.get('/books/:id', (req, res) => {

});

// **Update** - Update a book by ID
app.put('/books/:id', (req, res) => {

});

// **Delete** - Delete a book by ID
app.delete('/books/:id', (req, res) => {

});

app.listen(port, () => {
  console.log(`Book API is running at http://localhost:${port}`);
});