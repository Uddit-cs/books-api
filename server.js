const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory books array
let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'The Hobbit', author: 'J.R.R. Tolkien' }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST add a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update a book by ID
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    book.title = req.body.title;
    book.author = req.body.author;

    res.json(book);
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(b => b.id !== id);

    res.json({ message: 'Book deleted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
