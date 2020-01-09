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

import { fnum } from 'utils/sheldusUtils'
import summary from './summary'



class PAEventsLayer extends MapLayer {
  onAdd(map){

      let local_estimate = [];
      EventSource.source.data.features.forEach(item =>{
          if(item.properties['LOCAL ESTIMATE']){
              item.properties['LOCAL ESTIMATE'] = parseFloat(item.properties['LOCAL ESTIMATE'].toString().replace(/,/g, '')) || "0"
              local_estimate.push(item.properties['LOCAL ESTIMATE'])
          }

      });
      map.addSource('events_source',EventSource.source);
      // console.log('events_source', EventSource.source.data.features.forEach(d => console.log(d, d.properties['local_estimate'])))
      //console.log('local_estimate', local_estimate)

      map.addLayer({
          id: 'events_layer',
          type: 'circle',
          source: 'events_source',
          paint: {
              'circle-radius':
              ["step",["get","local_estimate"],
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
              //      ['number', ['get', 'local_estimate'], 1000],
              //       100000]
              // ],
                  //["get", ["to-string", ["get", "local_estimate"]], ["literal",tmpObj]],
              'circle-opacity': 0.8,
              'circle-color':
              ["step",["get","local_estimate"],
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
          ["County", topFeature.properties.county],
          ["Site #", topFeature.properties.site_number],
          ["Applicant", topFeature.properties.APPLICANT],
          ["Damage Estimate", "$"+topFeature.properties['local_estimate'].toLocaleString()],
          ["FEMA Validated", "$"+topFeature.properties['fema_validated'].toLocaleString()],
          ["Description",null],
          [topFeature.properties['damage_description']]
        ];
       
      }
    },
    infoBoxes:{
      Overview: {
        title: "",
        comp: (props={}) =>{
          let totalNum = 0
          let totalEst = 0
          let totalFEMA = 0
          return (
          <div>
            <table className='table table-sm table-hover'>
              <thead><tr><th>Cnty</th><th>Rpts</th><th>Est. Dmg $</th><th>FEMA Val. $</th></tr></thead>
              <tbody>
                {Object.values(summary).map(d => {
                  totalNum += d.reports
                  totalEst += d.local_estimate_total
                  totalFEMA += d.fema_validated_total
                  return (
                  <tr>
                    <td>{d.county}</td>
                    <td>{d.reports}</td>
                    <td>{fnum(d.local_estimate_total)}</td>
                    <td>{fnum(d.fema_validated_total)}</td>
                  </tr>
                  )})
                }

            </tbody>
            <tfoot><tr style={{fontWeight: 600}}><td>Total</td><td>{totalNum}</td><td>{fnum(totalEst)}</td><td>{fnum(totalFEMA)}</td></tr></tfoot>
            </table>
          </div>
        )},
        show: true
      }
    }
})

export default PaLayer
