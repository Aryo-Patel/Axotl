FROM node:10

HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

ARG NODE_ENV="production"
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install --no-optional && npm cache clean --force
RUN npm install --prefix client --no-optional && npm run build --prefix client
# ENV PATH /usr/src/app/node_modules/.bin:$PATH



WORKDIR /usr/src/app

CMD ["node", "server.js"]
