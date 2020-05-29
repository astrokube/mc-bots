# ak-bots

## Install

```sh
# Replace akbots by your image name
$ sudo docker build . -t akbots
```

## Run

To run one bot:

```sh
# Replace akbots by your image name
$ sudo docker run akbots mcbot \
--user [username] \
--host [minecraft host] \
--port [port] \
--mcversion [version]

$ sudo docker run akbots mcbot \
--user [username] \
--host [minecraft host] \
--port [port] \
--mcversion [minecraft version] \
--walkloop [walkloop] \
--digloop [digloop]

$ sudo docker run akbots mcbot \
--user [username] \
--password [password] \
--host [minecraft host] \
--port [port] \
--mcversion [version]
```

To run many bots:

```sh
# Replace akbots by your image name
$ sudo docker run akbots mcbots \
--host [minecraft host] \
--port [port] \
--mcversion [minecraft version]  \
--bots [number of bots]

$ sudo docker run akbots mcbots \
--host [minecraft host] \
--port [port] \
--mcversion [minecraft version] \
--bots [number of bots] \
--walkloop [walkloop] \
--digloop [digloop]

$ sudo docker run akbots mcbots \
--userprefix [userprefix] \
--host [minecraft host] \
--port [port] \
--mcversion [minecraft version] \
--bots [number of bots]
```

## Help

```sh
$ sudo docker run akbots mcbot --help
```

```sh
$ sudo docker run akbots mcbots --help
```

