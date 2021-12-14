export const appConfig = {
  serverPort: Number(process.env.PORT) || 5566,
  secretKey: process.env.SECRET_KEY || 'secret',
  expireToken: Number(process.env.TOKEN_EXPIRE) * 60 || '1h'
}
