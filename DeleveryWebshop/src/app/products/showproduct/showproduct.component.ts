import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../shared/entities/product';
import {FileService} from '../../shared/service/file.service';
import {ProductService} from '../../shared/service/product.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {
  products: Observable<Product[]>;
  constructor(private ps: ProductService,
              private fs: FileService) {
  }

  ngOnInit() {
    this.products = this.ps.getProducts()
      .pipe(
        tap(products => {
          products.forEach(product => {
            if (product.pictureId) {
              this.fs.getFileUrl(product.pictureId)
                .subscribe(url => {
                  product.url = url;
                });
            }
          });
        })
      );
  }

  deleteProduct(product: Product) {
    const obs = this.ps.deleteProduct(product.id);
    obs.subscribe(productFromFirebase => {
      window.alert('product with id: ' + productFromFirebase.id + ' is Deleted');
    }, error1 => {
      window.alert('product not found id: ' + product.id);
    });
  }
}
