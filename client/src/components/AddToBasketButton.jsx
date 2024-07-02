import React, { isValidElement, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import BasketService from "../services/BasketService";
import { Basket } from "react-bootstrap-icons";

function AddToBasketButton({ productInfo }) {
  const { user, userBasket } = useContext(Context);
  const [isClicked, setClicked] = useState(false);
  const [inBasket, setInBasket] = useState([]);
  const checkInBasket = () => {
    BasketService.getUserBasket(user.user.id).then((data) => {
      userBasket.setBasket(data);
      data.map((basket) => {
        if (basket.productId === productInfo.id) {
          setClicked(true);
        }
      });
    });

    return isClicked;
  };
  const handleClick = () => {
    setClicked(true);
    userBasket.setBasketProduct({ ...productInfo, isInBasket: isClicked });
    console.log(userBasket.basketProduct);
    BasketService.addToBasket(user.user.id, productInfo.id).then(() => {
      BasketService.getUserBasket(user.user.id).then((data) => {
        console.log(data);
        setInBasket(data);
        userBasket.setBasketProductNum(data.length);
      });
    });
  };

  return (
    <span
      style={{
        marginLeft: ".4rem",
      }}
    >
      {checkInBasket() ? (
        <Button variant="outline-success">
          In basket <Basket />
        </Button>
      ) : (
        <Button variant="success" onClick={handleClick}>
          Add to basket
        </Button>
      )}
    </span>
  );
}

export default observer(AddToBasketButton);
