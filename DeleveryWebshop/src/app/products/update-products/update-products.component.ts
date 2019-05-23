import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../shared/entities/product';
import {ProductService} from '../../shared/service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FileService} from '../../shared/service/file.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngxs/store';
import {UpdateProduct} from '../statemagnement/product.actions';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  productFormGroup: FormGroup;
  id: string;
  products: Product;

  constructor(private router: Router,
              private prodService: ProductService,
              private actRouter: ActivatedRoute,
              private fs: FileService,
              private store: Store) {
    this.productFormGroup = new FormGroup( {
      name: new FormControl('')
    });
  }

  ngOnInit() {
    this.id =  this.actRouter.snapshot.paramMap.get('id');
    this.prodService.getProductById(this.id)
      .subscribe(prd => {
        console.log(prd);
        if (prd.pictureId) {
          this.fs.getFileUrl(prd.pictureId)
            .subscribe(url => {
              prd.url = url;
              this.products = prd;
              console.log(this.products.url);
            });
        }
        this.productFormGroup.patchValue({
          name: prd.name
        });
      });
  }

  updateProduct() {
   const prodData = this.productFormGroup.value;
    this.products.name = prodData.name;
    console.log('What is the prod name inside updateProduct.com: ' + this.products.name);
    this.store.dispatch(new UpdateProduct(this.products));
  }
}
