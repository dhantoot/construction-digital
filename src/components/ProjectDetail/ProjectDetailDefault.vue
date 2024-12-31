<template>
  <q-card class="no-border-radius no-shadow bg-transparent">
    <q-img :src="`${mainStore?.mobileSelectedProject?.avatarFullPath}`" height="160px">
      <div class="absolute-bottom q-mt-none row justify-between items-center">
        <div>
          <q-btn
            color="primary"
            rounded
            v-if="this.$route.path === `/detail/${mainStore?.mobileSelectedProject?.id}`"
            icon="las la-arrow-left"
            class="text-accent round-btn"
            @click="this.$router.push('/projects')"
          />
        </div>
        <div class="text-h6" v-ellipsis="20">{{ mainStore?.mobileSelectedProject?.title }}</div>
        <div>
          <q-btn
            color="primary"
            rounded
            v-if="this.$route.path === `/detail/${mainStore?.mobileSelectedProject?.id}`"
            icon="las la-user-plus"
            class="text-accent round-btn"
            @click="this.$router.push({ path: '/new-member' })"
          />
        </div>
      </div>
    </q-img>
    <q-card-section flat class="q-ma-none q-pa-none">
      <q-list class="scroll" style="max-height: 60vh;">
        <q-item-label header class="text-bold text-accent">Project Members</q-item-label>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar1.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-warning">Dan Xblue</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">***</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="teal"
              text-color="white"
              icon="las la-shield-alt"
            >
              admin
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar2.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-accent">Vcuii XD</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">***</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="purple"
              text-color="white"
              icon="las la-home"
            >
              home owner
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar3.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <!-- <q-item-label lines="1">Linear Project</q-item-label> -->
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-accent">Clin XD</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">Engineer</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="indigo"
              text-color="white"
              icon="las la-user-secret"
            >
              contractor
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar4.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-accent">Chris Clauz</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">Architech</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="deep-orange"
              text-color="white"
              icon="las la-redo-alt"
            >
              resend
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar5.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-accent">Kinn Ny</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">Engineer</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="indigo"
              text-color="white"
              icon="las la-user-secret"
            >
              contractor
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar6.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-accent">Dyan Marie</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">***</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="teal"
              text-color="white"
              icon="las la-shield-alt"
            >
              admin
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar2.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-accent">Nyx Skyler</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">Engineer</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="indigo"
              text-color="white"
              icon="las la-user-secret"
            >
              contractor
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar3.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-accent">Hestia Vinrie</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">Architech</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="deep-orange"
              text-color="white"
              icon="las la-redo-alt"
            >
              resend
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar5.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-accent">Man Sweto</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">Engineer</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="indigo"
              text-color="white"
              icon="las la-user-secret"
            >
              contractor
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar5.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-accent">Fatima Luisa</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">Engineer</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="indigo"
              text-color="white"
              icon="las la-user-secret"
            >
              contractor
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar2.jpg"/>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label caption lines="2">
              <span class="text-weight-bold text-accent">Vince Aisa</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-light text-positive">Engineer</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              square
              outline
              :dense="true"
              color="indigo"
              text-color="white"
              icon="las la-user-secret"
            >
              contractor
            </q-chip>
          </q-item-section>
        </q-item>
        <q-separator inset="item" class="q-ml-none"/>
        <q-item :dense="true">
          <q-item-section>
            <div class="row items-center justify-center">
              <q-icon
                name="las la-stroopwafel"
                size="10px"
                class="text-accent"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-inner-loading
      :showing="visible"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    >
      <q-spinner-ios size="50px" color="secondary"/>
    </q-inner-loading>
  </q-card>
</template>
<script>
import { ref } from 'vue'
import { useMainStore } from 'stores/main'
import ellipsis from 'src/directives/ellipsis'

export default {
  directives: { ellipsis },
  setup () {
    const visible = ref(false)
    const mainStore = useMainStore()

    return {
      visible,
      lorem: ref(''),
      mainStore,
      selectedProject: ref({})
    }
  },
  mounted () {
    // this.selectedProject = this.mainStore
  }
}
</script>
