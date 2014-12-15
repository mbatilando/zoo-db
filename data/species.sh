FILE=species.sql

sed "s/[“”]/\"/g" $FILE > temp1
sed "s/[‘’]/''/g" temp1 > temp2
sed "s/—/ - /g" temp2 > $FILE

rm temp*

