<template>
  <section class="payment-history">
    <div class="page-headline">Payment history</div>

    <data-table
      :headers="headers"
      :items="payments"
      :filters="filters"
      :search="true"
      :actions="actions"
    />
  </section>
</template>

<script>
import dataTable from '~/components/data-table'
import { mapState, mapActions } from 'vuex'

export default {
  async asyncData ({ store, app }) {
    return await store.dispatch('payments/GET_PAYMENTS', { vm: app })
  },
  data() {
    return {
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
      ]
    }
  },
  components: {
    'data-table': dataTable
  },
  computed: {
    ...mapState({
      payments: state => state.payments.PAYMENTS
    })
  },
  methods: {
    ...mapActions({
      updatePayment: 'payments/UPDATE_PAYMENT'
    })
  },
  async created() {
    // await this.$store.dispatch('payments/GET_PAYMENTS', { vm: this })
  }
}
</script>

<style lang="scss" scoped>
.payment-history {
  padding: 1.727em;

  .page-headline {
    font-size: 1.1em;
    font-weight: 600;

    color: #333333;
    border-bottom: 2px solid rgba(215, 215, 215, 0.5);
    padding-bottom: 0.313em;

    text-transform: uppercase;
  }
}
</style>
