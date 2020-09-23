import { ValidationError } from 'class-validator';

/**
 * Used to throw HTTP errors.
 * Just do throw new HttpError(code, message) in your controller action and
 * default error handler will catch it and give in your response given code and message .
 */
export class HttpError extends Error {

    httpCode: number;
    response: HttpResponse;

    /**
     * Http Error
     * @param httpCode
     * @param {string} [message]
     * @param {ValidationError} [errors[]]
     * @param {HttpResponse} [response]
     */
    constructor(httpCode: number, message?: string, errors?: ValidationError[], response?: HttpResponse) {
        super();
        Object.setPrototypeOf(this, HttpError.prototype);

        if (httpCode)
            this.httpCode = httpCode;
        if (message)
            this.message = message;
        if (errors) {
            this.response = response || new HttpResponse();
            this.response.errors = errors;
        }

        this.stack = new Error().stack;
    }
    // TODO for Raza: define standard error structure
}

export class HttpResponse {
    errors: ValidationError[];
    data: Array<any>;

    toString() {
        const rsp: any = {};
        if (this.errors && this.errors.length) rsp.errors = this.errors;
        if (this.data) rsp.data = this.data;
        return rsp;
    }
}