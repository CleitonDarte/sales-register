import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id?: number,
  code?: string,
  date?: string,
  name: string,
  cost: number,
  price: number,
  quantity: number
}

export interface Basket {
  id?: number,
  code?: string,
  name?: string,
  date?: string,
  products?: Product[]
}

export interface Caixa {
  id?: number,
  code?: string,
  openDate?: string,
  closeDate?: string,
  startingAmount: number,
  finalAmount?: number,
  baskets?: Basket[],
  notes?: string
}

@Injectable({
  providedIn: 'root'
})
export class StorageDatabaseService {

  constructor() { }

  private loadStorage(db: 'stock' | 'open-baskets' | 'caixa') {
    return JSON.parse(localStorage[db] || '{}');
  }

  private saveStorage(db: 'stock' | 'open-baskets' | 'caixa', data: any) {
    localStorage[db] = JSON.stringify({ database: db, ...data });
  }

  /*---------- OPEN BASKETS ----------*/
  public loadOpenBaskets(): any {
    return this.loadStorage('open-baskets');
  }

  public saveOpenBaskets(data: any) {
    this.saveStorage('open-baskets', { data });
  }

  /*---------- CAIXA ----------*/
  public loadCaixa(): any {
    return this.loadStorage('caixa');
  }

  public newCaixa(data: Caixa) {
    data.code = uuidv4();
    data.id = !!this.loadCaixa()?.lastId ? this.loadCaixa().lastId + 1 : 1;
    data.openDate = new Date().toString();
    data.baskets = [];

    let storedData: Caixa[] = this.loadCaixa().data || [];
    storedData.push(data);
    this.saveStorage('caixa', { data: storedData, lastId: data.id });
  }

  public addToCaixa(data: Basket) {
    let storedCaixa: Caixa[] = this.loadCaixa().data || [];
    data.code = uuidv4();
    data.date = new Date().toString();
    storedCaixa[storedCaixa.length - 1].baskets?.push(data);
    this.saveStorage('caixa', { data: storedCaixa, lastId: this.loadCaixa().lastId });
  }

  public closeCaixa(data: Caixa) {
    let storedCaixa: Caixa[] = this.loadCaixa().data || [];
    storedCaixa[storedCaixa.length - 1] = { ...storedCaixa[storedCaixa.length - 1], ...data, closeDate: Date().toString() };
    this.saveStorage('caixa', { data: storedCaixa, lastId: this.loadCaixa().lastId });
  }

  /*---------- STOCK ----------*/
  public loadStock(): any {
    return this.loadStorage('stock');
  }

  public newToStock(data: Product) {
    data.code = uuidv4();
    data.id = !!this.loadStock()?.lastId ? this.loadStock().lastId + 1 : 1;
    data.date = new Date().toString();

    let storedData: Product[] = this.loadStock().data || [];
    storedData.push(data);
    this.saveStorage('stock', { data: storedData, lastId: data.id });
  }

  public editOnStock(data: Product) {
    let storedData: Product[] = this.loadStock().data || [];
    let productIndex: number = storedData.indexOf(storedData.filter((p: Product) => { return p.code == data.code })[0]);
    storedData[productIndex] = { ...storedData[productIndex], ...data };

    this.saveStorage('stock', { data: storedData, lastId: this.loadStock().lastId });
  }

  public deleteOnStock(productCode: string) {
    let storedStock: any = this.loadStock();
    storedStock.data = storedStock.data.filter((p: Product) => { return p.code != productCode });
    this.saveStorage('stock', storedStock);
  }

}