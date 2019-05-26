
import {Product} from '../../shared/entities/product';
import {ImageMetadata} from '../../shared/entities/image-metadata';

export class AddProduct
{
  static readonly type = '[products] Add';

  constructor(public payload: Product, public payload2: ImageMetadata) {}
}

export class RemoveProduct {
  static readonly type = '[products] Remove';

  constructor(public payload: string) {}
}
export class UpdateProduct {
  static readonly type = '[products] Update';

  constructor(public payload: Product) {}
}

  export class ReadAllProduct {
  static readonly type = '[products] ReadAll';

  constructor(public action: Product[]) {}
}


