#! /usr/bin/env bash
pushd enframe-test-app
git reset --hard v1
git clean -fd
git push -f

heroku apps:destroy enframe-test-app-staging --confirm enframe-test-app-staging
heroku apps:destroy enframe-test-app-prod --confirm enframe-test-app-prod
popd
