const fs = require("fs").promises;
const path = require("path");
const contactsPath = "./db/contacts.json";
const { nanoid } = require("nanoid");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return contacts;
}

async function getContactById(contactId) {
  const contacts = JSON.parse(await listContacts());
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contacts[contactIndex] === undefined) {
    return null;
  }

  return contacts[contactIndex];
}

async function removeContact(contactId) {
  const contacts = JSON.parse(await listContacts());
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }
  const removedContact = contacts.splice(contactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = JSON.parse(await listContacts());
  const newContact = { name, email, phone, id: nanoid() };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
