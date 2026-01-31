# ===== build stage =====
FROM node:20-alpine AS build

WORKDIR /app

# копіюємо залежності
COPY package*.json ./
RUN npm install

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

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
