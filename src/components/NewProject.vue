<template>
  <div class="q-pa-sm q-gutter-md bg-grey-2">
    <div class="q-pa-md bg-none">
      <div class="row">
        <div class="col">
          <q-breadcrumbs v-if="true">
            <q-breadcrumbs-el
              v-for="{ label, icon, route } of breadcrumbs"
              :label="label"
              :key="label"
              :icon="icon"
              :to="route"
              class="clickable"
            />
          </q-breadcrumbs>
        </div>
        <div class="col text-center text-weight-bold">Add Project</div>
        <div class="col"></div>
      </div>
    </div>
    <q-select
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
    <q-input filled v-model="text" label="Name" class="bg-grey-2" />
    <div class="q-pa-none" style="max-width: 98%">
      <q-input
        placeholder="Description..."
        v-model="desc"
        filled
        type="textarea"
      />
    </div>

    <q-tabs v-model="tab" class="bg-white-4" dense align="justify">
      <q-tab
        class="text-orange text-capitalize"
        name="upload"
        icon="las la-upload"
        label="Upload"
      />
      <q-tab
        class="text-cyan text-capitalize"
        name="capture"
        icon="las la-camera"
        label="Capture"
      />
    </q-tabs>
    <div class="col-24" v-if="tab === 'upload'">
      <q-file
        class="shadow-2"
        label-color="orange"
        filled
        v-model="file"
        label="Choose File"
        multiple
        accept=".jpg, image/*"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" color="orange" />
        </template>
      </q-file>
    </div>

    <div class="col-24" v-if="tab === 'capture'">
      <q-btn
        size="lg"
        class="text-capitalize col-12 full-width"
        icon="las la-camera"
        text-color="cyan"
        color="grey-4"
        label="Open camera"
        @click="captureImage"
        :disable="!deviceIsReady"
      />
    </div>

    <!-- <q-list bordered separator>
      <q-item clickable v-ripple v-for="item of navigatorVal" :key="item">
        <q-item-section>
          <q-item-label overline>{{item.label}}</q-item-label>
          <q-item-label>{{item.desc}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list> -->

    <q-card flat bordered>
      <q-card-section>
        <pre style="white-space: pre-line">{{ logs }}</pre>
      </q-card-section>
    </q-card>

    <div class="col-12">
      <q-img
        class="q-pr-lg"
        v-show="!btnToggle"
        fit="cover"
        src="imageSrc"
        :ratio="16 / 9"
      />
      <div class="caption" v-show="!btnToggle">imageSrc: {{ imageSrc }}</div>
      <div class="caption" v-show="!btnToggle">data: {{ data }}</div>
    </div>
    <div class="row">
      <div class="col q-mr-xs">
        <q-btn
          class="full-width q-tab--no-caps"
          :disabled="!file"
          size="lg"
          label="FileSystem 1"
          @click="startProject2"
        />
      </div>
      <div class="col q-ml-xs">
        <q-btn
          class="full-width q-tab--no-caps"
          :disabled="!file"
          size="lg"
          label="FileSystem 2"
          @click="startProject"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useQuasar, LocalStorage, uid, date } from 'quasar'
const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  setup () {
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
      console.log('printing out navigator', navigator)
      console.log('typeof navigator is ', typeof navigator)

      for (const item in navigator) {
        console.log('navigatorItem: ', item)
        navigatorVal.value.push({
          label: item,
          desc: JSON.stringify(navigator[item])
        })
      }
      console.log('navigatorVal:', navigatorVal)
      for (const item in window) {
        console.log('windowItem: ', item)
      }
    }

    function saveLocally (f) {
      try {
        this.logs.push('> saveLocally: at try')
        window.resolveLocalFileSystemURL(
          cordova.file.dataDirectory,
          function (dirEntry) {
            console.log('file system open: ' + dirEntry.name)
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
            console.log(err)
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
            console.log('file system open: ' + fs.name)
            this.logs.push('> at requestFileSystem' + fs.name)
            fs.root.getFile(
              f.name,
              { create: true, exclusive: false },
              function (fileEntry) {
                this.logs.push('> at fs.root.getFile' + fileEntry)
                console.log('fileEntry is file?' + fileEntry.isFile.toString())
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
        console.log('initFunction called', visible.value)
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
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted', this.$options)
    this.$emit('showHeader', false, [
      {
        label: 'Back',
        icon: 'las la-chevron-left',
        route: '/projects'
      }
    ])
    this.showTextLoading()
    // this.currentUser = LocalStorage.getItem('currentUser')
    // console.log('this.currentUser', this.currentUser)
    this.authUser = LocalStorage.getItem('authUser')
    console.log('this.authUser', this.authUser)
    this.uid = this.authUser.uid
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeUnmount () {
    console.log('beforeUnmount')
  },
  unmounted () {
    console.log('unmounted')
  },
  watch: {
    visible (newVal, oldVal) {
      if (newVal === true) {
        console.log(`visible is updated from ${oldVal} to ${newVal}`)
      }
    }
  },
  methods: {
    async startProject () {
      console.log('> file', this.file)
      this.logs.push('>' + JSON.stringify(this.file))
      // for (const item in this.file[0]) {
      //   console.log('navigatorItem: ', this.file[0][item])
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
      console.log('> file', this.file)
      this.logs.push('>' + JSON.stringify(this.file))
      // for (const item in this.file[0]) {
      //   console.log('navigatorItem: ', this.file[0][item])
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
      console.log('file', this.file)
      const files = this.file
      console.log({ files })
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
        (error) => {
          // Handle unsuccessful uploads
          console.log({ error })
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
          this.$getdownloadurl(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            this.projectAvatar = `${files[0].name.split('.')[0]}.${
              files[0].name.split('.')[1]
            }`
          })
        }
      )
    },
    saveProjectDetails () {
      console.log('Saving Project details..')
      const payload = {
        createdBy: this.uid,
        dateCreated: this.formattedTimestamp,
        title: this.text,
        description: this.desc,
        img: this.projectAvatar
      }
      console.log({ payload })
      const updates = {}
      updates[`projects/${uid()}/`] = payload
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          // this.loading1 = false
          this.$q.notify({
            icon: 'check_circle',
            color: 'positive',
            message: 'Sucessfully Created',
            position: 'top-right'
          })
        })
        .catch((error) => {
          console.log({ error })
          // this.loading1 = false
          this.$q.notify({
            icon: 'exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right'
          })
        })
    },
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    factoryFn (files) {
      // returning a Promise
      console.log(files[0])

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
    }
  }
}
</script>
