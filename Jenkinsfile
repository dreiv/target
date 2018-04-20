pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '9'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps() 
    }
    parameters {
        string(name: 'registry', defaultValue: 'deploy.azurecr.io', description: 'The used Docker Registry.')
        string(name: 'app', defaultValue: 'target-app', description: 'The Application Docker Container.')
        string(name: 'group', defaultValue: 'drei-target', description: 'The used Azure Resource Group.')
    }
    stages {
        stage ('lint') {
            steps {
                sh 'docker build --target=dependencies -t dependencies .'
                sh 'docker run dependencies \
                        ng lint'
            }
        }
        stage ('unit tests') {
            steps {
                sh 'docker build --target=test -t test .'
                sh 'docker run test \
                        npm run test:CI'
            }
        }
        stage('e2e tests') {
            steps {
                sh 'docker run test \
                        npm run e2e:CI'
            }
        }
        stage('build & deploy') {
            environment {
                AZ = credentials('AZ')
                TENANT = credentials('TENANT')
                REG = credentials('REG')
            }
            steps {
                sh 'docker build -q --target=deploy -t ${registry}/${app} .'
                sh 'docker login ${registry} -u ${REG_USR} -p ${REG_PSW} \
                    && docker push ${registry}/${app}'
                sh 'az login --service-principal -u ${AZ_USR} -p ${AZ_PSW} --tenant ${TENANT} \
                    && az container delete --resource-group ${group} --name ${app} --yes || true \
                    && az container create --resource-group ${group} --name ${app} --image ${registry}/${app} \
                        --memory .1 --registry-username ${REG_USR} --registry-password ${REG_PSW} --dns-name-label deploy'
            }    
        }
    }
}