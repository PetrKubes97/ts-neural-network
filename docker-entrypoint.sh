#!/usr/bin/env sh

# https://serverfault.com/questions/577370/how-can-i-use-environment-variables-in-nginx-conf
set -eu

envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"