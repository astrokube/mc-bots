# ak-bots

## Install

```sh
# Replace akbots by your image name
$ docker build . -t akbots
```

## Run

To run one bot:

```sh
# Replace akbots by your image name
$ docker run --rm --net=host akbots mcbot \
--user [username] \
--host [minecraft host] \
--port [port] \
--mcversion [version]

$ docker run --rm --net=host akbots mcbot \
--user [username] \
--host [minecraft host] \
--port [port] \
--mcversion [minecraft version] \
--walkloop [walkloop] \
--digloop [digloop]

$ docker run --rm --net=host akbots mcbot \
--user [username] \
--password [password] \
--host [minecraft host] \
--port [port] \
--mcversion [version]
```

To run many bots:

```sh
# Replace akbots by your image name
$ docker run --rm --net=host akbots mcbots \
--host [minecraft host] \
--port [port] \
--mcversion [minecraft version]  \
--bots [number of bots]

$ docker run --rm --net=host akbots mcbots \
--host [minecraft host] \
--port [port] \
--mcversion [minecraft version] \
--bots [number of bots] \
--walkloop [walkloop] \
--digloop [digloop]

$ docker run --rm --net=host akbots mcbots \
--userprefix [userprefix] \
--host [minecraft host] \
--port [port] \
--mcversion [minecraft version] \
--bots [number of bots]
```

## Help

```sh
# Replace akbots by your image name
$ docker run --rm --net=host akbots mcbot --help
```

```sh
# Replace akbots by your image name
$ docker run --rm --net=host akbots mcbots --help
```

