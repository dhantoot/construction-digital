<template>
  <div class="row hide-scrollbar" :style="{ height: $q.screen.lt.sm ? '100vh' : '94.5vh' }">
    <div class="row full-width full-height" :class="[$q.screen.lt.sm ? 'q-pa-none' : 'q-pa-sm']" :style="{ paddingBottom: $q.screen.lt.sm ? '80px' : '0' }">
      <q-card
        class="full-width no-shadow glass-panel column no-wrap"
        :class="[$q.screen.lt.sm ? 'no-border-radius' : 'round-panel']"
      >
        <!-- Header: Project Selector -->
        <q-card-section
          class="border-bottom"
          :class="[$q.screen.lt.sm ? 'q-pa-sm' : 'q-pa-md']"
        >
          <div class="row items-center gap-15">
            <div
              class="text-bold neon-text-blue"
              :class="[$q.screen.lt.sm ? 'text-subtitle1' : 'text-h6']"
            >
              {{ $q.screen.lt.sm ? 'Chats' : 'Project Chat Hub' }}
            </div>
            <q-select
              v-model="selectedProject"
              :options="projectOptions"
              label="Select Project"
              dense
              filled
              stack-label
              class="col-grow glass-panel"
              popup-content-class="glass-panel"
              @update:model-value="onProjectSelect"
            >
              <template #prepend>
                <FolderKanbanIcon size="20" class="neon-text-blue" />
              </template>
            </q-select>
          </div>
        </q-card-section>

        <!-- Main Content: Split View -->
        <q-card-section
          v-if="selectedProject"
          class="col row no-wrap q-pa-none overflow-hidden"
        >
          <!-- Left Pane: Member List -->
          <div
            v-if="!$q.screen.lt.sm || !selectedMember"
            class="border-right column no-wrap"
            :class="[$q.screen.lt.sm ? 'col-12' : 'col-4']"
          >
            <div class="q-pa-sm text-overline text-grey-5 px-15">
              Project Members
            </div>
            <q-scroll-area class="col">
              <q-list padding>
                <q-item
                  v-for="(member, index) in members"
                  :key="index"
                  v-ripple
                  clickable
                  :active="selectedMember?.uid === member.uid"
                  active-class="active-item-glass"
                  @click="selectMember(member)"
                >
                  <q-item-section avatar>
                    <q-avatar size="40px">
                      <img :src="member.avatar || 'default-user.jpeg'" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-bold">{{
                      member.fullName
                    }}</q-item-label>
                    <q-item-label caption class="text-grey-5">{{
                      member.role
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </div>

          <!-- Right Pane: Chat Details -->
          <div
            v-if="!$q.screen.lt.sm || selectedMember"
            class="column no-wrap relative-position bg-black-10"
            :class="[$q.screen.lt.sm ? 'col-12' : 'col-8']"
          >
            <template v-if="selectedMember">
              <!-- Chat Header -->
              <div class="q-pa-md border-bottom row items-center gap-10">
                <q-btn
                  v-if="$q.screen.lt.sm"
                  flat
                  round
                  dense
                  @click="selectedMember = null"
                  color="accent"
                >
                  <Undo2Icon size="20" />
                </q-btn>
                <q-avatar size="32px">
                  <img :src="selectedMember.avatar || 'default-user.jpeg'" />
                </q-avatar>
                <div class="text-subtitle1 text-bold">
                  {{ selectedMember.fullName }}
                </div>
              </div>

              <!-- Message List -->
              <q-scroll-area ref="chatScroll" class="col q-pa-md">
                <div class="column gap-10">
                  <q-chat-message
                    v-for="(chat, index) in chatMessages"
                    :key="index"
                    :name="chat.name"
                    :avatar="chat.avatar"
                    :text="chat.text"
                    :stamp="chat.stamp"
                    :bg-color="chat.bgColor"
                    :text-color="chat.textColor"
                    :sent="chat.from === currentUser.uid"
                  />
                </div>
              </q-scroll-area>

              <!-- Input Area -->
              <div class="q-pa-sm border-top">
                <div class="row items-center no-wrap gap-10">
                  <q-input
                    v-model="message"
                    placeholder="Type a message..."
                    dense
                    filled
                    class="col-grow glass-panel rounded-input"
                    :class="[$q.screen.lt.sm ? 'q-py-xs' : '']"
                    @keyup.enter="sendMessage"
                  />
                  <q-btn
                    round
                    flat
                    color="accent"
                    :disable="!message.trim()"
                    @click="sendMessage"
                  >
                    <SendHorizontalIcon size="24" />
                  </q-btn>
                </div>
              </div>
            </template>
            <div v-else class="col flex flex-center text-grey-6 text-italic">
              Select a member to start chatting
            </div>
          </div>
        </q-card-section>

        <div v-else class="col flex flex-center text-grey-6">
          <div class="column items-center gap-10">
            <MessageCircleMore size="48" class="opacity-20" />
            <div class="text-h6">Please select a project to view chats</div>
          </div>
        </div>

        <q-inner-loading :showing="loading">
          <q-spinner-ios size="50px" color="secondary" />
        </q-inner-loading>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import { LocalStorage, date, uid } from 'quasar'

export default {
  setup() {
    const loading = ref(false)
    const selectedProject = ref(null)
    const projectOptions = ref([])
    const members = ref([])
    const selectedMember = ref(null)
    const chatMessages = ref([])
    const message = ref('')
    const currentUser = ref(LocalStorage.getItem('currentUser') || {})
    const users = ref([])
    const chatScroll = ref(null)

    return {
      loading,
      selectedProject,
      projectOptions,
      members,
      selectedMember,
      chatMessages,
      message,
      currentUser,
      users,
      chatScroll
    }
  },
  async mounted() {
    await this.fetchProjects()
    await this.fetchAllUsers()
  },
  methods: {
    async fetchProjects() {
      this.loading = true
      const projectsRef = this.$fbref(this.$fbdb, 'projects')
      const snapshot = await this.$fbget(projectsRef)
      const data = snapshot.val()
      if (data) {
        this.projectOptions = Object.values(data).map(p => ({
          label: p.title,
          value: p.id,
          ...p
        }))
      }
      this.loading = false
    },
    async fetchAllUsers() {
      const usersRef = this.$fbref(this.$fbdb, 'users')
      this.$fbonValue(usersRef, snapshot => {
        const data = snapshot.val()
        if (data) {
          this.users = Object.values(data)
        }
      })
    },
    async onProjectSelect(project) {
      this.loading = true
      this.selectedMember = null
      this.chatMessages = []
      await this.fetchProjectMembers(project)
      this.loading = false
    },
    async fetchProjectMembers(project) {
      const allMembers = []

      // 1. Owner
      const owner = this.users.find(u => u.uid === project.createdBy)
      if (owner) {
        allMembers.push({
          uid: owner.uid,
          fullName: `${owner.firstName} ${owner.lastName}`,
          role: 'Admin/Owner',
          avatar: owner.avatar
        })
      }

      // 2. Agents
      if (project.agent) {
        project.agent.forEach(a => {
          const u = this.users.find(user => user.email === a.email)
          allMembers.push({
            uid: u?.uid || a.email,
            fullName: u ? `${u.firstName} ${u.lastName}` : a.email,
            role: 'Agent',
            avatar: u?.avatar
          })
        })
      }

      // 3. Clients
      if (project.client) {
        project.client.forEach(c => {
          const u = this.users.find(user => user.email === c.email)
          allMembers.push({
            uid: u?.uid || c.email,
            fullName: u ? `${u.firstName} ${u.lastName}` : c.email,
            role: 'Client',
            avatar: u?.avatar
          })
        })
      }

      // 4. Invites
      const invitesRef = this.$fbref(this.$fbdb, 'invites')
      const invitesSnap = await this.$fbget(invitesRef)
      const invitesData = invitesSnap.val()
      if (invitesData) {
        Object.values(invitesData)
          .filter(i => i.projectId === project.id)
          .forEach(i => {
            const u = this.users.find(user => user.email === i.invitee)
            if (!allMembers.find(m => m.uid === (u?.uid || i.invitee))) {
              allMembers.push({
                uid: u?.uid || i.invitee,
                fullName: u ? `${u.firstName} ${u.lastName}` : i.invitee,
                role: 'Invited Member',
                avatar: u?.avatar
              })
            }
          })
      }

      this.members = allMembers.filter(m => m.uid !== this.currentUser.uid)
    },
    selectMember(member) {
      this.selectedMember = member
      this.listenForMessages()
    },
    listenForMessages() {
      const path = `chats/${this.selectedProject.id}`
      const chatsRef = this.$fbref(this.$fbdb, path)

      this.$fbonValue(chatsRef, snapshot => {
        const data = snapshot.val()
        if (!data) {
          this.chatMessages = []
          return
        }

        const messages = Object.values(data)
          .filter(
            m =>
              (m.from === this.currentUser.uid &&
                m.to === this.selectedMember.uid) ||
              (m.from === this.selectedMember.uid &&
                m.to === this.currentUser.uid)
          )
          .sort((a, b) => a._ts - b._ts)

        this.chatMessages = messages.map(m => {
          const isMe = m.from === this.currentUser.uid
          return {
            ...m,
            name: isMe ? 'me' : this.selectedMember.fullName,
            avatar: isMe
              ? this.users.find(u => u.uid === this.currentUser.uid)?.avatar
              : this.selectedMember.avatar,
            bgColor: isMe ? 'amber-7' : 'primary',
            textColor: isMe ? 'black' : 'white',
            stamp: date.formatDate(m._ts, 'MMM DD, hh:mm A')
          }
        })

        nextTick(() => {
          this.scrollToBottom()
        })
      })
    },
    sendMessage() {
      if (!this.message.trim()) return

      const msgId = uid()
      const updates = {}
      updates[`chats/${this.selectedProject.id}/${msgId}`] = {
        from: this.currentUser.uid,
        to: this.selectedMember.uid,
        projectId: this.selectedProject.id,
        _ts: this.$serverTimestamp,
        text: [this.message],
        isDeleted: false,
        isSeen: false
      }

      this.$fbupdate(this.$fbref(this.$fbdb), updates).then(() => {
        this.message = ''
      })
    },
    scrollToBottom() {
      if (this.chatScroll) {
        const scrollEl = this.chatScroll.getScrollTarget()
        this.chatScroll.setVerticalScrollPosition(scrollEl.scrollHeight)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.border-right {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.border-top {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.bg-black-10 {
  background: rgba(0, 0, 0, 0.1);
}
.pb-80 {
  padding-bottom: 80px;
}
.rounded-input {
  :deep(.q-field__control) {
    border-radius: 20px !important;
  }
}
</style>
