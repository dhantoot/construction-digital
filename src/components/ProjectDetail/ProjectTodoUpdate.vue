<template>
  <div class="column gap-10 q-pa-sm">
    <div class="row justify-between items-center">
      <strong class="text-h6 text-bold text-white">Update Todo</strong>
      <q-icon size="md" color="accent" name="las la-undo"
        @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}/todo`)" />
    </div>
    <q-input class="full-width" :dense="true" filled v-model="todoTitle" placeholder="Title" input-class="text-accent" />
    <q-input class="full-width" :dense="true" placeholder="Description..." v-model="todoDesc" filled autogrow input-class="text-accent" />
    <q-date v-model="timeline" range class="full-width" text-color="primary" flat/>
    <div class="column q-mt-sm">
      <div class="caption text-accent"> Assign Members <small class="text-smallest"><i>(scroll to view more)</i></small> </div>
      <div class="scroll q-mt-sm">
      <q-list class="q-pl-none scroll" style="max-height: 33vh;">
        <q-item :clickable="false" tag="label" v-ripple class="q-pl-none" v-for="member in invitee" :key="member">
          <q-item-section avatar>
            <q-checkbox v-model="member.isSelected" :val="member.id" keep-color :color="member.id ? 'primary' : 'grey'"
              :disable="!member.id" />
          </q-item-section>
          <q-item-section>
            <q-item-label :class="member.id ? 'text-accent' : 'text-secondary'">{{ member?.fullname || member?.email
              }}</q-item-label>
            <q-item-label class="text-primary"><small>{{ member.userTitle }}</small></q-item-label>
          </q-item-section>

          <q-item-section avatar>
            <q-avatar rounded>
              <img :src="`${member?.avatar || 'default-user.jpeg'}`" />
            </q-avatar>
          </q-item-section>

        </q-item>
      </q-list>
      <q-inner-loading :showing="fetchInviteeLoader" label="Please wait..." label-class="text-teal"
        label-style="font-size: 1.1em" class="q-mx-md">
        <q-spinner-ios size="50px" color="secondary" />
      </q-inner-loading>
    </div>
    </div>
    <q-uploader :factory="factoryFn" :uploadProgressLabel="uploadProgressLabel" label="Upload Files"
      accept=".jpg, image/*" class="full-width q-mb-xl" multiple auto-upload flat>
      <template v-slot:list="">
        <div class="" v-for="item of todoFiles" :key="item">
          <q-img :src="item || 'broken-img.png'"
            style="max-height: 200px;border-bottom-right-radius: 4px; border-bottom-left-radius: 4px;"
            class="full-width" />
        </div>
        <!-- <q-list dense>
          <q-item dense v-for="item of todoFiles" :key="item">
            <q-item-section class="">
              <q-img :src="item || 'broken-img.png'" style="max-height: 200px;" class="full-width" />
            </q-item-section>
          </q-item>
        </q-list> -->
      </template>
    </q-uploader>
  </div>
  <div class="row full-width q-px-sm q-py-sm justify-between items-start absolute fixed-bottom"
    style="margin-bottom:82px">
    <div class="">
      <q-btn class="round-btn" color="primary" icon="las la-arrow-left"
        @click="this.$router.push(`/detail/${mainStore?.mobileSelectedProject?.id}/todo`)" />
    </div>
    <div class="">
      <q-btn @click="openConfirmDialog('Save changes?', 'updateTodo')" rounded color="primary" label="Update"
        class="text-capitalize round-btn" :disable="!todoTitle || !todoDesc || confirmBtnLoader || !timeline?.from || !timeline?.to" icon="las la-edit" />
    </div>
    <!-- <div class="">
      <q-btn @click="addTodo()" rounded color="primary" label="Add" class="text-capitalize round-btn"/>
    </div> -->
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
          @click="callConfirmFn()" :loading="confirmBtnLoader" :disable="confirmBtnLoader">
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
import { uid, LocalStorage, date } from 'quasar'
import { useMainStore } from 'stores/main'

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
    const mainStore = useMainStore()
    const authUser = LocalStorage.getItem('authUser')

    return {
      confirm: ref(false),
      confirmMsg: '',
      confirmCallbackFn: '',
      confirmBtnLoader: ref(false),

      invitee: ref([]),
      fetchInviteeLoader: ref(false),
      fetchUsersLoader: ref(false),
      mainStore,
      authUser,
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
      files: ref(null),
      ph: ref(''),
      dense: ref(true),
      selectedMember: ref([]),
      uploadProgressLabel: ref(''),
      todoFiles: ref([]),
      users: ref([]),
      selectedTodoDetail: ref(null),
      timeline: ref({ from: date.formatDate(new Date(), 'YYYY/MM/DD'), to: '' })
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
  async beforeMount () {
    // console.log('beforeMount')
    await this.fetchUsers()
    await this.fetchInvitee()
  },
  async mounted () {
    this.showTextLoading()
    this.setUpdateValues()
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
    openConfirmDialog (confirmMsg, confirmCallbackFn) {
      this.confirmMsg = confirmMsg
      this.confirmCallbackFn = confirmCallbackFn
      this.confirm = true
    },
    callConfirmFn () {
      const fn = this.confirmCallbackFn
      this[fn]()
    },
    updateTodo () {
      try {
        if (!this.mainStore?.mobileSelectedProjectTodo) {
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Selected todo has missing details',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
          return
        }
        this.confirmBtnLoader = true
        const generatedUid = uid()
        const {
          projectId,
          todoId
        } = this.$route.params

        const [yf, mf, df] = this.timeline?.from.split('/')
        const date1 = new Date(yf, mf, df)
        const [yt, mt, dt] = this.timeline?.to.split('/')
        const date2 = new Date(yt, mt, dt)
        const unit = 'days'
        const diff = date.getDateDiff(date2, date1, unit)

        const payload = {
          ...this.mainStore?.mobileSelectedProjectTodo,
          avatar: this.todoFiles.length > 0 && !this.$isFalsyString(this.todoFiles[0]) ? this.todoFiles[0] : [],
          assignee: this.invitee.filter(e => e.isSelected).map(f => f.id),
          timeline: this.timeline,
          duration: diff + 1,
          isLocked: false
        }
        const updates = {}
        console.log({
          generatedUid,
          payload,
          updates
        })

        updates[`task/${projectId}/${todoId}/`] = payload
        console.log('updates:', updates)
        this.$fbupdate(this.$fbref(this.$fbdb), updates)
          .then(() => {
            this.confirmBtnLoader = false
            this.confirm = false
            this.$q.notify({
              icon: 'check_circle',
              color: 'info',
              message: 'Sucessfully Updated',
              position: 'top-right',
              classes: 'notify-custom-css'
            })
          })
          .catch((error) => {
            this.confirmBtnLoader = false
            this.confirm = false
            this.$q.notify({
              icon: 'las la-exclamation-circle',
              color: 'negative',
              message: 'Error found\n' + error,
              position: 'top-right',
              classes: 'notify-custom-css'
            })
          })
      } catch (e) {
        this.confirmBtnLoader = false
        this.confirm = false
        console.log(e)
        console.log(JSON.stringify(e, null, 2))
        this.$q.notify({
          icon: 'cancel',
          color: 'negative',
          message: 'Error Updating Record',
          position: 'top-right',
          classes: 'notify-custom-css'
        })
      }
    },
    addTodo () {
      // const todoId = uid()
      // const {
      //   projectId
      // } = this.$route.params
      // const payload = {
      //   avatar: [],
      //   assignee: [],
      //   timeline: {
      //     from: '',
      //     to: ''
      //   },
      //   duration: 1,
      //   isLocked: false
      // }
      // const updates = {}
      // updates[`task/${projectId}/${todoId}/`] = payload
      // console.log(updates)
      // this.$fbupdate(this.$fbref(this.$fbdb), updates)
      //   .then(() => {
      //     this.$q.notify({
      //       icon: 'check_circle',
      //       color: 'info',
      //       message: 'Sucessfully Updated',
      //       position: 'top-right',
      //       classes: 'notify-custom-css'
      //     })
      //   })
      //   .catch((error) => {
      //     this.$q.notify({
      //       icon: 'las la-exclamation-circle',
      //       color: 'negative',
      //       message: 'Error found\n' + error,
      //       position: 'top-right',
      //       classes: 'notify-custom-css'
      //     })
      //   })
    },
    factoryFn (files) {
      // console.log({ files })
      this.todoFiles = []
      const metadata = {
        contentType: files[0].type
      }
      const storageRef = this.$fbstorageref(
        this.$fbstorage,
        `files/todo/${files[0].name.split('.')[0]}.${files[0].name.split('.')[1]
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
    },
    async fetchUsers () {
      this.fetchUsersLoader = true
      const users = await this.$fbref(this.$fbdb, 'users')
      this.$fbonValue(users, (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          return
        }
        this.users = Object.values(data)
        // console.log('this.users', this.users)
        this.fetchUsersLoader = false
      })
    },
    async fetchInvitee () {
      this.fetchInviteeLoader = true
      const invites = await this.$fbref(this.$fbdb, 'invites')
      this.$fbonValue(invites, async (snapshot) => {
        const data = snapshot.val()
        if (this.$isFalsyString(data)) {
          return
        }
        const data_ = Object.values(data)
        data_.forEach((item) => {
          item.dateSent = date.formatDate(item._ts, 'MMM DD, YYYY HH:mm A')
          item.dateResponded = date.formatDate(item.dateResponded, 'MMM DD, YYYY HH:mm A')
          item.resend = false
        })
        for await (const item of data_) {
          if (item.projectId === this.$route.params.projectId && item.status !== 'Rejected') {
            const userDetail = this.users.find((user) => user.email === item.invitee)
            item.fullname = userDetail?.firstName && userDetail?.lastName
              ? `${userDetail?.firstName} ${userDetail?.lastName}`
              : item.invitee
            item.avatar = userDetail?.avatar
            item.id = userDetail?.uid || undefined
            if (this.selectedTodoDetail?.assignee?.includes(item.id)) {
              item.isSelected = true
            } else {
              item.isSelected = false
            }
            this.invitee.push(item)
          }
          continue
        }
        // console.log('this.invitee', this.invitee)
        this.fetchInviteeLoader = false
      })
    },
    setUpdateValues () {
      this.selectedTodoDetail = LocalStorage.getItem('mobileSelectedProjectTodo')
      console.log('this.selectedTodoDetail', this.selectedTodoDetail)
      this.todoTitle = this.selectedTodoDetail.todoTitle
      this.todoDesc = this.selectedTodoDetail.todoDesc
      this.todoFiles = [this.selectedTodoDetail?.avatar] || ['broken-img.png']
      this.timeline = this.selectedTodoDetail?.timeline || { from: date.formatDate(new Date(), 'YYYY/MM/DD'), to: '' }
    }
  }
}
</script>
<style lang="scss" scoped>
.q-list--dense>.q-item,
.q-item--dense {
  min-height: 32px;
  padding: 2px;
}
.q-uploader__header {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

// already placed in app.scss
// .q-uploader__list {
//     position: relative;
//     border-bottom-left-radius: inherit;
//     border-bottom-right-radius: inherit;
//     padding: 0px;
//     min-height: 60px;
//     flex: 1 1 auto;

</style>
