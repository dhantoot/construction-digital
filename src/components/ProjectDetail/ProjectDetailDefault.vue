<template>
    <q-card class="my-card no-border-radius no-shadow">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" height="160px">
        <div class="absolute-bottom text-h6 q-mt-none">
          STAR Residence
        </div>
      </q-img>

      <q-card-section class="no-border-radius q-ma-none q-pa-none">
        <q-list bordered class="scroll" style="height: 62.2vh">
            <q-item-label header class="text-bold">Project Members</q-item-label>
            <!-- <q-scroll-area style="height: 51vh"> -->
            <q-item clickable v-ripple>
                <q-item-section avatar>
                <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar1.jpg">
                </q-avatar>
                </q-item-section>

                <q-item-section>
                <!-- <q-item-label lines="1">Brunch this weekend?</q-item-label> -->
                <q-item-label caption lines="2">
                    <span class="text-weight-bold">Dan Xblue</span>
                </q-item-label>
                <q-item-label caption lines="1">
                    <span class="text-weight-light">***</span>
                </q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-chip square outline dense color="teal" text-color="white" icon="las la-shield-alt">
                        admin
                    </q-chip>
                </q-item-section>
            </q-item>
            <q-separator inset="item" />

            <q-item clickable v-ripple>
                <q-item-section avatar>
                <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                </q-avatar>
                </q-item-section>

                <q-item-section>
                <!-- <q-item-label lines="1">Linear Project</q-item-label> -->
                <q-item-label caption lines="2">
                    <span class="text-weight-bold">Vcuii XD</span>
                </q-item-label>
                <q-item-label caption lines="1">
                    <span class="text-weight-light">***</span>
                </q-item-label>
                </q-item-section>

                <q-item-section side top>
                <q-chip square outline dense color="purple" text-color="white" icon="las la-home">
                        home owner
                    </q-chip>
                </q-item-section>
            </q-item>
            <q-separator inset="item" />

            <q-item clickable v-ripple>
            <q-item-section avatar>
                <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar3.jpg">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <!-- <q-item-label lines="1">Linear Project</q-item-label> -->
                <q-item-label caption lines="2">
                <span class="text-weight-bold">Clin XD</span>
                </q-item-label>
                <q-item-label caption lines="1">
                    <span class="text-weight-light">Engineer</span>
                </q-item-label>
            </q-item-section>

            <q-item-section side top>
                <q-chip square outline dense color="indigo" text-color="white" icon="las la-user-secret">
                        contractor
                    </q-chip>
            </q-item-section>
            </q-item>
            <q-separator inset="item" />

            <q-item clickable v-ripple>
            <q-item-section avatar>
                <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <!-- <q-item-label lines="1">Linear Project</q-item-label> -->
                <q-item-label caption lines="2">
                <span class="text-weight-bold">Chris Clauz</span>
                </q-item-label>
                <q-item-label caption lines="1">
                    <span class="text-weight-light">Architech</span>
                </q-item-label>
            </q-item-section>

            <q-item-section side top>
                <q-chip square outline dense color="deep-orange" text-color="white" icon="las la-redo-alt">
                        resend
                    </q-chip>
            </q-item-section>
            </q-item>
            <q-separator inset="item" />

            <q-item clickable v-ripple>
            <q-item-section avatar>
                <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <!-- <q-item-label lines="1">Linear Project</q-item-label> -->
                <q-item-label caption lines="2">
                <span class="text-weight-bold">Kinn Ny</span>
                </q-item-label>
                <q-item-label caption lines="1">
                    <span class="text-weight-light">Engineer</span>
                </q-item-label>
            </q-item-section>

            <q-item-section side top>
                <q-chip square outline dense color="indigo" text-color="white" icon="las la-user-secret">
                    contractor
                </q-chip>
            </q-item-section>
            </q-item>
            <q-separator inset="item" />

            <q-item clickable v-ripple>
                <q-item-section avatar>
                <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar6.jpg">
                </q-avatar>
                </q-item-section>

                <q-item-section>
                <!-- <q-item-label lines="1">Brunch this weekend?</q-item-label> -->
                <q-item-label caption lines="2">
                    <span class="text-weight-bold">Dyan Marie</span>
                </q-item-label>
                <q-item-label caption lines="1">
                    <span class="text-weight-light">***</span>
                </q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-chip square outline dense color="teal" text-color="white" icon="las la-shield-alt">
                        admin
                    </q-chip>
                </q-item-section>
            </q-item>
            <q-separator inset="item" />

            <q-item clickable v-ripple>
            <q-item-section avatar>
                <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <!-- <q-item-label lines="1">Linear Project</q-item-label> -->
                <q-item-label caption lines="2">
                <span class="text-weight-bold">Nyx Skyler</span>
                </q-item-label>
                <q-item-label caption lines="1">
                    <span class="text-weight-light">Engineer</span>
                </q-item-label>
            </q-item-section>

            <q-item-section side top>
                <q-chip square outline dense color="indigo" text-color="white" icon="las la-user-secret">
                        contractor
                    </q-chip>
            </q-item-section>
            </q-item>
            <q-separator inset="item" />

            <q-item clickable v-ripple>
            <q-item-section avatar>
                <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar3.jpg">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <!-- <q-item-label lines="1">Linear Project</q-item-label> -->
                <q-item-label caption lines="2">
                <span class="text-weight-bold">Hestia Vinrie</span>
                </q-item-label>
                <q-item-label caption lines="1">
                    <span class="text-weight-light">Architech</span>
                </q-item-label>
            </q-item-section>

            <q-item-section side top>
                <q-chip square outline dense color="deep-orange" text-color="white" icon="las la-redo-alt">
                        resend
                    </q-chip>
            </q-item-section>
            </q-item>
            <q-separator inset="item" />

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <!-- <q-item-label lines="1">Linear Project</q-item-label> -->
                    <q-item-label caption lines="2">
                    <span class="text-weight-bold">Man Sweto</span>
                    </q-item-label>
                    <q-item-label caption lines="1">
                        <span class="text-weight-light">Engineer</span>
                    </q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-chip square outline dense color="indigo" text-color="white" icon="las la-user-secret">
                        contractor
                    </q-chip>
                </q-item-section>
            </q-item>
            <q-separator inset="item" />

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <!-- <q-item-label lines="1">Linear Project</q-item-label> -->
                    <q-item-label caption lines="2">
                    <span class="text-weight-bold">Fatima Luisa</span>
                    </q-item-label>
                    <q-item-label caption lines="1">
                        <span class="text-weight-light">Engineer</span>
                    </q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-chip square outline dense color="indigo" text-color="white" icon="las la-user-secret">
                        contractor
                    </q-chip>
                </q-item-section>
            </q-item>
            <q-separator inset="item" />

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                    </q-avatar>
                </q-item-section>

                <q-item-section>
                    <!-- <q-item-label lines="1">Linear Project</q-item-label> -->
                    <q-item-label caption lines="2">
                    <span class="text-weight-bold">Vince Aisa</span>
                    </q-item-label>
                    <q-item-label caption lines="1">
                        <span class="text-weight-light">Engineer</span>
                    </q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-chip square outline dense color="indigo" text-color="white" icon="las la-user-secret">
                        contractor
                    </q-chip>
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
             ------------------
            </q-item>
        <!-- </q-scroll-area> -->
        </q-list>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn dense fab icon="las la-user-plus" color="grey-1" class="text-green"/>
            </q-page-sticky>
      </q-card-section>
    </q-card>
  </template>
<script>
import { ref } from 'vue'
export default {
  setup () {
    return {
      lorem: ref('mails lorem ipsum doloe')
    }
  }
}
</script>
