import PayEvent from "@/components/PayEvent";
import React from "react";

import styles from "./payment.module.scss";

const payment = (): React.ReactElement => {
  return (
    <div className={styles.payment__container}>
      <h1 className="title">Cart Payment</h1>
      <p className="text">next project</p>
      <PayEvent />
    </div>
  );
};

export default payment;
