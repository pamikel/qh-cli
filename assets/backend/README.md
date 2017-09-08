# 期货项目 Node.js Base Project

## Dockerfile 
参考本项目Dockerfile文件

基础镜像`daocloud.io/baidao/node:6.10.3`
该镜像Dockerfile如下：
```Dockerfile
FROM node:6.10.3

RUN apt-get update && apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install yarn

RUN npm config set registry https://registry.npm.taobao.org
```

### JUNE TODO
- [x] update BaseService
- [x] update HttpResponse
- [x] add k8s env
- [x] add k8s deploy
- [x] add docker-compose deploy
- [x] update log
- [ ] add zipkin
- [ ] add unit test