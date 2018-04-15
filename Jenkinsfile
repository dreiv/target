pipeline {
    agent any
    stages {
        stage ('lint') {
            steps {
                sh 'docker build --target=dependencies -t dependencies .'
                sh 'docker run --rm dependencies \
                        ng lint'
            }
        }
        stage ('unit tests') {
            steps {
                sh 'docker build --target=test -t test .'
                sh 'docker run --rm test \
                        npm run test:CI'
            }
        }
        stage('e2e tests') {
            steps {
                sh 'docker run --rm test \
                        npm run e2e:CI'
            }
        }
        stage('build && deploy') {
            withCredentials([
            usernamePassword(credentialsId: 'acr', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME'), 
            string(credentialsId: 'APP_ID', variable: 'DEV_APP_ID'), 
            string(credentialsId: 'PWD', variable: 'DEV_PASS'),
            string(credentialsId: 'TENANT', variable: 'DEV_TENANT'), 
            string(credentialsId: 'SUBSCRIPTION_ID', variable: 'DEV_SUBID')]) {
                sh 'docker build --target=deploy -t deploy.azurecr.io/target-app .'
                sh 'docker push deploy.azurecr.io/target-app'
                sh 'az login --service-principal -u ${DEV_APPID} -p ${DEV_PASS} --tenant ${DEV_TENANT}'
                sh 'az account set --subscription ${DEV_SUBID}'
                // sh 'az container delete --resource-group drei-target --name target-app --yes || true'
                // sh 'az container create --resource-group drei-target --name target-app --image deploy.azurecr.io/target-app:latest \
                //     --memory .1 --registry-username ${USERNAME} --registry-password ${PASSWORD} --dns-name-label deploy'


                // sh 'docker rm -f deploy || true'
                // sh 'docker run --name deploy -d -p 80:80 deploy'
                sh 'docker system prune -f'
            }
        }
    }
}