
VERSION = $(shell cat VERSION.txt )
CWD = $(shell pwd)

build:	## builds the docker file
	docker build -t dev-node:$(VERSION) .

bash:	## run the container that has terraform
	echo $(CWD)
	docker run -it --volume $(CWD):/opt/git dev-node:$(VERSION)  /bin/bash

help:	## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'
