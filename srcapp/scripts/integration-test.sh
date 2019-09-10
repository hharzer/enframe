#!/bin/bash

source ./scripts/functions.sh
PORT=:3000
kill_pid_on_port $PORT

unset YARN_PID
yarn start &
YARN_PID=$!

wait_on_port $PORT

yarn cypress run

kill_pid_on_port $PORT
kill $YARN_PID
unset YARN_PID
