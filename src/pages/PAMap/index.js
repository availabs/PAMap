import React, { Component } from 'react';
import AvlMap from 'components/AvlMap';
import PaEventsLayer from './layers/PaEventsLayer'

let eventsLayer = PaEventsLayer()
class Home extends Component {
  render () {
   return (
     <div style={{width: '100vw', height: '100vh'}}>

       <AvlMap
        layers={[eventsLayer]}
        sidebar={false}
        zoom={7}
        center={ [
          -75.60791015625,
          42.76314586689492
        ]}
       /> 

     </div>
    )
  }

}

export default {
	path: '/',
	exact: true,
	mainNav: true,
  menuSettings: {
    image: 'none',
    display: 'none',
    scheme: 'color-scheme-dark', 
    position: 'menu-position-top',
    layout: 'menu-layout-mini',
    style: 'color-style-default'  
  },
  name: 'Home',
	auth: false,
	component: Home
}