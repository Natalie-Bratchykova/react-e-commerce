import { $axios } from "../http/index";

class BasketService {
  async getUserBasket(userId) {
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
}

export default new BasketService();
