import React, { Component } from 'react';

class Home extends Component {
  render () {
   return (
     <div style={{width: '100vw', height: '100vh'}}>
       test
     </div>
    )
  }
}

export default {
	path: '/test',
	exact: true,
	mainNav: true,
  menuSettings: {
    image: 'none',
    display: 'none',
    scheme: 'color-scheme-dark', 
    position: 'menu-position-left',
    layout: 'menu-layout-mini',
    style: 'color-style-default'  
  },
  name: 'Home',
	auth: false,
	component: Home
}