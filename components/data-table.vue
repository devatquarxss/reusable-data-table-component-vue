<template>
  <div class="data-table">
    <div class="filter-and-search-container">
      <div class="filter-container hidden-xs-only">
        <!-- FILTERS -->
        <div v-for="(filter, i) in filters" :key="i">
          <!-- INPUT :: DATE -->
          <div v-if="filter.type === 'input-date'">
            <div class="input-with-icon date-input">
              <i class="material-icons calendar-icon">
                calendar_today
              </i>
              <input
                type="date"
                v-model="filter.modal"
                :min="filter.min"
                :max="filter.max"
              />
            </div>
            <!--button @click="filter.modal = null">clear</button-->
          </div>
          <!-- /INPUT :: DATE -->

          <!-- SELECT :: RANGE -->
          <div v-else-if="filter.type === 'select-range'">
            <select v-model="filter.modal" class="select-box">
              <option :value="undefined">{{ filter.defaultOption }}</option>
              <option
                v-for="(option, j) in filter.options"
                :value="option.value"
                :key="j"
              >
                {{ option.label }}
              </option>
            </select>
            <!--button @click="filter.modal = null">clear</button-->
          </div>
          <!-- /SELECT :: RANGE -->
        </div>
        <!-- /FILTERS -->
      </div>

      <!-- SEARCH -->
      <div class="input-with-icon search-input">
        <i class="material-icons">
          search
        </i>
        <input v-if="search" placeholder="Search..." v-model="q" ref="search"/>
      </div>
      <!-- /SEARCH -->
    </div>

    <!-- LOOP :: HEADERS & CONTENTS :: DESKTOP -->
    <div class="data-container hidden-xs-only">
      <div
        v-for="(header, i) in headers"
        :key="i"
        :style="{ width: header.width }"
      >
        <div class="header-container">
          <div class="header">
            {{ header.key }}
          </div>

          <!-- SORT -->
          <div
            class="sort-buttons"
            :style="{ visibility: header.sortable ? 'visible' : 'hidden' }"
          >
            <i
              class="up material-icons"
              @click="
                sortByKey = header.key
                order = 'ASC'
                dataType = header.dataType ? header.dataType : 'string'
              "
              :class="
                header.key === sortByKey && order === 'ASC'
                  ? `selected-sort`
                  : `unselected-sort`
              "
            >
              arrow_drop_up
            </i>
            <i
              @click="
                sortByKey = header.key
                order = 'DESC'
                dataType = header.dataType ? header.dataType : 'string'
              "
              :class="
                header.key === sortByKey && order === 'DESC'
                  ? `selected-sort`
                  : `unselected-sort`
              "
              class="material-icons down"
            >
              arrow_drop_down
            </i>
          </div>
          <!-- /SORT -->
        </div>

        <!-- LOOP :: ITEMS -->
        <div class="content-container">
          <div
            class="content-row"
            v-for="(item, j) in filteredItems"
            :key="j"
            :style="{ background: j % 2 === 0 ? '#fafafa' : '#ffffff' }"
          >
            <!-- Big Content -->
            <div v-if="header.shorten">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{
                    item[header.key] | shorten(header.restrictToLen)
                  }}</span>
                </template>
                <span>{{ item[header.key] }}</span>
              </v-tooltip>
            </div>
            <!-- /Big Content -->
            <div v-else>
              {{ item[header.key] }}
            </div>

            <!-- ACTIONS -->
            <div
              v-if="header.type === 'actions'"
              class="actions hidden-xs-only"
            >
              <div
                v-for="(action, k) in actions"
                :key="`action-${k}`"
                class="loop"
              >
                <!-- EDIT -->
                <div v-if="action.type === 'edit'" class="content">
                  <i
                    class="material-icons icon"
                    @click="
                      editDialog = true
                      editRow = j
                      actions[k].modal = Object.assign({}, item)
                      $forceUpdate()
                    "
                  >
                    {{ action.icon }}
                  </i>
                </div>
                <!-- /EDIT -->
              </div>
            </div>
            <!-- /ACTIONS -->
          </div>
        </div>
        <!-- /LOOP :: ITEMS -->
      </div>
    </div>
    <!-- /LOOP :: HEADERS & CONTENTS :: DESKTOP -->

    <!-- LOOP :: HEADERS & CONTENTS :: MOBILE -->
    <div class="mobile-content hidden-sm-and-up">
      <div v-for="(items, i) in filteredItems" class="items-row" :key="i">
        <div
          v-for="(header, j) in headers"
          class="header-row"
          :key="`header-${j}`"
        >
          <div v-if="header.type !== 'actions'" class="key-content">
            <div class="key">{{ header.key }}</div>
            <div class="content">{{ items[header.key] }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- /LOOP :: HEADERS & CONTENTS :: MOBILE -->

    <!-- MOBILE FILTER FLOATING BTN -->
    <button
      v-if="isFilterAvailable()"
      v-ripple
      class="hidden-sm-and-up filter-float-button"
      @click="mobileFilterDialog = true"
    >
      <i class="material-icons">
        filter_list
      </i>
    </button>
    <!-- /MOBILE FILTER FLOATING BTN -->

    <!-- EDIT MODAL -->
    <v-dialog v-model="editDialog" width="300">
      <v-card class="edit-modal-card">
        <div v-for="(action, i) in actions" :key="i">
          <div v-if="action.type === 'edit'">
            <div
              v-for="(key, j) in action.key"
              :key="`key-${j}`"
              v-if="action.modal"
            >
              <div class="edit-text-area">
                <textarea
                  ref="edit"
                  :placeholder="key"
                  v-model="action.modal[key]"
                  >{{ action.modal[key] }}</textarea
                >
              </div>

              <!-- UPDATE -->
              <button
                class="flat-top-border-button"
                v-ripple
                @click="
                  editAction({ row: action.modal, func: action.func })
                  editDialog = false
                "
              >
                UPDATE
              </button>
              <!-- /UPDATE -->
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- /EDIT MODAL -->

    <!-- MOBILE FILTER MODAL -->
    <v-bottom-sheet v-model="mobileFilterDialog" width="300">
      <v-card class="bottom-sheet-card">
        <!-- CLOSE & CLEAR FILTER -->
        <div class="close-n-clear-container">
          <button
            class="hidden-sm-and-up close-filter"
            @click="mobileFilterDialog = false"
          >
            <i class="material-icons">
              keyboard_arrow_down
            </i>
          </button>

          <div class="filter-heading">Filters</div>

          <button
            :style="{ visibility: isAnyFilterSelected ? 'visible' : 'hidden' }"
            class="hidden-sm-and-up clear-filter"
            @click="clearAllFilters()"
          >
            Clear
          </button>
        </div>
        <!-- /CLOSE & CLEAR FILTER -->

        <div class="filter-container">
          <!-- FILTERS -->
          <div v-for="(filter, i) in filters" :key="i">
            <!-- INPUT :: DATE -->
            <div class="filter-label">{{ filter.label }}</div>
            <div v-if="filter.type === 'input-date'">
              <div class="input-with-icon date-input">
                <i class="material-icons calendar-icon">
                  calendar_today
                </i>
                <input
                  type="date"
                  v-model="filter.modal"
                  :min="filter.min"
                  :max="filter.max"
                />
              </div>
              <!--button @click="filter.modal = null">clear</button-->
            </div>
            <!-- /INPUT :: DATE -->

            <!-- SELECT :: RANGE -->
            <div v-else-if="filter.type === 'select-range'">
              <select v-model="filter.modal" class="select-box">
                <option :value="undefined">{{ filter.defaultOption }}</option>
                <option
                  v-for="(option, j) in filter.options"
                  :value="option.value"
                  :key="j"
                >
                  {{ option.label }}
                </option>
              </select>
              <!--button @click="filter.modal = null">clear</button-->
            </div>
            <!-- /SELECT :: RANGE -->
          </div>
          <!-- /FILTERS -->
        </div>
      </v-card>
    </v-bottom-sheet>
    <!-- /MOBILE FILTER MODAL -->
  </div>
</template>

<script>
import { INTERSECTION, SORT_ARR_OF_OBJ } from '../helpers/ARRAY'
import shortenText from '../mixins/filters/shorten-text'

export default {
  mixins: [shortenText],

  props: ['headers', 'items', 'filters', 'search', 'actions'],

  data() {
    return {
      // EDIT
      editRow: 0,
      editDialog: false,
      // /EDIT

      // SEARCH
      q: '',
      // /SEARCH

      // SORT
      sortByKey: '',
      order: '',
      dataType: '',
      // /SORT

      // MOBILE FILTER DIALOG
      mobileFilterDialog: false
      // /MOBILE FILTER DIALOG
    }
  },

  computed: {
    filteredItems() {
      return this.filter()
    },

    isAnyFilterSelected() {
      return this.isFilterSelected()
    }
  },

  watch: {
    editDialog: {
      handler() {
        if (this.editDialog) {
          setTimeout(() => this.$refs.edit[0].focus(), 10)
        }
      }
    }
  },

  methods: {
    filter() {
      ////console.log({ filter: this.filters })

      let arrOfItems = []

      // LOOP :: FILTERS
      for (let i in this.filters) {
        let filter = this.filters[i]

        if (filter.modal) {
          ////console.log({ filter, i })
          arrOfItems.push([])
          let itemsIndex = arrOfItems.length - 1

          // LOOP :: ITEMS
          for (let j in this.items) {
            let item = this.items[j]

            ////console.log({ item, j, value: item[filter.key] })

            // FILTER :: TYPES
            // 1
            if (filter.type === 'input-date') {
              if (item[filter.key].includes(filter.modal)) {
                arrOfItems[itemsIndex].push(JSON.stringify(item)) // 1
              }
            }
            // 2
            if (filter.type === 'select-range') {
              if (
                parseFloat(filter.modal.min) <= parseFloat(item[filter.key]) &&
                parseFloat(filter.modal.max) >= parseFloat(item[filter.key])
              ) {
                arrOfItems[itemsIndex].push(JSON.stringify(item)) // 2
              }
            }
            // /FILTER :: TYPES
          }
          // LOOP :: ITEMS
        }
      }
      // /LOOP :: FILTERS

      ////console.log({ arrOfItems })

      // FINAL
      let filteredItems = []
      // CHECK IF NO FILTER SELECTED
      if (arrOfItems.length === 0) {
        //console.log('NO FILTER SELECTED')

        filteredItems = this.items
      }
      // /CHECK IF NO FILTER SELECTED
      else {
        //console.log('FILTER SELECTED')

        // CHECK IF ANYONE ITEMS ARR EMPTY, THIS MEANS NO COMMON
        let isAnyOneItemsArrEmpty = false
        for (let i in arrOfItems) {
          let items = arrOfItems[i]
          if (items.length === 0) {
            isAnyOneItemsArrEmpty = true
          }
        }

        if (isAnyOneItemsArrEmpty) {
          //console.log('ANYONE ARRAY IS EMPTY, NO COMMON')

          filteredItems = []
        } else {
          //console.log('COMMON')

          // CHECK IF ONLY ONE FILTER SELECTED, NOTING TO FIND COMMON
          if (arrOfItems.length === 1) {
            //console.log('ONLY ONE ARRAY, NO NEED TO FIND INTERSECTION')

            filteredItems = arrOfItems[0]
          } else {
            //console.log('INTERSECTION')

            // INTERSECTION
            filteredItems = INTERSECTION({ arrOfArr: arrOfItems })

            //console.log({ intersection: filteredItems })
            // /INTERSECTION
          }
          // /CHECK IF ONLY ONE FILTER SELECTED, NOTING TO FIND COMMON
        }
        // /CHECK IF ANYONE ITEMS ARR EMPTY, THIS MEANS NO COMMON
      }

      //console.log({ filteredItems })
      // /FINAL

      // PARSE
      let parsedItems = []
      for (let i in filteredItems) {
        let item = filteredItems[i]

        if (typeof item === 'string') {
          item = JSON.parse(item)
        }

        parsedItems.push(item)
      }

      //console.log({ parsedItems })
      // /PARSE

      // SEARCH
      let searchedItems = []
      if (this.search && this.q.length > 0) {
        for (let i in parsedItems) {
          let item = parsedItems[i]
          //console.log({ item })

          let isMatch = false
          for (let key in item) {
            let val = JSON.stringify(item[key])
            //console.log({ val })

            if (val.toLowerCase().includes(this.q.toLowerCase())) {
              isMatch = true
            }
          }

          //console.log({ isMatch })
          if (isMatch) {
            searchedItems.push(item)
          }
        }
      } else {
        searchedItems = parsedItems
      }

      //console.log({ searchedItems })
      // SEARCH

      // SORT
      let sortedArr
      if (this.sortByKey.length > 0) {
        sortedArr = SORT_ARR_OF_OBJ({
          arr: searchedItems,
          key: this.sortByKey,
          order: this.order,
          dataType: this.dataType
        })
      } else {
        // NO DEFAULT SORTING
        sortedArr = searchedItems
      }

      //console.log({ sortedArr })

      return sortedArr
      // /SORT
    },

    intiDefaultSort() {
      // FIND DEFAULT KEY, ORDER TO SORT
      for (let i in this.headers) {
        let header = this.headers[i]
        //console.log({ header })

        if (header.defaultSortBy) {
          this.sortByKey = header.key
          this.order = header.defaultOrder
        }
      }

      //console.log({ sortByKey: this.sortByKey, order: this.order })
      // /FIND DEFAULT KEY, ORDER TO SORT
    },

    // ACTION :: EDIT
    editAction({ row, func }) {
      //console.log({ editAction: { row } })

      func({ row, index: row.dbIndex, vm: this })
    },
    // ACTION :: EDIT

    isFilterAvailable() {
      if (this.filters) {
        if (this.filters.length === 0) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },

    isFilterSelected() {
      if (this.filters) {
        for (let i in this.filters) {
          let filter = this.filters[i]
          //console.log({ filter })

          if (filter.modal) {
            if (JSON.stringify(filter.modal).length > 0) {
              //console.log('TRUE')
              return true
            }
          }
        }
      }
      //console.log('FALSE')
      return false
    },

    clearAllFilters() {
      for (let i in this.filters) {
        this.filters[i]['modal'] = ''
        delete this.filters[i]['modal']
      }
    }
  },

  created() {
    this.intiDefaultSort()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/components/data-table';
</style>
