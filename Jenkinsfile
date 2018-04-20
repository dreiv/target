pipeline {
    agent any
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
        stage('build && deploy') {
            environment {
                AZ = credentials('AZ')
                TENANT = credentials('TENANT')
                REG = credentials('REG')
            }
            steps {
                sh 'docker login deploy.azurecr.io -u ${REG_USR} -p ${REG_PWD}'
                sh 'docker push deploy.azurecr.io/target-app'
                sh 'az login --service-principal -u ${AZ_USR} -p ${AZ_PWD} --tenant ${TENANT}'
                sh 'az container delete --resource-group drei-target --name target-app --yes || true'
                sh 'az container create --resource-group drei-target --name target-app --image deploy.azurecr.io/target-app \
                    --memory .1 --registry-username ${REG_USR} --registry-password ${REG_PWD} --dns-name-label deploy'
            }    
        }
    }
}