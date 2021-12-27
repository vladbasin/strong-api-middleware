import { ApiResponsePayloadType } from '.';

export type ApiResponseType<TData, TError> = {
    payload?: ApiResponsePayloadType<TData, TError>;
    statusCode: number;
};
