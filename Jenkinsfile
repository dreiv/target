pipeline {
    agent any
    stages {
        stage ('lint') {
            steps {
                sh 'docker build \
                        --target=dependencies \
                        -t dependencies .'
                sh 'docker run \
                        --rm \
                        dependencies \
                        ng lint'
            }
        }
        stage ('unit tests') {
            steps {
                sh 'docker build \
                        --target=test \
                        -t test .'
                sh 'docker run \
                        --rm \
                        test \
                        ng test --browser=ChromeHeadlessCI --single-run --sourcemaps false --log-level WARN'
            }
        }
        stage('e2e tests') {
            steps {
                sh 'docker run \
                        --rm \
                         test \
                         ng e2e --sourcemaps false --aot '
            }
        }
        stage('deploy') {
            steps {
                sh 'docker build --target=deploy -t deploy .'
                sh 'docker rm -f $(docker ps -a -q)'
                sh 'docker run -d -p 80:80 deploy'
                sh 'docker system prune -f'
            }    
        }
    }
}