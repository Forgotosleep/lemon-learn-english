import { Link } from "react-router-dom";

export default function () {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-5">
        <a class="navbar-brand" href="#">
          Admin
        </a>
        {/* <Link to={`/dashboard`} className="me-4 btn">
          home
        </Link>
        <Link to={`/dashboard/class`} className="me-4 btn">
          manage class
        </Link>
        <Link to={`/dashboard/level`} className="me-4 btn">
          level & category
        </Link> */}
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to={`/dashboard`} className="nav-link">
                home
              </Link>
            </li>
            <li class="nav-item">
              <Link to={`/dashboard/class`} className="nav-link">
                manage class
              </Link>
            </li>
            <li class="nav-item">
              <Link to={`/dashboard/level`} className="nav-link">
                level & category
              </Link>
            </li>
          </ul>
        </div>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarCollapse"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
