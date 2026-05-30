pipeline {


agent any

tools {
    nodejs 'NodeJs22'
}

parameters {
    choice(
        name: 'MODULE',
        choices: ['ui', 'api', 'heroku', 'all'],
        description: 'Select the module to build'
    )
}

stages {

    stage('Checkout') {
        steps {
            echo 'Checking out code...'
            git branch: 'main',
                url: 'https://github.com/rameshn3/playwright-hybrid-framework.git'
        }
    }

    stage('Install Dependencies') {
        steps {
            echo 'Installing dependencies...'
            bat 'npm install'
        }
    }

    stage('Install Playwright Browsers') {
        steps {
            echo 'Installing browsers...'
            bat 'npx playwright install'
        }
    }

    stage('Clean Old Reports') {
        steps {
            bat 'if exist allure-results rmdir /s /q allure-results'
            bat 'if exist allure-report rmdir /s /q allure-report'
        }
    }

    stage('Run Tests') {
        steps {
            script {

                if (params.MODULE == 'ui') {
                    bat 'npm run test:ui'
                }

                else if (params.MODULE == 'api') {
                    bat 'npm run test:api'
                }

                else if (params.MODULE == 'heroku') {
                    bat 'npm run test:heroku'
                }

                else if (params.MODULE == 'all') {
                    bat 'npm run test:all'
                }
            }
        }
    }

    stage('Generate Allure Report') {
        steps {
            bat 'npm run allure:generate'
        }
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
            includeProperties: false,
            jdk: '',
            results: [[path: 'allure-results']]
        )

        archiveArtifacts artifacts: 'playwright-report/**/*',
                         allowEmptyArchive: true

        archiveArtifacts artifacts: 'allure-report/**/*',
                         allowEmptyArchive: true
    }
}

}
