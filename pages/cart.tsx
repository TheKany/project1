import PayEvent from "@/components/PayEvent";
import Link from "next/link";
import React from "react";

import styles from "../styles/Cart.module.scss";

const Cart = (): React.ReactElement => {
  return (
    <div className={styles.cart__container}>
      <h1 className="title">Cart</h1>
      <p className="text">next project</p>
      <Link href="/cart/payment">
        <p>결제하기</p>
      </Link>
      <PayEvent />
    </div>
  );
};

export default Cart;
