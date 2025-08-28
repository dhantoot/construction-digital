<template>
  <div>
    <div class="row full-width q-px-lg q-py-lg absolute">
      <div
        class="row full-width text-h5 q-pb-md"
        :class="[$q.dark.isActive ? 'accent' : 'primary']"
      >
        Account
      </div>
      <div class="row full-width q-py-sm justify-center">
        <q-avatar size="80px">
          <img
            :src="
              obj?.avatar?.length > 0 ? `${obj.avatar}` : `default-user.jpeg`
            "
          />
        </q-avatar>
      </div>
      <div class="row full-width q-py-sm justify-start">
        <div
          class="row full-width"
          :class="[$q.dark.isActive ? 'accent' : 'primary']"
        >
          First Name
        </div>
        <q-input
          v-model="obj.firstName"
          class="full-width"
          :input-class="[$q.dark.isActive ? 'accent' : 'primary']"
          clearable
          :dense="true"
          filled
        >
          <template #prepend>
            <!-- <q-icon name="las la-user" :class="[$q.dark.isActive ? 'accent' : 'primary']"/> -->
            <UserIcon />
          </template>

          <!-- <template v-slot:label>
            <span class="text-weight-bold text-deep-orange">You</span>
            can customize the <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">label</span>
          </template> -->
        </q-input>
      </div>
      <div class="row full-width q-py-sm justify-start">
        <div
          class="row full-width"
          :class="[$q.dark.isActive ? 'accent' : 'primary']"
        >
          Last Name
        </div>
        <q-input
          v-model="obj.lastName"
          class="full-width"
          :input-class="[$q.dark.isActive ? 'accent' : 'primary']"
          clearable
          :dense="true"
          filled
        >
          <template #prepend>
            <!-- <q-icon name="las la-user" :class="[$q.dark.isActive ? 'accent' : 'primary']"/> -->
            <UserIcon />
          </template>

          <!-- <template v-slot:label>
            <span class="text-weight-bold text-deep-orange">You</span>
            can customize the <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">label</span>
          </template> -->
        </q-input>
      </div>
      <div class="row full-width q-py-sm justify-start">
        <div
          class="row full-width"
          :class="[$q.dark.isActive ? 'accent' : 'primary']"
        >
          Phone Number
        </div>
        <q-input
          v-model="obj.phone_number"
          class="full-width"
          :input-class="[$q.dark.isActive ? 'accent' : 'primary']"
          clearable
          :dense="true"
          filled
        >
          <template #prepend>
            <q-icon
              name="las la-phone"
              :class="[$q.dark.isActive ? 'accent' : 'primary']"
            />
          </template>

          <!-- <template v-slot:label>
            <span class="text-weight-bold text-deep-orange">You</span>
            can customize the <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">label</span>
          </template> -->
        </q-input>
      </div>
      <div class="row full-width q-py-sm justify-start">
        <div
          class="row full-width"
          :class="[$q.dark.isActive ? 'accent' : 'primary']"
        >
          Email
        </div>
        <q-input
          v-model="obj.email"
          class="full-width"
          :input-class="[$q.dark.isActive ? 'accent' : 'primary']"
          clearable
          :dense="true"
          filled
        >
          <template #prepend>
            <q-icon
              name="las la-envelope"
              :class="[$q.dark.isActive ? 'accent' : 'primary']"
            />
          </template>

          <!-- <template v-slot:label>
            <span class="text-weight-bold text-deep-orange">You</span>
            can customize the <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">label</span>
          </template> -->
        </q-input>
      </div>

      <div class="row full-width q-py-sm justify-between">
        <q-tabs
          v-model="tab"
          class="bg-white-4 full-width"
          :dense="true"
          align="justify"
        >
          <q-tab
            class="text-capitalize"
            :class="[$q.dark.isActive ? 'primary' : 'primary']"
            name="upload"
            icon="las la-upload"
            label="Upload"
          />
          <q-tab
            class="text-capitalize"
            :class="[$q.dark.isActive ? 'primary' : 'primary']"
            name="capture"
            icon="las la-camera"
            label="Capture"
          />
        </q-tabs>
        <div v-if="tab === 'upload'" class="full-width q-pt-xs">
          <q-file
            v-model="obj.file"
            :dense="true"
            label-color="accent"
            filled
            label="Choose File"
            accept=".jpg, image/*"
            :bg-color="[$q.dark.isActive ? 'primary' : 'primary']"
            class="round-btn"
            :disable="loadingSubmit"
          >
            <template #prepend>
              <q-icon name="cloud_upload" color="accent" />
            </template>
          </q-file>
        </div>
        <div v-if="tab === 'capture'" class="full-width q-pt-xs">
          <q-btn
            dense
            align="left"
            class="text-capitalize full-width no-shadow"
            text-color="accent"
            :color="[$q.dark.isActive ? 'primary' : 'primary']"
            icon="las la-camera"
            label="Open camera"
            :disable="!deviceIsReady"
            style="height: 40px"
            @click="captureImage"
          />
        </div>
      </div>
    </div>
    <!-- <div class="row full-width q-px-lg q-py-sm justify-between items-start absolute fixed-bottom" style="margin-bottom:70px">
      <div>
        <q-btn label="Back" class="text-capitalize q-ml-none round-btn" color="negative" icon="las la-arrow-left" @click="this.$router.push(`/projects`)"/>
      </div>
      <div>
        <q-btn
          @click="uploadFile()"
          color="info"
          label="Update"
          class="text-capitalize full-width text-accent round-btn"
          :loading="loadingSubmit"
          :disable="loadingSubmit"
          icon="las la-edit"
        >
          <template v-slot:loading>
            <q-spinner-ios class="on-left"/>
            <small>Updating..</small>
          </template>
        </q-btn>
      </div>
    </div> -->

    <div v-if="routeName == 'mobile.my-profile'" class="bottom-nav-container">
      <q-bottom-navigation
        v-model="tab"
        class="modern-bottom-nav shadow-4"
        active-color="white"
        glossy
        :class="{
          'bg-light': !$q.dark.isActive,
          'bg-primary text-accent': $q.dark.isActive
        }"
      >
        <div class="row full-width justify-between">
          <q-btn flat @click="$router.push(`/projects`)">
            <template #default>
              <ArrowLeftIcon size="18" class="q-mr-sm" />
              <span class="text-bold text-capitalize">Back</span>
            </template>
          </q-btn>
          <q-btn
            flat
            :loading="loadingSubmit"
            :disable="loadingSubmit"
            @click="uploadFile()"
          >
            <template #default>
              <SquarePenIcon size="18" class="q-mr-sm" />
              <span class="text-bold text-capitalize">Update</span>
            </template>
          </q-btn>
        </div>
      </q-bottom-navigation>
    </div>

    <q-inner-loading :showing="fetchUserProfileLoader">
      <q-spinner-ios size="50px" color="secondary" />
    </q-inner-loading>
  </div>
