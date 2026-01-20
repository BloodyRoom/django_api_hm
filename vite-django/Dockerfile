# ===== build stage =====
FROM node:18 AS build

WORKDIR /app

# копіюємо залежності
COPY package*.json ./
RUN npm install

# копіюємо код
COPY . .

# билд (Vite / React)
RUN npm run build


# ===== production stage =====
FROM nginx:alpine

# видаляємо дефолтний конфіг
RUN rm /etc/nginx/conf.d/default.conf

# копіюємо nginx конфіг
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# копіюємо зібраний фронт
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
