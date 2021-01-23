import Head from "next/head";
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Item from "../../components/ordering/Item";

export default function Tickets() {
  const [orders, setOrders] = useState([]);

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(localStorage.getItem("token") ? true : false);
    fetch(
      `https://www.tickets-api.cloud.com.ge/api/v1/tickets/order-tickets/get-order-history`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          setOrders(response);
        }
      });
  }, []);

  return (
    <div>
      <Head>
        <title>orders</title>
      </Head>
      <Header />
      <div className="container">
        {auth && <Item orders={orders} />}
        {!auth && <div>Please sign in first</div>}
      </div>
    </div>
  );
}
