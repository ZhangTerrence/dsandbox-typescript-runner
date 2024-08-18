FROM node:latest
WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

CMD ["npm", "run", "-s", "start"]