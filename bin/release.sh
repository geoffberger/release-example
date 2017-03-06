#!/bin/bash

# Specify any commands that need to be ran before building out the assets. This
# is a suggested list, but other commands could include test, lint, or any
# other bash related commands.
commands=(
  # Install just in case there are any missing node modules from the machine
  "npm install"
  # Update just in case the machine has the latest and greatest based on how
  # versions have been defined in the package.json
  "npm update"
  # Build any of the
  "npm run build"
)

# Will run a single command, check for the exit code and then exit if a non
# non zero is found.
run_command() {
  local command=$@
  eval $command
  exit_code=$?
  if [ $exit_code -ne 0 ]; then
    exit $exit_code
  fi
}

# Loop through all the commands and run them.
main() {
  for command in "${commands[@]}"; do
    run_command $command
  done
}

main
