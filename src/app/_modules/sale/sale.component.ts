import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/_core/global.service';
import { Product, Basket, Caixa, StorageDatabaseService } from 'src/app/_core/storage-database.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  public searchKey: string = '';
  public StockProducts?: Product[];
  public preSelectedProduct?: Product;

  public popUp?: { pop: 'open-caixa' | 'close-caixa' | 'no-stock' | 'finish-sale' | 'finish-sales-first' | 'delete-basket', extraData?: any };
  public loading_: boolean = false;

  public savedCaixas: Caixa[] = [];

  public selectedBasket: number = 1;
  public productBaskets?: any = [];

  private doNameChange: any;

  constructor(
    public location_: Location,
    private storageSvc: StorageDatabaseService,
    private router: Router,
    public global: GlobalService
  ) { }

  ngOnInit(): void {
    !!this.storageSvc.loadStock().data?.length ? this.loadSavedCaixas() : this.popUp = { pop: 'no-stock' };
  }

  public objectToArray(object: any): any[] {
    return Object.values(object);
  }

  public calculateTotal(products: Product[]): number {
    let total: number = 0;
    for (let product of products || []) {
      total = total + (product.price * product.quantity);
    }
    return total;
  }

  /*---------- CAIXA MECHANICS ----------*/
  private loadSavedCaixas() {
    this.savedCaixas = this.storageSvc.loadCaixa().data || [];
    if (!!this.savedCaixas?.length && !!this.savedCaixas[this.savedCaixas.length - 1].openDate && !this.savedCaixas[this.savedCaixas.length - 1].closeDate) {
      this.loadOpenBaskets();
    } else {
      this.popUp = { pop: 'open-caixa', extraData: { finalAmount: this.savedCaixas[this.savedCaixas.length - 1]?.finalAmount } };
    }
  }

  public openNewCaixa(caixa: Caixa) {
    this.loading_ = true;

    caixa.startingAmount = +caixa.startingAmount;

    this.storageSvc.newCaixa(caixa);
    this.closePopUp();
  }

  public openCloseCaixa() {
    let productsInBasket: number = 0;
    for (let basket of this.objectToArray(this.productBaskets)) {
      for (let product of basket.products) { productsInBasket++ }
    }

    if (productsInBasket < 1) {
      let total: number = 0;
      for (let basket of this.savedCaixas[this.savedCaixas.length - 1].baskets || []) { total = total + this.calculateTotal(basket.products || []) }
      this.popUp = { pop: 'close-caixa', extraData: { startingAmount: this.savedCaixas[this.savedCaixas.length - 1].startingAmount, total, notes: this.savedCaixas[this.savedCaixas.length - 1].notes } };
    } else { this.popUp = { pop: 'finish-sales-first' } }
  }

  public finishSaleDay(caixa: any) {
    caixa.finalAmount = +caixa.finalAmount;
    this.storageSvc.saveOpenBaskets(undefined);
    this.storageSvc.closeCaixa(caixa);
    this.router.navigate(['']);
  }

  /*---------- BASKET MECHANICS ----------*/
  private loadOpenBaskets() {
    if (!!Object.keys(this.storageSvc.loadOpenBaskets()?.data || {}).length) {
      this.productBaskets = this.storageSvc.loadOpenBaskets().data;
      this.selectedBasket = +Object.keys(this.productBaskets).reverse()[0];
    } else {
      this.productBaskets = {
        1: {
          id: 1,
          name: 'Lista de Compras 1',
          products: []
        }
      }

      this.selectedBasket = 1;
      this.storageSvc.saveOpenBaskets(this.productBaskets);
    }
  }

  public openNewBasket() {
    let newId = +Object.keys(this.productBaskets).reverse()[0] + 1;

    this.productBaskets[newId] = {
      id: newId,
      name: `Lista de Compras ${newId}`,
      products: []
    }

    this.selectedBasket = newId;
    this.storageSvc.saveOpenBaskets(this.productBaskets);
  }

  public changeBasketName(newName: string) {
    if (newName?.length >= 3) {
      clearTimeout(this.doNameChange);
      this.doNameChange = setTimeout(() => {
        console.debug(this.productBaskets[this.selectedBasket]);
        this.productBaskets[this.selectedBasket].name = newName;

        this.storageSvc.saveOpenBaskets(this.productBaskets);
      }, 1500);
    }
  }

  public deleteBasketSelected() {
    let basketToDeleteIndex: number = this.selectedBasket;
    Object.keys(this.productBaskets).length <= 1 ? this.openNewBasket() : this.selectedBasket = +Object.keys(this.productBaskets)[0];
    delete this.productBaskets[basketToDeleteIndex];
    this.storageSvc.saveOpenBaskets(this.productBaskets);
    this.loadSavedCaixas();

    this.popUp = undefined;
  }

  public finishSale() {
    for (let product of this.productBaskets[this.selectedBasket].products) {
      let productNew: Product = this.storageSvc.loadStock().data.filter((p: Product) => { return p.code == product.code })[0];
      productNew.quantity = productNew.quantity - product.quantity;
      this.storageSvc.editOnStock(productNew);
    }

    this.storageSvc.addToCaixa(this.productBaskets[this.selectedBasket]);

    this.deleteBasketSelected();
  }

  /*---------- PRODUCT MECHANICS ----------*/
  public loadProducts() {
    this.StockProducts = this.storageSvc.loadStock().data || [];
  }

  public hideProducts() {
    setTimeout(() => { this.StockProducts = [] }, 250);
  }

  public setPreSelected(product: Product) {
    this.searchKey = '';
    product.quantity > 0 && (this.preSelectedProduct = product);
    // (document.getElementById('productQuantity') as any).focus();
    setTimeout(() => { document.querySelector<any>('#productQuantity').focus() }, 0);
  }

  public addProductToBasket(values: any) {
    let product: Product = { ...this.preSelectedProduct as Product, quantity: values.quantity };
    this.preSelectedProduct = undefined;
    (document.getElementById('productQuantity') as any).value = '';

    if (this.productBaskets[this.selectedBasket].products.map((p: Product) => { return p.code }).includes(product.code)) {
      let productIndex: number = this.productBaskets[this.selectedBasket].products.indexOf(this.productBaskets[this.selectedBasket].products.filter((p: Product) => { return p.code == product.code })[0]);
      this.productBaskets[this.selectedBasket].products[productIndex].quantity = this.productBaskets[this.selectedBasket].products[productIndex].quantity + product.quantity;
    } else { this.productBaskets[this.selectedBasket].products.push(product) }

    this.storageSvc.saveOpenBaskets(this.productBaskets);
  }

  public quantityCheck(productCode: any): number {
    let quantity: number = 0;
    for (let basket in this.productBaskets) { for (let product of this.productBaskets[basket].products) { product.code == productCode && (quantity = quantity + product.quantity) } }
    return quantity;
  }

  private closePopUp() {
    setTimeout(() => {
      this.loading_ = false;
      this.loadOpenBaskets();
      this.popUp = undefined;
    }, 100);
  }

}
