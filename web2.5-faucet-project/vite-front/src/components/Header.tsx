import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './Home';
import './Header.css';

const Header = () => {
  const { wallet, setWallet } = useContext(UserContext);
  // const [account, setAccount] = useState<string | null>(null);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img src="/codecrypto.png" width="30" height="30" className="d-inline-block align-top" />
            Web 2.5 - Faucet Project
          </a>
          
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/faucet">Faucet</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/balanceMeta">Balance Meta</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/balance">Balance BackEnd</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transfer">Transfer</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className='text-center font-weight-bold text-xl font-italic'>
          {wallet ? 'Selected Wallet: ' + wallet : 'No wallet connected'}
        </div>
      </header>
    </>
  )
}

export default Header;