#!/bin/bash

echo backing up vrnoaf-volume data
docker run -v vrnoaf_ts-volume:/tsdata -v vrnoaf_tsdb-volume:/tsdbdata -v vrnoaf_wpdb-volume:/wpdbdata -v vrnoaf_wp-volume:/wpdata --name helper busybox true

mkdir ~/backup
docker cp helper:/tsdata ~/backup/tsdata
docker cp helper:/tsdbdata ~/backup/tsdbdata
docker cp helper:/wpdbdata ~/backup/wpdbdata
docker cp helper:/wpdata ~/backup/wpdata

tar -zcvf backup.tar.gz ~/backup

echo backup complete
docker rm helper
rm -r ~/backup