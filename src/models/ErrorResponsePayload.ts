import { body } from '@vladbasin/strong-api-mapping';
import { ErrorResponseBodyType } from '../types';

export class ErrorResponsePayload {
    @body()
    public body!: ErrorResponseBodyType;
}
