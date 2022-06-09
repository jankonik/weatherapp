import React from 'react';
import Search from '../search/search';
import './main-layout.css';

const Layout = ({ children }: any) => {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;
