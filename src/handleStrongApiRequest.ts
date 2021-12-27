import { Result } from '@vladbasin/ts-result';
import { mapRawApiRequestToPayload } from '@vladbasin/strong-api-mapping';
import { ApiRequestType, StrongApiOptionsType } from './types';
import { processHandleRequestFailure, provideRawApiResponse } from '.';

export const handleStrongApiRequest = <TRequestPayload>(options: StrongApiOptionsType<TRequestPayload>) => {
    return Result.Start()
        .onSuccess(() => options.request.provideRaw())
        .onSuccess(rawApiRequest =>
            mapRawApiRequestToPayload(rawApiRequest, options.request.payload.Model, options.request.payload.schema)
        )
        .onSuccess((payload): ApiRequestType<TRequestPayload> => {
            return {
                payload,
            };
        })
        .onSuccess(request => options.request.handle(request))
        .onFailureCompensateWithError(error => processHandleRequestFailure(error, options.response.processFailure))
        .onSuccess(response => provideRawApiResponse(response));
};
