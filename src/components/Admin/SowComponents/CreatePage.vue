<template>
  <div class="row full-width full-height">
    <q-card class="no-shadow round-panel full-width">
      <q-card-section v-if="false">
        <div
          class="row justify-between q-gutter-x-sm q-gutter-y-sm q-gutter-y-sm q-mb-lg"
        >
          <q-input
            v-model="title"
            filled
            :dense="true"
            placeholder="Template Name"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-btn
            dense
            flat
            icon="las la-arrow-left"
            padding="sm lg"
            label="Back"
            class="text-capitalize round-btn"
            @click="$router.push('/manage-sow')"
          >
            <template #loading>
              <q-spinner-ios />
            </template>
          </q-btn>
        </div>
        <div
          class="row justify-between items-center q-gutter-x-lg q-gutter-y-lg q-mb-xl"
        >
          <q-input
            v-model="section"
            filled
            :dense="true"
            placeholder="Section"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="sowCategory"
            filled
            :dense="true"
            placeholder="Category"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="sowDescription"
            filled
            :dense="true"
            placeholder="Description"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="contractPrice"
            filled
            :dense="true"
            placeholder="Contract Price"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="weight"
            filled
            :dense="true"
            placeholder="Weigth"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="duration"
            filled
            :dense="true"
            placeholder="Duration in Days"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-btn
            icon="las la-plus"
            padding="sm xl"
            color="primary"
            label="Add"
            class="text-capitalize bg-primary round-btn"
            :loading="loadingSubmit"
            :disable="
              loadingSubmit ||
              !title ||
              !section ||
              !sowCategory ||
              !sowDescription ||
              !contractPrice ||
              !weight ||
              !duration
            "
            @click="addToList"
          >
            <template #loading>
              <q-spinner-ios />
            </template>
          </q-btn>
        </div>
        <div class="q-gutter-y-sm">
          <div
            v-for="item of rows"
            :key="item"
            class="row justify-between"
            style="height: 50px; border-radius: 8px; border: 1px dotted black"
          >
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
            <q-btn
              v-if="rows.length > 0"
              icon="las la-save"
              padding="sm xl"
              color="primary"
              label="Save"
              class="text-capitalize bg-primary round-btn"
              :loading="loadingSubmit"
              :disable="loadingSubmit || rows.length < 1"
              @click="saveTemplate"
            >
              <template #loading>
                <q-spinner-ios />
              </template>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section v-if="true">
        <div class="row full-width justify-between">
          <q-btn
            rounded
            size="sm"
            flat
            label="Back"
            icon="las la-arrow-left"
            no-caps
            @click="$router.push('/manage-sow')"
          ></q-btn>
          <span class="text-h6">Create a New Template</span>
          <span></span>
        </div>
        <div class="mt-20 column gap-10 full-width">
          <q-input
            v-model="title"
            filled
            :dense="true"
            placeholder="Template Name"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="section"
            filled
            :dense="true"
            placeholder="Section"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="sowCategory"
            filled
            :dense="true"
            placeholder="Category"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="sowDescription"
            filled
            :dense="true"
            placeholder="Description"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="contractPrice"
            filled
            :dense="true"
            placeholder="Contract Price"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="weight"
            filled
            :dense="true"
            placeholder="Weigth"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
          <q-input
            v-model="duration"
            filled
            :dense="true"
            placeholder="Duration in Days"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
          />
        </div>
      </q-card-section>

      <q-card-actions v-if="true">
        <div class="row px-10 full-width justify-start gap-20">
          <!-- <q-btn rounded flat size="sm" dense icon="las la-arrow-left" padding="sm lg" label="Back" class="text-capitalize"
            @click="$router.push('/manage-sow')">
            <template v-slot:loading>
              <q-spinner-ios />
            </template>
          </q-btn> -->
          <q-btn
            rounded
            size="sm"
            icon="las la-plus"
            padding="sm xl"
            color="info"
            label="Add"
            class="text-capitalize bg-primary"
            :loading="loadingSubmit"
            :disable="
              loadingSubmit ||
              !title ||
              !section ||
              !sowCategory ||
              !sowDescription ||
              !contractPrice ||
              !weight ||
              !duration
            "
            @click="addToList"
          >
            <template #loading>
              <q-spinner-ios />
            </template>
          </q-btn>
        </div>
      </q-card-actions>
      <q-inner-loading :showing="visible">
        <q-spinner-ios size="50px" color="secondary" />
      </q-inner-loading>
    </q-card>
  </div>
  <q-dialog v-model="confirm" persistent>
    <q-card class="no-shadow">
      <q-card-section class="row items-center">
        <q-avatar size="sm">
          <template #default>
            <CircleAlertIcon size="20" />
          </template>
        </q-avatar>
        <span class="q-ml-sm text-h6">{{ confirmMsg }}</span>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          v-close-popup
          rounded
          size="sm"
          padding="sm xl"
          class="text-capitalize"
          color="negative"
        >
          <template #default>
            <XIcon class="q-mr-sm" />
            <span class="text-capitalize">Close</span>
          </template>
        </q-btn>
        <q-btn
          rounded
          size="sm"
          padding="sm xl"
          class="text-capitalize"
          color="primary"
          :loading="actionAccountLoader"
          :disable="actionAccountLoader"
          @click="callConfirmFn()"
        >
          <template #loading>
            <q-spinner-ios />
          </template>

          <template #default>
            <CheckIcon class="q-mr-sm" />
            <span class="text-capitalize">Confirm</span>
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
  props: {},
  setup() {
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
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      }
    }
  },
  computed: {
    test: function () {
      return "I'm computed hook"
    }
  },
  beforeCreate() {
    // console.log('beforeCreate')
  },
  created() {
    // console.log('created')
  },
  beforeMount() {
    // console.log('beforeMount')
  },
  mounted() {
    // this.$emit('showHeader', true, [])
  },
  beforeUpdate() {
    // console.log('beforeUpdate')
  },
  updated() {
    // console.log('updated')
  },
  beforeUnmount() {
    // console.log('beforeUnmount')
  },
  unmounted() {
    // console.log('unmounted')
  },
  methods: {
    clearFields() {
      this.section = ''
      this.sowCategory = ''
      this.sowDescription = ''
      this.contractPrice = ''
      this.weight = ''
      this.duration = ''
    },
    addToList() {
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
    saveTemplate() {
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
        .catch(async err => {
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
    async populateSOW(templateId) {
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
        .catch(async err => {
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
:deep(.q-separator--horizontal) {
  display: block;
  height: 0.1px;
}
:deep(.q-field__control:after) {
  display: none !important;
}
</style>
