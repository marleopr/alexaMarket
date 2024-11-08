# Projeto Alexa Market [EM CONSTRUÇÃO]


# React + TypeScript + Vite

# How to run in docker:

docker build --build-arg VITE_BASE_AUTH_URL=https://myapi.com --build-arg VITE_BASE_APP_URL=https://myappurl.com --build-arg VITE_BASE_APP_TENANT=teste -t my-vite-app .

docker images
copy docker IMAGE ID
docker run -p 8080:8080 {IMAGE ID}
