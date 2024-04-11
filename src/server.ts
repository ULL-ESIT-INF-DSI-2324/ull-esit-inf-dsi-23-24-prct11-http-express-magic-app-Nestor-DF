import express from 'express';
import { CardManager } from './CardManager.js';
import { JSONtoCard } from './formatCards.js';

const cardManager = CardManager.getInstance();

const app = express();

app.use(express.json());

app.get('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      error: 'An user has to be provided',
    });
    return;
  }
  if (req.query.id) {
    cardManager.showCard(req.query.user as string, parseInt(req.query.id as string), (error, result) => {
      if (error) {
        res.send(JSON.stringify({ status: 'Error', answer: error }));
      } else {
        res.send(JSON.stringify({ status: 'CardsReceived', answer: result }));
      }
    });
  } else {
    cardManager.listCollection(req.query.user as string, (error, result) => {
      if (error) {
        res.send(JSON.stringify({ status: 'Error', answer: error }));
      } else {
        res.send(JSON.stringify({ status: 'CardsReceived', answer: result }));
      }
    });
  }
});

app.post('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      error: 'An user has to be provided',
    });
  } else {
    cardManager.addCard(req.query.user as string, JSONtoCard(req.body), (error, result) => {
      if (error) {
        res.send(JSON.stringify({ status: 'Error', answer: error }));
      } else {
        res.send(JSON.stringify({ status: 'CardsReceived', answer: result }));
      }
    });
  }
});

app.delete('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      error: 'An user has to be provided',
    });
    return;
  }
  if (!req.query.id) {
    res.send({
      error: 'An id has to be provided',
    });
  } else {
    cardManager.removeCard(req.query.user as string, parseInt(req.query.id as string), (error, result) => {
      if (error) {
        res.send(JSON.stringify({ status: 'Error', answer: error }));
      } else {
        res.send(JSON.stringify({ status: 'CardsReceived', answer: result }));
      }
    });
  }
});

app.patch('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      error: 'An user has to be provided',
    });
    return;
  }
  if (!req.query.id) {
    res.send({
      error: 'An id has to be provided',
    });
  } else {
    if (parseInt(req.query.id as string) !== req.body.id) {
      res.send({
        error: 'The id in the body has to be the same as the one in the query string',
      });
      return;
    }
    cardManager.updateCard(req.query.user as string, JSONtoCard(req.body), (error, result) => {
      if (error) {
        res.send(JSON.stringify({ status: 'Error', answer: error }));
      } else {
        res.send(JSON.stringify({ status: 'CardsReceived', answer: result }));
      }
    });
  }
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
