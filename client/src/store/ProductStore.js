import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._products = [];
    this._product = {};
    this._selectedType = {};
    this._selectedBrand = {};
    this._searchProductName = "";
    this._addedSuccessfully = false;
    this._modalMessage = "";
    makeAutoObservable(this);
  }

  setTypes(array) {
    this._types = [...array];
  }

  setBrands(array) {
    this._brands = array;
  }

  setProducts(array) {
    this._products = array;
  }
  setSelectedType(type) {
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }
  setProduct(product) {
    this._product = product;
  }
  setSearchProductName(title) {
    this._searchProductName = title;
  }
  setAddedSuccessfully(bool) {
    this._addedSuccessfully = bool;
  }
  setModalMessage(str) {
    this._modalMessage = str;
  }
  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get products() {
    return this._products;
  }

  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }

  get product() {
    return this._product;
  }
  get searchProductName() {
    return this._searchProductName;
  }
  get modalMessage() {
    return this._modalMessage;
  }

  getBrandById(id) {
    let resultedBrand = {};
    this._brands.forEach((brand) => {
      if (brand.id === id) {
        resultedBrand = brand;
      }
    });
    return resultedBrand;
  }

  getTypeById(id) {
    let type = {};
    this._types.forEach((t) => {
      if (t.id === id) {
        type = t;
      }
    });
    return type;
  }
  get addedSuccessfully() {
    return this._addedSuccessfully;
  }

  // if I won't use it - delete
  addType(type) {
    this._types.push(type);
  }

  addBrand(brand) {
    this._brands.push(brand);
  }

  addProduct(product) {
    this._products.push(product);
  }

  
}
