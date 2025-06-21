import { faker } from "@faker-js/faker/locale/id_ID";
import { APIError } from './errors.js';

export function generateCategoryData(categoryName, query = {}) {
    validateInput(categoryName);
    
    const category = faker[categoryName];
    if (!category) {
        throw new APIError(`Category '${categoryName}' not found`, 404);
    }

    const dataSize = getValidatedDataSize(query.data_size);
    console.log(`Generating data for category: ${categoryName}, size: ${dataSize}`);

    return dataSize > 1 
        ? generateMultipleItems(category, query, dataSize)
        : generateSingleItem(category, query);
}

function validateInput(categoryName) {
    if (!categoryName || typeof categoryName !== 'string') {
        throw new APIError('Invalid category name', 400);
    }
}

function getValidatedDataSize(inputSize) {
    const size = parseInt(inputSize, 10);
    return isNaN(size) || size <= 0 ? 1 : size;
}

function generateSingleItem(category, query) {
    const result = {};
    const errors = {};

    Object.keys(category).forEach(key => {
        processFunction(category[key], key, result, errors, query);
    });

    return addErrorsToResult(result, errors);
}

function generateMultipleItems(category, query, count) {
    const result = { data: [] };
    const errors = {};

    for (let i = 0; i < count; i++) {
        const item = {};
        Object.keys(category).forEach(key => {
            processFunction(category[key], key, item, errors, query);
        });
        result.data.push(item);
    }

    return addErrorsToResult(result, errors);
}

function processFunction(fn, key, targetObj, errors, query) {
    if (typeof fn === 'function') {
        try {
            targetObj[key] = executeFunction(fn, query);
        } catch (error) {
            errors[key] = error.message;
        }
    }
}

function executeFunction(fn, query) {
    const args = [];
    for (let i = 0; i < fn.length; i++) {
        args.push(query[`arg${i + 1}`]);
    }
    return fn(...args);
}

function addErrorsToResult(result, errors) {
    if (Object.keys(errors).length > 0) {
        result.errors = errors;
    }
    return result;
}