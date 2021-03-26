import got, {
  OptionsOfTextResponseBody,
  CancelableRequest,
  Response,
} from 'got';
import querystring from 'querystring';

import { HUB_URL, PUBLISHER_JWT } from './env';
import { getPublishToken } from './getPublishToken';

export const hubPublish = ({ topic, data }: Data, options?: Options | undefined): CancelableRequest<Response<string>> => {
  const _options = options ?? {};
  _options.jwtKey ??= PUBLISHER_JWT;

  const url = _options.hubUrl ?? HUB_URL;
  const stringifiedData = stringifyData(data);

  const body = querystring.stringify({
    topic,
    data: stringifiedData,
  });

  return got.post(url, {
    ..._options,
    body,
    headers: processHeaders(topic, _options),
  });
}

const stringifyData = (data: any): string | undefined => {
  if (typeof data === 'object') {
    return JSON.stringify(data);
  }

  if (data !== undefined) {
    return data.toString();
  }
}

const processHeaders = (topic: string, options: Options): Headers => {
  const defaultHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const finalHeaders: Headers = {
    ...defaultHeaders,
    ...(options.headers ?? {}),
  };

  if (options.bearer) {
    finalHeaders.Authorization = `Bearer ${options.bearer}`;
  } else if (options.jwtKey) {
    const bearer = getPublishToken(topic, options.jwtKey);
    finalHeaders.Authorization = `Bearer ${bearer}`;
  }

  return finalHeaders;
}

export type Headers = Record<string, string | string[] | undefined>;
export type Data = { topic: string, data: any };
export type Options = OptionsOfTextResponseBody & {
  bearer?: string | undefined,
  jwtKey?: string | undefined,
  hubUrl?: string | undefined,
};
