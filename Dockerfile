# Use an official Python runtime as a parent image
FROM node:carbon
FROM python:alpine
COPY get-pip.py .
CMD "python3 get-pip.py"
CMD "pip install pylint"

WORKDIR /app

ADD . /app

EXPOSE 3000

ENV NAME JuniorLints

CMD ["npm", "run", "start"]
