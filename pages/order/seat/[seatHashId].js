import Head from "next/head";

import Header from "../../../components/Header";

export default function chooseSeat({ seatData }) {
  return (
    <div>
      <Head>
        <title>ადგილის არჩევა</title>
      </Head>
      <Header />
      <div className="container">lorem</div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `http://localhost:8000/api/v1/tickets/ordet/seat/${params.seatHashId}`
  );
  const seatData = await res.json();
  return {
    props: {
      seatData,
    },
  };
}
