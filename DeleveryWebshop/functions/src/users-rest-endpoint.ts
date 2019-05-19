import * as express from 'express';

const app = express();

// View a contact
app.get('/:userId', (req, res) => {
  res.status(200).send('got it ' +  req.params.userId);
})
// View all contacts
app.get('', (req, res) => {
  res.status(200).send('There u goes' + req.params.name);
})
// Add new contact
app.post('', (req, res) => {
  res.send('Create a new user');
})
// Update new contact
app.patch('/:userId', (req, res) => {
  res.send('Update a new user' + req.params.userId);
})
// Update new contact
app.put('/:userId', (req, res) => {
  res.send('Update a new user' + req.params.userId);
})
// Delete a contact
app.delete('/:userId', (req, res) => {
  res.send('Document deleted');
})

export = app;
