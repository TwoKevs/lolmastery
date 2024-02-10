import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <h1>kevin</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/multisearch">Multi-Search</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;