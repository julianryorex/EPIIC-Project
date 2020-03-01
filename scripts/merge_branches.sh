#!/bin/sh

# make sure that everything is committed and pushed

echo switching branches to 'master'
git checkout master
echo merging dev to master
git merge dev
echo merged
git push origin master