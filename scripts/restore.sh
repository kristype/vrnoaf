#!/bin/bash

echo restoring vrnoaf-volume data

docker volume create --name vrnoaf_wp-volume
docker volume create --name vrnoaf_wpdb-volume
docker volume create --name vrnoaf_ts-volume
docker volume create --name vrnoaf_tsdb-volume

docker run -v vrnoaf_ts-volume:/tsdata -v vrnoaf_tsdb-volume:/tsdbdata -v vrnoaf_wpdb-volume:/wpdbdata -v vrnoaf_wp-volume:/wpdata --name helper busybox true

mkdir ~/restore
tar -zxvf backup.tar.gz ~/restore/.

docker cp ~/restore/tsdata helper:/tsdata 
docker cp ~/restore/tsdbdata helper:/tsdbdata 
docker cp ~/restore/wpdbdata helper:/wpdbdata
docker cp ~/restore/wpdata helper:/wpdata

tar -zcvf backup.tar.gz ~/backup

echo backup complete
docker rm helper
rm -r ~/backup
