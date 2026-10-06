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

        stage('Deploy CloudShop') {
            steps {
                withCredentials([
                    file(
                        credentialsId: 'cloudshop-env',
                        variable: 'ENV_FILE'
                    )
                ]) {
                    sh '''
                        set -e

                        echo "Preparing environment file..."
                        cp "$ENV_FILE" .env

                        echo "Validating Docker Compose configuration..."
                        docker compose -p cloudshop config > /dev/null

                        echo "Deploying CloudShop..."
                        docker compose -p cloudshop up -d --build

                        echo "Checking running containers..."
                        docker compose -p cloudshop ps

                        rm -f .env

                        echo "CloudShop deployment completed."
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: CloudShop CI/CD pipeline completed.'
        }

        failure {
            echo 'FAILED: Check the Jenkins Console Output for the error.'
        }
    }
}
