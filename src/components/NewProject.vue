<template>
  <div class="row full-width absolute">
    <div class="text-h6 text-bold q-px-lg q-py-md text-accent">Add Project</div>
  </div>
  <div class="q-pa-md q-gutter-md bg-grey-2 q-mt-xl">
    <q-select
      v-model="searchKey"
      behavior="menu"
      popup-content-class="popupSelectContent"
      :dense="true"
      filled
      use-input
      input-debounce="0"
      :options="options"
      clearable
      :placeholder="!searchKey ? 'Address' : ''"
      :loading="searchingPlaceLoader"
      @filter="filterFn"
    ></q-select>
    <q-input
      v-model="text"
      filled
      placeholder="Name"
      class="bg-grey-2"
      :dense="true"
      input-class="text-accent"
    />
    <div class="q-pa-none" style="max-width: 98%">
      <q-input
        v-model="desc"
        placeholder="Description..."
        filled
        type="textarea"
        input-class="text-accent"
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
        class="text-yellow text-capitalize"
        name="capture"
        icon="las la-camera"
        label="Capture"
      />
    </q-tabs>
    <div v-if="tab === 'upload'" class="col-24">
      <q-file
        v-model="file"
        :dense="true"
        label-color="orange"
        filled
        label="Choose File"
        multiple
        accept=".jpg, image/*"
      >
        <template #prepend>
          <q-icon name="cloud_upload" color="orange" />
        </template>
      </q-file>
    </div>

    <div v-if="tab === 'capture'" class="col-24">
      <q-btn
        dense
        align="left"
        class="text-capitalize full-width no-shadow round-btn"
        text-color="yellow"
        color="transparent"
        icon="las la-camera"
        label="Open camera"
        :disable="deviceIsReady"
        style="height: 40px"
        @click="captureImage"
      />
    </div>

    <div class="col-12">
      <q-img
        v-show="!btnToggle"
        class="q-pr-lg"
        fit="cover"
        src="imageSrc"
        :ratio="16 / 9"
      />
      <!-- <div class="caption" v-show="!btnToggle">imageSrc: {{ imageSrc }}</div>
      <div class="caption" v-show="!btnToggle">data: {{ data }}</div> -->
    </div>
    <div class="row justify-between q-mt-lg">
      <div>
        <q-btn
          class="round-btn"
          rounded
          color="primary"
          icon="las la-arrow-left"
          @click="$router.push('/projects')"
        />
      </div>
      <div>
        <q-btn
          color="primary"
          label="Create"
          class="text-capitalize text-accent round-btn"
          icon="las la-plus"
          :disable="!searchKey || !text || !desc || !file"
          @click="createProject"
        >
          <template #loading>
            <q-spinner-ios class="on-left" />
            Saving...
          </template>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useQuasar, LocalStorage, uid, date } from 'quasar'
const stringOptions = []

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectList',
  props: {
    title: String,
    likes: Number
  },
  setup() {
    const timeStamp = Date.now()
    const formattedTimestamp = date.formatDate(
      timeStamp,
      'YYYY-MM-DDTHH:mm:ss.SSSZ'
    )
    // const options = ref(stringOptions)
    const visible = ref(false)
    const navigatorVal = ref([])
    const $q = useQuasar()
    const imageSrc = ref('')
    const deviceIsReady = ref(false)
    const btnToggle = ref(true)
    const camData = ref(null)
    const desc = ref('')
    const generatedUid = uid()
    const searchKey = ref(null)
    const stringOptions = ref([])
    const options = ref(stringOptions)
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
      // console.log('typeof navigator is ', typeof navigator)

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
      searchingPlaceLoader: ref(false),
      searchKey,
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
      text: ref(null),
      desc,
      options,
      visible,
      initFunction() {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      createValue(val, done) {
        // Calling done(var) when new-value-mode is not set or is "add", or done(var, "add") adds "var" content to the model
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
        // only if is not already set and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
        // (adds to model if not already in the model, removes from model if already has it)
        // and it resets the input textbox to empty string
        // ----
        // If "var" content is undefined/null, then it doesn't tampers with the model
        // and only resets the input textbox to empty string

        if (val.length > 0) {
          const modelValue = (searchKey.value || []).slice()

          val
            .split(/[,;|]+/)
            .map(v => v.trim())
            .filter(v => v.length > 0)
            .forEach(v => {
              if (stringOptions.value.includes(v) === false) {
                stringOptions.value.push(v)
              }
              if (modelValue.includes(v) === false) {
                modelValue.push(v)
              }
            })

          done(null)
          searchKey.value = modelValue
        }
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
    this.stringOptions = [
      {
        id: 1,
        address: '673 Kohler River, Port Yong, MD 89762-8419'
      },
      {
        id: 1,
        address: 'Suite 607 80014 Fritsch Port, Takakostad, AZ 59116'
      },
      {
        id: 1,
        address: '1867 John Union, Haneberg, MS 39752-7807'
      },
      {
        id: 1,
        address: 'Suite 107 150 Moen Dale, Walshstad, WY 17862-6698'
      },
      {
        id: 1,
        address: '260 Ashli Wells, East Humbertoside, DE 34616-5862'
      }
    ]
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
    setModel(val) {
      this.searchKey = val
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
    async createProject() {
      // console.log('> file', this.file)
      this.logs.push('>' + JSON.stringify(this.file))
      for (const item in this.file[0]) {
        // console.log('navigatorItem: ', this.file[0][item])
        this.navigatorVal.push({
          label: item,
          desc: JSON.stringify(this.file[0][item])
        })
      }
      this.uploadFile()
      this.saveProjectDetails()
      // this.logs.push('>' + JSON.stringify(this.file[0]))
      // this.saveLocally(this.file[0])
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
    uploadFile() {
      // console.log('file', this.file)
      const files = this.file
      // console.log({ files })
      if (files === null) return
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
        error => {
          // Handle unsuccessful uploads
          // console.log({ error })
          this.$q.notify({
            icon: 'warning',
            color: 'warning',
            message: 'Error Uploading file\n' + error,
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          this.$getdownloadurl(uploadTask.snapshot.ref).then(downloadURL => {
            // console.log('File available at', downloadURL)
            this.projectAvatar = `${files[0].name.split('.')[0]}.${
              files[0].name.split('.')[1]
            }`
          })
        }
      )
    },
    saveProjectDetails() {
      // console.log('Saving Project details..')
      const payload = {
        createdBy: this.uid,
        dateCreated: this.formattedTimestamp,
        title: this.text,
        description: this.desc,
        img: this.projectAvatar
      }
      // console.log({ payload })
      const updates = {}
      updates[`projects/${uid()}/`] = payload
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          // this.loading1 = false
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Created',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
        .catch(error => {
          // this.loading1 = false
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found\n' + error,
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
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
      // returning a Promise
      // console.log(files[0])

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
    }
  }
}
</script>
<style lang="scss" scoped>
.q-field__input {
  color: red !important;
}
.custom-shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}
</style>
