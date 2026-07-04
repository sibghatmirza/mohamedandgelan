#!/bin/bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
cd "/Users/sib/Desktop/Wedding Portal/wedding-portal"
exec node /Users/sib/.nvm/versions/node/v20.20.2/bin/npm run dev -- --hostname 0.0.0.0
