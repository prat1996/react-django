import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' name='Home' />
        <Menu.Item as={NavLink} to='/analysis' name='Insurance Analysis' />
      </Container>
    </Menu>
  );
}