# Strong API middleware

Strongly typed API middleware. Generic library which can be integrated with any HTTP stack.

## Installation

### npm

`npm install @vladbasin/strong-api-middleware @vladbasin/strong-api-mapping reflect-metadata joi`

### yarn

`yarn add @vladbasin/strong-api-middleware @vladbasin/strong-api-mapping reflect-metadata joi`

## Usage

This is a generic middleware library. You can integrate it with any HTTP stack. Currently the following packages use this library:

- [@vladbasin/strong-api-middleware-aws-lambda](https://github.com/vladbasin/strong-api-middleware) - complete e2e HTTP pipeline integration for AWS Lambda
- [@vladbasin/strong-api-middleware-express]() - IN PROGRESS - complete e2e HTTP pipeline integration for express server
- [@vladbasin/strong-api-client](https://github.com/vladbasin/strong-api-client) - HTTP client which can use shared models to execute request. Therefore, no need to duplicate mapping & validation logic for API consumers & producers. 

### Step-by-step guide

1. Import `reflect-metadata` ONCE in your index file:

```typescript
import 'reflect-metadata';
```

2. Define your model

```typescript
import { body, header, path, query } from '@vladbasin/strong-api-mapping';

export class RequestPayload {
    @path()
    public userId!: number;

    @path({ key: 'userId' })
    public id!: number;

    @query()
    public name!: string;

    @query()
    public isAdmin!: boolean;

    @query({ key: 'lastname' })
    public surname!: string;

    @query({ parser: String })
    public cars!: string[];

    @query({ parser: Number })
    public cash!: number[];

    @body()
    public details!: DetailsType;

    @header({ key: 'Content-Type' })
    public contentType!: string;

    @header({ key: 'X-Info', parser: String })
    public info!: string[];
}
```

3. Define validation rules with `Joi`

```typescript
export const RequestPayloadSchema = Joi.object<RequestPayload>({
    surname: Joi.string().min(10),
    cars: Joi.array().max(3),
    // other rules for field content...
});
```

4. Call `handleStrongApiRequest()` when you want to process HTTP request

```typescript
handleStrongApiRequest({
    // configure request handling
    request: {
        // define request payload model which will be automapped
        payload: {
            Model: RequestPayload,
            schema: RequestPayloadSchema,
        },
        provideRaw: () => {
            // synchronously or ASYNChronously provide RawApiRequest object (headers, body, query string) based on your HTTP stack
        },
        handle: ({ payload }) => {
            // handle api request
            // return ApiResponseType<TSuccessModel, TErrorModel>
        },
    },
    // configure response handling
    response: {
        // process request handling error
        processFailure: {
            options: {
                // output possibly sensitive information (useful for debugging)
                allowSensitive: true,
            },
            // OPTIONAL
            responseCreator: (error, options, defaultResponseCreator) => { 
                // create ApiResponseType<TSuccessModel, TErrorModel> when error happens (by default done by this library automatically)
            },
        },
    },
});
```

This method returns `RawApiResponseType` which you can later convert to your HTTP stack specific output. For example, [@vladbasin/strong-api-middleware-aws-lambda](https://github.com/vladbasin/strong-api-middleware) converts it to AWS Lambda function response.

```typescript
export type RawApiResponseType = {
    statusCode: number;
    headers?: MaybeNullable<Record<string, Maybe<string>>>;
    multiValueHeaders?: MaybeNullable<Record<string, Maybe<string[]>>>;
    body?: MaybeNullable<string>;
};
```

In addition, you can share request/response models with your API consumers, so they don't need to repeat the same mapping & validation logic. See: [@vladbasin/strong-api-client](https://github.com/vladbasin/strong-api-client)