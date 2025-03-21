# Use an official Node runtime as the parent image
FROM node:20.11.0-alpine as builder

ENV NODE_ENV=development

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY postcss.config.mjs ./
COPY ./yarn.lock ./

# Install any needed packages specified in package.json
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN yarn build

FROM node:20.11.0-alpine as runner
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_URL="file:/app/prisma/dev.db"

CMD ["node", "server.js"]