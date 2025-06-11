const { defineConfig } = require("cypress");

const envVariables = {
  LANGUAGE: "idn",
  dev: {
    url: "https://job-portal-user-dev-skx7zw44dq-et.a.run.app",
    en:{
      review: "Review",
      signup: "Sign Up",
      login: "Log In",
      nextbtn: "Next",
      backbtn: "Back",
      finishbtn: "Finish",
      work: "Work",
      org: "Organizational",
      cert: "Certification/Achievement",
    },
    idn: {
      review: "Ulasan",
      signup: "Daftar",
      login: "Masuk",
      nextbtn: "Selanjutnya",
      backbtn: "Kembali",
      finishbtn: "Finish",
      work: "Kerja",
      org: "Organisasi",
      cert: "Sertifikasi/Pencapaian",
    }
  }
}

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
      })
    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 60000,
    env:{
      ...envVariables
    }
  },
  video: true,
});
