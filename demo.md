# Workshop: Building a Simple REST API with Node.js
## Goal
Create a simple REST API for managing a collection of books using Node.js and Express.

## Prerequisites
* Basic understanding of JavaScript
* Node.js and npm installed
  
## Steps
1. Set Up Project
-  Create a project directory:
- Initialize a Node.js project:
```bash
npm init -y
```

- Create a file for the server:

1. Install Dependencies
   
Install express, which will make it easier to set up our server and define routes.

```bash
npm install express
```

3. Define Routes
In the index.js file, set up a basic API with CRUD (Create, Read, Update, Delete) functionality for books.

```javascript
// index.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

// **Create** - Add a new book
app.post('/books', (req, res) => {
    try {
        const newBook = {
            id: books.length + 1,
            title: req.body.title,
            author: req.body.author
        };

        const isValidBook = req.body.title && req.body.author;

        if(!isValidBook) {
            res.status(400).json({
                "message": "Invalid body."
            })
            return;
        }

        books.push(newBook);

        //res.status(201).json(newBook);
        const respMsg = {
            message: "Created book!"
        }
        res.status(201).json(respMsg);
    } catch (e) {
        res.status(500).json({
            "message": "Something went wrong"
        })
    }
});

// **Read** - Get all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// **Read** - Get a single book by ID
app.get('/books/:id', (req, res) => {
    const foundBook = books.find(b => b.id == req.params.id);
    if (foundBook) {
        res.status(200).json(foundBook);
    } else {
        res.status(404).json({
            "message": "We could not find this book."
        })
    }
});

// **Update** - Update a book by ID
app.put('/books/:id', (req, res) => {
    const foudBook = books.find(b => b.id == req.params.id);
    if(foudBook) {
        // Doen we straks
        const newTitle = req.body.title;
        const newAuthor = req.body.author;

        const isValidBook = newTitle && newAuthor
        if(!isValidBook) {
            res.status(400).json({
                "message": "Invalid body."
            })
        }

        foudBook.title = newTitle;
        foudBook.author = newAuthor;

        res.status(200).json(foudBook)

    } else {
        req.status(404).json({
            "message": "We could not find this book."
        })
    }
});

// **Delete** - Delete a book by ID
// **Delete** - Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const foundBook = books.find(b => b.id == req.params.id);

    if(foundBook) {
        try {
            books.pop(foundBook);
            res.status(200).json({
                "message": "Book deleted successfully"
            })
        } catch (e) {
            res.status(500).json({
                "message": "Oops something went wrong"
            })
        }
    } else {
        res.status(404).json({
            "message": "We could not find this book."
        })
    }
});

app.listen(port, () => {
  console.log(`Book API is running at http://localhost:${port}`);
});
```

## Test API Endpoints
Use a tool like Postman or curl in the terminal to test each endpoint:

Create a book

POST http://localhost:3000/books
Body: { "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" }
Get all books

GET http://localhost:3000/books
Get a specific book

GET http://localhost:3000/books/1
Update a book

PUT http://localhost:3000/books/1
Body: { "title": "1984 (Updated)" }
Delete a book

DELETE http://localhost:3000/books/1

## Additional Tips
* Error Handling: Add better error handling and validation to ensure the data is correct.
* Middleware: Use middleware for logging requests, handling authentication, or other custom functionalities.
