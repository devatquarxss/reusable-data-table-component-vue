export default [
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
]
