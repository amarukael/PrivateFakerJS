import { faker } from "@faker-js/faker/locale/id_ID";

export function generateCategoryData(categoryName,) {
    console.log("Searching by " + categoryName)

    const category = faker[categoryName];
    const result = {};
    const errorfield = {};

    if (!category) {
        return { error: `Kategori '${categoryName}' tidak ditemukan.` };
    }

    for (const key of Object.keys(category)) {
        const fn = category[key];

        if (typeof fn === 'function') {
            try {
                const args = [];

                for (let i = 0; i < fn.length; i++) {
                    const param = query[`arg${i + 1}`];
                    args.push(param !== undefined ? param : undefined);
                }

                const value = fn(...args);
                result[key] = value;
            } catch (err) {
                errorfield[key] = err.message;
            }
        }
        if (Object.keys(errorfield).length !== 0) {
            result["error"] = errorfield
        }
    }

    return result;
}
