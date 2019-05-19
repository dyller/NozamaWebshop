import * as express from 'express';

const app = express();

// View a contact
app.get('/:orderId', (req, res) => {
  res.status(200).send('got it ' +  req.params.orderId);
})
// View all contacts
app.get('', (req, res) => {
  res.status(200).send('There u goes' + req.params.name);
})
// Update new contact
app.patch('/:orderId', (req, res) => {
  res.send('Update a order' + req.params.orderId);
})

export = app;
