const { config } = require('./protractor.conf');

config.chromeDriver = "/usr/bin/chromedriver";
config.capabilities.chromeOptions = {
  args: ["no-sandbox", "headless", "disable-gpu"]
};

exports.config = config;