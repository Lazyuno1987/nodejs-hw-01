// const {nanoid} = require("nanoid");
const uuid = require("uuid")
const path = require("path")
 const contactsPath = path.join(__dirname, "./db/contacts.json");
const fs = require("fs").promises;

const updateContacts = async(contact) => {
    await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
}

// TODO: задокументувати кожну функцію
const listContacts = async()=> {
 const data = await fs.readFile(contactsPath, "utf-8")
 
    return JSON.parse(data) 
}

const getContactById= async(id)=> {
    const contacts = await listContacts()
  
    const result = contacts.find(item => item.id === String(id))
    if (!result) {
       return null
   }
  
    return result
}

const removeContact= async(id) =>{
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === `${id}`)
    if (index === -1) {
        return null
    }
    const [result] = contacts.splice(index, 1);
    updateContacts(contacts);
    return result;
}

const addContact = async (name, email, phone)=> {
    const contacts = await listContacts();
    const newContact = {
        id: uuid.v4(),
        name,
        email,
        phone,
    };
    contacts.push(newContact)
     updateContacts(contacts);
     return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}