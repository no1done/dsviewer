# DS Viewer
Simple datastore emulator viewer to attach to docker

Note that my initial need for this was after using the datastore emulator docker container `singularities/datastore-emulator` which can be seen on dockerhub here: https://hub.docker.com/r/singularities/datastore-emulator/

Sample of attaching the viewer to your docker-compose.yml:

```yaml
version: "3.3"
services:
  datastore:
    image: singularities/datastore-emulator
    environment:
      - DATASTORE_PROJECT_ID=datastore-dev
      - DATASTORE_LISTEN_ADDRESS=0.0.0.0:8081
    ports: ["8081"]
    volumes:
      - ./data:/opt/app
  dsviewer:
    image: ryansd1/dsviewer:latest
    ports:
      - "3001:80"
    environment:
      - DATASTORE_PROJECT_ID=datastore-dev
      - DATASTORE_LISTEN_ADDRESS=datastore:8081
    links:
      - datastore
```

Simply navigate to `http://localhost:3001` to see the emulator output.

# Updates

When I get some free time I'll be adding basic CRUD functionality for the entities, following a similar theme as Google's Datastore dashboard.

PRs are welcome.

Dockerhub: https://hub.docker.com/r/ryanplugged/dsviewer/
