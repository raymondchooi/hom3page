#!/usr/bin/env zsh

dfx deploy template_backend
dfx deploy template_frontend
dfx deps deploy
dfx deps init internet_identity --argument null
./deploy_icp_ledger_canister.zsh