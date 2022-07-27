// Test
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');

const app = express();
const port = 3000;

// Where we will keep the books
let books = [
    {
        isbn: '777',
        title: 'This book is good',
        author: 'Happy Clarksmith',
        published_date: '1823',
        publisher: 'Penguin Co.',
        pages: '75'
    },
    {
        isbn: '123456',
        title: 'Party Time',
        author: 'John Bookman',
        published_date: '1988',
        publisher: 'Tollhouse',
        pages: '817'
    },
    {
        isbn: '98767',
        title: "Ellie's Big Adventure",
        author: 'Elaina Costa',
        published_date: '2021',
        publisher: 'Mommy and Daddy',
        pages: '7'
    }

];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile('new-book.html', { root : __dirname });
})

app.get('/book-list', (req, res) => {
    res.sendFile('book-list.html', { root : __dirname });
})

app.get('/books', (req, res) => {
    res.json(books);
})

app.get('/book-list.js', (req, res) => {
    res.sendFile('book-list.js', { root: __dirname });
})

app.post('/book', (req, res) => {
    const book = req.body;

    console.log("Let's-a go!")

    // Output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.listen(port, () => console.log(`Hello world app is listening on port ${port}`));