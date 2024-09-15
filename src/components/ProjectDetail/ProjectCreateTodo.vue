<template>
  <div>
    <q-list padding class="scroll" style="height:74.7vh">
      <q-item tag="todoTitle" :clickable="false">
        <q-item-section>
          <q-item-label>Title</q-item-label>
          <q-item-label caption>
            <q-input dense outlined  v-model="todoTitle" class="q-ma-xs">
            </q-input>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item tag="todoDesc" :clickable="false">
        <q-item-section>
          <q-item-label>Description</q-item-label>
          <q-item-label caption>
            <q-input dense outlined v-model="todoDesc" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item tag="memberList">
        <q-item-section>
          <q-item-label>Assign Members</q-item-label>
          <q-list class="q-pl-none">
            <!--
              Rendering a <label> tag (notice tag="label")
              so QCheckboxes will respond to clicks on QItems to
              change Toggle state.
            -->

            <q-item tag="label" v-ripple class="q-pl-none" v-for="member in memberList" :key="member">
              <q-item-section avatar>
                <q-checkbox v-model="selectedMember" :val="member.id" color="teal" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ member.label }}</q-item-label>
                <q-item-label caption>{{ member.role }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item tag="fileUpload">

        <q-item-section>
          <!-- <q-item-label>Add File</q-item-label> -->
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

      <q-separator spaced />

      <q-item tag="action">

        <q-item-section>
          <q-btn
            @click="saveTodo"
            size="lg"
            color="tertiary"
            label="Create Todo"
            class="text-capitalize full-width q-mb-md"
            :loading="loadingSubmit"
            :disable="!todoTitle || !todoDesc"
          >
            <template v-slot:loading>
              <q-spinner-bars class="on-left" />
              Saving...
            </template>
          </q-btn>
        </q-item-section>

      </q-item>
    </q-list>
    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
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

    return {
      loadingSubmit,
      visible,
      question,
      initFunction () {
        // access setup variables here w/o using 'this'
        console.log('initFunction called', visible.value)
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
    this.showTextLoading()
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
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      console.log('loaded in ', ms, ' ms')
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
        files: this.todoFiles
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
            color: 'positive',
            message: 'Sucessfully Created',
            position: 'top-right'
          })
        }).catch((error) => {
          console.log({ error })
          this.loadingSubmit = false
          this.$q.notify({
            icon: 'exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right'
          })
        })
    },
    factoryFn (files) {
      console.log({ files })
      const metadata = {
        contentType: files[0].type
      }
      const storageRef = this.$fbstorageref(this.$fbstorage, `files/todo/${files[0].name.split('.')[0]}.${files[0].name.split('.')[1]}`)
      const uploadTask = this.$uploadbytesresumable(storageRef, files[0], metadata)
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.uploadProgressLabel = Number(progress, 2).toFixed(2) + '%'
          console.log('Upload is ' + this.uploadProgressLabel)
          // this.uploadProgress = progress

          files[0].__progressLabel = this.uploadProgressLabel
          // console.log('files[0].__progressLabel -> ', files[0].__progressLabel)
          // console.log('this.uploadProgressLabel -> ', this.uploadProgressLabel)
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
            this.todoFiles.push(downloadURL)
            // this.avatar = `${files[0].name.split('.')[0]}.${files[0].name.split('.')[1]}`
            // console.log('this.avatar', this.avatar)
            // this.updateAvatar()
          })
        }
      )
    }
  }
}
</script>
