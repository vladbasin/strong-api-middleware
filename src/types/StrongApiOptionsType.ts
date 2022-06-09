import { CustomApiRequestDataType, RawApiRequestType } from '@vladbasin/strong-api-mapping';
import { Result } from '@vladbasin/ts-result';
import { ObjectSchema } from 'joi';
import { ApiRequestType, ApiResponseType, Newable, RawApiResponseType, StrongApiResponseType } from '.';
import { HandleRequestFailureProcessorType } from './HandleRequestFailureProcessorType';

export type StrongApiOptionsType<TRequestPayload> = {
    request: {
        payload: {
            Model: Newable<TRequestPayload>;
            schema: ObjectSchema<TRequestPayload>;
        };
        provideRaw: () => Result<{ api: RawApiRequestType; custom: CustomApiRequestDataType }>;
        handle: (request: ApiRequestType<TRequestPayload>) => Result<ApiResponseType<unknown, unknown>>;
    };
    response: {
        processFailure: HandleRequestFailureProcessorType;
        postProcess?: (response: StrongApiResponseType) => RawApiResponseType;
    };
    json?: {
        parseDates?: boolean;
        datesFormat?: string;
    };
};
