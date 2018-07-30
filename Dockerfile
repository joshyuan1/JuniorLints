# Install python 3+
# clone pylint, and astroid repos
# `python setup.py install` in pylint (and astroid?) repos

# Use an official Python runtime as a parent image
FROM node:carbon

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
#RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NAME NickJuniorLints

# Run app.py when the container launches

CMD ["npm", "run", "start"]
