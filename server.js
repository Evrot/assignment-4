// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    },
    {
        id: 4,
        title: "O Rouxinol",
        author: "Kristin Hannah",
        genre: "Historical Fiction",
        copiesAvailable: 4
    },
    {
        id: 5,
        title: "A guerra da papoula",
        author: "R. F. Kuang",
        genre: "Fantasy",
        copiesAvailable: 6
    }    
];

// Setting a Express Server
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Book Server is ready to go http://localhost:${PORT}`);
});

// Welcome message and available endpoints
app.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to the Franco Bookstore!", 
        endpoints: { 
            "GET /api/books": "Get all books", 
            "GET /api/books/:id": "Get a specific book by ID",
            "POST /api/books": "Add a new book",
            "PUT /api/books/:id": "Update a book by ID",
            "DELETE /api/books/:id": "Delete a book by ID"
        } 
    }); 
});

// GET /api/books - Get all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET /api/books/:id - Get a specific book
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send({error: 'Book not found'});
    }   
});

// POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
    const newId = books.length ? books[books.length - 1].id + 1 : 1; // Auto-increment ID
    const newBook = {id:newId, ...req.body};
    books.push(newBook);
    res.status(201).json({message: "New book added successfully", book: newBook});
});

// PUT /api/books/:id - Update a book
app.put('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); 
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex] = { id: bookId, ...req.body };
        res.json({message: "Book updated successfully", book: books[bookIndex]});
    } else {
        res.status(404).send({error: 'Book not found'});
    }
});

// DELETE /api/books/:id - Delete a book
app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.json({message: "Book deleted successfully", book: deletedBook[0]});
    } else {
        res.status(404).send({error: 'Book not found'});
    }
});


// Only start server when running directly, not when testing
if (require.main === module) {
    app.listen(PORT, () => {
    console.log(`Book Server is ready to go http://localhost:${PORT}`);
});
}

module.exports = app;











