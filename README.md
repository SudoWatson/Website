# Portfolio Website

Hosted at [austinlennert.dev](https://austinlennert.dev)

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Skills Used](#skills-used)
- [Features](#features)
- [Development Information](#development)

## Overview

This website was developed to be my portfolio through my Software Development career. It shows off a few of my favorite personal projects I've worked on, several skills I have, and a way to contact me. Each project section contains a small description, a link to its GitHub repository, and a link to the site if applicable. This project is by far the largest and most complete one I've worked on, and it has been an amazing project to work on and one I will continue to flesh out as time goes on. Additionally, this project has been used to teach myself a load of new-to-me technologies such as Docker, GitHub Actions, React, etc.


## Built With

React for the front end, Express for the back end. All contained inside a Docker container. Programmed in TypeScript. GitHub actions automatically builds and pushes a Docker image upon updating the website.


## Skills Used

TypeScript, React, Express, Node.js, GitHub Actions, Docker, Docker-Compose, Servers


## Features

- Built entirely from scratch
- React front-end
- Express back-end
- List of projects with links to code and demos (if available)
- List of skills
- Contact form
- Auto-building Docker images upon code update
- Automatically update the published website when a newer image is available


## Development
The site is based on a back-end express typescript server (server) that redirects the main page to a front-end typescript react server (client).

In the root folder there are a few `npm` run commands available for development and running.

```bash
npm run install-packages # Installs all the necessary packages for both the client and server projects 
npm run start-dev # Uses the"concurrently" package to start running both the client and server in development mode, which will start both servers and provide live updates as code changes
npm run build # Builds the client and server projects
npm run start-prod # Starts the server using the built projects

```
