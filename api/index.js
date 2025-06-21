import express from 'express';
import { listCategories } from './core/listCategories.js';
import { generateCategoryData } from './core/generateCategoryData.js';
import { APIError } from './core/errors.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/categories', (req, res) => {
    try {
        const categories = listCategories();
        res.json(categories);
    } catch (error) {
        handleError(res, error);
    }
});

app.get('/category/:name', (req, res) => {
    try {
        const data = generateCategoryData(req.params.name, req.query);
        res.json(data);
    } catch (error) {
        handleError(res, error);
    }
});

// Error handler middleware
function handleError(res, error) {
    if (error instanceof APIError) {
        return res.status(error.statusCode).json({
            error: error.message,
            details: error.details
        });
    }
    
    console.error('Unexpected error:', error);
    res.status(500).json({ 
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
}

// Start server
app.listen(port, () => {
    console.log(`Faker API running at http://localhost:${port}`);
});