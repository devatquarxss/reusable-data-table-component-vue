export const filtersProp = ({ date = null, priceRange = null }) => [
  {
    type: 'input-date',
    key: 'Date',
    min: '2017-05-04',
    max: '2019-10-28',
    label: 'Date',
    modal: date
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
    label: 'Price',
    modal: priceRange
  }
]
