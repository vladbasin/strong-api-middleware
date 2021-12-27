import { ApiResponseType, FailureProcessingOptionsType } from '.';

export type HandleRequestFailureResponseCreator = (
    error: Error,
    options: FailureProcessingOptionsType,
    defaultResponseCreator: HandleRequestFailureResponseCreator
) => ApiResponseType<unknown, unknown>;
