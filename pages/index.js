import { useEffect, useState } from "react";
import Head from "next/head";

import Header from "../components/Header";
import TimeTable from "../components/timetable/TimeTable";

export default function Home() {
  const [table, setTable] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.tickets-api.cloud.com.ge/api/v1/tickets/stations/timetable"
    )
      .then((response) => response.json())
      .then((response) => {
        setTable(response);
      });
  }, []);

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
