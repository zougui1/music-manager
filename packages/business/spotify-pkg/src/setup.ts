const {
  SPOTIFY_CLIENT_ID: clientId,
  SPOTIFY_CLIENT_SECRET: clientSecret,
} = process.env;

if (!clientId || !clientSecret) {
  throw new Error('The environment variables "SPOTIFY_CLIENT_ID" and "SPOTIFY_CLIENT_SECRET" are required.');
}

export const CLIENT_ID = clientId;
export const CLIENT_SECRET = clientSecret;
