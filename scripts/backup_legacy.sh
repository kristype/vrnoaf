#!/bin/bash

echo backing up data

mkdir ~/backup

cp -r ~/database ~/backup
cp -r ~/html ~/backup

mv ~/backup/database ~/backup/wpdbdata
mv ~/backup/html ~/backup/wpdata

tar -zcvf backup.tar.gz ~/backup

echo backup complete
