import { $axios } from "../http/index";

class BasketService {
  async getUserBasket(userId) {
    console.log('get 1 user basket method was called');
    const { data } = await $axios.$authHost.get("/api/user/basket/" + userId);
    return data.userBasketProducts;
  }

  async addToBasket(userId, productId) {
    const { data } = await $axios.$authHost.post("/api/user/basket/" + userId, {
      productId,
    });

    return data;
  }

  async deleteProductFromBasket(basketProductId) {
    const { data } = await $axios.$authHost.post("/api/user/basket/", {
      basketProductId,
    });
  }

  async getAllBaskets() {
    console.log('get sll baskets method was called');
    const { data } = await $axios.$authHost.get("/api/user/basket/");
    console.log(data);
    return data.baskets;
  }
}

export default new BasketService();
