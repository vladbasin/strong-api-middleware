import { createErrorResponse } from '.';
import { ApiResponseType, HandleRequestFailureProcessorType } from './types';

export const processHandleRequestFailure = (
    error: Error,
    processor: HandleRequestFailureProcessorType
): ApiResponseType<unknown, unknown> => {
    const errorResponseCreator = processor.responseCreator || createErrorResponse;
    const errorResponse = errorResponseCreator(error, processor.options, createErrorResponse);

    return {
        statusCode: errorResponse.statusCode,
        payload: {
            error: errorResponse.payload,
        },
    };
};
