import React from "react"

import MapLayer from "../../../components/AvlMap/MapLayer"
import { register, unregister } from "../../../components/AvlMap/ReduxMiddleware"
import { getColorRange } from "constants/color-ranges";
import {EventSource} from './eventSource'

const tmpObj = {};

class PAEventsLayer extends MapLayer {
  onAdd(map){
      let local_estimate = [];
      EventSource.source.data.features.forEach(item =>{
          if(item.properties['LOCAL ESTIMATE']){
              console.log(item.properties['LOCAL ESTIMATE'])
              item.properties['LOCAL ESTIMATE'] = parseFloat(item.properties['LOCAL ESTIMATE'].toString().replace(/,/g, '')) || "0"
              local_estimate.push(item.properties['LOCAL ESTIMATE'])
          }

      });
      map.addSource('events_source',EventSource.source);
      map.addLayer({
          id: 'events_layer',
          type: 'circle',
          source: 'events_source',
          paint: {
              'circle-radius':[
                  'interpolate',['linear'],['zoom'],
                  10,
                  ['/',
                  ['-',2000000, ['number', ['get', 'LOCAL ESTIMATE'],2000000]],
                  200000]
              ],
                  //["get", ["to-string", ["get", "LOCAL ESTIMATE"]], ["literal",tmpObj]],
              'circle-opacity': 0.8,
              'circle-color': ["step",["get","LOCAL ESTIMATE"],
                  "#67000d",
                  0,
                  "#fcbba1",
                  400000,
                  "#fb6a4a",
                  800000,
                  "#ef3b2c",
                  1200000,
                  "#cb181d",
                  1600000,
                  "#a50f15",
                  2000000,
                  "#000000"

              ]

          }

      })
  }
}


const PaLayer = (options = {}) =>
  new PAEventsLayer("Public Assistance Damage", {
    active: true,
    sources: [],
    layers: [],
    legend: {
      title: 'PA Map',
      type: "ordinal",
      types: ["ordinal"],
      vertical: true,
      range: ["#67000d","#fcbba1","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#000000"],
      active: true,
      domain: [0,400000,800000,1200000,1600000,2000000]
    },
    popover: {
      layers: ["events_layer"],
      dataFunc: function(topFeature, features) {
        //const { id } = topFeature.properties;
        return  [
          ["County", topFeature.properties.COUNTY],
          ["Applicant", topFeature.properties.APPLICANT],
          ["Damage Estimate", "$"+Object.values(topFeature.properties)[6]],
          ["FEMA Validated", "$"+Object.values(topFeature.properties)[7]],
          ["Description",null],
          [topFeature.properties['DAMAGE DESCRIPTION']]
        ];
       
      }
    }

})

export default PaLayer
