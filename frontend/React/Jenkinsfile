pipeline {

    agent any
    
    tools {
        nodejs 'node-18'
        dockerTool 'docker'
    }


    stages {
        stage('Clear current directory') {
            steps {
                sh'''
                    rm -rf *
                '''
            }
        }

        stage('Pull from GitLab') {
            steps {
                git url: 'https://lab.ssafy.com/s09-bigdata-recom-sub2/S09P22A403.git',
                    branch: 'fe/develop',
                    credentialsId: 'a432e361-21de-400a-a3c2-8f8860f53b7f'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend/React') {
                    sh'''
                        npm install
                        npm run build
                    '''
                }
            }
        }

        stage('Delete existing Docker images and containers') {
            steps {
                sh'''
                    if docker container inspect fns_client >/dev/null 2>&1; then
                        echo "container exists locally"
                        docker stop fns_client
                        docker rm fns_client
                    else
                        echo "container does not exist locally"
                    fi
                    if docker image inspect client >/dev/null 2>&1; then
                        echo "Image exists locally"
                        docker rmi client 
                    else
                        echo "Image does not exist locally"
                    fi
                '''
            }
        }

        stage('Build and Deploy Docker') {
            steps {
                dir('frontend/React') {
                    sh'''
                        echo [FE] Build Docker Image!
                        docker build -t client .
                        echo [FE] Run Docker Container!
                        docker run -dp 3000:3000 --name fns_client client
                    '''
                }
            }
        }
    }

    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                def GIT_COMMIT_MSG = sh(script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
                mattermostSend(color: 'good', message: "✅ 빌드 & 배포 성공: ${env.JOB_NAME} (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)\n브랜치: fe/develop\n커밋 메시지: ${GIT_COMMIT_MSG} by ${Author_ID}(${Author_Name})\n")
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                def GIT_COMMIT_MSG = sh(script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
                mattermostSend(color: 'danger', message: "❌ 빌드 & 배포 실패: ${env.JOB_NAME} (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>)\n브랜치: fe/develop\n커밋 메시지: ${GIT_COMMIT_MSG} by ${Author_ID}(${Author_Name})\n")
            }
        }
    }
}