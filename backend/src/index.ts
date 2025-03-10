import express, { Request, Response } from 'express';
import { z } from 'zod';

const app = express();
const port = 3001;

interface ToDoItem {
  id?: number;
  label: string;
  checked: boolean;
}

const db: { todoList: ToDoItem[] } = { todoList: [
  {label: 'Prepare', checked: false},
  {label: 'Act', checked: false},
  {label: '...', checked: false},
  {label: 'Profit', checked: false}
] };

app.use(express.json());

const todoSchema = z.object({
  label: z.string(),
  checked: z.boolean(),
});

const labelFilterSchema = z.object({
  label: z.string(),
});

const todoItemMapper = (it: ToDoItem, idx: number): ToDoItem => ({ ...it, id: idx });

// GET /api/todo/all
app.get('/api/todo/all', (req: Request, res: Response) => {
  res.json(db.todoList.map(todoItemMapper));
});

// GET /api/todo/count
app.get('/api/todo/count', (req: Request, res: Response) => {
  res.json({ count: db.todoList.length });
});

const todoFilterPredicate = (labelPattern: string) => (item: ToDoItem) => (item.label ?? '').toLowerCase().indexOf((labelPattern ?? '').toLowerCase()) >= 0;

// POST /api/todo/count - count items filtered by label
app.post('/api/todo/count', (req: Request, res: Response) => {
  try {
    const { label } = labelFilterSchema.parse(req.body);
    const filteredCount = db.todoList.filter(todoFilterPredicate(label)).length;
    res.json({ count: filteredCount });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// POST /api/todo/find - find items filtered by label
app.post('/api/todo/find', (req: Request, res: Response) => {
  try {
    const { label } = labelFilterSchema.parse(req.body);
    const filteredItems = db.todoList.map(todoItemMapper).filter(todoFilterPredicate(label));
    res.json(filteredItems);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// POST /api/todo - add new item
app.post('/api/todo', (req: Request, res: Response) => {
  try {
    const newItem = todoSchema.parse(req.body);
    db.todoList.push({ ...newItem, id: undefined });
    res.json({ message: 'Item created successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// POST /api/todo/clean - remove checked items
app.post('/api/todo/clean', (req: Request, res: Response) => {
  const initialLength = db.todoList.length;
  db.todoList = db.todoList.filter((item) => !item.checked);
  const removedCount = initialLength - db.todoList.length;
  res.json({ message: `${removedCount} items removed` });
});

// POST /api/todo/:idx - update item at index idx
app.post('/api/todo/:idx', (req: Request, res: Response) => {
  try {
    const idx = parseInt(req.params.idx, 10);
    const updatedItem = todoSchema.parse(req.body);

    if (idx >= 0 && idx < db.todoList.length) {
      db.todoList[idx] = updatedItem;
      res.json({ message: 'Item updated successfully' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
