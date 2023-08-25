import express, { Request, Response } from 'express';
import { tasks } from './data/tasks';

const app = express();
app.use(express.json());

const port = 8080;

app.get('/api', (_, res: Response) => {
    res.send('Hello World!');
});

app.get('/api/tasks', (req: Request, res: Response) => {
    res.json(tasks);
});

app.get('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const task = tasks.filter(e => e.id === parseInt(id));
    res.json(task);
});

app.post('/api/tasks', (req: Request, res: Response) => {
    tasks.push(req.body);
    console.log(tasks);
    res.json(tasks);
});

app.put('/api/tasks/:id',(req: Request, res: Response) =>{
    const { id } = req.params;
    tasks.forEach(e => {
        if (e.id === parseInt(id)) {
            e.todo = req.body.todo;
        }
    });

    res.json(tasks);
});

app.delete('/api/tasks/:id',(req: Request, res: Response) =>{
    const { id } = req.params;
    tasks.forEach((e, i) => {
        if (e.id === parseInt(id)) {
            tasks.splice(i);
        }
    });

    res.json(tasks);
});

app.listen(port, () => {
    console.log(`Server Running Up on port ${port}`);
});
