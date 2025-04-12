<template>
  <div class="row full-width full-height">
    <q-card class="no-shadow round-panel full-width">
      <q-card-section>
        <div class="row justify-between q-gutter-x-sm q-gutter-y-sm q-gutter-y-sm q-mb-lg">
          <q-input filled :dense="true" v-model="title" placeholder="Template Name"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''" />
          <q-btn dense flat icon="las la-arrow-left" padding="sm lg" label="Back" class="text-capitalize round-btn"
            @click="$router.push('/manage-sow')">
            <template v-slot:loading>
              <q-spinner-ios />
            </template>
          </q-btn>
        </div>
        <div class="row justify-between items-center q-gutter-x-lg q-gutter-y-lg q-mb-xl">
          <q-input filled :dense="true" v-model="section" placeholder="Section"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''" />
          <q-input filled :dense="true" v-model="sowCategory" placeholder="Category"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''" />
          <q-input filled :dense="true" v-model="sowDescription" placeholder="Description"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''" />
          <q-input filled :dense="true" v-model="contractPrice" placeholder="Contract Price"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''" />
          <q-input filled :dense="true" v-model="weight" placeholder="Weigth"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''" />
          <q-input filled :dense="true" v-model="duration" placeholder="Duration in Days"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''" />
          <q-btn icon="las la-plus" padding="sm xl" color="primary" label="Add"
            class="text-capitalize bg-primary round-btn" @click="addToList" :loading="loadingSubmit" :disable="loadingSubmit ||
              !title ||
              !section ||
              !sowCategory ||
              !sowDescription ||
              !contractPrice ||
              !weight ||
              !duration
              ">
            <template v-slot:loading>
              <q-spinner-ios />
            </template>
          </q-btn>
        </div>
        <div class="q-gutter-y-sm">
          <div class="row justify-between" style="height: 50px; border-radius: 8px; border: 1px dotted black"
            v-for="item of rows" :key="item">
            <div class="col-2">
              <div class="row full-height justify-center items-center">
                <div>{{ item.section }}</div>
              </div>
            </div>
            <div class="col-2">
              <div class="row full-height justify-center items-center">
                <div>{{ item.sowCategory }}</div>
              </div>
            </div>
            <div class="col-2">
              <div class="row full-height justify-center items-center">
                <div>{{ item.sowDescription }}</div>
              </div>
            </div>
            <div class="col-2">
              <div class="row full-height justify-center items-center">
                <div>{{ item.contractPrice }}</div>
              </div>
            </div>
            <div class="col-2">
              <div class="row full-height justify-center items-center">
                <div>{{ item.weight }}</div>
              </div>
            </div>
            <div class="col-2">
              <div class="row full-height justify-center items-center">
                <div>{{ item.duration }}</div>
              </div>
            </div>
          </div>
          <div class="row justify-end">
            <q-btn v-if="rows.length > 0" icon="las la-save" padding="sm xl" color="primary" label="Save"
              class="text-capitalize bg-primary round-btn" @click="saveTemplate" :loading="loadingSubmit"
              :disable="loadingSubmit || rows.length < 1">
              <template v-slot:loading>
                <q-spinner-ios />
              </template>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-inner-loading :showing="visible">
        <q-spinner-ios size="50px" color="secondary" />
      </q-inner-loading>
    </q-card>
  </div>
  <q-dialog v-model="confirm" persistent>
    <q-card class="no-shadow">
      <q-card-section class="row items-center">
        <q-avatar size="sm" icon="las la-exclamation" color="negative" text-color="white" />
        <span class="q-ml-sm text-h6">{{ confirmMsg }}</span>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn padding="sm xl" icon="las la-times" class="round-btn text-capitalize" label="Close" color="negative"
          v-close-popup />
        <q-btn padding="sm xl" icon="las la-check" class="round-btn text-capitalize" label="Confirm" color="primary"
          @click="callConfirmFn()" :loading="actionAccountLoader" :disable="actionAccountLoader">
          <template v-slot:loading>
            <q-spinner-ios />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from 'vue'
import { uid, date } from 'quasar'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  setup () {
    const loadingSubmit = ref(false)
    const question = ref('')

    return {
      rows: ref([]),
      title: ref(''),
      section: ref(''),
      sowCategory: ref(''),
      sowDescription: ref(''),
      contractPrice: ref(''),
      weight: ref(''),
      duration: ref(''),
      confirm: ref(false),
      loadingSubmit,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      }
    }
  },
  props: {},
  computed: {
    test: function () {
      return "I'm computed hook"
    }
  },
  beforeCreate () {
    // console.log('beforeCreate')
  },
  created () {
    // console.log('created')
  },
  beforeMount () {
    // console.log('beforeMount')
  },
  mounted () {
    // this.$emit('showHeader', true, [])
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
  methods: {
    clearFields () {
      this.section = ''
      this.sowCategory = ''
      this.sowDescription = ''
      this.contractPrice = ''
      this.weight = ''
      this.duration = ''
    },
    addToList () {
      this.rows.push({
        uid: uid(),
        section: this.section,
        sowCategory: this.sowCategory,
        sowDescription: this.sowDescription,
        contractPrice: this.contractPrice,
        weight: this.weight,
        duration: this.duration
      })
      this.clearFields()
    },
    saveTemplate () {
      this.loadingSubmit = true
      const timeStamp = Date.now()
      const payload = {
        createdBy: uid(),
        dateCreated: date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
        name: this.title,
        id: uid(),
        isArchived: false,
        sow: []
      }
      const updates = {}
      updates[`sowTemplates/${payload.id}/`] = payload
      console.log(updates)
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(async () => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Created',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          await this.populateSOW(payload.id)
          this.loadingSubmit = false
        })
        .catch(async (err) => {
          console.log(err)
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          this.loadingSubmit = false
        })
    },
    async populateSOW (templateId) {
      const updates = {}
      for await (const e of this.rows) {
        const sowId = uid()
        const sowPayload = {
          id: sowId,
          ...e
        }
        updates[`sowTemplates/${templateId}/sow/${sowId}/`] = sowPayload
      }
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(async () => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Created SOW',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
        .catch(async (err) => {
          console.log(err)
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          // this.loadingSubmit = false
          console.log('hello world')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.adminCard {
  min-height: 857px;
}
.dhan {
  border-radius: 20px;
}
.q-field--filled .q-field__control:focus {
  border-bottom: none;
  box-shadow: none;
}
</style>
