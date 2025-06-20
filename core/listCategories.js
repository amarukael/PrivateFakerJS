import { faker } from "@faker-js/faker/locale/id_ID";

export function listCategories() {
    const categories = [];

    for (const categoryName of Object.keys(faker)) {
        const category = faker[categoryName];
        if (typeof category !== 'object') continue;

        // Cek apakah kategori memiliki method (fungsi)
        const hasMethods = Object.keys(category).some(
            key => typeof category[key] === 'function'
        );

        if (hasMethods) {
            categories.push(categoryName);
        }
    }

    return {
        locale: 'id_ID',
        categories
    };
}