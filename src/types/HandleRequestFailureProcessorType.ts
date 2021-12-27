import { FailureProcessingOptionsType, HandleRequestFailureResponseCreator } from '.';

export type HandleRequestFailureProcessorType = {
    responseCreator?: HandleRequestFailureResponseCreator;
    options: FailureProcessingOptionsType;
};
