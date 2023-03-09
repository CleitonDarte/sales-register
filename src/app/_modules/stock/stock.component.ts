import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StorageDatabaseService, Product } from 'src/app/_core/storage-database.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  public StockProducts?: Product[];
  public popUp?: { pop: 'new-product' | 'edit-product' | 'delete-product' | 'add-stock', extraData?: any };
  public loading_: boolean = false;

  constructor(
    private storageSvc: StorageDatabaseService,
    public location_: Location
  ) {
    this.loadProducts();
  }

  ngOnInit(): void { }

  private loadProducts() {
    this.StockProducts = this.storageSvc.loadStock().data || [];
  }

  public newProduct(product: Product) {
    this.loading_ = true;
    product.quantity = 0;

    product.cost = +product.cost;
    product.price = +product.price;

    this.storageSvc.newToStock(product);
    this.closePopUp();
  }

  public editProduct(product: Product) {
    this.loading_ = true;

    product.cost = +product.cost;
    product.price = +product.price;
    product.code = this.popUp?.extraData.code;

    this.storageSvc.editOnStock(product);
    this.closePopUp();
  }

  public addToStock(product: Product) {
    this.loading_ = true;

    product.quantity = this.popUp?.extraData.quantity + product.quantity;
    product.code = this.popUp?.extraData.code;

    this.storageSvc.editOnStock(product);
    this.closePopUp();
  }

  public deleteProduct() {
    this.loading_ = true;
    this.storageSvc.deleteOnStock(this.popUp?.extraData.code);
    this.closePopUp();
  }

  private closePopUp() {
    setTimeout(() => {
      this.loading_ = false;
      this.loadProducts();
      this.popUp = undefined;
    }, 100);
  }

}
