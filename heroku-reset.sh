#! /usr/bin/env bash

pushd enframe-test-app
heroku apps:destroy enframe-test-app-staging --confirm enframe-test-app-staging
heroku apps:destroy enframe-test-app-prod --confirm enframe-test-app-prod
popd
