import React from "react";
import styles from "../styles/PayEvent.module.scss";

const PayEvent = (): React.ReactElement => {
  return (
    <div>
      <p className={styles.payEvent__text}>카드 무이자 이벤트</p>
    </div>
  );
};

export default PayEvent;
