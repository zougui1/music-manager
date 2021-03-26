import { OptionsOfTextResponseBody, CancelableRequest, Response } from 'got';
export declare const hubPublish: ({ topic, data }: Data, options?: Options | undefined) => CancelableRequest<Response<string>>;
export declare type Headers = Record<string, string | string[] | undefined>;
export declare type Data = {
    topic: string;
    data: any;
};
export declare type Options = OptionsOfTextResponseBody & {
    bearer?: string | undefined;
    jwtKey?: string | undefined;
    hubUrl?: string | undefined;
};
//# sourceMappingURL=hubPublish.d.ts.map