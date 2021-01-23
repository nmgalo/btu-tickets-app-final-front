import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";

export default function OrderId({ orderId }) {
  const [ticketData, setTicketData] = useState({
    seatsData: [{ isAvailable: false, location: [1, 1], locationHashId: "" }],
    trainSeatsDimension: [1, 1],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://www.tickets-api.cloud.com.ge/api/v1/tickets/order/${orderId}`
    )
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setTicketData(response);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Choose seat</title>
      </Head>
      <Header />

      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="container">
          <p>departure: {ticketData.departureTime}</p>
          <p>arrival: {ticketData.arrivalTime}</p>
          <p>vagon class: {ticketData.vagonClass}</p>
          <p>train Model: {ticketData.trainModel}</p>
          <p>price: {ticketData.price} GEL</p>
          <table>
            <tbody>
              {[...Array(ticketData.trainSeatsDimension[0])].map((_, index) => (
                <tr>
                  {[...Array(ticketData.trainSeatsDimension[1])].map(
                    (_, column_index) => (
                      <td
                        onClick={() =>
                          (window.location.href =
                            "/order/seat/" +
                            ticketData.seatsData.find(
                              (item) =>
                                item.location[0] === index + 1 &&
                                item.location[1] === column_index + 1
                            ).locationHashId)
                        }
                      >
                        <button
                          disabled={
                            !ticketData.seatsData.find(
                              (item) =>
                                item.location[0] === index + 1 &&
                                item.location[1] === column_index + 1
                            ).isAvailable
                          }
                        >
                          book
                        </button>
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        table {
          width: 100%;
          margin-top: 40px;
          margin-bottom: 40px;
          border: 0;
        }
        table tr {
          line-height: 30px;
        }
        table tr td {
          // border: 1px solid #ddd;
          padding: 5px;
          text-align: center;
        }
        table tr td button {
          width: 100%;
          background: #ec1d25;
          color: #fff;
          border: 0;
          outline: 0;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
        }
        table tr td button:disabled {
          background: #ddd;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const orderId = params.id;
  return {
    props: {
      orderId,
    },
  };
}

export async function getStaticPaths({ param }) {
  return {
    paths: ["/order/[id]", { params: { id: "1" } }],
    fallback: true,
  };
}
