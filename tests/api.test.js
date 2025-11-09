const request = require('supertest');
const app = require('../server'); // Import my Express app

// Test suite for Book API
describe('Book API', () => {

    // Test for GET /api/books
    test('should return all books', async () => {
        const response = await request(app).get('/api/books');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(5); // Adjust based on initial data
    });

    // Test for GET /api/books/:id
    test('should return book by ID', async () => {
        const response = await request(app).get('/api/books/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('author');
        expect(response.body).toHaveProperty('genre');
        expect(response.body).toHaveProperty('copiesAvailable');
    });

    // Test for GET /api/books/:id with non-existing ID
    test('should return 404 for non-existing book', async () => {
        const response = await request(app).get('/api/books/999');

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    // Test for POST /api/books
    test('should create a new book', async () => {
        const newBook = {
            title: "Weight of Glory",
            author: "C.S. Lewis",
            genre: "Sci-fi",
            copiesAvailable: 5
        };

        const response = await request(app)
            .post('/api/books')
            .send(newBook);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('book');
        expect(response.body.book).toHaveProperty('id');
        expect(response.body.book.title).toBe('Weight of Glory');
        expect(response.body.book.author).toBe('C.S. Lewis');
    });

    // Test for PUT /api/books/:id
    test('should update existing book', async () => {
        const updatedBook = {
            title: "O Rouxinol",
            author: "Kristin Hannah",
            genre: "Historical Fiction",
            copiesAvailable: 4
        };

        const response = await request(app)
            .put('/api/books/4')
            .send(updatedBook);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('book');
        expect(response.body.book).toHaveProperty('id', 4);
        expect(response.body.book.title).toBe('O Rouxinol');
        expect(response.body.book.genre).toBe('Historical Fiction');
    });

    // Test for DELETE /api/books/:id
    test('should delete existing book', async () => {
        const response = await request(app).delete('/api/books/1');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
        });

});
