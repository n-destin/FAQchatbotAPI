FROM node 
COPY . app
WORKDIR app
RUN pip install requirements.txt