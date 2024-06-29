import { $axios } from "../http";

class ProductService {
  async getAllTypes() {
    const { data } = await $axios.$host.get("/api/type");
    return data.types;
  }

  async getAllBrands() {
    const { data } = await $axios.$host.get("/api/brand");
    return data.brands;
  }

  async getAllProducts() {
    const { data } = await $axios.$host.get("/api/product");
    return data.products.rows;
  }

  async getAllProductsWithFilters(typeId, brandId) {
    let requestUrl = "/api/product/";
    if (!typeId && !brandId) {
      requestUrl = requestUrl;
    }
    if (!typeId && brandId) {
      requestUrl = requestUrl + `?brandId=${brandId}`;
    }
    if (!brandId && typeId) {
      requestUrl = requestUrl + "?typeId=" + typeId;
    }
    if (typeId && brandId) {
      requestUrl = requestUrl + `?typeId=${typeId}&brandId=${brandId}`;
    }
    const { data } = await $axios.$host.get(requestUrl);
    return data.products.rows;
  }

  async getProductById(id) {
    const { data } = await $axios.$host.get(`/api/product/${id}`);
    return data.product;
  }

  async getTypeById(id) {
    const { data } = await $axios.$host.get(`/api/type/${id}`);
    return data.type;
  }

  async getBrandById(id) {
    const { data } = await $axios.$host.get(`/api/brand/${id}`);
    return data.brand;
  }

  async getProductsByName(title) {
    let requestUrl = "/api/product/name/";
    if (title) {
      requestUrl = requestUrl + title;
    }
    const { data } = await $axios.$host.get(requestUrl);
    console.log(data.products);
    return data.products;
  }
}

export default new ProductService();
