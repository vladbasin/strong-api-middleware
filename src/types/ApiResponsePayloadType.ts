import { Maybe } from '@vladbasin/ts-types';

export type ApiResponsePayloadType<TData, TError> = {
    data?: Maybe<TData>;
    error?: Maybe<TError>;
};
