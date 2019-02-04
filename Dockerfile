FROM node:11

RUN mkdir /code
WORKDIR /code

RUN npm install -g serve@10

ADD package.json .
ADD package-lock.json .

RUN npm install

ADD . /code

RUN npm run build

EXPOSE 3000

CMD serve -l 3000 -s build
