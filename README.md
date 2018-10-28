# static-http-server
_Bare-bones static, secure HTTP server as a docker container_

## Build
1. Clone the repo

2. Build and install the docker image in the local repo
    ```
    docker build -t static-http-server <PATH_TO_REPO_DIR>
    ```

3. Optionally, the image can be exported into a portable TARball
    ```
    docker save -o static-http-server_latest.tar static-http-server
    ```

**NOTE:** Building the image will automatically generate a private key and self-signed SSL certificate to be used by the secure HTTP server.

## Run
```
docker run -d -p <PORT ON HOST>:443 --name static-http-server static-http-server
```

Logs can be viewed / tailed using `docker logs --tail static-http-server`

## Test
Access the basic `/ping` route using `https://<host>:<port>/ping` for a JSON response.

Also, you can use an SSL client to verify the SSL handshake, certificate, cipher negotiations etc.
```
openssl s_client -connect <HOST_IP>:<HOST_PORT> -tls1_2
```
