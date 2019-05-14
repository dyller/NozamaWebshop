
import {Product} from '../../shared/entities/product';

export class AddProduct {
  static readonly type = '[Product] Add';

  constructor(public payload: Product) {}
}

export class RemoveProduct {
  static readonly type = '[Product] Remove';

  constructor(public payload: string) {}
}
export class UpdateProduct {
  static readonly type = '[Product] Update';

  constructor(public payload: string) {}
}
  export class ReadAllProduct {
  static readonly type = '[Product] ReadAll';

  constructor(public payload: string) {}
}

