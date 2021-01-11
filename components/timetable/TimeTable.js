import Link from "next/link";

function TimeTable(props) {
  return (
    <div className="timeTableContainer">
      {props.table.map((item, index) => (
        <div key={index}>
          <span>
            {item.fromDestinationName} to {item.toDestinationName}
          </span>
          <p>
            {new Date(item.scheduleTime * 1000).toLocaleTimeString("ka-GE")}
          </p>
          <Link href={`/order/${item.ticketId}`}>Book</Link>
        </div>
      ))}

      <style jsx>{`
        .timeTableContainer {
          width: 100%;
          margin-top: 40px;
          // display: grid;
          // grid-gap: 30px;
          // grid-template-columns: repeat(3, 1fr);
        }
        .timeTableContainer > div {
          width: 100%;
          padding: 20px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          color: #000;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .timeTableContainer a {
          color: green;
        }
      `}</style>
    </div>
  );
}

export default TimeTable;
