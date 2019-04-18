# BriteCore Frontend developer assignment

## Project overview
A reusable Vue.js data-table component.

## Features
- Search
- Sortable Columns
- Custom Filters
- Action: Editable Cells
- Responsive

## Demo Link
[Visit demo link](https://britecore-frontend.appspot.com/)

## Component
```
<data-table
      :headers="headers"
      :items="payments"
      :filters="filters" (optional)
      :search="true" (optional)
      :actions="actions" (optional)
/>
```

## Eg. Props
```
headers: [
  { key: 'ID', width: '26%', sortable: true },
  { key: 'Name', width: '12%', sortable: true },
  { key: 'Description', width: '24%', sortable: true, shorten: true, restrictToLen: 50 },
  {
    key: 'Date',
    width: '18%',
    sortable: true,
    defaultSortBy: true,
    defaultOrder: 'DESC'
  },
  { key: 'Amount', width: '10%', sortable: true, dataType: 'float' },
  { type: 'actions', key: 'Actions', width: '10%' }
],

filters: [
  {
    type: 'input-date',
    key: 'Date',
    min: '2017-05-04',
    max: '2019-10-28',
    label: 'Date'
  },
  {
    type: 'select-range',
    key: 'Amount',
    defaultOption: 'Select price range',
    options: [
      { label: '-1000 to -501', value: { min: -1000, max: -501 } },
      { label: '-500 to -1', value: { min: -500, max: -1 } },
      { label: '0 to 499', value: { min: 0, max: 499 } },
      { label: '500 to 1000', value: { min: 500, max: 1000 } }
    ],
    label: 'Price'
  }
],

actions: [
  {
    type: 'edit',
    key: ['Description'],
    func: this.updatePayment,
    icon: 'edit'
  }
],

search: true,

items: [
 {
   "ID": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
   "Name": "Kyra Lester",
   "Description": "Curabitur dictum. Phasellus in",
   "Date": "2017-07-23T04:24:49-07:00",
   "Amount": 345.54
 },
 {
   "ID": "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
   "Name": "Buckminster Alvarado",
   "Description": "dui, in sodales elit erat vitae risus. Duis a mi",
   "Date": "2018-11-08T05:44:15-08:00",
   "Amount": 677.08
 },
 ...
 ...
 ...
 {
   "ID": "17019E51-E9B9-2E41-ECA4-3691F74BABA1",
   "Name": "Denise Walsh",
   "Description": "Mauris",
   "Date": "2017-07-18T08:53:37-07:00",
   "Amount": 946.99
 }
]
```

###### Build Setup

```
# install dependencies & serve/run on local server with hot reload at: localhost:3000
$ npm i
$ npm run dev

# build for production & launch on local server or deploy to Google app engine (SSR)
$ npm run build
$ npm start
$ gcloud app deploy app.yaml --project <project-name> 

# generate static project
$ npm run generate

# run test
$ npm run test
```

## Questions:

###### How long did you spend on the test? 
- 22 hours

###### Would you do anything differently if you had more time?
would have:
- included pagination.
- kept price range filter as slider instead of select.
- kept a filter for date & time range.
- updated search prop to search on basis of specific keys (name, description etc) instead of all keys.
- kept actions in mobile
- distributed data-table.vue component into smaller sub components.

###### In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?
- have already made a components/data-table.vue component which accepts props: (a) headers, (b) items, (c) filters, (d) search, (e) actions.
- if it's required to be used in different scenario, we need to pass different prop values to it.
- moreover, if any feature is missing in the component which may be required for a future scenario, I can udpate the component to be able to handle it via prop.

###### What CSS property did you recently learn about that helped you on a project?
- mixins

###### What is your favorite modern Javascript feature? Why?
- async/await: helps write asynchronous code in much simpler way than using promises & callbacks.
- destructuring: helps write clean code.

###### What is your favorite third-party Vue.js library? Why?
- Quasar: Enable us to build application for desktop (electron), mobile (cordova) & web (PWA, SSR) with the same code base.
- Nuxt: Great for SEO. (a) Nuxt static site generator helps us to generate static pages, (b) Simplified approach to SSR.


