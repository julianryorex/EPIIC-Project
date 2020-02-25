#!/bin/sh

# make sure that everything is committed and pushed

git checkout master
git merge dev
ZZ
git push origin master