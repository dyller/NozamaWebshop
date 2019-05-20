import * as corsModule from "cors";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const cors = corsModule(
  {origin: true});

exports.orders = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      if(request.method === 'GET') {
        admin.firestore().collection('orders')
          .get()
          .then(orders => {
            const listOfOrders: any = [];
            orders.forEach(order => {
              const ord = order.data();
              console.log(ord);
              ord.id = order.id;
              admin.firestore().collection('users').doc(ord.userId)
                  .get().then(user => {
                    const use = user.data();
                    if(use) {
                    console.log(use.Address);
                     }
              }).catch(err => {console.log(err)})

              listOfOrders.push(ord);
            });
           // response.json(listOfOrders);
          })
          .catch(err => {console.log(err)})
      }  else {
        console.log('Method: ' + request.method);
        response.send("Not support request, try GET and POST")
      }
    });
  });


