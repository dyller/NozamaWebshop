import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as corsModule from 'cors';

const cors = corsModule(
  {origin: true});

exports.users = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async() => {
      if (request.method === 'GET') {
        admin.firestore().collection('users')
          .get()
          .then(users => {
            const listOfUsers: any = [];
            users.forEach(user => {
              const usr = user.data();
              usr.id = user.id;
              listOfUsers.push(usr);
            })
            response.json(listOfUsers);
          })
          .catch(err => {console.log(err)})
      } else if(request.method === 'POST') {
        const data = request.body;
        const user: any = {Username: data.Username,
                           //Phonenumber: data.Phonenumber,
                           Address: data.Address,
                           Email: data.Email};
          const usr = await admin.firestore().collection('users')
            .add(user)
            .then();
          user.id = usr.id;
          response.json(user);
      } else {
        console.log('Method: ' + request.method);
        response.send("Not support request, try GET and POST")
      }
    });
  });
