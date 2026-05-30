pipeline {

    agent any

    tools {
        nodejs 'Node22' // Replace 'NodeJS' with the name of your Node.js installation in Jenkins
    }

    parameters {
        choice(name: 'MODULE', choices: ['ui', 'api', 'heroku','all'], description: 'Select the module to build')
    }

    stages {
        stage('checkout') {
            steps {
                echo 'check out code...'
               git branch: 'main', url: 'https://github.com/rameshn3/playwright-hybrid-framework.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Install dependencis...'
                bat 'npm install'
                // Add your test commands here
            }
        }
        stage('install browsers') {
            steps {
                echo 'install browsers...'
                bat 'npx playwright install'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                script {
                    if (params.MODULE == 'ui') {
                        bat 'npm run test:ui'
                    } else if (params.MODULE == 'api') {
                        bat 'npm run test:api'
                    } else if (params.MODULE == 'heroku') {
                        bat 'npm run test:heroku'
                    } else if (params.MODULE == 'all') {
                        bat 'npm run test:all'
                    }
                }
            }
        }
        stage('Generate Allure Report and Publish') {
            steps {
                echo 'Generate Allure Report...'
                bat 'npm run allure:generate'
               
                
            }
        }
        post {
            always {
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
                allure(
                     echo 'Publishing Allure Report...'
                    includeProperties: false, jdk: '', results: [[path: 'allure-results']])
            
            }
        }
    }


}