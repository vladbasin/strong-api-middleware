import { ApiResponseType, DefaultHandleRequestFailureResponseCreator, FailureProcessingOptionsType } from '.';

export type HandleRequestFailureResponseCreator = (
    error: Error,
    options: FailureProcessingOptionsType,
    defaultResponseCreator: DefaultHandleRequestFailureResponseCreator
) => ApiResponseType<unknown, unknown>;
