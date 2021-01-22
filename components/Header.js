import Link from "next/link";

export default function Header() {
  // const isUserAuth =  ? true : false;
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/tickets">Tickets</Link>
            </li>
            <li className="auth">
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
      <style jsx>{`
        header {
          width: 100%;
          height: 80px;
          background: #ec1d25;
        }
        header nav > ul {
          margin: 0;
          padding: 0;
        }
        nav > ul > li {
          list-style: none;
          float: left;
          padding-right: 20px;
          color: #fff;
        }
        nav {
          line-height: 80px;
        }
        ul li a {
          padding-left: 20px;
        }
        .auth {
          float: left;
        }
      `}</style>
    </header>
  );
}
