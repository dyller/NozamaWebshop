import * as admin from 'firebase-admin'
import * as uploadNewProductImage from './upload-new-product-image';
import * as deleteProduct from './delete-products-functions';
import * as productsRest from './product-rest';
import * as restAPI from './main-rest-endpoint';

admin.initializeApp();

module.exports = {
  ...deleteProduct,
  ...uploadNewProductImage,
  ...productsRest,
  ...restAPI
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript






