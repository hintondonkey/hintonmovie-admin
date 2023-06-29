FROM nginx:1.23.3

WORKDIR /app/fontend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build

CMD ["npm", "run", "build"]