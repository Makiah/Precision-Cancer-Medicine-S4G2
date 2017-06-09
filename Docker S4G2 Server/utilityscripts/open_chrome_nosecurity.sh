#! /bin/bash

echo "Are you sure you want to continue?  This will close all open Chrome windows!"

read -p "Press any key to continue... " -n1 -s

killall Google\ Chrome

open -a Google\ Chrome --args --disable-web-security --user-data-dir