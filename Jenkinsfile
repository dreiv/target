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
            }
            steps {
                sh "az login --service-principal -u ${APP_ID} -p ${APP_PWD} --tenant ${TENANT}"
            }    
        }
    }
}