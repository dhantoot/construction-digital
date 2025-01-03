<template>
  <h5 class="text-center">Manage your projects here</h5>
  <div class="row q-px-lg">
    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <q-card class="q-ma-sm adminCard round-panel">
        <q-card-section>
          <div class="text-h6">{{ selected.length ? 'Update' : 'New' }} Project</div>
          <div class="text-subtitle2 row justify-between">
            <div>{{ selected.length ? 'update project details' : 'add a new project' }}</div>
            <div v-if="selected.length" class="text-blue text-bold">[ Update Mode ]</div>
          </div>
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <q-select
            filled
            clearable
            v-model="searchKey"
            use-input
            input-debounce="0"
            label="Location. (trigger search after 10 charaters)"
            class="q-mt-md"
            :dense="true"
            :options="options"
            :loading="searchingPlaceLoader"
            @filter="filterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input :dense="true" filled v-model="text" label="Name" class="bg-grey-2"/>
          <q-input
            :dense="true"
            placeholder="Description..."
            v-model="desc"
            filled
            type="textarea"
         />
          <q-tabs v-model="tab" class="bg-white-4" :dense="true" align="justify">
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
          <div class="full-width q-pt-xs" v-if="tab === 'upload'">
            <q-file
              :dense="true"
              label-color="primary"
              filled
              v-model="file"
              label="Choose File"
              multiple
              accept=".jpg, image/*"
              class="q-ml-sm shadow-2"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" color="primary"/>
              </template>
            </q-file>
          </div>
          <div class="full-width q-pl-sm q-pt-xs" v-if="tab === 'capture'">
            <q-btn
              dense
              align="left"
              class="text-capitalize full-width no-shadow round-btn"
              text-color="primary"
              color="grey-2"
              icon="las la-camera"
              label="Open camera"
              @click="captureImage"
              :disable="deviceIsReady"
              style="height: 40px;"
           />
          </div>
          <q-toggle
            v-model="isActivated"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            label="Set as activated upon submit"
         />
          <q-input
            :dense="true"
            prefix="$"
            filled
            v-model="budget"
            label="Budget"
            placeholder="0.00"
            input-class="text-right"
         />
          <q-input :dense="true" v-model="dateFrom" filled type="date" label="Date from"/>
          <q-input :dense="true" v-model="dateTo" filled type="date" label="Date to"/>
          <q-select
            :placeholder="agent.length ? '' : 'Agent'"
            :dense="true"
            filled
            v-model="agent"
            use-input
            use-chips
            multiple
            input-debounce="0"
            @new-value="createAgentValue"
            :options="filterAgentOptions"
            @filter="filterAgentFn"
            option-value="email"
            option-label="email"
          />
          <q-select
            :placeholder="client.length ? '' : 'Client'"
            :dense="true"
            filled
            v-model="client"
            use-input
            use-chips
            multiple
            input-debounce="0"
            @new-value="createClientValue"
            :options="filterClientOptions"
            @filter="filterClientFn"
            option-value="email"
            option-label="email"
          />
        </q-card-section>
        <q-card-actions align="right" class="q-pr-md">
          <q-btn
            icon="las la-undo"
            padding="sm xl"
            flat
            class="text-capitalize bg-cancel round-btn"
            label="Reset"
            :disable="loadingSubmit"
            @click="formReset"
          >
          </q-btn>
          <q-btn
            icon="las la-check"
            padding="sm xl"
            @click="uploadFile"
            color="primary"
            :label="selected.length ? 'Update' : 'Submit'"
            class="text-capitalize bg-info round-btn"
            :loading="loadingSubmit"
            :disable="loadingSubmit || !searchKey || !text || !desc || (updateMode ? false : !file ) || !budget || !dateFrom || !dateTo"
          >
            <template v-slot:loading>
              <q-spinner-ios/>
            </template>
          </q-btn>
        </q-card-actions>
        <q-inner-loading :showing="visible">
          <q-spinner-ios size="50px" color="secondary"/>
        </q-inner-loading>
      </q-card>
    </div>
    <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
      <q-card class="q-ma-sm adminCard round-panel">
        <q-card-section>
          <div class="text-h6">List of Projects</div>
          <div class="text-subtitle2 text-right">
            <q-chip class="q-ml-none">
              <q-avatar size="25px" color="info" text-color="white">{{ rows.filter(f => f.isActivated == true).length }}</q-avatar>
              active
            </q-chip>
            <q-chip class="q-ml-none">
              <q-avatar size="25px" color="negative" text-color="white">{{ rows.filter(f => f.isActivated == false).length }}</q-avatar>
              inactive
            </q-chip>
          </div>
        </q-card-section>
        <q-table
          no-data-label="I didn't find anything for you"
          class="q-mb-sm q-mr-sm"
          row-key="title"
          selection="single"
          v-model:selected="selected"
          :selection-options="selectionOptions"
          :rows="rows"
          :columns="columns"
          :loading="rowLoading"
          :visible-columns="visibleColumns"
          :rows-per-page-options="[10]"
        >
          <template v-slot:body="props">
            <q-tr :props="props" :selected="props.selected">
              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>
              <q-td auto-width>
                <q-checkbox v-model="props.selected" @update:model-value="setSelected"/>
              </q-td>
              <q-td key="avatarFullPath" :props="props">
                <q-avatar rounded>
                  <img :src="`${props.row.avatarFullPath}`"/>
                </q-avatar>
              </q-td>
              <q-td key="title" :props="props">
                {{ props.row.title }}
              </q-td>
              <q-td key="description" :props="props" v-ellipsis="30">
                {{ props.row.description.length > maxLength ? props.row.descriptionShortened : props.row.description }}
              </q-td>
              <q-td key="budget" :props="props">
                {{ props.row.budget }}
              </q-td>
              <q-td key="dateFrom" :props="props">
                {{ props.row.dateFrom }}
              </q-td>
              <q-td key="dateTo" :props="props">
                {{ props.row.dateTo }}
              </q-td>
              <q-td key="createdBy" :props="props">
                {{ props.row.createdBy }}
              </q-td>
              <q-td v-formatdate key="dateCreated" :props="props">
                {{ props.row.dateCreated }}
              </q-td>
              <q-td key="isActive" :props="props">
                <q-toggle
                  name="djan"
                  checked-icon="check"
                  unchecked-icon="clear"
                  color="secondary"
                  unchecked-color="negative"
                  @update:model-value="updateStatus(props.row)"
                  v-model="activatedList[props.row.id]"
               />
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-inner-loading :showing="rowLoading">
            <q-spinner-ios size="50px" color="secondary"/>
        </q-inner-loading>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
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
  components: {
  },
  directives: { ellipsis, formatdate },
  setup () {
    const rows = []
    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      { name: 'avatarFullPath', align: 'left', label: 'Avatar', field: 'avatarFullPath' },
      { name: 'title', required: true, align: 'left', label: 'Project Title', field: 'title', sortable: true },
      { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true },
      { name: 'budget', align: 'left', label: 'Budget', field: 'budget', sortable: true },
      { name: 'dateFrom', align: 'left', label: 'From', field: 'dateFrom', sortable: true },
      { name: 'dateTo', align: 'left', label: 'To', field: 'dateTo', sortable: true },
      { name: 'createdBy', align: 'left', label: 'Created By', field: 'createdBy', sortable: true },
      { name: 'dateCreated', align: 'left', label: 'Date Created', field: 'dateCreated', sortable: true },
      { name: 'isActive', align: 'right', label: 'Activated', field: 'isActive' }
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

    function captureImage () {
      navigator.camera.getPicture(
        (data) => {
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

    function printNavigator () {
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

    function saveLocally (f) {
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
          (err) => {
            // console.log(err)
            this.logs.push('> Error at inner catch: ' + err)
            this.$q.notify({
              icon: 'exclamation-circle',
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
          icon: 'exclamation-circle',
          color: 'negative',
          message: 'Error flag 2' + e,
          position: 'top-right',
          classes: 'notify-custom-css'
        })
      }
    }

    function saveLocally2 (f) {
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
              (err) => {
                this.logs.push(
                  '> requestFileSystem:OnErrorCreateFile callback error' + err
                )
              }
            )
            // eslint-disable-next-line no-undef
          },
          (err) => {
            this.logs.push(
              '> requestFileSystem:OnErrorLoadFs callback error' + err
            )
          }
        )
      } catch (e) {
        this.logs.push('> Error at outer catch: ' + e)
        this.$q.notify({
          icon: 'exclamation-circle',
          color: 'negative',
          message: 'Error flag 2' + e,
          position: 'top-right',
          classes: 'notify-custom-css'
        })
      }
    }

    return {
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
      visibleColumns: ref(['avatarFullPath', 'title', 'description', 'budget', 'dateFrom', 'dateTo', 'avatar', 'dateCreated', 'isActive']),
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
      initFunction () {
      },
      createAgentValue (val, done) {
        if (val.length > 0) {
          const modelValue = (agent.value || []).slice()

          val
            .split(/[,;|]+/)
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
            .forEach((v) => {
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
      createClientValue (val, done) {
        if (val.length > 0) {
          const modelValue = (client.value || []).slice()

          val
            .split(/[,;|]+/)
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
            .forEach((v) => {
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
      maxLength: 30
    }
  },
  props: {
    title: String,
    likes: Number
  },
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
    this.fetchProjects()
  },
  mounted () {
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
    filterClientFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterClientOptions = this.clientStringOptions
        } else {
          const needle = val.toLowerCase()
          this.filterClientOptions = this.clientStringOptions?.filter((v) =>
            v.email?.toLowerCase().includes(needle.toLowerCase())
          )
        }
      })
    },
    filterAgentFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterAgentOptions = this.agentStringOptions
        } else {
          const needle = val.toLowerCase()
          this.filterAgentOptions = this.agentStringOptions?.filter((v) =>
            v.email?.toLowerCase().includes(needle.toLowerCase())
          )
        }
      })
    },
    setSelected (value, evt) {
      console.log(value, this.selected[0])
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
    },
    enterPressed (evt) {
      console.log('enter key is pressed', evt)
      console.log('this.searchKey', this.searchKey)
      // this.filterFn(this.searchKey, () => {}, () => {})
    },
    filterFn (val, update, abort) {
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
        this.options = resp?.data?.predictions.map((e) => {
          return {
            label: e.description,
            value: e.description
          }
        })
        this.searchingPlaceLoader = false
      })
    },
    async startProject () {
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
    async startProject2 () {
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
    async uploadFile () {
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
        (snapshot) => {
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
            async (downloadURL) => {
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
    async updateProjectDetails () {
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
        agent: this.agent
      }
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
          this.loadingSubmit = false
          this.formReset()
          this.selected = []
          this.updateMode = false
          await this.fetchProjects()
        })
        .catch(async () => {
          this.$q.notify({
            icon: 'exclamation-circle',
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
    async saveProjectDetails () {
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
        client: this.client
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
          this.formReset()
          await this.fetchProjects()
        })
        .catch(async () => {
          this.$q.notify({
            icon: 'exclamation-circle',
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
    async sendClientEmail (projectId) {
      const clients = this.client.map(e => e.email)
      const agents = this.agent.map(e => e.email)
      const subject = 'Join to Application'
      const projectName = this.text
      clients.forEach((recepient) => {
        this.$sendEmailToAgentAndClient(recepient, subject, projectName, projectId, 'client')
      })
      agents.forEach((agent) => {
        this.$sendEmailToAgentAndClient(agent, subject, projectName, projectId, 'agent')
      })
    },
    async formReset () {
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
    },
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    factoryFn (files) {
      const metadata = {
        contentType: files[0].type
      }
      console.log({ metadata })
    },
    fnToggle (v) {
      if (v === 1) {
        this.btnToggle = true
      } else {
        this.btnToggle = false
      }
    },
    async fetchProjects () {
      this.rowLoading = true
      this.rows = []
      const projectsTable = this.$fbref(this.$fbdb, 'projects')
      const projectsQuery = await this.$fbget(projectsTable)
      const results = projectsQuery.val()
      if (!results) return
      // console.log('results', results)
      this.rows = Object.values(results)
      this.rows.forEach((element, index) => {
        element.isActive = element.isActivated || false
        // The next line is a MAGIC. theres a bug in the framework regarding
        // qtoggle animation not working inside qTable !!!
        // I must improvise
        this.activatedList[element.id] = element.isActive

        // apply ellipsis to long text description
        if (element.description.length > this.maxLength) {
          element.descriptionShortened = element.description.substring(0, this.maxLength) + '..'
        }
      })
      this.rowLoading = false
    },
    async updateStatus (val) {
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
            icon: 'exclamation-circle',
            color: 'negative',
            message: 'Error found',
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
  min-height: 824px;
}
</style>
