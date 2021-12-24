export const appConfig = {
  serverPort: Number(process.env.PORT) || 5566,
  secretKey: process.env.SECRET_KEY || 'secret',
  expireToken: Number(process.env.TOKEN_EXPIRE) * 60 || '1h'
}

export const appStorage = {
  bucket: process.env.CLOUD_BUCKET,
  type: process.env.CLOUD_TYPE,
  project_id: process.env.CLOUD_PROJECT_ID,
  private_key_id: process.env.CLOUD_PRIVATE_KEY_ID,
  private_key: process.env.CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.CLOUD_CLIENT_EMAIL,
  client_id: process.env.CLOUD_CLIENT_ID,
  auth_uri: process.env.CLOUD_AUTH_URI,
  token_uri: process.env.CLOUD_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.CLOUD_AUTH_PROVIDER_x509_CERT_URL,
  client_x509_cert_url: process.env.CLOUD_CLIENT_x509_CERT_URL
}
