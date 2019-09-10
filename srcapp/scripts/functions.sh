#!/bin/bash

kill_pid_on_port () {
  if [ ! -z $(command -v lsof) ]; then
    if [[ ! -z $(lsof -nti $1) ]]; then
      kill -9 $(lsof -nti $1)
    fi
  fi
}

wait_on_port () {
  if [ ! -z $(command -v lsof) ]; then
    while [ -z "$SERVER_PID" ]; do
      local SERVER_PID=$(lsof -nti $1)
      sleep 1
    done
  else
    sleep 20
  fi
}