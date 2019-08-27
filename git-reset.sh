#! /usr/bin/env bash

pushd enframe-test-app
git reset --hard v1
git clean -fd
git push -f
popd
