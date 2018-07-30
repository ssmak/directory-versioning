FROM ubuntu
RUN apt-get update
RUN apt-get install git nodejs npm -y
RUN git config --global http.sslVerify false
RUN git clone https://github.com/ssmak/directory-versioning.git /usr/local/directory-versioning.git
RUN git config --global user.email "bot@robots.com"
RUN git config --global user.name "Bot"
WORKDIR /usr/local/directory-versioning.git
RUN npm install
