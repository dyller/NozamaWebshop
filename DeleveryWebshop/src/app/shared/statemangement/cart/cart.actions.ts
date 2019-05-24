import {Product} from "../../entities/product";

export class AddToCart
{
  static readonly type = '[Cart] Add';

  constructor(public product: AddToCart) {}
}

export class DeleteCart {
  static readonly type = '[Cart] DeleteCart';

  constructor() {}
}
