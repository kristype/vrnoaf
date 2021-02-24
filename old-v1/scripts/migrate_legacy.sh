#!/bin/bash

echo restoring wp data

tar -zxvf backup.tar.gz ~/restore/.

docker volume create --name vrnoaf_wp-volume
docker volume create --name vrnoaf_wpdb-volume

docker run -v vrnoaf_ts-volume:/tsdata -v vrnoaf_tsdb-volume:/tsdbdata -v vrnoaf_wpdb-volume:/wpdbdata -v vrnoaf_wp-volume:/wpdata --name helper busybox true

docker cp ~/restore/wpdbdata helper:/wpdbdata 
docker cp ~/restore/wpdata helper:/wpdata 

echo wp data restore complete
