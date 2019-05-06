import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Product} from "../../shared/entities/product";
import {ProductService} from "../../shared/service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from 'rxjs/operators';
import {FileService} from '../../shared/service/file.service';
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  productFormGroup: FormGroup;
  id: string;
  products: Observable<Product>;

  constructor(private router: Router, private prodService: ProductService, private actRouter: ActivatedRoute,
              private fs: FileService, private db: AngularFirestore) {
    this.productFormGroup = new FormGroup( {
      name: new FormControl('')
    });
  }

  ngOnInit() {
    this.id =  this.actRouter.snapshot.paramMap.get('id');
    this.prodService.getProductById(this.id)
      .subscribe(prd => {
        this.productFormGroup.patchValue({
          name: prd.name
        });
      });

    this.products = this.prodService.getProductById(this.id)
      .pipe(
        tap(products => {
          if (products.pictureId) {
            this.fs.getFileUrl(products.pictureId)
              .subscribe(url => {
                products.url = url;
              });
          }
        }));

  }

  updateProduct()
  {
    const prodData = this.productFormGroup.value;
    prodData.id = this.id;
    this.prodService.updateProduct(
      prodData
    );

    // Ones we are done we want to navigate to this location
    this.router.navigateByUrl('/');
  }
}
