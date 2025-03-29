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
            class="text-capitalize bg-info round-btn" @click="addToList" :loading="loadingSubmit" :disable="loadingSubmit ||
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
        <div class="scroll q-gutter-y-sm" style="height: 69vh;">
          <div class="row justify-between" style="height:50px; border-radius: 8px; border: 1px dotted black"
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
        </div>
        <div class="row justify-end mt-7">
          <q-btn v-if="rows.length > 0" icon="las la-edit" padding="sm xl" color="primary" label="Update"
            class="text-capitalize bg-info round-btn" @click="updateTemplate" :loading="loadingSubmit"
            :disable="loadingSubmit || rows.length < 1">
            <template v-slot:loading>
              <q-spinner-ios />
            </template>
          </q-btn>
        </div>
      </q-card-section>
      <q-inner-loading :showing="loadingSubmit">
        <q-spinner-ios size="50px" color="secondary" />
      </q-inner-loading>
    </q-card>
  </div>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar size="sm" icon="las la-exclamation" color="cancel" text-color="white" />
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
      templateFullDetail: ref({}),
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
    this.getTemplateDetail()
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
    getTemplateDetail () {
      const templateDetail = this.$fbref(this.$fbdb, `sowTemplates/${this.$route.params.templateId}`)
      this.$fbonValue(templateDetail, (snapshot) => {
        const data = snapshot.val()
        const sow_ = Object.values(data.sow)
        console.log(sow_)
        this.templateFullDetail = data
        console.log(data)
        this.title = data.name
        this.sortList(sow_, 'section')
      })
    },
    async sortList (arr, field) {
      this.rows = arr?.sort((a, b) => {
        const nameA = a[field].toUpperCase() // ignore upper and lowercase
        const nameB = b[field].toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }

        // names must be equal
        return 0
      })
    },
    clearFields () {
      this.section = ''
      this.sowCategory = ''
      this.sowDescription = ''
      this.contractPrice = ''
      this.weight = ''
      this.duration = ''
    },
    addToList () {
      const newId = uid()
      const timeStamp = Date.now()
      const toAdd = {
        id: newId,
        uid: uid(),
        section: this.section,
        sowCategory: this.sowCategory,
        sowDescription: this.sowDescription,
        contractPrice: this.contractPrice,
        weight: this.weight,
        duration: this.duration,
        dateUpdated: date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      }
      this.templateFullDetail.sow[newId] = toAdd
      console.log('this.templateFullDetail', this.templateFullDetail)
      this.rows.push(toAdd)
      this.clearFields()
    },
    updateTemplate () {
      console.log('updateTemplate', this.templateFullDetail)
      this.loadingSubmit = true
      const updates = {}
      updates[`sowTemplates/${this.templateFullDetail.id}/`] = this.templateFullDetail
      console.log(updates)
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(async () => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Updated',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
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
