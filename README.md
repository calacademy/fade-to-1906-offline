# fade-to-1906-offline
React web application for offline "Fade to 1906" touchscreen interactive in "Giants"
exhibit.

## Installation

Clone fade-to-1906-offline repo locally.

Unpack node modules via Yarn:

```
$ cd fade-to-1906-offline
$ yarn
```

## Development and Production Builds

Webpack build init scripts in package.json. Webpack config for 'start' script
automatically rebuilds to '/build' on src edit. Run local webserver on /build
dir for dev work (browser auto-refresh in place). While 'start' script is
running, Webpack will use development variable in .env.development file (see
  above). Stop 'start' script and run 'build' script to build app to /build
  using production variable in .env.production file (prior to deployment).

```
yarn start
yarn build
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
