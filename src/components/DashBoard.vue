<template>
  <q-card class="my-card q-ma-sm">
    <q-card-actions>
      <label class="text-bold">Submitted Expenses</label>
      <q-space />
      <q-btn color="grey" round flat dense :icon="subExp ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="subExp = !subExp" />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="subExp">
        <q-separator />
        <q-card-section class="text-subitle2">
          <q-list>
            <q-item class="bg-blue-grey-1">
              <q-item-section>
                <q-item-label class="text-bold">Dan Vincent Tagailo</q-item-label>
                <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption2 class="text-bold">$500.00</q-item-label>
                <q-item-label caption2 class="">Inc. BTW</q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="primary" name="las la-arrow-right" />
              </q-item-section>
            </q-item>

            <q-separator spaced/>

            <q-item class="bg-blue-grey-1">
              <q-item-section>
                <q-item-label class="text-bold">John Doe</q-item-label>
                <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, cons</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption2 class="text-bold">$1000.00</q-item-label>
                <!-- <q-icon name="star" color="yellow" /> -->
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="primary" name="las la-arrow-right" />
              </q-item-section>
            </q-item>

            <q-separator spaced/>

            <q-item class="bg-blue-grey-1">
              <q-item-section>
                <q-item-label class="text-bold">Chloe Morrets</q-item-label>
                <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption2 class="text-bold">$2300.00</q-item-label>
                <!-- <q-icon name="star" color="yellow" /> -->
                <q-item-label caption2 class="">Inc. BTW</q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="primary" name="las la-arrow-right" />
              </q-item-section>
            </q-item>

            <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="accent" />
          </q-page-scroller>
          </q-list>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>

  <q-card class="my-card q-ma-sm">
    <q-card-actions>
      <label class="text-bold">Open Agreements</label>
      <q-space />
      <q-btn color="grey" round flat dense :icon="openAgreement ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="openAgreement = !openAgreement" />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="openAgreement">
        <q-separator />
        <q-card-section class="text-subitle2">
          <q-list>
            <q-item class="bg-blue-grey-1">
              <q-item-section>
                <q-item-label class="text-bold">Dan Vincent Tagailo</q-item-label>
                <!-- <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label> -->
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption2 class="text-bold">$500.00</q-item-label>
                <!-- <q-item-label caption2 class="">Inc. BTW</q-item-label> -->
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="primary" name="las la-arrow-right" />
              </q-item-section>
            </q-item>

            <q-separator spaced/>

            <q-item class="bg-blue-grey-1">
              <q-item-section>
                <q-item-label class="text-bold">John Doe</q-item-label>
                <!-- <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, cons</q-item-label> -->
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption2 class="text-bold">$1000.00</q-item-label>
                <!-- <q-icon name="star" color="yellow" /> -->
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="primary" name="las la-arrow-right" />
              </q-item-section>
            </q-item>
            </q-list>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>
<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      subExp: ref(true),
      openAgreement: ref(true),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
    }
  }
}
</script>
