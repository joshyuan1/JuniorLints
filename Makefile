build:
	docker build . -t local-registry/juniorlints

run:
	docker run -it --rm  -p 3000:3000 local-registry/juniorlints:latest
