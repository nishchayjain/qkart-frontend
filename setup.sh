# CRIO_SOLUTION_START_MODULE_REGISTER
# CRIO_SOLUTION_END_MODULE_REGISTER
# Store workspace public IP to config file
IP_VAR="$(curl http://checkip.amazonaws.com/)"
CONFIG='{"workspaceIp": "'"$IP_VAR"'"}'
echo $CONFIG > src/ipConfig.json