import { Outlet } from 'react-router-dom';

import { Navbar } from '..';

import StyledMain from './styles';

export function Layout() {
  return (
    <>
      <Navbar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </>
  );
}
