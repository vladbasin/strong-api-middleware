import { ApiResponseType, FailureProcessingOptionsType } from '.';

export type DefaultHandleRequestFailureResponseCreator = (
    error: Error,
    options: FailureProcessingOptionsType
) => ApiResponseType<unknown, unknown>;
