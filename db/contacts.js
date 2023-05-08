const fs = require('fs').promises;
const path = require('node:path');
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname,'contacts.json');
 
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);
      return contacts;
    console.log(contacts);
  } catch (error) {
      console.error(error);
      return [];
  }
    }  

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const updatedContacts = contacts.filter((item) => item.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
        return (`Contact with id ${contactId} has been removed`);
    } catch (error) {
        console.error(error);
    }
}
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const id = nanoid();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return ('New contact has been added');
  } catch (error) {
    console.error(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };