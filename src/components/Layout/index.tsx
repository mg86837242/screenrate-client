import { Outlet } from 'react-router-dom';

import Navbar from '../Navbar';

import StyledMain from './styles';

export default function Layout() {
  return (
    <>
      <Navbar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </>
  );
}
