import * as admin from 'firebase-admin'
import * as uploadNewProductImage from './upload-new-product-image';
import * as deleteProduct from './delete-products-functions';
//import * as productsRestEndPoint from './product-rest-endpoint';
import * as productsRest from './product-rest';

admin.initializeApp();

module.exports = {
  ...deleteProduct,
  //...productsRestEndPoint,
  ...uploadNewProductImage,
  ...productsRest
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript






