import { useEffect, useState } from "react";
import Head from "next/head";

import Header from "../../../components/Header";

export default function chooseSeat({ orderHash }) {
  const [seatData, setSeatData] = useState({});

  useEffect(() => {
    fetch(
      `https://www.tickets-api.cloud.com.ge/api/v1/tickets/order-tickets/order-selected-place/${orderHash}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setSeatData(data);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>ადგილის არჩევა</title>
      </Head>
      <Header />
      <div className="container">
        {seatData.error || seatData.message ? (
          <div>can't buy, sorry !</div>
        ) : (
          <div>order created</div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const orderHash = params.seatHashId;
  return {
    props: {
      orderHash,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      "/order/seat/[seatHashId]",
      { params: { seatHashId: "MTsxOzE7MQ==" } },
    ],
    fallback: true,
  };
}
