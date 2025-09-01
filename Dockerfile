# Базовый образ с Node.js
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Копируем ТОЛЬКО файлы зависимостей сначала
COPY package.json package-lock.json* ./

# Устанавливаем ВСЕ зависимости (включая dev)
RUN npm install

# Копируем весь исходный код
COPY . .

# Открываем порт Vite
EXPOSE 5173

# Запускаем dev server с hot-reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]