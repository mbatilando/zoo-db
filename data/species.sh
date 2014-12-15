FILE=species.sql

sed "s/[“”]/\"/g" $FILE > temp1
sed "s/[‘’]/''/g" temp1 > temp2
sed "s/––/ -/g" temp2 > temp1
sed "s/Przewalski's Horse/Przewalski''s Horse/g" temp1 > temp2
sed "s/Steller's Sea-Eagle/Steller''s Sea-Eagle/g" temp2 > temp1
sed "s/—/ - /g" temp1 > $FILE

rm temp*

