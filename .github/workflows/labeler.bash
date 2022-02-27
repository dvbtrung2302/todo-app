username=$USERNAME

all_squads=""

while read line; do
if [[ $line == *"$username"* && $line == *"squads"* ]]
then
    all_squads="$all_squads $line"
fi
done < .github/CODEOWNERS

echo "::set-output name=squads::$all_squads"
