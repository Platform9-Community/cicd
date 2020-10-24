from jenkins/jenkins:lts
USER root

# Plugins
RUN /usr/local/bin/install-plugins.sh workflow-aggregator && \
    /usr/local/bin/install-plugins.sh github && \
    /usr/local/bin/install-plugins.sh ws-cleanup && \
    /usr/local/bin/install-plugins.sh greenballs && \
    /usr/local/bin/install-plugins.sh simple-theme-plugin && \
    /usr/local/bin/install-plugins.sh kubernetes && \
    /usr/local/bin/install-plugins.sh docker-workflow && \
    /usr/local/bin/install-plugins.sh kubernetes-cli && \
    /usr/local/bin/install-plugins.sh github-branch-source && \
    /usr/local/bin/install-plugins.sh docker-build-publish && \
    /usr/local/bin/install-plugins.sh artifactory && \
    /usr/local/bin/install-plugins.sh github-oauth  && \
    /usr/local/bin/install-plugins.sh matrix-auth

# install Programs
RUN apt-get update && apt-get install -y \
    maven \
    docker \
    gettext \
    sudo \
    curl \
    ruby

RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

# Install Kubectl
RUN  wget https://storage.googleapis.com/kubernetes-release/release/$(curl -s \
https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x ./kubectl && mv ./kubectl /usr/local/bin/kubectl