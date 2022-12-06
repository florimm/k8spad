import { NavLink } from 'react-router-dom';
import { useClusterState } from 'contexts';

function Navigation() {
  const { state } = useClusterState();
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to="clusters">
              <span data-feather="file-text" className="align-text-bottom" />
              Clusters
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="nodes">
              <span data-feather="file-text" className="align-text-bottom" />
              Nodes
            </NavLink>
          </li>
          {/* {state.context !== null ? (

          ) : null} */}

          <li className="nav-item">
            <NavLink className="nav-link" to="namespaces">
              <span data-feather="file-text" className="align-text-bottom" />
              Namespaces
            </NavLink>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
          <span>Workloads</span>
          <a className="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle" className="align-text-bottom" />
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <NavLink className="nav-link" to="/workloads/pods">
              <span data-feather="file-text" className="align-text-bottom" />
              Pods
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/workloads/deployments">
              <span data-feather="file-text" className="align-text-bottom" />
              Deployments
            </NavLink>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
          <span>Other</span>
          <a className="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle" className="align-text-bottom" />
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <NavLink className="nav-link" to="/flow">
              <span data-feather="file-text" className="align-text-bottom" />
              Flow
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