</template>

<script>
import { ref } from 'vue'
import { LocalStorage } from 'quasar'
import { useMainStore } from 'stores/main'
export default {
  // name: 'ComponentName',
  setup() {
    const authUser = LocalStorage.getItem('authUser')
    const deviceIsReady = ref(false)
    const mainStore = useMainStore()

    return {
      mainStore,
      obj: ref({}),
      deviceIsReady,
      authUser,
      loadingSubmit: ref(false),
      tab: ref('upload'),
      fetchUserProfileLoader: ref(false)
    }
  },
  computed: {
    routeName: function () {
      return this.$route.name
    }
  },
  async beforeMount() {
    this.fetchUserProfileLoader = true
    await this.fetchUserProfile()
  },
  mounted() {
    // this.mainStore.showNav = true
  },
  methods: {
    uploadFile() {
      this.loadingSubmit = true
      console.log('this.obj.file', this.obj.file)
      if (
        Array.isArray(this.obj.file) ||
        !this.obj.file?.size ||
        !this.obj.file
      ) {
        // no new uploaded. skip upload and proceed to profile update
        console.log('skip upload and updating profile..')
        this.updateProfile()
      } else {
        const files = this.obj.file
        if (files === null) return
        const metadata = {
          contentType: files.type
        }
        const storageRef = this.$fbstorageref(
          this.$fbstorage,
          `files/users/${files.name.split('.')[0]}.${files.name.split('.')[1]}`
        )
        const uploadTask = this.$uploadbytesresumable(
          storageRef,
          files,
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
            // console.log({ error })
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
                this.obj.avatar = downloadURL
                this.updateProfile()
              }
            )
          }
        )
      }
    },
    async updateProfile() {
      console.log('Updating user profile..', this.obj)
      const updates = {}
      // slash at the end is very important (../avatar/)
      delete this.obj.file
      updates[`users/${this.authUser.uid}/`] = this.obj
      this.$fbupdate(this.$fbref(this.$fbdb), updates)
        .then(() => {
          this.$q.notify({
            icon: 'check_circle',
            color: 'green',
            message: 'Sucessfully Uploaded Avatar',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
        .catch(error => {
          console.log({ error })
          // this.loading1 = false
          this.$q.notify({
            icon: 'las la-exclamation-circle',
            color: 'negative',
            message: 'Error found',
            position: 'top-right',
            classes: 'notify-custom-css'
          })
        })
      this.loadingSubmit = false
    },
    async fetchUserProfile() {
      console.log('this.authUser', this.authUser.uid)
      const users = this.$fbref(this.$fbdb, `users/${this.authUser.uid}`)
      this.$fbonValue(users, snapshot => {
        const data = snapshot.val()
        this.obj = data
        this.fetchUserProfileLoader = false
      })
    },
    captureImage() {
      console.log('captureImage..')
    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.q-field__control:after) {
  display: none !important;
}
</style>
