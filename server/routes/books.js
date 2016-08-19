var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/prac';

router.get('/:genre', function (req, res) {
  // Get the genre.
  var genre = req.params.genre;
  console.log("genre: ", genre);

  // Retrieve books from database
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log("Connection failed Failed");
      res.sendStatus(500);
    }

    client.query('SELECT * FROM books WHERE genre=$1', [genre], function (err, result) {
      done(); // closes connection, I only have 10!

      if (err) {
        console.log("Query Failed");
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});

router.get('/', function (req, res) {
  // Retrieve books from database
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM books', function (err, result) {
      done(); // closes connection, I only have 10!

      if (err) {
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var book = req.body;
  console.log(req.body);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO books (author, title, published, genre) '
                + 'VALUES ($1, $2, $3, $4)',
                [book.author, book.title, book.published, book.genre],
                function (err, result) {
                  done();

                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.sendStatus(201);
                  }
                });
  });
});

module.exports = router;
