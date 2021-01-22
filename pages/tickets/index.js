import Head from "next/head";
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Item from "../../components/ordering/Item";

export default function Tickets() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8000/api/v1/tickets/order-tickets/get-order-history`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          alert(response.error);
        }
        setOrders(response);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>orders</title>
      </Head>
      <Header />
      <div className="container">
        <Item orders={orders} />
      </div>
    </div>
  );
}
