from jenkins/jenkins:lts-alpine
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
    /usr/local/bin/install-plugins.sh blueocean

# install Programs
RUN apk add --no-cache maven \
    openjdk8 \
    docker \
    gettext

 RUN  apk add --no-cache --update nodejs npm \
      && apk add sudo \
      && apk add curl \
      && apk add ruby \
      && apk add go

# Install Kubectl
RUN  wget https://storage.googleapis.com/kubernetes-release/release/$(curl -s \
https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x ./kubectl && mv ./kubectl /usr/local/bin/kubectl
# Run as root
RUN chown -R root "$JENKINS_HOME" /usr/share/jenkins/ref