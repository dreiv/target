pipeline {
    agent any
    parameters {
        string(name: 'registry', defaultValue: 'deploy.azurecr.io', description: 'Name of the used Docker Registry.')
        string(name: 'app', defaultValue: '${app}', description: 'Name of the Application Docker Container.')
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
                sh 'az login --service-principal -u ${AZ_USR} -p ${AZ_PWD} --tenant ${TENANT} \
                    && az container delete --name ${app} --yes || true \
                    && az container create --name ${app} --image ${registry}/${app} \
                    --memory .1 --registry-username ${REG_USR} --registry-password ${REG_PSW} --dns-name-label deploy'
            }    
        }
    }
}