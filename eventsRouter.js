import express from 'express';
import { events, getCategories } from './eventData.js';

const eventsRouter = express.Router();


const possibleCategories = getCategories();
eventsRouter.get('/', (req, res) => {
  const category = req.query.category;

  let selectedEvents = events;

  if (category) {
    if (possibleCategories.has(category)) {
    selectedEvents = events.filter(event => event.category === category);
    } else {
    selectedEvents = [];
    }
  }
  
  res.render('events',{events: selectedEvents, categories: possibleCategories});
});

eventsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const event = events.find(event => event.id === Number(id));
  if (!event) {
    return res.status(404).render('404');
  }
  
  res.render('event', { event });
});

export default eventsRouter;