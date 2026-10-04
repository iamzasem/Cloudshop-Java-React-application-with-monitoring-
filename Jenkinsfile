
pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm

                sh '''
                    echo "Checking out CloudShop source code..."
                    git status --short --branch
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                    echo "Building Java Spring Boot backend..."
                    docker build \
                        -t cloudshop-backend:${BUILD_NUMBER} \
                        ./backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                    echo "Building React frontend..."
                    docker build \
                        -t cloudshop-frontend:${BUILD_NUMBER} \
                        ./frontend
                '''
            }
        }

        stage('Verify Images') {
            steps {
                sh '''
                    echo "Verifying generated Docker images..."
                    docker image inspect cloudshop-backend:${BUILD_NUMBER}
                    docker image inspect cloudshop-frontend:${BUILD_NUMBER}
                    echo "Both Docker images were built successfully."
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: CloudShop CI image build completed.'
        }

        failure {
            echo 'FAILED: Check the Jenkins Console Output for the error.'
        }
    }
}
