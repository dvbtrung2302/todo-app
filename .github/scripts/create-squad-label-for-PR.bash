#!/bin/bash
set -eu

username=$USERNAME

all_squads=""

while IFS= read -r line
do
    if [[ $line == *"$username"* ]]
    then
        all_squads="$all_squads $line"
    fi
done < <(cat .github/CODEOWNERS | grep 'squads')

echo "::set-output name=squads::$all_squads"
