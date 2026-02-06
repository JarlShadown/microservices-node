import type { Request, Response, NextFunction } from 'express';
import { z, ZodObject } from 'zod';

// A higher-order function that takes a schema and returns a middleware
const validate = (schema: ZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate the request body
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Return a 400 Bad Request with formatted errors
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: error.issues
                });
            }
            // Pass other errors to the default error handler
            next(error);
        }
    };

export default validate;
