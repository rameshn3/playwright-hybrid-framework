pipeline {

    agent any

    tools {
        nodejs 'NodeJs22'
    }

    options {
        timestamps()
        ansiColor('xterm')
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(
                numToKeepStr: '20',
                artifactNumToKeepStr: '10'
        ))
    }

    parameters {
        choice(
            name: 'MODULE',
            choices: ['ui', 'api', 'heroku', 'all'],
            description: 'Select module to execute'
        )
    }

    environment {
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "0"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo "Cleaning Jenkins Workspace..."
                cleanWs(deleteDirs: true)
            }
        }

        stage('Checkout Source') {

            options {
                timeout(time: 5, unit: 'MINUTES')
            }

            steps {

                checkout([
                    $class: 'GitSCM',

                    branches: [[name: '*/main']],

                    extensions: [
                        [$class: 'CloneOption',
                            depth: 1,
                            noTags: true,
                            shallow: true]
                    ],

                    userRemoteConfigs: [[
                        url: 'https://github.com/rameshn3/playwright-hybrid-framework.git'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {

            options {
                timeout(time: 10, unit: 'MINUTES')
            }

            steps {

                bat '''
                echo Installing Dependencies...
                npm ci
                '''
            }
        }

        stage('Install Playwright Browsers') {

            options {
                timeout(time: 10, unit: 'MINUTES')
            }

            steps {

                bat '''
                echo Installing Playwright Browsers...
                npx playwright install
                '''
            }
        }

        stage('Clean Reports') {

            options {
                timeout(time: 2, unit: 'MINUTES')
            }

            steps {

                bat '''
                @echo off

                if exist allure-results (
                    echo Deleting allure-results...
                    attrib -R -S -H /S /D allure-results\\* >nul 2>&1
                    rmdir /S /Q allure-results
                ) else (
                    echo allure-results not found.
                )

                if exist allure-report (
                    echo Deleting allure-report...
                    attrib -R -S -H /S /D allure-report\\* >nul 2>&1
                    rmdir /S /Q allure-report
                ) else (
                    echo allure-report not found.
                )

                if exist playwright-report (
                    echo Deleting playwright-report...
                    attrib -R -S -H /S /D playwright-report\\* >nul 2>&1
                    rmdir /S /Q playwright-report
                ) else (
                    echo playwright-report not found.
                )
                '''
            }
        }

        stage('Run Tests') {

            options {
                timeout(time: 20, unit: 'MINUTES')
            }

            steps {

                script {

                    switch(params.MODULE) {

                        case "ui":
                            bat 'npm run test:ui'
                            break

                        case "api":
                            bat 'npm run test:api'
                            break

                        case "heroku":
                            bat 'npm run test:heroku'
                            break

                        default:
                            bat 'npm run test:all'
                    }

                }
            }
        }

        stage('Generate Allure Report') {

            options {
                timeout(time: 5, unit: 'MINUTES')
            }

            steps {

                bat 'npm run allure:generate'

            }
        }

    }

    post {

        always {

            script {

                if (fileExists('playwright-report/index.html')) {

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright HTML Report'
                    ])

                    archiveArtifacts artifacts: 'playwright-report/**/*',
                                     allowEmptyArchive: true

                }
                else {

                    echo "Playwright report not found."

                }

                if (fileExists('allure-results')) {

                    allure(
                        includeProperties: false,
                        results: [[path: 'allure-results']]
                    )

                }
                else {

                    echo "Allure Results not found."

                }

                if (fileExists('allure-report/index.html')) {

                    archiveArtifacts artifacts: 'allure-report/**/*',
                                     allowEmptyArchive: true

                }
                else {

                    echo "Allure Report not found."

                }

            }

        }

        success {
            echo "Build Completed Successfully."
        }

        failure {
            echo "Build Failed."
        }

        cleanup {
            echo "Pipeline Finished."
        }

    }

}