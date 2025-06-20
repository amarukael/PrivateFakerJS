import express from 'express';
import { listCategories } from './core/listCategories.js';
import { generateCategoryData } from './core/generateCategoryData.js';

const app = express();
const port = 3000;

app.get('/categories', (req, res) => {
    res.json(listCategories());
});

app.get('/category/:name', (req, res) => {
    const data = generateCategoryData(req.params.name, req.query);
    if (data.error) {
        res.status(404).json(data);
    } else {
        res.json(data);
    }
});

app.listen(port, () => {
    console.log(`Faker API running at http://localhost:${port}`);
});
