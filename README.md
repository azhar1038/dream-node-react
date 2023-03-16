# Dream App (WIP - Work In Progress)

This is a small fun project to understand how to Dockerize a web app. It uses the OpenAI's DALL-E AI image generation model to generate image based on input text.

## Index
- [Technologies Used](#technologies-used)
- [How to Install in Windows](#how-to-install-in-windows)
- [Backend](#backend)
- [Frontend](#frontend)
- [Reverse Proxy](#reverse-proxy)
- [Docker Compose](#docker-compose)
- [References](#references)
- [Further Development](#further-development)

## Technologies Used
- Node.js
- Nodemon
- React
- Vite with Typescript + SWC
- Nginx
- Docker

## How to Install in Windows
1. Install WSL2
2. Install Docker Desktop
3. Clone repo
4. Run `docker-compose up`
5. Open [http://localhost:80](http://localhost:80)

## Backend
For backend I have used `Node.js` to create a simple post API that can called with a prompt. This will then call OpenAI API to generate the image.  

The Dockerfile here installs `nodemon` in container, so that changes are automatically reflected without rebuilding the container.

## Frontend
I have created a simple frontend application that call the backend API to generate the image and then shows the image. I have used `React` + `Typescript` with `Vite`.

## Reverse Proxy
I have used `Nginx` to create reverse proxy. Basically it gets the requests and forwards it to the actual server.  
Location `/` is mapped to frontend while `/api` is mapped to backend.  
For backend, I am rewriting the call so that server does not actually receive `/api/dream` but just `/dream`
```nginx
rewrite ^/api/(.*)$ /$1 break;
```

## Docker Compose
This is the interesting part!!!  
I have created 3 services:

### **nodeserver**  
I have created 2 replicas of node server using
```yaml
deploy:
    replicas: 2
```
Now, we can't specify the ports at which the servers will run in localhost, so just specify the container port at which it will run using:
```yaml
ports:
    - '8080'

# Not - '8080:8080'
```
Now if we make some changes locally, `nodemon` should be updating the changes automatically **BUT** we are making changes locally and nodemon is running in container, so we have to mount the local files to container, so that container will use our files and not the copied ones. We can do this using:
```yaml
volumes:
    - ./server:/app
```
But I am on windows machine and docker is using linux based container, so my node_modules cannot be used there, so I created a volume for node_modules that will be used in container using:
```yaml
services:
  nodeserver:
    ...
    volumes:
      - ./server:/app
      - serverNodeModules:/app/node_modules
  ...
volumes:
  serverNodeModules:
```
Now we can use the following command to run nodemon. -L (legacy) is important otherwise it will not work from inside docker container
```bash
nodemon -L index.js
```

### **app**
This is for the frontend. The same comcept used for nodeserver are used here. For frontend only 1 container is used.

Now for vite to work properly we need some extra config in `vite.config.ts` file:
```ts
server: {
    port: 5000,
    host: true,
    watch: {
        usePolling: true
    }
}
```
`port` and `host` are important otherwise vite will not allow to access from outside container.  
`usePolling` is required for hot reload to work from container.

### **nginx**
This is the `Nginx` container with port forwarding of `80:80` as `80` is the default nginx port.

## References
TODO: Add references

## Further Development
### Frontend
- [ ] Adding theme switcher
- [ ] Improve design
- [ ] Showing errors
- [ ] Adding Tests
### Backend
- [ ] Adding jwt based authentication
- [ ] Create seperate container for auth
- [ ] Adding Tests
- [ ] Switch to typescript?
### Docker
- [ ] Pass environment variables to frontend
- [ ] Handle Production build
### Others
- [ ] Deploy somewhere
