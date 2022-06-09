import { Result } from '@vladbasin/ts-result';
import { ObjectSchema } from 'joi';
import { ApiRequestType, ApiResponseType, Newable, RawApiResponseType, StrongApiResponseType } from '.';
import { HandleRequestFailureProcessorType } from './HandleRequestFailureProcessorType';
import { RawRequestType } from './RawRequestType';

export type StrongApiOptionsType<TRequestPayload> = {
    request: {
        payload: {
            Model: Newable<TRequestPayload>;
            schema: ObjectSchema<TRequestPayload>;
        };
        provideRaw: () => Result<RawRequestType>;
        handle: (request: ApiRequestType<TRequestPayload>) => Result<ApiResponseType<unknown, unknown>>;
    };
    response: {
        processFailure: HandleRequestFailureProcessorType;
        postProcess?: (response: StrongApiResponseType, request: RawRequestType) => RawApiResponseType;
    };
    json?: {
        parseDates?: boolean;
        datesFormat?: string;
    };
};
