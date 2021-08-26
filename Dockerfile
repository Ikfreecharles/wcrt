ARG GRAPHQL_CODEGEN_URL

FROM node:13-stretch
WORKDIR /opt/consumer-ui-web

COPY . .
RUN ls -al

RUN apt-get update && apt-get install -y libglu1 libxi6 libgconf-2-4 && ldconfig

ENV GRAPHQL_CODEGEN_URL=$GRAPHQL_CODEGEN_URL
RUN npm install && npm run generate:graphql

EXPOSE 3000

CMD npm run build && npm start
