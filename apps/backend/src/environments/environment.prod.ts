export const environment = {
  production: true,
  ssl: {
    enable: process.env.SSL === 'true' ? true : false,
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT
  }
};
