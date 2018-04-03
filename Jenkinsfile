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
                sh 'docker build --target=firefox -t firefox .'
                sh 'docker run --rm firefox \
                        npm test:CI'
            }
        }
        stage('e2e tests') {
            steps {
                parallel(
                    firefox: {
                        sh 'docker run --rm firefox \
                         ng e2e --sourcemaps false --aot '
                    },
                    chrome: {
                        sh 'docker build --target=chrome -t chrome .'
                        sh 'docker run --rm chrome \
                         ng e2e --sourcemaps false --aot '
                    }
                )
            }
        }
        stage('deploy') {
            steps {
                sh 'docker build --target=deploy -t deploy .'
                // sh 'docker rm -f $(docker ps -a -q)'
                // sh 'docker run -d -p 80:80 deploy'
                sh 'docker system prune -f'
            }    
        }
    }
}