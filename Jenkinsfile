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
                APP_ID = credentials('APP_ID')
                APP_PWD = credentials('PWD')
                TENANT = credentials('TENANT')
                REG_USR = credentials('REG_USR')
                REG_PWD = credentials('REG_PWD')
            }
            steps {
                sh 'docker push deploy.azurecr.io/target-app'
                sh 'az login --service-principal -u ${APP_ID} -p ${APP_PWD} --tenant ${TENANT}'
                sh 'az container delete --resource-group drei-target --name target-app --yes || true'
                sh 'az container create --resource-group drei-target --name target-app --image deploy.azurecr.io/target-app \
                    --memory .1 --registry-username ${REG_USR} --registry-password ${REG_PWD} --dns-name-label deploy'
            }    
        }
    }
}