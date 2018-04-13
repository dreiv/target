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
        stage('deploy') {
            steps {
                // sh 'docker build --target=deploy -t deploy .'
                // sh 'docker rm -f deploy || true'
                // sh 'docker run --name deploy -d -p 80:80 deploy'
                // sh 'docker system prune -f'
                sh 'az --version'
            }    
        }
    }
}