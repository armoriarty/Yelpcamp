pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/armoriarty/Yelpcamp', branch: 'master')
      }
    }

    stage('Log Contents') {
      parallel {
        stage('Log Contents') {
          steps {
            sh ' ls -al'
          }
        }

        stage('Install') {
          steps {
            sh 'npm install --omit=optional'
          }
        }

      }
    }

  }
}