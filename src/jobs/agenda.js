require("dotenv").config();
const Agenda = require("agenda");

const agenda = new Agenda({
  db: {
    address: process.env.localDb,
    collection: "agendaJobs",
  },
});

const readProductsFile = require("./readProductFile");

(async () => {
  await agenda.start();
  readProductsFile(agenda);
  console.log("Agenda scheduler started successfully");
})();

module.exports = agenda;
