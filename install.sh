#!/bin/bash

curl -sL https://deb.nodesource.com/setup_14.15.5 | sudo -E bash -
sudo apt-get install -y nodejs

node -e "console.log('Running Node.js ' + process.version)"