import { faker } from "@faker-js/faker/locale/id_ID";
import { APIError } from './errors.js';

export function listCategories() {
    try {
        const categories = Object.keys(faker)
            .filter(categoryName => {
                const category = faker[categoryName];
                return typeof category === 'object' && 
                       hasMethods(category);
            });

        return {
            locale: 'id_ID',
            count: categories.length,
            categories
        };
    } catch (error) {
        throw new APIError('Failed to list categories', 500, { originalError: error.message });
    }
}

function hasMethods(obj) {
    return Object.values(obj).some(value => typeof value === 'function');
}