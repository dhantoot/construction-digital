<template>
  <q-layout class="bg-accent">
    <q-header
      elevated
      class="text-warning bg-primary"
      height-hint="61.59"
    >
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn
          round
          :dense="true"
          flat
          :ripple="false"
          icon="lab la-jedi-order"
          size="19px"
          color="warning"
          class="q-mr-sm"
          no-caps
          @click="this.$router.push('/admin')"
       />

        <q-select
          ref="search"
          dark
          :dense="true"
          standout
          use-input
          hide-selected
          class="GL__toolbar-select"
          color="primary"
          :stack-label="false"
          label="Search or jump to..."
          v-model="text"
          :options="filteredOptions"
          @filter="filter"
          :style="{
            'max-width': $q.screen.gt.sm ? '300px' : '30vw'
          }"
        >
          <template v-slot:append>
            <img
              src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg"
           />
            <!-- <icon name="las la-jedi-order"/> -->
          </template>

          <template v-slot:no-option>
            <q-item>
              <q-item-section>
                <div class="text-center">
                  <q-spinner-pie color="grey-5" size="24px"/>
                </div>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" class="GL__select-GL__menu-link">
              <q-item-section side>
                <q-icon name="collections_bookmark"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>hmm</q-item-label>
              </q-item-section>
              <q-item-section side :class="{ 'default-type': !scope.opt.type }">
                <q-btn
                  outline
                  :dense="true"
                  no-caps
                  text-color="blue-grey-5"
                  size="12px"
                  class="bg-grey-1 q-px-sm"
                >
                  {{ scope.opt.type || 'Jump to' }}
                  <q-icon name="subdirectory_arrow_left" size="14px"/>
                </q-btn>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div
          v-if="$q.screen.gt.sm"
          class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap"
        >
          <a href="javascript:void(0)" class="text-warning" @click="this.$router.push('/manage-projects')"> Projects </a>
          <a href="javascript:void(0)" class="text-warning" @click="this.$router.push('/manage-invites')"> Invites </a>
          <a href="javascript:void(0)" class="text-warning" @click="this.$router.push('/manage-accounts')"> Manage accounts </a>
          <a href="javascript:void(0)" class="text-warning" @click="this.$router.push('/whats-new')"> Explore </a>
        </div>

        <q-space/>

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn
            v-if="$q.screen.gt.xs"
            :dense="true"
            flat
            round
            size="sm"
            icon="notifications"
         />
          <q-btn flat>
            <div class="row items-center no-wrap">
              <q-icon name="las la-bars" size="20px"/>
              <q-icon
                name="arrow_drop_down"
                size="16px"
                style="margin-left: -2px"
             />
            </div>
            <q-menu auto-close>
              <q-list :dense="true" style="min-width: 200px">
                <q-item clickable class="GL__menu-link" to="/manage-projects">
                  <q-item-section>Projects</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link" to="/manage-invites">
                  <q-item-section>Invites</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link" to="/manage-accounts">
                  <q-item-section>Accounts</q-item-section>
                </q-item>
                <q-separator/>
                <q-item-label header>Explore</q-item-label>
                <q-item clickable class="GL__menu-link" to="/whats-new">
                  <q-item-section>Feature </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn flat no-wrap>
            <q-avatar rounded size="20px">
              <img src="https://cdn.quasar.dev/img/avatar3.jpg"/>
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px"/>

            <q-menu auto-close>
              <q-list :dense="true" style="min-width: 200px">
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Signed in as <strong>Mary</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item clickable class="GL__menu-link-status">
                  <q-item-section>
                    <div>
                      <q-icon name="tag_faces" color="blue-9" size="18px"/>
                      Set your status
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Your profile</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Your repositories</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Your projects</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Your stars</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Your gists</q-item-section>
                </q-item>
                <q-separator/>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Help</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { fabGithub } from '@quasar/extras/fontawesome-v6'

const stringOptions = [
  'quasarframework/quasar',
  'quasarframework/quasar-awesome'
]

export default {
  name: 'MyLayout',

  setup () {
    const text = ref('')
    const options = ref(null)
    const filteredOptions = ref([])
    const search = ref(null) // $refs.search

    function filter (val, update) {
      if (options.value === null) {
        // load data
        setTimeout(() => {
          options.value = stringOptions
          search.value.filter('')
        }, 2000)
        update()
        return
      }

      if (val === '') {
        update(() => {
          filteredOptions.value = options.value.map((op) => ({ label: op }))
        })
        return
      }

      update(() => {
        filteredOptions.value = [
          {
            label: val,
            type: 'In this repository'
          },
          {
            label: val,
            type: 'All GitHub'
          },
          ...options.value
            .filter((op) => op.toLowerCase().includes(val.toLowerCase()))
            .map((op) => ({ label: op }))
        ]
      })
    }

    return {
      fabGithub,

      text,
      options,
      filteredOptions,
      search,

      filter
    }
  }
}
</script>

<style lang="scss">
body.screen--xs {
  .my-div {
    color: #000;
  }
}
</style>
<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden

    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #0366d6
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
