import Agenda from "agenda";
import readProductsFile from "./readProductFile";
const agenda = new Agenda({
  db: {
    address: process.env.localDb,
    collection: "agendaJobs",
  },
});

(async () => {
  await agenda.start();
  readProductsFile(agenda);
  console.log("Agenda scheduler started successfully");
})();

export default agenda;
