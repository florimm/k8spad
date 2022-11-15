import Header from 'components/Header';
import Navigation from 'components/Navigation';
import { ClusterProvider } from 'contexts';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './App';
import './Layout.css';

export default function Layout() {
  return (
    <ClusterProvider>
      <Router>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Navigation />
            <App />
          </div>
        </div>
      </Router>
    </ClusterProvider>
  );
}
