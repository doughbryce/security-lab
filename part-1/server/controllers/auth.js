/*
const bcrypt = require('bcryptjs')
const chats = []

module.exports = {
    createMessage: (req, res) => {
      // console.log(req.body)
        const { pin, message } = req.body
        for (let i = 0; i < chats.length; i++) {
          const existing = bcrypt.compareSync(pin, chats[i].pinHash)
          if (existing) {
            chats[i].messages.push(message)
            let messagesToReturn = {...chats[i]}
            delete messagesToReturn.pinHash
            res.status(200).send(messagesToReturn)
            return
          }
        }

        const salt = bcrypt.genSaltSync(5)
        const pinHash = bcrypt.hashSync(pin, salt)

        let msgObj = {
          pinHash,
          messages: [message]
        }
        chats.push(msgObj)
        let messagesToReturn = {...msgObj}
        delete messagesToReturn.pinHash
        console.log(chats)
        res.status(200).send(messagesToReturn)
    }
}
*/


const bcrypt = require(`bcryptjs`);
const users = [];

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body
      // console.log(hash)
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          if (bcrypt.compareSync(password, users[i].password)) {
            delete req.body.password
            console.log(req.body)
            res.status(200).send(req.body);
            return
          }
        } 
        // const existing = bcrpyt.compareSync()
        // if (users[i].username === username && users[i].password === password) {
        //   res.status(200).send(users[i])
        // }
      }
      res.status(400).send("User not found.");
    },
    register: (req, res) => {
        let { password } = req.body;

        const salt = bcrypt.genSaltSync(10); 
        // console.log(salt);
        const hash = bcrypt.hashSync(password, salt);
        // console.log(hash);

        delete req.body.password;
        const user = req.body;
        user[`password`] = hash; 
        // console.log(user)


        console.log('Registering User')
        // console.log(req.body)
        users.push(user)
        // console.log(users)
        res.status(200).send(users)
    }
}