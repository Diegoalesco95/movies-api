require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.envPORT || 3000,
};

module.exports = { config };
