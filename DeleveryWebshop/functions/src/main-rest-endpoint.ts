import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as productsRouter from "./product-rest-endpoint";
import * as usersRouter from "./users-rest-endpoint";
import * as orderRouter from "./order-rest-endpoint";

const main = express();
const mainRoute = '/api/v1';

main.use(mainRoute + '/users', usersRouter);
main.use(mainRoute + '/orders', orderRouter);
main.use(mainRoute + '/products', productsRouter);

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

exports.restApi = functions.https.onRequest(main);
