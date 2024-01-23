<template>
  <!-- <q-card class="my-card q-ma-sm">
    <q-card-section horizontal>
      <q-card-section class="col-4 flex flex-center">
        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Tuscania Residence</div>
        <div class="text-caption">Title</div>
      </q-card-section>
    </q-card-section>
  </q-card>
  <q-card class="my-card q-ma-sm">
    <q-card-section horizontal>
      <q-card-section class="col-4 flex flex-center">
        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Sta Barbara Residence</div>
        <div class="text-caption">Title</div>
      </q-card-section>
    </q-card-section>
  </q-card>
  <q-card class="my-card q-ma-sm">
    <q-card-section horizontal>
      <q-card-section class="col-4 flex flex-center">
        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg" />
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">CocaCola Residence</div>
        <div class="text-caption">Title</div>
      </q-card-section>
    </q-card-section>
  </q-card> -->
  <q-card class="my-card q-ma-sm">
    <q-list bordered>
      <q-item clickable v-ripple @click='$router.push({ path: `/projectdetail` })'>
        <q-item-section thumbnail>
          <img class="q-ml-sm" src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">Single line item</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img class="q-ml-sm" src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">SMDC Light Residence</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img class="q-ml-sm" src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">Grand Hayatt</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img class="q-ml-sm" src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">Uptown Tower</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img class="q-ml-sm" src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">Sunshine</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>
