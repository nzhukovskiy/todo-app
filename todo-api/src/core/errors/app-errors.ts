export class AppError extends Error {
    constructor(message: string, public readonly statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export class ValidationError extends AppError {
    constructor(message = "Validation error") {
        super(message, 400);
    }
}

export class ServerError extends AppError {
    constructor(message = "Internal server error") {
        super(message, 500);
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Entity not found") {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(message, 409);
    }
}
