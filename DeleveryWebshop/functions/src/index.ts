import * as admin from 'firebase-admin';
import * as deleteProducts from './delete-products-functions';
import * as productRest from './product-rest';
import * as restApi from './main-rest-endpoint';
import * as uploadNewProductImage from './upload-new-product-image';
import * as createNewUser from './create-new-user-functions';

import * as order from './orders-rest';
admin.initializeApp();

module.exports = {
  ...deleteProducts,
  ...productRest,
  ...restApi,
  ...uploadNewProductImage,
  ...createNewUser,
  ...order
}
