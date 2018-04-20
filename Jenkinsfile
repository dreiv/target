pipeline {
    agent any
    parameters {
        string(name: 'registry', defaultValue: 'deploy.azurecr.io', description: 'Name of the used Docker Registry.')
        string(name: 'app', defaultValue: 'target-app', description: 'Name of the Application Docker Container.')
    }
    stages {
        // stage ('lint') {
        //     steps {
        //         sh 'docker build --target=dependencies -t dependencies .'
        //         sh 'docker run --rm dependencies \
        //                 ng lint'
        //     }
        // }
        // stage ('unit tests') {
        //     steps {
        //         sh 'docker build --target=test -t test .'
        //         sh 'docker run --rm test \
        //                 npm run test:CI'
        //     }
        // }
        // stage('e2e tests') {
        //     steps {
        //         sh 'docker run --rm test \
        //                 npm run e2e:CI'
        //     }
        // }
        stage('build & deploy') {
            environment {
                AZ = credentials('AZ')
                TENANT = credentials('TENANT')
                REG = credentials('REG')
            }
            steps {
                sh 'docker login ${registry} -u ${REG_USR} -p ${REG_PSW} \
                    && docker push ${registry}/${app}'
                sh 'az login --service-principal -u ${AZ_USR} -p ${AZ_PSW} --tenant ${TENANT} \
                    && az container delete --resource-group drei-target --name ${app} --yes || true \
                    && az container create --resource-group drei-target --name ${app} --image ${registry}/${app} \
                    --registry-username ${REG_USR} --registry-password ${REG_PWD} --memory .1 --dns-name-label deploy'
            }    
        }
    }
}