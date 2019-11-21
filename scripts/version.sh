#!/bin/sh

if [[ $# -eq 0 ]] ; then
  printf 'usage: publish.sh {version}'
  exit 1
fi

yarn workspaces version --no-git-tag-version --new-version $1
yarn version --new-version $1

echo "Version updated. You should now 'git push --tags'"
