#!/usr/bin/env bash
# Launcher for homelab_status_page build.sh, run.sh, and autotag

ROOT="$(dirname "$(readlink -f "$0")")"
COMMAND=$1

shift;

if [ -z "$COMMAND" ]; then
    COMMAND="restart-blog"
fi

if [ "$COMMAND" = "cleanup" ] || [ "$COMMAND" = "build.sh" ]; then
    #$ROOT/build.sh "$@"
    echo "Running run.sh..."
    bun run ~/homelab_status_page/web-ui/js/helpers/Kent_Beck_robusteness.js
    echo "Running run.sh..."
elif [ "$COMMAND" = "run" ] || [ "$COMMAND" = "run.sh" ]; then
    #$ROOT/run.sh "$@"
    echo "Running run.sh..."
elif [ "$COMMAND" = "list" ]; then
   # $ROOT/build.sh --list "$@"
    echo "Running run.sh..."

elif [ "$COMMAND" = "show" ]; then
    #$ROOT/build.sh --show "$@"
    echo "Running run.sh..."

elif [ "$COMMAND" = "autotag" ]; then
    #$ROOT/autotag "$@"
    echo "Running run.sh..."

elif [ "$COMMAND" = "update" ]; then
    # cd $ROOT
    #git pull
    echo "Running run.sh..."

elif [ "$COMMAND" = "root" ]; then
    echo $ROOT
elif [ "$COMMAND" = "data" ]; then
    echo $ROOT/data
elif [ "$COMMAND" = "install" ]; then
    echo "Running install..."
    # Add your install command logic here
elif [ "$COMMAND" = "bootstrap" ]; then
    echo "Running bootstrap..."
    bash ~/homelab_status_page/scripts/_bootstrap.sh
elif [ "$COMMAND" = "restart-blog" ]; then
    echo "Running restart-blog..."
    #bash ~/homelab_status_page/scripts/_bootstrap.sh
    bash ~/homelab_status_page/scripts/restart-blog.sh

    # Add your restart-blog command logic here
else
    #echo 'default PARAM - no toher requests currently - restarting blag for fun !?!?!'
    # echo 'homelab_status_page > Invalid command'
    # echo ''
    # echo '   * build [PACKAGES]'
    # echo '   * run OPTIONS [CONTAINER:TAG] CMD'
    # echo '   * list [PACKAGES|*'
    # echo '   * show [PACKAGES]*'
    # echo '   * autotag [CONTAINER]'
    # echo '   * update (runs git pull)'
    # echo '   * root (prints repo path)'
    # echo '   * data (prints data path)'
    # echo '   * install'
    # echo '   * bootstrap'
    # echo '   * restart-blog (default)'
    # echo ''
    # echo 'Run "jetson-containers <CMD> --help" for more info.'
    bash ~/homelab_status_page/scripts/restart-blog.sh
    exit 1
fi
