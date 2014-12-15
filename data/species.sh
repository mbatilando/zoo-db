FILE=species.sql

sed "s/[“”]/\"/g" $FILE > temp
sed "s/[‘’]/''/g" temp > $FILE

rm temp

