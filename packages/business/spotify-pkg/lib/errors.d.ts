import { UrlType } from './data';
declare const SpotifyNotFoundError_base: import("error-pkg").ApiError<{
    type: UrlType;
}>;
export declare class SpotifyNotFoundError extends SpotifyNotFoundError_base {
}
declare const SpotifyInvalidUrlError_base: import("error-pkg").ApiError<import("types-pkg").ObjectLiteral>;
export declare class SpotifyInvalidUrlError extends SpotifyInvalidUrlError_base {
}
declare const SpotifyUnhandledTypeError_base: import("error-pkg").ApiError<import("types-pkg").ObjectLiteral>;
export declare class SpotifyUnhandledTypeError extends SpotifyUnhandledTypeError_base {
}
declare const SpotifyUnknownError_base: import("error-pkg").ApiError<import("types-pkg").ObjectLiteral>;
export declare class SpotifyUnknownError extends SpotifyUnknownError_base {
}
export {};
//# sourceMappingURL=errors.d.ts.map