FROM node:alpine AS base
ENV HOME=/ng-app \
    NPM_CONFIG_LOGLEVEL=warn \
    PATH=/ng-app/node_modules/.bin:$PATH
WORKDIR $HOME
# Install dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json $HOME/
RUN npm set progress=false \
  && npm config set depth 0 \
  && npm cache clean --force \
  && npm install

#
# -- Dependencies --
FROM base AS dependencies
COPY . $HOME

#
# -- Test --
FROM base AS chrome
ENV CHROME_BIN /usr/bin/chromium-browser
# Install Chromium
RUN echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
  && apk add --no-cache --quiet \
  # chromium dependencies
  nss@edge \
  chromium-chromedriver@edge \
  chromium@edge
COPY . $HOME

#
# -- Build --
FROM dependencies AS builder
RUN ng build --prod

#
# -- Deploy --
FROM nginx:alpine AS deploy

# Copy our nginx config
COPY config/nginx.conf /etc/nginx/conf.d/
# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
# From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
