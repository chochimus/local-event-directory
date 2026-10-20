import express from 'express';
import path from 'node:path';
import eventsRouter from './eventsRouter.js';

const app = express();
const port = 3000;

app.use(express.static(path.join(import.meta.dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

app.use('/events', eventsRouter);

app.get('/', (req, res) => {
  res.redirect('/events');
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  res.status(500).send('500');
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});