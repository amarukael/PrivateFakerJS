export class APIError extends Error {
    constructor(message, statusCode = 400, details = {}) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
        this.details = details;
    }
}