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