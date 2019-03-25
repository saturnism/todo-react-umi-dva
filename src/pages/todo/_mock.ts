import { Todo } from './types';

let first: Todo = {
  id: 0,
  completed: false,
  creationTimestamp: new Date(),
  description: 'Todo #1',
};
let items: Todo[] = [first];
let defaultItem: Todo = {
  id: undefined,
  description: undefined,
  creationTimestamp: undefined,
  completed: false,
};

export default {
  'GET /api/todos': (req, res) => {
    return res.json(items);
  },
  'POST /api/todos': (req, res) => {
    const { body } = req;
    items.push({
      ...defaultItem,
      ...body,
      id: items.length,
      createdTimestamp: new Date(),
    });
    res.json(items);
  },
  'DELETE /api/todos/:id': (req, res) => {
    items = items.filter(item => item.id != req.params.id);
    return res.json(items);
  },
  'PUT /api/todos/:id': (req, res) => {
    const { body } = req;
    items.forEach((item, i) => {
      if (item.id == req.params.id) {
        items[i] = { ...item, ...body };
      }
    });
    return res.json(items);
  },
};
