FROM node:20-slim

WORKDIR /portfolio

COPY package*.json ./

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y procps && \
    npm install && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /root/.npm

COPY . .

ENV NODE_ENV development
ENV PORT=3000
ENV VERCEL_TELEMETRY_DISABLED=1

EXPOSE 3000 24678

CMD npx vercel dev --listen 0.0.0.0:3000 --yes --token $VERCEL_TOKEN
