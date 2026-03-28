FROM node:20-slim

WORKDIR /portfolio

COPY package*.json ./

RUN apt-get update && \
    apt-get upgrade -y && \
    npm install && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /root/.npm

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
