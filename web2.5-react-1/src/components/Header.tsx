import { Link } from 'react-router-dom';
import './Header.css';

function Main() {
  return (
    <>
      <header>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img src="/codecrypto.png" width="30" height="30" className="d-inline-block align-top" />
            Metamask Testing Ground
          </a>

          <div className="navbar navbar-expand-lg" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/products">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/balance">Balance using Window</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/balanceSDK">Balance using SDK</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Main;