import { makeAutoObservable } from "mobx";

class BasketStore {
  constructor() {
    this._basket = [];
    this._basketProducts = [];
    this._basketProductNum = 0;
    makeAutoObservable(this);
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
}

export default BasketStore;
