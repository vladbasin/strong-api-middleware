import { CodedError, codedErrorToHttpStatusMap } from '@vladbasin/strong-api-models';
import { assign } from 'lodash';
import { ErrorResponsePayload } from './models/ErrorResponsePayload';
import { ApiResponseType, FailureProcessingOptionsType } from './types';

export const createErrorResponse = (
    error: Error,
    options: FailureProcessingOptionsType
): ApiResponseType<unknown, unknown> => {
    const codedError = CodedError.from(error);

    return {
        statusCode: codedErrorToHttpStatusMap.getHttpCode(codedError.code),
        payload: {
            error: assign<ErrorResponsePayload, ErrorResponsePayload>(new ErrorResponsePayload(), {
                body: {
                    message: codedError.message,
                    code: codedError.code,
                    errors: codedError.errors,
                    stack: options.allowSensitive ? codedError.stack : undefined,
                },
            }),
        },
    };
};
