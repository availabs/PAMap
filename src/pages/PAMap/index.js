import React, { Component } from 'react';
import AvlMap from 'components/AvlMap';
import PaEventsLayer from './layers/PaEventsLayer'

let eventsLayer = PaEventsLayer()
class PAMap extends Component {
  render () {
   return (
     <div style={{width: '100vw', height: `calc(100vh)`, paddingTop: 50}}>

       <AvlMap
        layers={[eventsLayer]}
        sidebar={false}
        zoom={7}
        center={ [
          -75.60791015625,
          42.76314586689492
        ]}
        boxZoom={true}
       /> 

     </div>
    )
  }

}

export default {
  path: '/',
  name: 'Event Map',
  icon: 'os-icon os-icon-map',
  exact: true,
  auth: false,
  mainNav: true,
  menuSettings: {
    image: 'none',
    display: 'none',
    scheme: 'color-scheme-dark', 
    position: 'menu-position-top',
    layout: 'menu-layout-compact',
    style: 'color-style-default'
  },
	component: PAMap
}