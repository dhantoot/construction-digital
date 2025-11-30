<template>
  <div
    class="row hide-scrollbar full-height"
    :style="{ height: $q.screen.lt.sm ? 'auto' : '' }"
  >
    <div
      class="row full-width full-height q-pa-sm"
      :style="[$q.screen.lt.sm ? 'padding-bottom: 90px;' : '']"
    >
      <div
        v-if="$q.screen.gt.sm"
        class="col-3 pr-10"
        :class="{
          'col-12': $q.screen.lt.md
        }"
      >
        <q-card class="round-panel full-height no-shadow">
          <q-card-section>
            <div class="text-h6">
              {{ selected.length ? 'Update' : 'New Project' }}
            </div>
            <div class="text-subtitle2 row justify-between">
              <div>
                {{
                  selected.length
                    ? 'update project details'
                    : 'add a new project'
                }}
              </div>
              <div v-if="selected.length" class="text-blue text-bold">
                [ Update Mode ]
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-gutter-sm">
            <q-select
              v-model="searchKey"
              behavior="menu"
              :popup-content-class="[
                $q.dark.isActive
                  ? 'popupSelectContent bg-contrast no-shadow'
                  : 'popupSelectContent'
              ]"
              filled
              clearable
              use-input
              input-debounce="0"
              label="Location. (trigger search after 10 charaters)"
              class="q-mt-md"
              :dense="true"
              :options="options"
              :loading="searchingPlaceLoader"
              @filter="filterFn"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">No results</q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input v-model="text" :dense="true" filled label="Name" />
            <q-input
              v-model="desc"
              :dense="true"
              placeholder="Description..."
              filled
              type="textarea"
            />
            <q-tabs
              v-model="tab"
              class="bg-white-4"
              :dense="true"
              align="justify"
            >
              <q-tab
                class="text-orange text-capitalize"
                name="upload"
                icon="las la-upload"
                label="Upload"
              />
              <q-tab
                class="text-negative text-capitalize"
                name="capture"
                icon="las la-camera"
                label="Capture"
              />
            </q-tabs>
            <div v-if="tab === 'upload'" class="full-width q-pt-xs">
              <q-file
                v-model="file"
                :dense="true"
                label-color="primary"
                filled
                label="Choose File"
                multiple
                accept=".jpg, image/*"
                class="q-ml-sm shadow-2"
              >
                <template #prepend>
                  <q-icon name="cloud_upload" color="primary" />
                </template>
              </q-file>
            </div>
            <div v-if="tab === 'capture'" class="full-width q-pl-sm q-pt-xs">
              <q-btn
                dense
                align="left"
                class="text-capitalize full-width no-shadow round-btn"
                text-color="primary"
                color="grey-2"
                icon="las la-camera"
                label="Open camera"
                :disable="deviceIsReady"
                style="height: 40px"
                @click="captureImage"
              />
            </div>
            <div class="q-py-sm">
              <q-toggle
                v-model="isActivated"
                dense
                checked-icon="check"
                color="positive"
                unchecked-icon="clear"
                label="&nbsp;&nbsp;Set as activated upon submit"
              />
            </div>
            <q-input
              v-model="budget"
              :dense="true"
              prefix="$"
              filled
              label="Budget"
              placeholder="0.00"
              input-class="text-right"
            />
            <q-input
              v-model="dateFrom"
              :dense="true"
              filled
              type="date"
              label="Date from"
            />
            <q-input
              v-model="dateTo"
              :dense="true"
              filled
              type="date"
              label="Date to"
            />
            <q-select
              v-model="agent"
              behavior="menu"
              :popup-content-class="[
                $q.dark.isActive
                  ? 'popupSelectContent bg-contrast no-shadow'
                  : 'popupSelectContent'
              ]"
              :placeholder="agent.length ? '' : 'Agent'"
              :dense="true"
              filled
              use-input
              use-chips
              multiple
              input-debounce="0"
              :options="filterAgentOptions"
              option-value="email"
              option-label="email"
              @new-value="createAgentValue"
              @filter="filterAgentFn"
            />
            <q-select
              v-model="client"
              behavior="menu"
              :popup-content-class="[
                $q.dark.isActive
                  ? 'popupSelectContent bg-contrast no-shadow'
                  : 'popupSelectContent'
              ]"
              :placeholder="client.length ? '' : 'Client'"
              :dense="true"
              filled
              use-input
              use-chips
              multiple
              input-debounce="0"
              :options="filterClientOptions"
              option-value="email"
              option-label="email"
              @new-value="createClientValue"
              @filter="filterClientFn"
            />
            <q-select
              v-model="templateId"
              behavior="menu"
              :popup-content-class="[
                $q.dark.isActive
                  ? 'popupSelectContent bg-contrast no-shadow'
                  : 'popupSelectContent'
              ]"
              :label="'SOW Template'"
              :dense="true"
              filled
              input-debounce="0"
              :options="sowTemplates"
              :loading="sowTemplateLoader || loadingTodoSubmit"
            >
              <template #loading>
                <div class="row justify-center">
                  <q-spinner-ios />
                </div>
              </template>
            </q-select>
          </q-card-section>
          <q-card-actions>
            <div class="row justify-between full-width q-px-sm">
              <q-btn
                icon="las la-undo"
                padding="sm xl"
                flat
                class="text-capitalize bg-negative round-btn"
                label="Reset"
                :disable="loadingSubmit"
                @click="formReset"
              ></q-btn>
              <q-btn
                icon="las la-check"
                padding="sm xl"
                color="info"
                :label="selected.length ? 'Update' : 'Submit'"
                class="text-capitalize round-btn"
                :loading="loadingSubmit"
                :disable="
                  loadingSubmit ||
                  !searchKey ||
                  !text ||
                  !desc ||
                  (updateMode ? false : !file) ||
                  !budget ||
                  !dateFrom ||
                  !dateTo ||
                  !templateId
                "
                @click="uploadFile"
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

      <div
        class="col-9"
        :class="{
          'col-12': $q.screen.lt.md
        }"
      >
        <q-card
          class="round-panel full-height no-shadow px-10 pt-10"
          :class="[$q.screen.gt.sm ? 'pt-15 mb-10' : 'pt-0 bg-transparent']"
        >
          <div class="row justify-between full-width items-center">
            <div class="text-subtitle2">
              <q-chip
                size="sm"
                icon="check"
                color="positive"
                text-color="white"
              >
                {{ rows.filter(f => f.isActivated == true).length }} Activated
              </q-chip>
              <q-chip
                size="sm"
                icon="close"
                color="negative"
                text-color="white"
              >
                {{ rows.filter(f => f.isActivated == false).length }} Not
                Activated
              </q-chip>
            </div>
            <!-- <div class="text-h6">{{ $q.screen.gt.sm ? 'List of Projects' : '' }}</div> -->
            <div v-if="$q.screen.lt.sm" class="">
              <q-btn
                rounded
                :color="selected.length ? 'primary' : 'info'"
                size="sm"
                :label="selected.length ? 'Update' : 'New Project'"
                :icon="selected.length ? 'las la-pen' : 'las la-plus'"
                no-caps
                @click="updateProjectDialog = true"
              />
            </div>
          </div>

          <div class="row full-width scroll">

            <q-table
              v-model:selected="selected"
              flat
              no-data-label="I didn't find anything for you"
              class="q-mb-sm full-width"
              row-key="title"
              selection="single"
              wrap-cells
              :hide-pagination="$q.screen.lt.sm"
              :grid="$q.screen.lt.sm"
              :selection-options="selectionOptions"
              :rows="rows"
              :columns="columns"
              :loading="rowLoading"
              :visible-columns="visibleColumns"
              :rows-per-page-options="[10]"
            >
              <template #body="props">
                <q-tr :props="props" :selected="props.selected">
                  <q-td key="id" :props="props">
                    {{ props.row.id }}
                  </q-td>
                  <q-td auto-width>
                    <q-checkbox
                      v-model="props.selected"
                      @update:model-value="setSelected"
                    />
                  </q-td>
                  <q-td key="avatarFullPath" :props="props">
                    <q-avatar rounded>
                      <img :src="`${props.row.avatarFullPath}`" />
                    </q-avatar>
                  </q-td>
                  <q-td key="title" :props="props">
                    {{ props.row.title }}
                  </q-td>
                  <q-td key="description" v-ellipsis="30" :props="props">
                    {{
                      props.row.description.length > maxLength
                        ? props.row.descriptionShortened
                        : props.row.description
                    }}
                  </q-td>
                  <q-td key="budget" :props="props">
                    {{ props.row.budget }}
                  </q-td>
                  <q-td key="dateFrom" v-formatdate :props="props">
                    {{ props.row.dateFrom }}
                  </q-td>
                  <q-td key="dateTo" v-formatdate :props="props">
                    {{ props.row.dateTo }}
                  </q-td>
                  <q-td key="createdBy" :props="props">
                    {{ props.row.createdBy }}
                  </q-td>
                  <q-td key="dateCreated" v-formatdate :props="props">
                    {{ props.row.dateCreated }}
                  </q-td>
                  <q-td key="isActive" :props="props">
                    <q-toggle
                      v-model="activatedList[props.row.id]"
                      dense
                      name="djan"
                      checked-icon="check"
                      unchecked-icon="clear"
                      color="positive"
                      unchecked-color="negative"
                      @update:model-value="updateStatus(props.row)"
                    />
                  </q-td>
                </q-tr>
              </template>

              <template #item="props">
                <q-card class="q-ma-sm full-width no-shadow" :style="style">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar rounded>
                        <img :src="props.row.avatarFullPath" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">
                        {{ props.row.title }}
                      </q-item-label>
                      <q-item-label caption>
                        {{
                          props.row.description.length > maxLength
                            ? props.row.descriptionShortened
                            : props.row.description
                        }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-checkbox
                        v-model="props.selected"
                        dense
                        @update:model-value="setSelected"
                      />
                    </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-card-section>
                    <div class="text-subtitle2">
                      <b>Budget:</b>
                      {{ props.row.budget }}
                    </div>
                    <div>
                      <b>From:</b>
                      <span v-formatdate v-html="props.row.dateFrom"></span>
                    </div>
                    <div>
                      <b>To:</b>
                      <span v-formatdate v-html="props.row.dateTo"></span>
                    </div>
                    <div>
                      <b>Created:</b>
                      <span v-formatdate v-html="props.row.dateCreated"></span>
                    </div>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-toggle
                      v-model="activatedList[props.row.id]"
                      class="mr-5"
                      dense
                      name="djan"
                      checked-icon="check"
                      unchecked-icon="clear"
                      color="positive"
                      unchecked-color="negative"
                      @update:model-value="updateStatus(props.row)"
                    />
                  </q-card-actions>
                </q-card>
              </template>

            </q-table>

          </div>

          <q-inner-loading :showing="rowLoading">
            <q-spinner-ios size="50px" color="secondary" />
          </q-inner-loading>

        </q-card>
      </div>
    </div>
  </div>
  <q-dialog v-model="updateProjectDialog" persistent>
    <q-card class="no-shadow">
      <q-card-section class="row items-center">
        <q-avatar
          size="sm"
          icon="las la-pen"
          color="negative"
          text-color="white"
        />
        <span class="q-ml-sm text-h6">
          {{ selected.length ? 'Update Project Details' : 'Add New Project' }}
        </span>
      </q-card-section>

      <q-card-section>
        <div
          class="row justify-between full-width items-center gap-10 scroll"
          style="height: 60vh"
        >
          <q-select
            v-model="searchKey"
            behavior="menu"
            :popup-content-class="[
              $q.dark.isActive
                ? 'popupSelectContent bg-contrast no-shadow'
                : 'popupSelectContent'
            ]"
            filled
            clearable
            use-input
            input-debounce="0"
            label="Location. (trigger search after 10 charaters)"
            class="full-width"
            :dense="true"
            :options="options"
            :loading="searchingPlaceLoader"
            @filter="filterFn"
          >
            <template #no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input
            v-model="text"
            class="full-width"
            :dense="true"
            filled
            label="Name"
          />
          <q-input
            v-model="desc"
            class="full-width"
            :dense="true"
            placeholder="Description..."
            filled
            type="textarea"
          />
          <q-tabs
            v-model="tab"
            class="bg-white-4 full-width"
            :dense="true"
            align="justify"
          >
            <q-tab
              class="text-orange text-capitalize"
              name="upload"
              icon="las la-upload"
              label="Upload"
            />
            <q-tab
              class="text-negative text-capitalize"
              name="capture"
              icon="las la-camera"
              label="Capture"
            />
          </q-tabs>
          <div v-if="tab === 'upload'" class="full-width q-pt-xs">
            <q-file
              v-model="file"
              :dense="true"
              label-color="primary"
              filled
              label="Choose File"
              multiple
              accept=".jpg, image/*"
              class="shadow-2"
            >
              <template #prepend>
                <q-icon name="cloud_upload" color="primary" />
              </template>
            </q-file>
          </div>
          <div v-if="tab === 'capture'" class="full-width q-pl-sm q-pt-xs">
            <q-btn
              dense
              align="left"
              class="text-capitalize full-width no-shadow round-btn"
              text-color="primary"
              color="grey-2"
              icon="las la-camera"
              label="Open camera"
              :disable="deviceIsReady"
              style="height: 40px"
              @click="captureImage"
            />
          </div>
          <div class="q-py-sm full-width">
            <q-toggle
              v-model="isActivated"
              dense
              checked-icon="check"
              color="positive"
              unchecked-icon="clear"
              label="&nbsp;&nbsp;Set as activated upon submit"
            />
          </div>
          <q-input
            v-model="budget"
            class="full-width"
            :dense="true"
            prefix="$"
            filled
            label="Budget"
            placeholder="0.00"
            input-class="text-right"
          />
          <q-input
            v-model="dateFrom"
            class="full-width"
            :dense="true"
            filled
            type="date"
            label="Date from"
          />
          <q-input
            v-model="dateTo"
            class="full-width"
            :dense="true"
            filled
            type="date"
            label="Date to"
          />
          <q-select
            v-model="agent"
            class="full-width"
            behavior="menu"
            :popup-content-class="[
              $q.dark.isActive
                ? 'popupSelectContent bg-contrast no-shadow'
                : 'popupSelectContent'
            ]"
            option-value="email"
            option-label="email"
            filled
            use-input
            use-chips
            multiple
            input-debounce="0"
            :options="filterAgentOptions"
            :placeholder="agent.length ? '' : 'Agent'"
            :dense="true"
            @new-value="createAgentValue"
            @filter="filterAgentFn"
          />
          <q-select
            v-model="client"
            class="full-width"
            behavior="menu"
            :popup-content-class="[
              $q.dark.isActive
                ? 'popupSelectContent bg-contrast no-shadow'
                : 'popupSelectContent'
            ]"
            filled
            use-input
            use-chips
            multiple
            input-debounce="0"
            option-value="email"
            option-label="email"
            :options="filterClientOptions"
            :placeholder="client.length ? '' : 'Client'"
            :dense="true"
            @new-value="createClientValue"
            @filter="filterClientFn"
          />
          <q-select
            v-model="templateId"
            class="full-width"
            behavior="menu"
            :popup-content-class="[
              $q.dark.isActive
                ? 'popupSelectContent bg-contrast no-shadow'
                : 'popupSelectContent'
            ]"
            filled
            input-debounce="0"
            :label="'SOW Template'"
            :dense="true"
            :options="sowTemplates"
            :loading="sowTemplateLoader || loadingTodoSubmit"
          >
            <template #loading>
              <div class="row justify-center">
                <q-spinner-ios />
              </div>
            </template>
          </q-select>
        </div>
      </q-card-section>

      <q-card-actions
        class="row q-pa-md full-width"
        :class="[$q.screen.lt.sm ? 'justify-between' : 'justify-end']"
      >
        <q-btn
          v-close-popup
          rounded
          size="sm"
          padding="sm xl"
          icon="las la-times"
          class="text-capitalize"
          label="Cancel"
          color="negative"
          :disable="loadingSubmit"
          @click="formReset"
        />
        <q-btn
          rounded
          size="sm"
          padding="sm xl"
          icon="las la-check"
          class="text-capitalize"
          color="info"
          :label="selected.length ? 'Update' : 'Submit'"
          :loading="loadingSubmit"
          :disable="
            loadingSubmit ||
            !searchKey ||
            !text ||
            !desc ||
            (updateMode ? false : !file) ||
            !budget ||
            !dateFrom ||
            !dateTo ||
            !templateId
          "
          @click="uploadFile"
        >
          <template #loading>
            <q-spinner-ios />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { computed, ref } from 'vue'
