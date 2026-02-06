import type { Request, Response, NextFunction } from 'express';
import { z, ZodObject } from 'zod';

const validate = (schema: ZodObject<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: error.issues
                });
            }
            next(error);
        }
    };

export default validate;
