import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';


const Sidebar = () => {
  return (
    <Menu right>
      <p>Primul element</p>
      <p>Al doilea element</p>
      
    </Menu>
  );
}

export default Sidebar;
