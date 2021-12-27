import { ApiResponseType, RawApiResponseType } from '.';

export type StrongApiResponseType = {
    raw: RawApiResponseType;
    api: ApiResponseType<unknown, unknown>;
};
