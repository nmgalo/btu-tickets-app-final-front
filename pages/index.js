import Head from "next/head";

import Header from "../components/Header";
import TimeTable from "../components/timetable/TimeTable";

export default function Home({ table }) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header />

        <div className="container">
          <TimeTable table={table} />
        </div>

        <style jsx>{`
          .container {
            margin-top: 15px;
          }
        `}</style>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.BASE_URL}tickets/stations/timetable`);
  const table = await res.json();
  return {
    props: {
      table,
    },
  };
}
