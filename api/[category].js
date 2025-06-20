import { generateCategoryData } from '../core/generateCategoryData.js';

export default function handler(req, res) {
    const { category } = req.query;
    const data = generateCategoryData(category, req.query);

    if (data.error) {
        res.status(404).json(data);
    } else {
        res.status(200).json(data);
    }
}
