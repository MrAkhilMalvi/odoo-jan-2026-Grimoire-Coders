# -------- Stage 1: Build Vite React App --------
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy all files and build
COPY . .
RUN npm run build


# -------- Stage 2: Serve using Nginx --------
FROM nginx:stable-alpine

# remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy build output to nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx conf (important for React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
