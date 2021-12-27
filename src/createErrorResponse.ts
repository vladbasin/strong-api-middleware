import { CodedError, codedErrorToHttpStatusMap } from '@vladbasin/strong-api-models';
import { assign } from 'lodash';
import { ErrorResponsePayload } from './models/ErrorResponsePayload';
import { FailureProcessingOptionsType, HandleRequestFailureProcessorErrorResponseType } from './types';

export const createErrorResponse = (
    error: Error,
    options: FailureProcessingOptionsType
): HandleRequestFailureProcessorErrorResponseType => {
    const codedError = CodedError.from(error);

    return {
        statusCode: codedErrorToHttpStatusMap.getHttpCode(codedError.code),
        payload: assign<ErrorResponsePayload, ErrorResponsePayload>(new ErrorResponsePayload(), {
            body: {
                message: codedError.message,
                code: codedError.code,
                errors: codedError.errors,
                stack: options.allowSensitive ? codedError.stack : undefined,
            },
        }),
    };
};
