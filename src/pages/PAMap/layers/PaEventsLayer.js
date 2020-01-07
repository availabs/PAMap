import React from "react"

import MapLayer from "../../../components/AvlMap/MapLayer"
import { register, unregister } from "../../../components/AvlMap/ReduxMiddleware"
import { getColorRange } from "constants/color-ranges";
import {EventSource} from './eventSource'
import {
  scaleQuantile,
  scaleQuantize, 
  scaleThreshold
} from "d3-scale"

const tmpObj = {};

class PAEventsLayer extends MapLayer {
  onAdd(map){
      let local_estimate = [];
      EventSource.source.data.features.forEach(item =>{
          item.properties['LOCAL ESTIMATE'] = parseFloat(item.properties['LOCAL ESTIMATE'].replace(/,/g, '')) || 0
          local_estimate.push(item.properties['LOCAL ESTIMATE'])
      });
      map.addSource('events_source',EventSource.source);
      console.log('events_source', EventSource.source.data.features.forEach(d => console.log(d, d.properties['LOCAL ESTIMATE'])))
      console.log('local estimate', local_estimate)


      map.addLayer({
          id: 'events_layer',
          type: 'circle',
          source: 'events_source',
          paint: {
              'circle-radius': 
              ["step",["get","LOCAL ESTIMATE"],
              2,
              0,
              3,
              50000,
              4,
              100000,
              6,
              500000,
              8,
              1000000,
              10
              ],
              // [
              //     'interpolate',['linear'],['zoom'],
              //     10,
              //     ['/',
              //      ['number', ['get', 'LOCAL ESTIMATE'], 1000],
              //       100000]
              // ],
                  //["get", ["to-string", ["get", "LOCAL ESTIMATE"]], ["literal",tmpObj]],
              'circle-opacity': 0.8,
              'circle-color':
              ["step",["get","LOCAL ESTIMATE"],
                  "#fcffff",
                  0,
                  "#fcbba1",
                  15000,
                  "#fb6a4a",
                  50000,
                  "#ef3b2c",
                  100000,
                  "#cb181d",
                  500000,
                  "#a50f15",
                  1000000,
                  "#67000d"

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
      title: 'October Storm 2019 Events',
      subtitle: 'Test 123',
      type: "ordinal",
      types: ["ordinal"],
      //vertical: true,
      range: ["#fcbba1","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"],
      active: true,
      domain: ['$15k','$50k','$100k','$500k','$1M','']
    },
    popover: {
      layers: ["events_layer"],
      dataFunc: function(topFeature, features) {
        //const { id } = topFeature.properties;
        return  [
          ["County", topFeature.properties.COUNTY],
          ["Applicant", topFeature.properties.APPLICANT],
          ["Damage Estimate", "$"+topFeature.properties['LOCAL ESTIMATE'].toLocaleString()],
          ["FEMA Validated", "$"+Object.values(topFeature.properties)[7]],
          ["Description",null],
          [topFeature.properties['DAMAGE DESCRIPTION']]
        ];
       
      }
    }

})

export default PaLayer
