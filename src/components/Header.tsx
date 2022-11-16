import React from 'react';
import { useQuery } from 'react-query';
import { useClusterState } from 'contexts';
import { Link } from 'react-router-dom';
import api from '../app/api';

function Header() {
  const { dispatch } = useClusterState();
  const { data = [] } = useQuery('namespaces', () =>
    api.core.listNamespace().then((res) => res.body.items)
  );

  const changeNamespace = (el) => {
    const namespace = data.find((t) => t.metadata.uid === el.target.value);
    dispatch({ type: 'SET_NAMESPACE', payload: namespace });
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" to="/">
        Company name
      </Link>
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
          <label style={{ color: 'white' }} htmlFor="namespace">
            Namespace:
            <select
              id="namespace"
              onChange={(el) => changeNamespace(el)}
              name="namespace"
            >
              <option value="all">All</option>
              {data.map((item) => (
                <option value={item.metadata.uid} key={item.metadata.uid}>
                  {item.metadata.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </header>
  );
}

export default Header;
