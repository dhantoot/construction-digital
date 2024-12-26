<template>
  <h5 class="text-center">Manage your projects here</h5>
  <div class="row">
    <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
      <q-card class="q-ma-sm adminCard">
        <q-card-section>
          <div class="text-h6">New Project</div>
          <div class="text-subtitle2">add a new project here</div>
        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <q-select
            :dense="true"
            filled
            v-model="model"
            use-input
            input-debounce="0"
            label="Location"
            :options="options"
            @filter="filterFn"
            class="q-mt-md"
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
              size="lg"
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
              class="text-capitalize full-width no-shadow"
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
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            input-class="text-right"
         />
          <q-input :dense="true" v-model="dateFrom" filled type="date" label="Date from"/>
          <q-input :dense="true" v-model="dateTo" filled type="date" label="Date to"/>
        </q-card-section>
        <q-card-actions align="right" class="q-pr-md">
          <!-- <q-btn
            flat
            class="text-capitalize bg-cancel"
            label="Hello"
            size="lg">
          </q-btn> -->
          <KsBtn
            :label="'Submit'"
            :fn="uploadFile"
         />
          <q-btn
            flat
            class="text-capitalize bg-cancel"
            label="Reset"
            :disable="loadingSubmit"
            @click="formReset"
          >
          </q-btn>
          <q-btn
            color="primary"
            label="Submit"
            class="text-capitalize bg-info"
            @click="uploadFile"
            :disable="loadingSubmit || !model || !text || !desc || !file || !budget || !dateFrom || !dateTo"
            :loading="loadingSubmit"
          >
            <template v-slot:loading>
              <q-spinner-bars/>
            </template>
          </q-btn>
        </q-card-actions>
        <!-- <q-skeleton square/> -->
        <q-inner-loading :showing="visible">
          <q-spinner-bars size="50px" color="secondary"/>
        </q-inner-loading>
      </q-card>
    </div>
    <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
      <q-card class="q-ma-sm adminCard">
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
          row-key="name"
          :rows="rows"
          :columns="columns"
          :loading="rowLoading"
          :visible-columns="visibleColumns"
          :rows-per-page-options="[10]"
        >
          <template v-slot:loading>
            <q-inner-loading :showing="visible">
              <q-spinner-bars size="50px" color="secondary"/>
            </q-inner-loading>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>
              <q-td key="title" :props="props">
                {{ props.row.title }}
              </q-td>
              <q-td key="description" :props="props">
                {{ props.row.description }}
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
              <q-td key="dateCreated" :props="props">
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
        <!-- <q-skeleton square/> -->
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useQuasar, LocalStorage, uid, date } from 'quasar'
const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
import KsBtn from 'src/components/Common/Button/KsBtn.vue'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  components: {
    KsBtn
  },
  setup () {
    const rows = []
    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      { name: 'title', align: 'left', label: 'Project Title', field: 'title', sortable: true },
      { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true },
      { name: 'budget', align: 'left', label: 'Budget', field: 'budget', sortable: true },
      { name: 'dateFrom', align: 'left', label: 'From', field: 'dateFrom', sortable: true },
      { name: 'dateTo', align: 'left', label: 'To', field: 'dateTo', sortable: true },
      { name: 'createdBy', align: 'left', label: 'Created By', field: 'createdBy', sortable: true },
      { name: 'dateCreated', align: 'left', label: 'Date Created', field: 'dateCreated', sortable: true },
      { name: 'avatarFullPath', align: 'right', label: 'Avatar', field: 'avatarFullPath', sortable: true, hidden: true },
      { name: 'isActive', align: 'right', label: '296Activated', field: 'isActive' }
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
              color: 'positive',
              message: 'File saved to phone: ' + JSON.toString(dirEntry),
              position: 'top-right'
            })
            const isAppend = true
            // eslint-disable-next-line no-undef
            createFile(dirEntry, f.name, isAppend)
            this.logs.push(
              '> createFile is called, dirEntry.name: ' + dirEntry.name
            )
            this.$q.notify({
              icon: 'check_circle',
              color: 'positive',
              message: 'File saved to phone',
              position: 'top-right'
            })
          },
          (err) => {
            // console.log(err)
            this.logs.push('> Error at inner catch: ' + err)
            this.$q.notify({
              icon: 'exclamation-circle',
              color: 'negative',
              message: 'Error flag 1' + err,
              position: 'bottom-left'
            })
          }
        )
      } catch (e) {
        this.logs.push('> Error at outer catch: ' + e)
        this.$q.notify({
          icon: 'exclamation-circle',
          color: 'negative',
          message: 'Error flag 2' + e,
          position: 'bottom-right'
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
          position: 'bottom-right'
        })
      }
    }

    return {
      rows,
      columns,
      visibleColumns: ref(['title', 'description', 'budget', 'dateFrom', 'dateTo', 'avatar', 'dateCreated', 'isActive']),
      rowLoading: ref(false),
      loadingSubmit: false,
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
      model: ref(null),
      text: ref(null),
      desc,
      options,
      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = stringOptions

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          )
        })
      },
      visible,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      }
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
    // this.$emit('showHeader', false, [
    //   {
    //     label: 'Back',
    //     icon: 'las la-chevron-left',
    //     route: '/projects'
    //   }
    // ])
    this.showTextLoading()
    // this.currentUser = LocalStorage.getItem('currentUser')
    // // console.log('this.currentUser', this.currentUser)
    this.authUser = LocalStorage.getItem('authUser')
    // console.log('this.authUser', this.authUser)
    this.uid = this.authUser.uid
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
    uploadFile () {
      this.loadingSubmit = true
      // console.log('file', this.file)
      const files = this.file
      // console.log({ files })
      if (files === null) return -1
      const metadata = {
        contentType: files[0].type
      }
      const storageRef = this.$fbstorageref(
        this.$fbstorage,
        `files/${files[0].name.split('.')[0]}.${files[0].name.split('.')[1]}`
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
          // console.log({ error })
          this.loadingSubmit = false
          this.$q.notify({
            icon: 'warning',
            color: 'warning',
            message: 'Error Uploading file, see logs',
            position: 'top-right'
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
              await this.saveProjectDetails()
            }
          )
        }
      )
    },
    async saveProjectDetails () {
      // console.log('Saving Project details..')
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
        dateTo: this.dateTo
      }
      // console.log({ payload })
      // console.log('validate date', is.date(this.dateFrom))

      const updates = {}
      updates[`projects/${payload.id}/`] = payload
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          // this.loading1 = false
          this.$q.notify({
            icon: 'check_circle',
            color: 'secondary',
            message: 'Sucessfully Created',
            position: 'bottom-left'
          })
          this.loadingSubmit = false
          this.formReset()
          this.fetchProjects()
        })
        .catch(() => {
          // console.log({ error })
          // this.loading1 = false
          this.$q.notify({
            icon: 'exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'bottom-left'
          })
          this.loadingSubmit = false
          this.formReset()
          this.fetchProjects()
        })
    },
    async formReset () {
      this.model = null
      this.text = null
      this.desc = null
      this.file = null
      this.isActivated = false
      this.budget = null
      this.dateFrom = null
      this.dateTo = null
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
      // returning a Promise
      // console.log(files[0])

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
      this.rows = Object.values(results).map((element, index) => {
        element.isActive = element.isActivated || false
        // The next line is a MAGIC. theres a bug in the framework regarding
        // qtoggle animation not working inside qTable !!!
        // I must improvise
        this.activatedList[element.id] = element.isActive
        return element
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
            color: 'secondary',
            message: 'Sucessfully Created',
            position: 'bottom-left'
          })
        })
        .catch(() => {
          // console.log({ error })
          this.$q.notify({
            icon: 'exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'bottom-left'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.adminCard {
  min-height: 761px;
}
</style>
