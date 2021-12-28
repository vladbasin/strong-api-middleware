import { createErrorResponse } from '.';
import { ApiResponseType, HandleRequestFailureProcessorType } from './types';

export const processHandleRequestFailure = (
    error: Error,
    processor: HandleRequestFailureProcessorType
): ApiResponseType<unknown, unknown> => {
    const errorResponseCreator = processor.responseCreator || createErrorResponse;
    return errorResponseCreator(error, processor.options, createErrorResponse);
};
