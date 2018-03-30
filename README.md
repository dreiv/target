# [Angular] Running tests with Chromium in Docker

Running unit tests for front-end angular web applications require them to be tested in a
web browser, which can become tedious in a restricted environment such as a Docker
container. In fact, these execution environments are generally lightweight and do not contain any graphical environment.

## unstyles ideas

protractor.conf.js
```
capabilities: {
    browserName: "chrome",
    chromeOptions: {
        args: ["no-sandbox", "headless", "disable-gpu"]
    }
},
chromeDriver: "/usr/bin/chromedriver",
```

karma.conf.js
```
customLaunchers: {
    ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
    }
},
browserNoActivityTimeout: 60000
```