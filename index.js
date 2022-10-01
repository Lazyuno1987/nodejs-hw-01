
const contacts = require("./contacts")
const argv = require("yargs").argv;

const invokeAction = async({ action, id, name, email, phone }) =>{
  switch (action) {
    case "list":
          const result = await contacts.listContacts();
          console.table(result)
      break;

    case "get":
          const contact = await contacts.getContactById(id);
          console.log(contact)
          if (!contact) {
              throw new Error(`Contact with id ${id} is not found`)
          }
      break;

    case "add":
          const newContact = await contacts.addContact(name, email, phone);
          console.log(newContact)
          
      break;

    case "remove":
          const removeContact = await contacts.removeContact(id)
          console.log(removeContact)
          
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);



