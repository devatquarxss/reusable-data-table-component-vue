<template>
  <v-app class="payments-layout" id="inspire">
    <!-- DRAWER -->
    <v-navigation-drawer class="app-drawer" v-model="drawer" fixed clipped app width="260">
      <v-list-tile class="list-tile">
        <v-list-tile-action>
          <v-icon style="margin-left: 0.37em;">payment</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title style="font-weight: 600; color: #666666;">Payments</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-navigation-drawer>
    <!-- /DRAWER -->

    <!-- TOOLBAR -->
    <v-toolbar class="app-toolbar" fixed clipped-left app flat>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <img
        class="app-logo"
        src="https://static1.squarespace.com/static/584883ef46c3c40e92fe4085/t/592424b2197aeac1683e6e14/1555084036048/?format=1500w"
      />
    </v-toolbar>
    <!-- /TOOLBAR -->

    <!-- CONTENT -->
    <v-content>
      <nuxt />
    </v-content>
    <!-- /CONTENT -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    }
  }
}
</script>

<style lang="scss" scoped>
.payments-layout {

  font-family: Avenir;

  // DRAWER
  .app-drawer {
    .list-tile {
      background: rgba(0, 0, 0, 0.05);
    }
  }
  // /DRAWER

  // TOOLBAR
  .app-toolbar {
    background: #ffffff; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #ffffff,
      #333
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #ffffff,
      #333
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    .app-logo {
      height: 1.2em;
      margin-left: 0.5em;
    }
  }
  // /TOOLBAR
}
</style>
