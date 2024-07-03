import { makeAutoObservable } from "mobx";

class BasketStore {
  constructor() {
    this._basket = [];
    this._basketProduct = {};
    this._basketProducts = [];
    this._allBaskets = [];
    this._allProductsInAllBaskets = [];
    this._basketProductNum = 0;
    makeAutoObservable(this);
  }
  setAllBaskets(array) {
    this._allBaskets = array;
  }
  pushItemToAllBaskets(item) {
    this._allBaskets.push(item);
  }
  get allBaskets() {
    return this._allBaskets;
  }

  setBasketProduct(product) {
    this._basketProduct = product;
  }
  get basketProduct() {
    return this._basketProduct;
  }
  setBasket(basket) {
    this._basket = basket;
  }
  get basket() {
    return this._basket;
  }

  setBasketProducts(productList) {
    this._basketProducts = productList;
  }

  deleteBasketProduct(basketProductId) {
    return this._basketProducts.filter((item) => item.id !== basketProductId);
  }

  get basketProducts() {
    return this._basketProducts;
  }

  setBasketProductNum(num) {
    this._basketProductNum = num;
  }

  get basketProductNum() {
    return this._basketProductNum;
  }

  pushItemToAllProductsInAllBaskets(item) {
    this._allProductsInAllBaskets.push(item);
  }
  get allProductsInAllBaskets() {
    return this._allProductsInAllBaskets;
  }
}

export default BasketStore;
