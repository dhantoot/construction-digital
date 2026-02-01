<template>
  <div
    class="row full-width full-height"
    :class="[$q.screen.lt.sm ? 'scroll' : '']"
  >
    <q-card
      class="no-shadow round-panel full-width px-10"
      :class="[$q.screen.lt.sm ? 'transparent pb-60' : 'full-height']"
    >
      <!-- <div class="bg-orange row full-width py-10 gap-15" :class="[$q.screen.lt.sm ? 'justify-between' : 'justify-between']">
        <q-btn
          size="sm"
          flat
          label="Back"
          icon="las la-arrow-left"
          no-caps
          class="round-btn"
          @click="$router.push('/manage-sow')">
        </q-btn>
        <div class="row gap-10">
          <q-btn
            size="sm"
            rounded
            label="Add Task"
            icon="las la-plus"
            color="info"
            no-caps
            class="round-btn"
            @click="openAddTemplateDialog">
          </q-btn>
          <q-btn
            size="sm"
            rounded
            v-if="rows.length > 0"
            icon="las la-edit"
            color="positive"
            label="Update"
            class="text-capitalize bg-primary round-btn"
            @click="updateTemplate"
            :loading="loadingSubmit"
            :disable="loadingSubmit || rows.length < 1">
            <template v-slot:loading>
              <q-spinner-ios/>
            </template>
          </q-btn>
        </div>
      </div> -->
      <q-table
        v-model:selected="selected"
        title="Templates"
        :style="[$q.screen.lt.sm ? '' : 'height: 94.5vh;']"
        wrap-cells
        class="q-pb-sm"
        :grid="$q.screen.lt.sm"
        :rows="rows"
        :columns="columns"
        :hide-pagination="$q.screen.lt.sm"
        :rows-per-page-options="[0]"
      >
        <!-- 1. Header Slot with Form Fields -->
        <template #top>
          <div v-if="false" class="row justify-between full-width q-mb-lg">
            <q-input
              v-model="title"
              filled
              placeholder="Template Name"
              :dense="true"
              :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
            />
            <q-btn
              dense
              flat
              padding="sm lg"
              class="text-capitalize round-btn"
              @click="$router.push('/manage-sow')"
            >
              <template #default>
                <div class="row justify-between items-center">
                  <ChevronLeft size="19"/> Back
                </div>
              </template>
              <template #loading>
                <q-spinner-ios />
              </template>
            </q-btn>
          </div>

          <div
            v-if="false"
            class="row justify-between full-width items-center q-mb-xl gap-10"
          >
            <q-input
              v-model="section"
              filled
              :dense="true"
              placeholder="Section"
              :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
              :class="[$q.screen.lt.sm ? 'full-width' : '']"
            />
            <q-input
              v-model="sowCategory"
              filled
              :dense="true"
              placeholder="Category"
              :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
              :class="[$q.screen.lt.sm ? 'full-width' : '']"
            />
            <q-input
              v-model="sowDescription"
              filled
              :dense="true"
              placeholder="Description"
              :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
              :class="[$q.screen.lt.sm ? 'full-width' : '']"
            />
            <q-input
              v-model="contractPrice"
              filled
              :dense="true"
              placeholder="Contract Price"
              :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
              :class="[$q.screen.lt.sm ? 'full-width' : '']"
            />
            <q-input
              v-model="weight"
              filled
              :dense="true"
              placeholder="Weigth"
              :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
              :class="[$q.screen.lt.sm ? 'full-width' : '']"
            />
            <q-input
              v-model="duration"
              filled
              :dense="true"
              placeholder="Duration in Days"
              :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
              :class="[$q.screen.lt.sm ? 'full-width' : '']"
            />
            <q-btn
              padding="sm xl"
              color="primary"
              class="text-capitalize bg-primary round-btn"
              :class="[$q.screen.lt.sm ? 'mt-20 full-width' : '']"
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
              <template #default>
                <div class="row justify-between items-center">
                  <Plus size="16"/> Add
                </div>
              </template>
              <template #loading>
                <q-spinner-ios />
              </template>
            </q-btn>
          </div>

          <div
            class="row full-width gap-15"
            :class="[$q.screen.lt.sm ? 'justify-between' : 'justify-between']"
          >
            <q-btn
              size="sm"
              rounded
              color="warning"
              no-caps
              class="round-btn"
              @click="$router.push('/manage-sow')"
            >
              <template #default>
                <div class="row justify-between items-center gap-10">
                  <ChevronLeft size="19"/> Back
                </div>
              </template>
            </q-btn>
            <div class="row gap-10">
              <q-btn
                size="sm"
                color="info"
                no-caps
                class="round-btn"
                @click="openAddTemplateDialog"
              >
                <template #default>
                  <div class="row justify-between items-center gap-10">
                    <Plus size="16"/> Add Task
                  </div>
                </template>
              </q-btn>
              <q-btn
                v-if="rows.length > 0"
                size="sm"
                color="positive"
                class="text-capitalize bg-primary round-btn"
                :loading="loadingSubmit"
                :disable="loadingSubmit || rows.length < 1"
                @click="updateTemplate"
              >
                <template #default>
                  <div class="row justify-between items-center gap-10">
                    <SquarePen size="16"/> Update
                  </div>
                </template>
                <template #loading>
                  <q-spinner-ios />
                </template>
              </q-btn>
            </div>
          </div>

          <!-- Filters -->
          <!-- <div class="q-pa-md q-gutter-md row items-center">
            <q-input dense filled v-model="filters.templateName" label="Template Name" />
            <q-input dense filled v-model="filters.section" label="Section" />
            <q-input dense filled v-model="filters.sowCategory" label="Category" />
            <q-input dense filled v-model="filters.sowDescription" label="Description" />
            <q-input dense filled v-model="filters.contractPrice" label="Contract Price" type="number" />
            <q-input dense filled v-model="filters.weight" label="Weight" type="number" />
            <q-input dense filled v-model="filters.duration" label="Duration (days)" type="number" />
          </div> -->
        </template>

        <!-- 2. Table Body Slot for Desktop View -->
        <template #body="props">
          <q-tr :props="props">
            <q-td key="section">{{ props.row.section }}</q-td>
            <q-td key="sowCategory">{{ props.row.sowCategory }}</q-td>
            <q-td key="sowDescription">{{ props.row.sowDescription }}</q-td>
            <q-td key="contractPrice">{{ props.row.contractPrice }}</q-td>
            <q-td key="weight">{{ props.row.weight }}</q-td>
            <q-td key="duration">{{ props.row.duration }} days</q-td>
          </q-tr>
        </template>

        <!-- 3. Mobile View Slot (Card Format) -->
        <template #item="props">
          <q-card class="q-ma-sm full-width no-shadow" :style="style">
            <q-card-section>
              <div class="text-h6" :class="{
                'text-subtitle1': $q.screen.lt.sm
              }">{{ props.row.sowDescription }}</div>
              <div class="text-subtitle2 text-grey" :class="{
                'text-caption': $q.screen.lt.sm
              }">
                {{ props.row.sowCategory }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="row full-width justify-between">
                <div>
                  <div :class="{
                    'text-caption': $q.screen.lt.sm
                  }">
                    <strong>Section:</strong>
                    {{ props.row.section }}
                  </div>
                  <div :class="{
                    'text-caption': $q.screen.lt.sm
                  }">
                    <strong>Weight:</strong>
                    {{ props.row.weight }}
                  </div>
                </div>
                <div>
                  <div :class="{
                    'text-caption': $q.screen.lt.sm
                  }">
                    <strong>Contract Price:</strong>
                    {{ props.row.contractPrice }}
                  </div>
                  <div :class="{
                    'text-caption': $q.screen.lt.sm
                  }">
                    <strong>Duration:</strong>
                    {{ props.row.duration }} days
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </template>

        <!-- 4. Footer Slot -->
        <template #bottom>
          <div class="row items-center justify-between full-width">
            <div class="text-subtitle2">Total Rows: {{ rows.length }}</div>
            <q-btn
              v-if="rows.length > 0"
              padding="sm xl"
              color="positive"
              class="text-capitalize bg-primary round-btn"
              :loading="loadingSubmit"
              :disable="loadingSubmit || rows.length < 1"
              @click="updateTemplate"
            >
              <template #default>
                <div class="row justify-between items-center gap-10">
                  <SquarePen size="20"/> Update
                </div>
              </template>
              <template #loading>
                <q-spinner-ios />
              </template>
            </q-btn>
          </div>
        </template>
      </q-table>
      <q-inner-loading :showing="loadingSubmit">
        <q-spinner-ios size="50px" color="secondary" />
      </q-inner-loading>
    </q-card>
  </div>
  <q-dialog v-model="addTemplateDialog" persistent>
    <q-card class="no-shadow">
      <q-card-section class="row items-center">
        <q-avatar
          size="sm"
          color="negative"
          text-color="white"
        >
          <template #default>
            <div class="row justify-between items-center">
              <Plus size="19"/>
            </div>
          </template>
        </q-avatar>
        <span class="q-ml-sm text-h6">Add Task</span>
      </q-card-section>

      <q-card-section>
        <div class="row justify-between full-width items-center gap-10">
          <q-input
            v-model="title"
            filled
            placeholder="Template Name"
            :dense="true"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
            class="full-width"
          />
          <q-input
            v-model="section"
            filled
            :dense="true"
            placeholder="Section"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
            class="full-width"
          />
          <q-input
            v-model="sowCategory"
            filled
            :dense="true"
            placeholder="Category"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
            class="full-width"
          />
          <q-input
            v-model="sowDescription"
            filled
            :dense="true"
            placeholder="Description"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
            class="full-width"
          />
          <q-input
            v-model="contractPrice"
            filled
            :dense="true"
            placeholder="Contract Price"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
            class="full-width"
          />
          <q-input
            v-model="weight"
            filled
            :dense="true"
            placeholder="Weigth"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
            class="full-width"
          />
          <q-input
            v-model="duration"
            filled
            :dense="true"
            placeholder="Duration in Days"
            :style="$q.focus ? 'border-bottom: none; box-shadow: none' : ''"
            class="full-width"
          />
        </div>
      </q-card-section>

      <q-card-actions
        class="row q-pa-md full-width"
        :class="[$q.screen.lt.sm ? 'justify-between' : 'justify-end']"
      >
        <q-btn
          v-close-popup
          size="sm"
          padding="sm xl"
          class="round-btn text-capitalize"
          color="negative"
        >
          <template #default>
            <div class="row justify-between items-center gap-10">
              <X size="19"/> Close
            </div>
          </template>
        </q-btn>
        <q-btn
          size="sm"
          padding="sm xl"
          class="round-btn text-capitalize"
          color="primary"
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
          <template #default>
            <div class="row justify-between items-center gap-10">
              <Check size="19"/> Confirm
            </div>
          </template>
          <template #loading>
            <q-spinner-ios />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref, computed } from 'vue'
