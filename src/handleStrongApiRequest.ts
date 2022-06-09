import { Result } from '@vladbasin/ts-result';
import { mapRawApiRequestToPayload } from '@vladbasin/strong-api-mapping';
import { Maybe } from '@vladbasin/ts-types';
import { isNil } from 'lodash';
import { ApiRequestType, RawRequestType, StrongApiOptionsType, StrongApiResponseType } from './types';
import { processHandleRequestFailure, provideRawApiResponse, useJsonDatesFormat } from '.';

export const handleStrongApiRequest = <TRequestPayload>(
    options: StrongApiOptionsType<TRequestPayload>
): Result<StrongApiResponseType> => {
    if (options.json?.parseDates === true) {
        useJsonDatesFormat(options.json?.datesFormat);
    }

    let rawRequest: Maybe<RawRequestType>;

    return Result.Start()
        .onSuccess(() => options.request.provideRaw())
        .onSuccessExecute(raw => {
            rawRequest = raw;
        })
        .onSuccess((raw): ApiRequestType<TRequestPayload> => {
            const payload = mapRawApiRequestToPayload({
                rawApiRequest: raw.api,
                customApiRequestData: raw.custom,
                PayloadConstructor: options.request.payload.Model,
                schema: options.request.payload.schema,
            });

            return {
                payload,
                ...raw.api,
            };
        })
        .onSuccess(request => options.request.handle(request))
        .onFailureCompensateWithError(error => processHandleRequestFailure(error, options.response.processFailure))
        .onSuccess(
            (response): StrongApiResponseType => ({
                raw: provideRawApiResponse(response),
                api: response,
            })
        )
        .onSuccess(response =>
            isNil(rawRequest) || isNil(options.response.postProcess)
                ? response
                : { ...response, raw: options.response.postProcess(response, rawRequest) }
        );
};
