FROM daocloud.io/baidao/node:6.10.3

RUN npm config set registry https://registry.npm.taobao.org &&\
    npm config set @ytx:registry http://192.168.3.117:7001

WORKDIR /var/workspace
COPY package.json /var/workspace/package.json
RUN npm install && npm cache clean
COPY . /var/workspace

EXPOSE 3000

CMD ["npm", "start"]
