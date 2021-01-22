import Head from "next/head";

import Header from "../../components/Header";

export default function OrderId({ ticketData }) {
  let seatData = [];
  return (
    <div>
      <Head>
        <title>Choose seat</title>
      </Head>
      <Header />
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
                    <td onClick={() => (window.location.href = "/order/seat/")}>
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
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `http://localhost:8000/api/v1/tickets/order/${params.id}`
  );
  const ticketData = await res.json();
  return {
    props: {
      ticketData,
    },
  };
}
