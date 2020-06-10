# Jenkins deployment on Platform9 Managed Kubernetes Freedom Plan

Jenkins is a well known, widely adopted Continuous Integration platform in enterprises. 

## Deployment of Jenkins on one of your Platform9 Managed Kubernetes clusters
Here we are going to deploy Jenkins on top of platform9 managed kubernetes freedom tier. The Jenkins docker image provided here has Openjdk8, Maven, Go and NodeJS preinstalled with commonly used plugins. It can be further customized once Jenkins is up and running. Ensure that bare metal cluster has metallb load-balancer pre configured before deploying jenkins. It is also required for exposing the NodeJS that will get deployed with Jenkins pipeline.

## Jenkins configuration
Before deploying Jenkins label one node with a specific key value pair so that Jenkins pod gets scheduled on this node. 

Select the node with enough resources for Jenkins to run on. Label it in the following manner. 

```bash
$ kubectl label nodes <node-name> jenkins=allow
```
Now clone the Kool Kubernetes repository on any machine from where the kubectl can deploy json manifests to your kubernetes cluster.

```bash
$ git clone https://github.com/platform9/KoolKubernetes.git
```
Deploy Jenkins using kubectl
```bash
$ kubectl apply -f KoolKubernetes/cicd/jenkins/ci/jenkins.yaml
```
This creates a persistent volume with node affinity to schedule the jenkins pod on the node with label set to 'jenkins'. It ensures existing plus new configurations in Jenkins home directory are automatically persisted across jenkins pod restart.

At the end of this deployment a service type loadbalancer is created and Jenkins can be accessed via http://Load-Balancer-IP:8080

## Store Dockerhub and GitHub credentials
Storing DockerHub username and password of your DockerHub repository into Jenkins is required by pipeline to upload images to your dockerhub repository. Additionally store your GitHub credentials to pull the KoolKuberenetes repository. To do this in Jenkins UI, on the home page click Credentials -> Jenkins -> Global credentials (unrestricted) -> Add credentials. Fill out the dockerhub username, password and set ID as 'dockerhub'.

![add-cred-dhub](https://github.com/platform9/KoolKubernetes/blob/master/cicd/jenkins/images/add_cred_dhub.png)

Similarly add credential for GitHub account. For github account set the ID as 'GitHub'. Adding github credentials is optional. Once both dockerhub and GitHub credentials are in place they can be seen as below:

![add-cred](https://github.com/platform9/KoolKubernetes/blob/master/cicd/jenkins/images/add_cred.png)


## Bring your DockerHub registry to publish image
Set your dockerhub registry location as environment variable by clicking Jenkins -> Manage Jenkins -> Configure System. Scroll down to Global Properties. Tick 'Environment Variables'. Set the variable as shown in the image below. This allows the pipeline to publish the image to your dockerhub repository using credentials set earlier. For this purpose use a pre-existing dockerhub repository or create a new one on hub.docker.com.

![add-env](https://github.com/platform9/KoolKubernetes/blob/master/cicd/jenkins/images/dhub_loc.png)

## Run Pipeline
Now we are all set to configure pipeline in Jenkins before it can be run. The pipeline is already defined in the repository. it just need to be configured to run with above credentials and image repository. For this click ‘New Item’ on the home page,  provide some name to this pipeline and select ‘Multibranch Pipeline’ from the available list of options. Click OK to move to next page. 

![create](https://github.com/platform9/KoolKubernetes/blob/master/cicd/jenkins/images/create.png)

On this page under 'Branch Source' click Add source. Set 'GitHub' in credentials from drop-down menu. Add the full path of the KooklKubernetes GitHub repository in 'Repository HTTPS URL'. Clicking 'Validate' button will verify access to the repo.

![source](https://github.com/platform9/KoolKubernetes/blob/master/cicd/jenkins/images/source.png)

Further scroll down on the page to 'Build Configuration' and set the script path to 'cicd/jenkins/webapp01/Jenkinsfile'. Finally press Save at the bottom to finish configuring. 

![jenkinsfile](https://github.com/platform9/KoolKubernetes/blob/master/cicd/jenkins/images/jenkinsfile_path.png)

The Pipeline will execute immediately after you click 'Save'.  

![p-start](https://github.com/platform9/KoolKubernetes/blob/master/cicd/jenkins/images/p_start.png)


It will move through stages namely checkout SCM, build, publish and deploy. Once the build stage is successful, the publish stage will create a docker image of the NodeJS application and push it to your Dockerhub repository. Finally the deploy stage will use the kubernetes plugin to pull the newly created image from your dockerhub repository and deploy it on the node with label 'jenkins'.

![p-end](https://github.com/platform9/KoolKubernetes/blob/master/cicd/jenkins/images/p_finish.png)

By now the NodeJS application should be accessible to outside world via the load balancer IP.

```bash
$ kubectl get svc p9-react-app
NAME           TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
p9-react-app   LoadBalancer   10.21.245.88   10.128.231.207   80:31298/TCP   13m
```


![nodejs-app](https://github.com/platform9/KoolKubernetes/blob/master/cicd/jenkins/images/nodejs-app.png)


