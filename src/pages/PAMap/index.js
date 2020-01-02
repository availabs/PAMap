import React, { Component } from 'react';
import AvlMap from 'components/AvlMap';
import PaEventsLayer from './layers/PaEventsLayer'

let eventsLayer = PaEventsLayer()
class PAMap extends Component {
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
    icon: 'os-icon os-icon-map',
    path: '/',
    exact: true,
    name: 'PA Map',
    auth: false,
    //authLevel: 1,
	mainNav: true,
    menuSettings: {
    image: 'none',
    display: 'none',
    scheme: 'color-scheme-dark', 
    position: 'menu-position-top',
    layout: 'menu-layout-mini',
    style: 'color-style-default'
  },
	component: PAMap
}