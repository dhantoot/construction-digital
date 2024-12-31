<template>
  <div class="scroll">
    <q-list padding>
      <q-item tag="todoTitle" :clickable="false">
        <q-item-section>
          <q-item-label caption>
            <q-input :dense="true" filled v-model="todoTitle" placeholder="Title" input-class="text-accent">
            </q-input>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item tag="todoDesc" :clickable="false">
        <q-item-section>
          <q-item-label caption>
            <q-input
                placeholder="Description..."
                v-model="todoDesc"
                filled
                type="textarea"
                input-class="text-accent"
            />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced/>

      <q-item tag="memberList">
        <q-item-section>
          <q-item-label class="text-accent">Assign Members</q-item-label>
          <q-list class="q-pl-none scroll" style="max-height: 30vh;">
            <!--
              Rendering a <label> tag (notice tag="label")
              so QCheckboxes will respond to clicks on QItems to
              change Toggle state.
            -->

            <q-item
              tag="label"
              v-ripple
              class="q-pl-none"
              v-for="member in memberList"
              :key="member"
            >
              <q-item-section avatar>
                <q-checkbox
                  v-model="selectedMember"
                  :val="member.id"
                  color="teal"
               />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-accent">{{ member.label }}</q-item-label>
                <q-item-label class="text-positive">{{ member.role }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-inner-loading
            :showing="visible"
            label="Please wait..."
            label-class="text-teal"
            label-style="font-size: 1.1em"
          >
            <q-spinner-ios size="50px" color="secondary"/>
          </q-inner-loading>
        </q-item-section>
      </q-item>

      <q-separator spaced/>

      <q-item tag="fileUpload">
        <q-item-section>
          <q-uploader
            :factory="factoryFn"
            :uploadProgressLabel="uploadProgressLabel"
            label="Upload Files"
            multiple="false"
            accept=".jpg, image/*"
            class="full-width"
         />
        </q-item-section>
      </q-item>

      <q-separator spaced/>

      <q-item tag="action">
        <q-item-section>
          <div class="row justify-between items-center">
            <div>
              <q-btn class="q-ml-none round-btn" color="primary" icon="las la-arrow-left" @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}/todo`)"/>
            </div>
            <div>
              <q-btn
                @click="saveTodo"
                rounded
                color="primary"
                label="Create"
                class="text-capitalize round-btn"
                :loading="loadingSubmit"
                :disable="!todoTitle || !todoDesc"
                icon="las la-plus"
              >
                <template v-slot:loading>
                  <q-spinner-ios class="on-left"/>
                  Saving...
                </template>
              </q-btn>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em"/> -->
  </div>
</template>
<script>
import { ref } from 'vue'
import { uid } from 'quasar'

// Don't forget to specify which animations
// you are using in quasar.config file > animations.
// Alternatively, if using UMD, load animate.css from CDN.
export default {
  title: 'ProjectCreateTodo',
  setup () {
    const visible = ref(false)
    const question = ref('')
    const loadingSubmit = ref(false)
    const loadingtodoList = ref(false)

    return {
      loadingSubmit,
      loadingtodoList,
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        // console.log('initFunction called', visible.value)
      },
      check1: ref(true),
      check2: ref(false),
      check3: ref(false),

      notif1: ref(true),
      notif2: ref(true),
      notif3: ref(false),

      volume: ref(6),
      brightness: ref(3),
      mic: ref(8),
      todoTitle: ref(''),
      todoDesc: ref(''),
      ph: ref(''),
      dense: ref(true),
      selectedMember: ref([1, 3]),
      memberList: ref([
        {
          id: 1,
          label: 'Dhanixblue',
          role: 'Foreman'
        },
        {
          id: 2,
          label: 'Clint XD',
          role: 'Architecht'
        },
        {
          id: 3,
          label: 'Vcuii XD',
          role: 'Engineer'
        },
        {
          id: 4,
          label: 'Jane Doe',
          role: 'Engineer'
        },
        {
          id: 3,
          label: 'Vcuii XD',
          role: 'Engineer'
        },
        {
          id: 3,
          label: 'Vcuii XD',
          role: 'Engineer'
        },
        {
          id: 3,
          label: 'Vcuii XD',
          role: 'Engineer'
        },
        {
          id: 3,
          label: 'Vcuii XD',
          role: 'Engineer'
        },
        {
          id: 3,
          label: 'Vcuii XD',
          role: 'Engineer'
        }
      ]),
      uploadProgressLabel: ref(''),
      todoFiles: ref([])
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
  },
  mounted () {
    this.showTextLoading()
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
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      // console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    },
    saveTodo () {
      this.loadingSubmit = true
      const generatedUid = uid()
      const payload = {
        todoTitle: this.todoTitle,
        todoDesc: this.todoDesc,
        members: this.selectedMember,
        files: this.todoFiles || [],
        isArchived: false,
        isCompleted: false,
        id: generatedUid
      }
      const updates = {}
      console.log({
        generatedUid,
        payload,
        updates
      })

      // data will be save to `projects` table
      // slash at the end is very important (..projects/1/)
      updates[`todo/${generatedUid}/`] = payload

      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          this.loadingSubmit = false
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Created',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
        .catch((error) => {
          // console.log({ error })
          this.loadingSubmit = false
          this.$q.notify({
            icon: 'exclamation-circle',
            color: 'negative',
            message: 'Error found\n' + error,
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
    },
    factoryFn (files) {
      // console.log({ files })
      const metadata = {
        contentType: files[0].type
      }
      const storageRef = this.$fbstorageref(
        this.$fbstorage,
        `files/todo/${files[0].name.split('.')[0]}.${
          files[0].name.split('.')[1]
        }`
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
          this.uploadProgressLabel = Number(progress, 2).toFixed(2) + '%'
          // console.log('Upload is ' + this.uploadProgressLabel)
          // this.uploadProgress = progress

          files[0].__progressLabel = this.uploadProgressLabel
          // // console.log('files[0].__progressLabel -> ', files[0].__progressLabel)
          // // console.log('this.uploadProgressLabel -> ', this.uploadProgressLabel)
          switch (snapshot.state) {
            case 'paused':
              // console.log('Upload is paused')
              break
            case 'running':
              // console.log('Upload is running')
              break
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          // console.log({ error })
          this.$q.notify({
            icon: 'warning',
            color: 'warning',
            message: 'Error Uploading file:\n' + error,
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          this.$getdownloadurl(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL)
            this.todoFiles.push(downloadURL)
            // this.avatar = `${files[0].name.split('.')[0]}.${files[0].name.split('.')[1]}`
            // // console.log('this.avatar', this.avatar)
            // this.updateAvatar()
          })
        }
      )
    }
  }
}
</script>
