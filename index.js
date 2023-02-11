const { Command } = require("commander");
const program = new Command();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      const foundContact = await getContactById(id);
      console.table(foundContact);
      break;

    case "add":
      const newList = await addContact(name, email, phone);
      console.table(newList);
      break;

    case "remove":
      const listWithRemoved = await removeContact(id);
      console.table(listWithRemoved);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
