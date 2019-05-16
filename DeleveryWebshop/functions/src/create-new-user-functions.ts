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
      } else if(request.method === 'POST')
      {
        const data = request.body;

        const user: any =
        {
          id: data.id,
          Username: data.Username,
          Phonenumber: data.Phonenumber,
          Address: data.Address,
          Email: data.Email
        };

        const file = {
          name: data.image.name,
          type: data.image.type,
          size: data.image.size
        };
        try {
          // Add File Meta to Firebase
          const value = await admin.firestore().collection('files')
            .add(file)
            .then();

          const base64EncodedImageString = data.image.base64.replace(/^data:image\/\w+;base64,/, '');
          const imageBuffer = new Buffer(base64EncodedImageString, 'base64');

          await admin.storage().bucket().file('user-images/' + value.id)
            .save(imageBuffer, {
              gzip: true,
              metadata: {
                contentType: file.type
              }
            }).then();
          const usr = await admin.firestore().collection('users')
            .doc(user.id)
            .set(user)
            .then();
          response.json(user);
        }
        catch (e) {
          console.log(e);
        }
      } else {
        console.log('Method: ' + request.method);
        response.send("Not support request, try GET and POST")
      }
    });
  });
