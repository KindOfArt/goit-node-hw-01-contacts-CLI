const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.normalize("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch ({ message }) {
    return message;
  }
}

async function getContactById(contactId) {
  try {
    if (!contactId) return;

    const list = await listContacts();

    return list.find(({ id }) => id === contactId.toString());
  } catch ({ message }) {
    return message;
  }
}

async function removeContact(contactId) {
  try {
    if (!contactId) return;

    const list = await listContacts();

    const filteredList = list.filter(({ id }) => id !== contactId.toString());

    await fs.writeFile(contactsPath, JSON.stringify(filteredList));

    return filteredList;
  } catch ({ message }) {
    return message;
  }
}

async function addContact(name, email, phone) {
  if (!name || !email || !phone) return;

  const list = await listContacts();

  console.table(list);

  let id;

  while (true) {
    id = Math.round(Math.random() * 100).toString();
    if (!(await getContactById(id))) break;
  }

  const newList = [...list, { id, name, email, phone }];

  await fs.writeFile(contactsPath, JSON.stringify(newList));

  return newList;
}

const contacts = {};

module.exports = { listContacts, addContact, getContactById, removeContact };
