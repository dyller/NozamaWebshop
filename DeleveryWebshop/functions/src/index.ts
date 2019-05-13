import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

exports.uploadNewProductImage =
  functions.storage.object().onFinalize((object) => {

    // save meta data in firestore
      // Event back DONE
    return new Promise((resolve, reject) => {
      const filemeta = {
        name: 'd7UTs2odB9pTYifjvXox',
        type: 'image/png',
        size: 402513
      }
      if (object && object.metadata) {
        resolve('Happy days');
        // Firestore and save metadata
      }
      else {
        reject('Error happened');
      }
    });
  });

exports.products = functions.https.onRequest((request, response) => {
  admin.firestore().collection('products')
    .get().then(prods => {
      const listOfProducts: any = [];

      prods.forEach(product => {
        let prod = product.data();
        prod.id = product.id;
        listOfProducts.push(prod);
      })
    response.json(listOfProducts);
  }).catch(err => {console.log(err)})
  // Products as JSON

});
