import { RawApiResponseType as MappingRawApiResponseType } from '@vladbasin/strong-api-mapping';

export type RawApiResponseType = MappingRawApiResponseType & {
    statusCode: number;
};
