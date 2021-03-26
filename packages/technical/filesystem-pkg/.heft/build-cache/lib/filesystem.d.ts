/// <reference types="node" />
import { WriteStream, PathData } from './types';
export declare const getTempPath: (pathData: PathData) => string;
export declare const getAppPath: (pathData: PathData) => string;
export declare const writeFile: (extension: string, data: any) => Promise<string>;
export declare const createWriteStream: (extension: string) => WriteStream;
export declare function readFile(fileName: string): Promise<Buffer>;
export declare function readFile(fileName: string, encoding: string): Promise<string>;
export declare const fileExists: (fileName: string) => Promise<boolean>;
//# sourceMappingURL=filesystem.d.ts.map