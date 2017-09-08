#!/bin/sh
date="$(date +%Y%m%d%H%M%S)"

image='daocloud.io/baidao/node-future-base-service:'${date}

docker login daocloud.io -p 65T-Tvq-sVc-BDR -u developer@baidao.com

docker build . -t ${image}

docker push ${image}