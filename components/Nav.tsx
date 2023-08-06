import Link from "next/link";
import React from "react";

const nav = (): React.ReactElement => {
  return (
    <div>
      <div className="nav-bar">
        <Link href="/">Home</Link>
        <Link href="/list">List</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/Test/MyPage">page</Link>
      </div>
    </div>
  );
};

export default nav;
