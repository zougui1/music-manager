import { ObjectLiteral } from 'types-pkg';

export const withBaseUrl = (baseUrl: string, url: string) => {
  return url.startsWith('http')
    ? url
    : `${baseUrl}${url}`;
}

export const toParam = (value: any): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (value == null) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map(toParam).join(',');
  }

  if (typeof value === 'object') {
    throw new Error(`Values are not supported in URL query. Got ${value}`);
  }

  return value.toString();
}

export const buildUrl = (url: string, params: ObjectLiteral = {}) => {
  // we need a base url otherwise `URL` will throw an error
  const uri = new URL(withBaseUrl('http://localhost', url));

  for (const [paramName, dirtyParam] of Object.entries(params)) {
    const param = toParam(dirtyParam);

    if (param) {
      uri.searchParams.append(paramName, param);
    }
  }

  return `${uri.pathname}${uri.search}`;
}
