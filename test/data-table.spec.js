// modules
import Vue from 'vue'
import fetch from 'isomorphic-fetch';

// components
import dataTable from '../components/data-table'

// props
import headersProp from './data-table-props/headers'
import { filtersProp } from './data-table-props/filters'

// helper func
function getRenderedText (Component, propsData) {
  const Constructor = Vue.extend(Component)
  let vm = new Constructor({ propsData: propsData }).$mount()
  return vm.$el.textContent
}

describe('dataTable', () => {

  it('renders correctly with filter props', () => {

    /*
      For --> [Date] -> [2019-10-28] & [Price Range] -> [0 - 499]
      Expect ID -> 8E6F38E1-5DC7-5030-4513-8FBB237EF5DB
      Do not Expect ID -> 9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E
    */

    return fetch('https://britecore-frontend.firebaseio.com/.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(items) {
        console.log(items);

        // A
        expect(getRenderedText(dataTable, {
          headers: headersProp,
          items: items,
          filters: filtersProp({ date: '2019-10-28', priceRange: { min: 0, max: 499 } }),
          search: true
        })).toContain('8E6F38E1-5DC7-5030-4513-8FBB237EF5DB')

        // B // Date Changed
        expect(getRenderedText(dataTable, {
          headers: headersProp,
          items: items,
          filters: filtersProp({ date: '1990-10-28', priceRange: { min: 0, max: 499 } }),
          search: true
        })).not.toContain('8E6F38E1-5DC7-5030-4513-8FBB237EF5DB')

        // C // ID Change
        expect(getRenderedText(dataTable, {
          headers: headersProp,
          items: items,
          filters: filtersProp({ date: '2019-10-28', priceRange: { min: 0, max: 499 } }),
          search: true
        })).not.toContain('9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E')

      });
  })
})