import { useQuasar, LocalStorage, uid, date } from 'quasar'
import ellipsis from 'src/directives/ellipsis'
import formatdate from 'src/directives/formatdate'
const stringOptions = []
// import KsBtn from 'src/components/Common/Button/KsBtn.vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  components: {},
  directives: { ellipsis, formatdate },
  props: {
    title: {
      type: String,
      default: ''
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  emits: ['emitFromChild'],
  setup() {
    const rows = []
    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      {
        name: 'avatarFullPath',
        align: 'left',
        label: 'Avatar',
        field: 'avatarFullPath'
      },
      {
        name: 'title',
        required: true,
        align: 'left',
        label: 'Project Title',
        field: 'title',
        sortable: true
      },
      {
        name: 'description',
        align: 'left',
        label: 'Description',
        field: 'description',
        sortable: true
      },
      {
        name: 'budget',
        align: 'left',
        label: 'Budget',
        field: 'budget',
        sortable: true
      },
      {
        name: 'dateFrom',
        align: 'left',
        label: 'From',
        field: 'dateFrom',
        sortable: true
      },
      {
        name: 'dateTo',
        align: 'left',
        label: 'To',
        field: 'dateTo',
        sortable: true
      },
      {
        name: 'createdBy',
        align: 'left',
        label: 'Created By',
        field: 'createdBy',
        sortable: true
      },
      {
        name: 'dateCreated',
        align: 'left',
        label: 'Date Created',
        field: 'dateCreated',
        sortable: true
      },
      {
        name: 'isActive',
        align: 'right',
        label: 'Activated',
        field: 'isActive'
      }
    ]
    const timeStamp = Date.now()
    const formattedTimestamp = date.formatDate(
      timeStamp,
      'YYYY-MM-DDTHH:mm:ss.SSSZ'
    )
    const options = ref(stringOptions)
    const visible = ref(false)
    const navigatorVal = ref([])
    const $q = useQuasar()
    const imageSrc = ref('')
    const deviceIsReady = ref(false)
    const btnToggle = ref(true)
    const camData = ref(null)
    const desc = ref('')
    const generatedUid = uid()

    const agent = ref([])
    const agentStringOptions = ref([])
    const filterAgentOptions = ref([])

    const client = ref([])
    const clientStringOptions = ref([])
    const filterClientOptions = ref([])
    // document.addEventListener('deviceready', () => {
    //   deviceIsReady.value = true
    //   // eslint-disable-next-line no-undef
    //   StatusBar.overlaysWebView(false)
    //   // eslint-disable-next-line no-undef
    //   StatusBar.backgroundColorByHexString('#C10015')
    // }, false)

    function captureImage() {
      navigator.camera.getPicture(
        data => {
          // on success
          $q.notify(data)
          camData.value = data
          imageSrc.value = `data:image/jpeg;base64,${data}`
        },
        () => {
          // on fail
          $q.notify('Could not access device camera.')
        },
        {
          // camera options
        }
      )
    }

    function printNavigator() {
      // console.log('printing out navigator', navigator)
      // console.log('typeof navigator 296', typeof navigator)

      for (const item in navigator) {
        // console.log('navigatorItem: ', item)
        navigatorVal.value.push({
          label: item,
          desc: JSON.stringify(navigator[item])
        })
      }
      // console.log('navigatorVal:', navigatorVal)
      // for (const item in window) {
      //   // console.log('windowItem: ', item)
      // }
    }

    function saveLocally(f) {
      try {
        this.logs.push('> saveLocally: at try')
        window.resolveLocalFileSystemURL(
          cordova.file.dataDirectory,
          function (dirEntry) {
            // console.log('file system open: ' + dirEntry.name)
            this.logs.push('> file system open: ' + dirEntry.name)
            this.$q.notify({
              icon: 'check_circle',
              color: 'green',
              message: 'File saved to phone: ' + JSON.toString(dirEntry),
              position: 'top-right',
              classes: 'notify-custom-css'
            })

            const isAppend = true
            // eslint-disable-next-line no-undef
            createFile(dirEntry, f.name, isAppend)
            this.logs.push(
              '> createFile is called, dirEntry.name: ' + dirEntry.name
            )
            this.$q.notify({
              icon: 'check_circle',
              color: 'green',
              message: 'File saved to phone',
              position: 'top-right',
              classes: 'notify-custom-css'
            })
          },
          err => {
            // console.log(err)
            this.logs.push('> Error at inner catch: ' + err)
            this.$q.notify({
              icon: 'las la-exclamation-circle',
              color: 'negative',
              message: 'Error flag 1' + err,
              position: 'top-right',
              classes: 'notify-custom-css'
            })
          }
        )
      } catch (e) {
        this.logs.push('> Error at outer catch: ' + e)
        this.$q.notify({
          icon: 'las la-exclamation-circle',
          color: 'negative',
          message: 'Error flag 2' + e,
          position: 'top-right',
          classes: 'notify-custom-css'
        })
      }
    }

    function saveLocally2(f) {
      try {
        this.logs.push('> saveLocally2: at try')
        // eslint-disable-next-line no-undef
        window.requestFileSystem(
          // eslint-disable-next-line no-undef
          LocalFileSystem.PERSISTENT,
          0,
          function (fs) {
            // console.log('file system open: ' + fs.name)
            this.logs.push('> at requestFileSystem' + fs.name)
            fs.root.getFile(
              f.name,
              { create: true, exclusive: false },
              function (fileEntry) {
                this.logs.push('> at fs.root.getFile' + fileEntry)
                // console.log('fileEntry is file?' + fileEntry.isFile.toString())
                // fileEntry.name == 'someFile.txt'
                // fileEntry.fullPath == '/someFile.txt'
                // eslint-disable-next-line no-undef
                writeFile(fileEntry, null)
                this.logs.push('> after writeFile')
                // eslint-disable-next-line no-undef
              },
              err => {
                this.logs.push(
                  '> requestFileSystem:OnErrorCreateFile callback error' + err
                )
              }
            )
            // eslint-disable-next-line no-undef
          },
          err => {
            this.logs.push(
              '> requestFileSystem:OnErrorLoadFs callback error' + err
            )
          }
        )
      } catch (e) {
        this.logs.push('> Error at outer catch: ' + e)
        this.$q.notify({
          icon: 'las la-exclamation-circle',
          color: 'negative',
          message: 'Error flag 2' + e,
          position: 'top-right',
          classes: 'notify-custom-css'
        })
      }
    }

    return {
      addProjectDialog: ref(false),
      updateProjectDialog: ref(false),
      style: ref({
        'background-color': computed(() =>
          $q.dark.isActive ? 'rgba(255, 255, 255, 0.1)' : '#ffffff'
        ),
        'border-radius': '8px',
        border: '.1px solid rgb(198 198 198, 0.5)'
      }),
      filterClientOptions,
      clientStringOptions,
      client,
      filterAgentOptions,
      agentStringOptions,
      agent,
      searchingPlaceLoader: ref(false),
      rows,
      columns,
      selected: ref([]),
      selectionOptions: {
        type: 'single',
        checkbox: true,
        highlight: true
      },
      updateMode: ref(false),
      visibleColumns: ref([
        'avatarFullPath',
        'title',
        'description',
        'budget',
        'dateFrom',
        'dateTo',
        'avatar',
        'dateCreated',
        'isActive'
      ]),
      rowLoading: ref(false),
      loadingSubmit: ref(false),
      isActivated: ref(false),
      budget: ref(0),
      dateFrom: ref(''),
      dateTo: ref(''),
      activatedList: ref({}),
      breadcrumbs: ref([
        {
          label: 'Back',
          icon: 'las la-chevron-left',
          route: '/projects'
        }
      ]),
      saveLocally,
      saveLocally2,
      tab: ref('upload'),
      logs: ref([]),
      formattedTimestamp,
      currentUser: ref(null),
      authUser: ref(null),
      uid: ref(null),
      generatedUid,
      projectAvatar: ref(null),
      projectAvatarPath: ref(null),
      file: ref(null),
      camData,
      btnToggle,
      deviceIsReady,
      printNavigator,
      navigatorVal,
      imageSrc,
      captureImage,
      searchKey: ref(null),
      text: ref(null),
      desc,
      options,
      visible,
      initFunction() {},
      createAgentValue(val, done) {
        if (val.length > 0) {
          const modelValue = (agent.value || []).slice()

          val
            .split(/[,;|]+/)
            .map(v => v.trim())
            .filter(v => v.length > 0)
            .forEach(v => {
              if (agentStringOptions.value.includes(v) === false) {
                agentStringOptions.value.push(v)
              }
              if (modelValue.includes(v) === false) {
                modelValue.push({
                  email: v
                })
              }
            })

          done(null)
          agent.value = modelValue
        }
      },
      createClientValue(val, done) {
        if (val.length > 0) {
          const modelValue = (client.value || []).slice()

          val
            .split(/[,;|]+/)
            .map(v => v.trim())
            .filter(v => v.length > 0)
            .forEach(v => {
              if (clientStringOptions.value.includes(v) === false) {
                clientStringOptions.value.push(v)
              }
              if (modelValue.includes(v) === false) {
                modelValue.push({
                  email: v
                })
              }
            })

          done(null)
          client.value = modelValue
        }
      },
      maxLength: 30,
      sowTemplateLoader: ref(false),
      templateId: ref(null),
      sowTemplates: ref([]),
      loadingTodoSubmit: ref(false)
    }
  },
  computed: {
    test: function () {
      return "I'm computed hook"
    },
    bgColor: function () {
      return this.$q.dark.isActive ? 'rgba(255, 255, 255, 0.1)' : '#f0f4f7'
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
    this.fetchProjects()
  },
  async mounted() {
    this.showTextLoading()
    this.authUser = LocalStorage.getItem('authUser')
    this.uid = this.authUser.uid
    this.agentStringOptions = [
      {
        email: 'agent.one@yopmail.com'
      },
      {
        email: 'agent.two@yopmail.com'
      },
      {
        email: 'agent.three@yopmail.com'
      },
      {
        email: 'agent.four@yopmail.com'
      },
      {
        email: 'agent.five@yopmail.com'
      }
    ]
    this.clientStringOptions = [
      {
        email: 'client.one@yopmail.com'
      },
      {
        email: 'client.two@yopmail.com'
      },
      {
        email: 'client.three@yopmail.com'
      },
      {
        email: 'client.four@yopmail.com'
      },
      {
        email: 'client.five@yopmail.com'
      }
    ]
    await this.getSowTemplate()
    this.autoMapTodoList()

    this.$emit('emitFromChild')
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
    filterClientFn(val, update) {
      update(() => {
        if (val === '') {
          this.filterClientOptions = this.clientStringOptions
        } else {
          const needle = val.toLowerCase()
          this.filterClientOptions = this.clientStringOptions?.filter(v =>
            v.email?.toLowerCase().includes(needle.toLowerCase())
          )
        }
      })
    },
    filterAgentFn(val, update) {
      update(() => {
        if (val === '') {
          this.filterAgentOptions = this.agentStringOptions
        } else {
          const needle = val.toLowerCase()
          this.filterAgentOptions = this.agentStringOptions?.filter(v =>
            v.email?.toLowerCase().includes(needle.toLowerCase())
          )
        }
      })
    },
    setSelected(value) {
      console.log(value, this.selected[0])
      console.log('this.sowTemplates', this.sowTemplates)
      this.updateMode = value

      this.searchKey = {
        value: this.selected[0]?.location || '',
        label: this.selected[0]?.location || ''
      }
      this.text = this.selected[0]?.title
      this.desc = this.selected[0]?.description
      this.projectAvatar = this.selected[0]?.avatar
      this.projectAvatarPath = this.selected[0]?.avatarFullPath
      this.isActivated = this.selected[0]?.isActivated || false
      this.budget = this.selected[0]?.budget
      this.dateFrom = this.selected[0]?.dateFrom
      this.dateTo = this.selected[0]?.dateTo
      this.agent = this.selected[0]?.agent || []
      this.client = this.selected[0]?.client || []
      this.templateId = this.sowTemplates.find(
        e => e.id === this.selected[0]?.templateId
      )
    },
    enterPressed(evt) {
      console.log('enter key is pressed', evt)
      console.log('this.searchKey', this.searchKey)
      // this.filterFn(this.searchKey, () => {}, () => {})
    },
    filterFn(val, update, abort) {
      if (val === '') {
        update(() => {
          this.options = stringOptions
        })
        abort()
        return
      }
      if (val.length < 11) {
        abort()
        return
      }
      this.searchingPlaceLoader = true
      update(async () => {
        const needle = val.toLowerCase()
        const resp = await this.$findPlace('address', needle)
        this.options = resp?.data?.predictions.map(e => {
          return {
            label: e.description,
            value: e.description
          }
        })
        this.searchingPlaceLoader = false
      })
    },
    async startProject() {
      // console.log('> file', this.file)
      this.logs.push('>' + JSON.stringify(this.file))
      // for (const item in this.file[0]) {
      //   // console.log('navigatorItem: ', this.file[0][item])
      //   this.navigatorVal.push({
      //     label: item,
      //     desc: JSON.stringify(this.file[0][item])
      //   })
      // }
      // await this.uploadFile()
      // await this.saveProjectDetails()
      this.logs.push('>' + JSON.stringify(this.file[0]))
      this.saveLocally(this.file[0])
    },
    async startProject2() {
      // console.log('> file', this.file)
      this.logs.push('>' + JSON.stringify(this.file))
      // for (const item in this.file[0]) {
      //   // console.log('navigatorItem: ', this.file[0][item])
      //   this.navigatorVal.push({
      //     label: item,
      //     desc: JSON.stringify(this.file[0][item])
      //   })
      // }
      // await this.uploadFile()
      // await this.saveProjectDetails()
      this.logs.push('>' + JSON.stringify(this.file[0]))
      this.saveLocally2(this.file[0])
    },
    async uploadFile() {
      this.loadingSubmit = true
      const files = this.file
      if (files === null) {
        if (this.updateMode) {
          await this.updateProjectDetails()
          return
        }
        return
      }
      const metadata = {
        contentType: files[0].type
      }
      const storageRef = this.$fbstorageref(
        this.$fbstorage,
        `files/projects/${files[0].name.split('.')[0]}.${files[0].name.split('.')[1]}`
      )
      const uploadTask = this.$uploadbytesresumable(
        storageRef,
        files[0],
        metadata
      )
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        () => {
          // Handle unsuccessful uploads
          this.loadingSubmit = false
          this.$q.notify({
            icon: 'warning',
            color: 'warning',
            message: 'Error Uploading file, see logs',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          this.$getdownloadurl(uploadTask.snapshot.ref).then(
            async downloadURL => {
              // console.log('File available at', downloadURL)
              // console.log(files)
              this.projectAvatar = `${files[0].name.split('.')[0]}.${
                files[0].name.split('.')[1]
              }`
              this.projectAvatarPath = downloadURL
              if (this.updateMode) {
                console.log('update mode')
                await this.updateProjectDetails()
              } else {
                console.log('insert mode')
                await this.saveProjectDetails()
              }
            }
          )
        }
      )
    },
    async updateProjectDetails() {
      console.log('this.templateId', this.templateId)
      const payload = {
        createdBy: this.selected[0]?.createdBy,
        location: this.searchKey.value || this.searchKey.label,
        title: this.text,
        description: this.desc,
        avatar: this.projectAvatar,
        avatarFullPath: this.projectAvatarPath,
        id: this.selected[0].id,
        isActivated: this.isActivated,
        budget: this.budget,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        dateCreated: this.selected[0]?.dateCreated,
        client: this.client,
        agent: this.agent,
        templateId: this.templateId.id
      }
      console.log(payload)
      console.log('this.sowTemplate', this.sowTemplates)
      const updates = {}
      updates[`projects/${this.selected[0].id}/`] = payload
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(async () => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Updated',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          this.saveTodo(this.selected[0].id)
          this.loadingSubmit = false
          this.formReset()
          this.selected = []
          this.updateMode = false
          await this.fetchProjects()
        })
        .catch(async () => {
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          this.loadingSubmit = false
          this.formReset()
          this.selected = []
          this.updateMode = false
          await this.fetchProjects()
        })
    },
    async saveProjectDetails() {
      const payload = {
        createdBy: this.uid,
        dateCreated: this.formattedTimestamp,
        title: this.text,
        description: this.desc,
        avatar: this.projectAvatar,
        avatarFullPath: this.projectAvatarPath,
        id: uid(),
        isActivated: this.isActivated,
        budget: this.budget,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        location: this.searchKey.value || this.searchKey.label,
        agent: this.agent,
        client: this.client,
        templateId: this.templateId.id
      }
      const updates = {}
      updates[`projects/${payload.id}/`] = payload
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(async () => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Created',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          this.loadingSubmit = false
          await this.sendClientEmail(payload.id)
          this.saveTodo(payload.id)
          this.formReset()
          await this.fetchProjects()
        })
        .catch(async () => {
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          this.loadingSubmit = false
          this.formReset()
          await this.fetchProjects()
        })
    },
    async sendClientEmail(projectId) {
      const clients = this.client.map(e => e.email)
      const agents = this.agent.map(e => e.email)
      const subject = 'Join to Application'
      const projectName = this.text
      clients.forEach(recepient => {
        this.$sendEmailToAgentAndClient(
          recepient,
          subject,
          projectName,
          projectId,
          'client'
        )
      })
      agents.forEach(agent => {
        this.$sendEmailToAgentAndClient(
          agent,
          subject,
          projectName,
          projectId,
          'agent'
        )
      })
    },
    async formReset() {
      this.searchKey = null
      this.text = null
      this.desc = null
      this.file = null
      this.isActivated = false
      this.budget = null
      this.dateFrom = null
      this.dateTo = null
      this.client = []
      this.agent = []
      this.templateId = null
    },
    showTextLoading() {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    factoryFn(files) {
      const metadata = {
        contentType: files[0].type
      }
      console.log({ metadata })
    },
    fnToggle(v) {
      if (v === 1) {
        this.btnToggle = true
      } else {
        this.btnToggle = false
      }
    },
    async fetchProjects() {
      this.rowLoading = true
      this.rows = []
      const projectsTable = this.$fbref(this.$fbdb, 'projects')
      // This is not real time. need reload to append data to list
      const projectsQuery = await this.$fbget(projectsTable)
      const results = projectsQuery.val()
      if (!results) {
        this.rowLoading = false
        return
      }
      // console.log('results', results)
      this.rows = Object.values(results)
      this.rows.forEach(element => {
        element.isActive = element.isActivated || false
        // The next line is a MAGIC. theres a bug in the framework regarding
        // qtoggle animation not working inside qTable !!!
        // I must improvise
        this.activatedList[element.id] = element.isActive

        // apply ellipsis to long text description
        if (element.description.length > this.maxLength) {
          element.descriptionShortened =
            element.description.substring(0, this.maxLength) + '..'
        }

        // apply dateCreated format.
        // if (element.dateCreated)
      })
      this.rowLoading = false
    },
    async updateStatus(val) {
      delete val.isActive
      val.isActivated = !val.isActivated
      const updates = {}
      updates[`projects/${val.id}/`] = val
      await this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Activated',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
        .catch(() => {
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
    },
    async getSowTemplate() {
      this.sowTemplateLoader = true
      const sowTemplates = this.$fbref(this.$fbdb, 'sowTemplates')
      this.$fbonValue(sowTemplates, snapshot => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          this.sowTemplates = []
          return
        }
        const data_ = Object.values(data)
        this.sowTemplates = data_
        this.sowTemplates.forEach(item => {
          item.dateCreated = date.formatDate(
            item.dateCreated,
            'MMM DD, YYYY HH:mm A'
          )
          item.label = item.name
          item.value = item.id
        })
        this.sowTemplateLoader = false
      })
    },
    async autoMapTodoList() {
      console.log('this.sowTemplates before:', this.sowTemplates)
      for (const outerItem of this.sowTemplates) {
        for (const item in outerItem.sow) {
          Object.assign(outerItem.sow[item], {
            files: {},
            isArchived: false,
            isCompleted: false,
            members: [],
            todoDesc: outerItem?.sow[item]?.sowDescription || '',
            todoTitle: outerItem?.sow[item]?.sowCategory || ''
          })
        }
      }
      console.log('this.sowTemplates after:', this.sowTemplates)
    },
    async saveTodo(projectId) {
      this.loadingTodoSubmit = true
      console.log('this.templateId', this.templateId)
      const updates = {}
      updates[`task/${projectId}/`] = this.templateId.sow
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          this.loadingTodoSubmit = false
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Created',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
        .catch(error => {
          // console.log({ error })
          this.loadingTodoSubmit = false
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found\n' + error,
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.adminCard {
  min-height: 857px;
}
.q-item {
  min-height: 48px;
  padding: 8px 10px !important;
  color: inherit;
  transition:
    color 0.3s,
    background-color 0.3s;
}
:deep(.q-separator--horizontal) {
  display: block;
  height: 0.1px;
}
:deep(.q-field__control:after) {
  display: none !important;
}
</style>
