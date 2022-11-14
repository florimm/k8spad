import App from './App';
import { MemoryRouter as Router, NavLink } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
  return (
    <Router>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
          Company name
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"></input> */}
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#">
              Sign out
            </a>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3 sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link" to="nodes">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    />
                    Nodes
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="namespaces">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    />
                    Namespaces
                  </NavLink>
                </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                <span>Workloads</span>
                <a
                  className="link-secondary"
                  href="#"
                  aria-label="Add a new report"
                >
                  <span
                    data-feather="plus-circle"
                    className="align-text-bottom"
                  />
                </a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workloads/pods">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    />
                    Pods
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workloads/deployments">
                    <span
                      data-feather="file-text"
                      className="align-text-bottom"
                    />
                    Deployments
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <App />
        </div>
      </div>
    </Router>
  );
}
