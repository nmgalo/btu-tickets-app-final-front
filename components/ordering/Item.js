import Link from "next/link";

function Item(props) {
  return (
    <div className="order_item">
      {props.orders.map((item, index) => (
        <div key={index}>
          <span>
            {item.fromDestionation} -&gt; {item.toDestination}
          </span>
          <span>{item.ticketPrice}GEL</span>
          <span>{item.reservationDate}</span>
          <span>
            <a
              href={`http://localhost:8000/ticket/preview/${item.orderId}`}
              target="_blank"
            >
              view ticket
            </a>
          </span>
        </div>
      ))}

      <style jsx>{`
        .order_item {
          width: 100%;
          margin-top: 40px;
        }
        .order_item > div {
          width: 100%;
          padding: 20px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          color: #000;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .order_item > div {
          display: flex;
          flex-direction: row;
        }
        .order_item > div span {
          flex: 1;
        }
      `}</style>
    </div>
  );
}

export default Item;
