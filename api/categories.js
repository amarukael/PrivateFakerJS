import { listCategories } from '../core/listCategories.js';

export default function handler(req, res) {
    const data = listCategories();
    res.status(200).json(data);
}
