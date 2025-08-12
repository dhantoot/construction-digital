<template>
  <div class="column gap-10 q-pa-sm">
    <div class="row justify-center items-center">
      <q-input
      class="full-width"
      standout="bg-transparent"
      :input-class="$q.dark.isActive ? 'text-accent' : 'text-primary'"
      v-model="text"
      :dense="true"
    >
      <template v-slot:prepend>
        <!-- <q-icon name="las la-search" :class="{
          'text-accent': text === '',
          'text-primary': text !== ''
        }"/> -->
      </template>
      <template v-slot:append>
        <q-icon v-if="!text" :class="{
            'text-accent': text === '',
            'text-primary': text !== ''
          }">
            <SearchIcon/>
        </q-icon>
        <q-icon v-if="text" name="clear" class="cursor-pointer text-accent" @click="text = ''"/>
      </template>
    </q-input>
    </div>
    <div class="">
      <q-list separator class="bg-transparent" style="height: 100vh;">
        <q-item clickable v-ripple @click='gotoDetail(item)' v-for="item in projects.filter(e => e.title.toLowerCase().includes(text.toLowerCase()))" :key="item">
          <q-item-section thumbnail>
            <img class="q-ml-sm rounded-borders" :src="`${item.avatarFullPath}`">
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold" :class="{
              'text-accent': $q.dark.isActive,
              'text-primary': !$q.dark.isActive
            }">{{ item.title }}</q-item-label>
            <q-item-label caption lines="2" :class="{
              'text-accent': $q.dark.isActive,
              'text-primary': !$q.dark.isActive
            }">{{ item.description }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
              <q-item-label caption class="text-positive q-mb-sm">{{ item.dateCreated?.split('T')[0] || 'No Date'}}</q-item-label>
              <q-badge rounded :color="item.isActivated ? 'green' : 'red'" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
  <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em">
    <q-spinner-ios size="50px" color="secondary"/>
  </q-inner-loading>
  <q-page-sticky v-if="false" position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="grey-1" text-color="primary" class="bg-transparent" @click="this.$router.push({ path: '/new-project' })"/>
  </q-page-sticky>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'
import { LocalStorage } from 'quasar'

export default {
  title: 'ProjectList',
  setup () {
    const visible = ref(false)
    const mainStore = useMainStore()

    return {
      getInvitesLoader: ref(false),
      projectIds: ref([]),
      visible,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called->', visible.value)
      },
      text: ref(''),
      ph: ref(''),
      dense: ref(true),
      mainStore,
      getProjectsLoader: ref(false),
      projects: ref([]),
      searchIconHidden: ref(false)
    }
  },
  emits: ['emitFromChild'],
  props: {
    title: String,
    likes: Number
  },
  computed: {
    test: function () {
      return "I'm computed hook"
    }
  },
  serverPrefetch () {
    // console.log('serverPrefetch')
  },
  beforeCreate () {
    // console.log('beforeCreate..', this.$options)
  },
  created () {
    // console.log('created..')
  },
  beforeMount () {
    // console.log('beforeMount..')
  },
  async mounted () {
    // console.log('mounted..', this.$options)
    // this.$emit('showHeader', true, [])
    this.showTextLoading()
    this.initFunction()
    await this.getProjectByUser()
    await this.getProjects()
    this.mainStore.showNav = true
    console.log('at project list')
    // Tell the Layout, that this child component is mounted.
    // so that it will retrigger the fetching of avatar.
    this.$emit('emitFromChild')
  },
  beforeUpdate () {
    // console.log('beforeUpdate')
  },
  updated () {
    // console.log('updated')
  },
  beforeUnmount () {
    // console.log('beforeUnmount')
  },
  unmounted () {
    // console.log('unmounted')
  },
  errorCaptured () {
    // console.log('errorCaptured')
  },
  renderTracked () {
    // console.log('renderTracked')
  },
  renderTriggered () {
    // console.log('renderTriggered')
  },
  activated () {
    // console.log('activates')
  },
  deactivated () {
    // console.log('deactivated')
  },
  methods: {
    onBlur () {
      this.searchIconHidden = false
    },
    onfocus () {
      this.searchIconHidden = true
    },
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    async getProjects () {
      this.getProjectsLoader = true
      const userDetails = LocalStorage.getItem('currentUser')
      const {
        role, email
      } = userDetails
      const projects = this.$fbref(this.$fbdb, 'projects')
      this.$fbonValue(projects, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.projects = []
          return
        }
        // all data
        const data_ = Object.values(data)

        // If admin role, then return all data
        if (role === 'admin') {
          this.projects = [...data_, ...data_, ...data_, ...data_]
          this.getProjectsLoader = false
          return
        }

        // if client role, then fetch from project details
        if (role === 'client') {
          this.projects = data_.filter(e => e.client?.map(f => f.email).includes(email))
          this.getProjectsLoader = false
          return
        }

        // if agent role, then fetch from project details
        if (role === 'agent') {
          this.projects = data_.filter(e => e.agent?.map(f => f.email).includes(email))
          this.getProjectsLoader = false
          return
        }

        // If contructors, filter projects by invitation
        if (role === 'constructor') {
          this.projects = data_.filter(project => this.projectIds.includes(project.id))
          this.getProjectsLoader = false
          return
        }

        this.getProjectsLoader = false
      })
    },
    // This will get constructors project records
    async getProjectByUser () {
      this.getInvitesLoader = true
      const userDetails = LocalStorage.getItem('currentUser')
      const {
        email
      } = userDetails
      const invites = this.$fbref(this.$fbdb, 'invites')
      this.$fbonValue(invites, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.invites = []
          return
        }
        const data_ = Object.values(data)
        this.projectIds = data_.filter((e) => e.invitee === email).map(e => e.projectId)
        this.getInvitesLoader = false
      })
    },
    gotoDetail (project) {
      LocalStorage.set('mobileSelectedProject', project)
      this.mainStore.setSelectedProject(project)
      this.$router.push({ path: `/detail/${project.id}` })
    }
  }
}
</script>
