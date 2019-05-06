import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Product} from "../../shared/entities/product";
import {ProductService} from "../../shared/service/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  productFormGroup: FormGroup;
  id: string;

  constructor(private router: Router, private prodService: ProductService, private actRouter: ActivatedRoute) {
    this.productFormGroup = new FormGroup( {
      prodName: new FormControl('')
    });
  }

  ngOnInit() {
    this.id =  this.actRouter.snapshot.paramMap.get('id');
    this.prodService.getProductById(this.id)
      .subscribe(prd => {
        this.productFormGroup.patchValue({
          prodName: prd.name
        });
      });
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
