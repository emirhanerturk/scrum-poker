export const environment = {
  production: false,
  ssl: {
    enable: process.env.SSL === 'true' ? true : false,
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT
  }
};
