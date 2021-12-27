import { InnerErrorType } from '@vladbasin/strong-api-models';

export type ErrorResponseBodyType = {
    code: string;
    message: string;
    errors: InnerErrorType[];
    stack?: string;
};
