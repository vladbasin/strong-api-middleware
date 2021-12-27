import Joi from 'joi';
import { ErrorResponsePayload } from '.';

export const ErrorResponsePayloadSchema = Joi.object<ErrorResponsePayload>({});
