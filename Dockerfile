FROM python:3.4
RUN pip3 install -U setuptools
RUN pip3 install -U pylint
RUN apt-get install -y curl && \
    apt-get -y autoclean && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash && \
    apt-get install -y nodejs && \
    apt-get autoremove -y
WORKDIR /app
ADD . /app
EXPOSE 3000
EXPOSE 5042
ENV NAME JuniorLints
CMD ["npm", "run", "start"]
