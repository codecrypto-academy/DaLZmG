import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='container d-flex flex-column home'>
      <Header />
      <div className='flex-grow-1'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
} 

export default Home;