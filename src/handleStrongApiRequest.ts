import { Result } from '@vladbasin/ts-result';
import { mapRawApiRequestToPayload } from '@vladbasin/strong-api-mapping';
import { ApiRequestType, StrongApiOptionsType, StrongApiResponseType } from './types';
import { processHandleRequestFailure, provideRawApiResponse, useJsonDatesFormat } from '.';

export const handleStrongApiRequest = <TRequestPayload>(
    options: StrongApiOptionsType<TRequestPayload>
): Result<StrongApiResponseType> => {
    if (options.json?.parseDates === true) {
        useJsonDatesFormat(options.json?.datesFormat);
    }

    return Result.Start()
        .onSuccess(() => options.request.provideRaw())
        .onSuccess(raw =>
            mapRawApiRequestToPayload({
                rawApiRequest: raw.api,
                customApiRequestData: raw.custom,
                PayloadConstructor: options.request.payload.Model,
                schema: options.request.payload.schema,
            })
        )
        .onSuccess((payload): ApiRequestType<TRequestPayload> => {
            return {
                payload,
            };
        })
        .onSuccess(request => options.request.handle(request))
        .onFailureCompensateWithError(error => processHandleRequestFailure(error, options.response.processFailure))
        .onSuccess(
            (response): StrongApiResponseType => ({
                raw: provideRawApiResponse(response),
                api: response,
            })
        );
};
