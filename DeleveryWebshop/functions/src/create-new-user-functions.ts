import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as corsModule from 'cors';

const cors = corsModule(
  {origin: true});

exports.products = functions.https.onRequest(
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
        const user: any = {username: data.username,
                           phonenumber: data.phonenumber,
                           address: data.address};
          const usr = await admin.firestore().collection('products')
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
