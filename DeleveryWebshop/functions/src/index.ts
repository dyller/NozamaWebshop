import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

admin.initializeApp()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

exports.deleteProduct = functions.firestore
  .document('products/{productID}')
  .onDelete((snap, context) => {
    return new Promise((resolve, reject) => {


    // Get an object representing the document prior to deletion
    // e.g. {'name': 'Marie', 'age': 66}
    const deletedProduct = snap.data();
    if(deletedProduct) {
      admin.firestore().collection('files')
        .doc(deletedProduct.pictureId)
        .delete()
        .then(value => {
          admin.storage()
            .bucket()
            .file('product-pictures/' + deletedProduct.pictureId)
            .delete()
            .then(res => resolve(res), err => reject(err))
            .catch(err => reject(err))
        }, err => reject(err))
        .catch(err => reject(err));
      // perform desired operations ...
    }
    else {
      reject('No product deleted');
    }
    });
  });

exports.uploadNewProductImage =
  functions.storage.object().onFinalize((object) => {

    // save meta data in firestore
      // Event back DONE
    return new Promise((resolve, reject) => {
      if (object && object.name && object.metadata) {
        const fileMeta = {
          lastModified: object.updated,
          name: object.metadata.originalName,
          type: 'image/png',
          size: object.size
        }
        const nameForDoc = object.name.split('/')[1];
        admin.firestore().collection('files')
          .doc(nameForDoc)
          .set(fileMeta)
          .then(value => resolve(value))
          .catch(err => reject(err))
        // Firestore and save metadata
      }
      else {
        reject('Error happened, not enough metadata or file data');
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
