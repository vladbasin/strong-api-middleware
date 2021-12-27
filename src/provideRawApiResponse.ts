import { HttpContentTypes, HttpHeaders } from '@vladbasin/strong-api-constants';
import { mapPayloadToRawApiResponse } from '@vladbasin/strong-api-mapping';
import { isNil } from 'lodash';
import { ApiResponsePayloadType, ApiResponseType, RawApiResponseType } from '.';

export const provideRawApiResponse = (response: ApiResponseType<unknown, unknown>): RawApiResponseType => {
    const { payload, statusCode } = response;

    const targetPayload = payload?.data || payload?.error;
    if (isNil(targetPayload)) {
        throw new Error('Cannot format response, because both data and error are empty in ApiResponseType<>');
    }

    const { body, headers, multiValueHeaders } = mapPayloadToRawApiResponse(targetPayload);
    const multiValueHeadersEnsured: Record<string, string[]> = Object.entries(multiValueHeaders || {}).reduce(
        (prev, current) => (isNil(current[1]) ? prev : { ...prev, [current[0]]: current[1] ?? [] }),
        {}
    );

    let targetBody = body;

    if (!isNil(body)) {
        const parsedBody = JSON.parse(body);
        const formattedBody: ApiResponsePayloadType<unknown, unknown> = isNil(payload?.data)
            ? { error: parsedBody }
            : { data: parsedBody };

        targetBody = JSON.stringify(formattedBody);
    }

    return {
        body: targetBody || '',
        headers: { [HttpHeaders.ContentType]: HttpContentTypes.ApplicationJson, ...headers },
        multiValueHeaders: multiValueHeadersEnsured,
        statusCode,
    };
};
