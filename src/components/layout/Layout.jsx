import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen">
        {/* Yahan aapke saare pages render honge */}
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default Layout;