import { uid, date, useQuasar } from 'quasar'

/// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  props: {},
  setup() {
    const loadingSubmit = ref(false)
    const question = ref('')
    const selected = ref([])
    const $q = useQuasar()

    const filters = ref({
      templateName: '',
      section: '',
      sowCategory: '',
      sowDescription: '',
      contractPrice: '',
      weight: '',
      duration: ''
    })

    const columns = [
      { name: 'section', label: 'Section', field: 'section', align: 'left' },
      {
        name: 'sowCategory',
        label: 'Category',
        field: 'sowCategory',
        align: 'left'
      },
      {
        name: 'sowDescription',
        label: 'Description',
        field: 'sowDescription',
        align: 'left'
      },
      {
        name: 'contractPrice',
        label: 'Contract Price',
        field: 'contractPrice',
        align: 'left',
        format: val => `${val}`
      },
      { name: 'weight', label: 'Weight', field: 'weight', align: 'left' },
      {
        name: 'duration',
        label: 'Duration (days)',
        field: 'duration',
        align: 'left'
      }
    ]

    return {
      style: ref({
        'background-color': computed(() =>
          $q.dark.isActive ? 'rgba(255, 255, 255, 0.1)' : '#ffffff'
        ),
        'border-radius': '8px',
        border: '.1px solid rgb(198 198 198, 0.5)'
      }),
      columns,
      selected,
      filters,
      templateFullDetail: ref({}),
      rows: ref([]),
      title: ref(''),
      section: ref(''),
      sowCategory: ref(''),
      sowDescription: ref(''),
      contractPrice: ref(''),
      weight: ref(''),
      duration: ref(''),
      addTemplateDialog: ref(false),
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
    this.getTemplateDetail()
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
    openAddTemplateDialog() {
      this.addTemplateDialog = true
    },
    getTemplateDetail() {
      const templateDetail = this.$fbref(
        this.$fbdb,
        `sowTemplates/${this.$route.params.templateId}`
      )
      this.$fbonValue(templateDetail, snapshot => {
        const data = snapshot.val()
        const sow_ = Object.values(data.sow)
        console.log(sow_)
        this.templateFullDetail = data
        console.log(data)
        this.title = data.name
        this.sortList(sow_, 'section')
      })
    },
    async sortList(arr, field) {
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
    clearFields() {
      this.section = ''
      this.sowCategory = ''
      this.sowDescription = ''
      this.contractPrice = ''
      this.weight = ''
      this.duration = ''
    },
    addToList() {
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
    updateTemplate() {
      console.log('updateTemplate', this.templateFullDetail)
      this.loadingSubmit = true
      const updates = {}
      updates[`sowTemplates/${this.templateFullDetail.id}/`] =
        this.templateFullDetail
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
:deep(.q-table__top) {
  padding: 12px 0px;
}
:deep(.q-table__bottom) {
  min-height: 50px;
  padding: 4px 0px 4px 0px;
  font-size: 12px;
}
:deep(.q-separator--horizontal) {
  display: block;
  height: 0.1px;
}
:deep(.q-field__control:after) {
  display: none !important;
}
</style>
