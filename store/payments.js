export const state = () => ({
  PAYMENTS: []
})

export const mutations = {

  ADD_PAYMENTS (state, { payments }) {
    console.log({ UPDATE_PAYMENT: { payments } })

    state.PAYMENTS = []
    for (let i in payments) {
      let payment = payments[i]

      state.PAYMENTS.push(payment)
    }

    console.log({ PAYMENTS: state.PAYMENTS })
  },

  UPDATE_PAYMENT (state, { payment, index, vm }) {
    console.log({ UPDATE_PAYMENT: { payment } })

    vm.$set(state.PAYMENTS, index, payment)
  }
}

export const actions = {

  async GET_PAYMENTS ({ commit }, { vm }) {
    console.log({ GET_PAYMENTS: { vm } })

    try {
      let response = await vm.$DB.ref('/').once('value')
      let payments = response.val()

      payments.map((payment, index) => payment.dbIndex = index)
      console.log({ payments })

      commit('ADD_PAYMENTS', { payments })
    } catch (e) {
      console.log({ e })
    }
  },

  async UPDATE_PAYMENT ({ commit }, { vm, index, row }) {
    console.log({ UDPATE_PAYMENT: { vm, index, row } })

    try {
      // UPDATE DB
      await vm.$DB.ref(`/${index}`).set(row)

      commit('UPDATE_PAYMENT', { index, payment: row, vm })
    }
    catch (e) {
      console.log({ e })
    }
  }
}
