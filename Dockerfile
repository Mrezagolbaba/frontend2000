# Base on offical Node.js Alpine image
FROM node:19-alpine3.15

# Set working directory
ARG USER=node

ENV HOME=/home/$USER
WORKDIR $HOME

# Install PM2 globally
RUN npm install --global pm2

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
#RUN npm install --omit=dev
RUN npm i --force
# Copy all files
COPY ./ ./

ARG STAGE
# Build app
RUN npm run build:${STAGE}

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) users
# The node users is provided in the Node.js Alpine base image
USER $USER

# Run npm start script with PM2 when container starts
CMD [ "sh", "./docker-entrypoint.sh" ]