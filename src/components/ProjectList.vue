<template>
  <div class="flex justify-between q-pa-xs bg-primary">
    <q-input
      class="full-width q-px-xs q-pt-sm"
      dark
      standout="bg-transparent"
      input-class="text-right text-accent"
      v-model="text"
      :dense="true"
    >
      <template v-slot:append>
        <q-icon v-if="text === ''" name="las la-search" :class="{
          'text-warning': text === ''
        }"/>
        <q-icon v-if="!text" name="clear" class="cursor-pointer text-accent" @click="text = ''"/>
      </template>
    </q-input>
  </div>
  <q-list bordered separator class="scroll bg-transparent" style="height: 100vh;">
    <q-item clickable v-ripple @click='$router.push({ path: `/detail` })' v-for="item in arr" :key="item">
      <q-item-section thumbnail>
        <img class="q-ml-sm rounded-borders" :src="`${url}${item}`">
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-bold text-accent">{{ names[item.toString().split('.')[1].slice(-2)] }} Residence</q-item-label>
        <q-item-label caption lines="2" class="text-warning">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
          elit.</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption class="text-info">5 min ago</q-item-label>
        <q-icon name="star" color="negative"/>
      </q-item-section>

    </q-item>
  </q-list>
  <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em">
    <q-spinner-bars size="50px" color="secondary"/>
  </q-inner-loading>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="grey-1" class="text-green bg-transparent" @click="this.$router.push({ path: '/new-project' })"/>
  </q-page-sticky>
</template>
<script>
import { ref } from 'vue'

export default {
  title: 'ProjectList',
  setup () {
    const visible = ref(false)
    const url = ref('https://picsum.photos/500/300')
    const arr = ref([])
    const names = ref([
      'Abigail',
      'Alexandra',
      'Alison',
      'Amanda',
      'Amelia',
      'Amy',
      'Andrea',
      'Angela',
      'Anna',
      'Anne',
      'Audrey',
      'Ava',
      'Bella',
      'Bernadette',
      'Carol',
      'Caroline',
      'Carolyn',
      'Chloe',
      'Claire',
      'Deirdre',
      'Diana',
      'Diane',
      'Donna',
      'Dorothy',
      'Elizabeth',
      'Ella',
      'Emily',
      'Emma',
      'Faith',
      'Felicity',
      'Fiona',
      'Gabrielle',
      'Grace',
      'Hannah',
      'Heather',
      'Irene',
      'Jan',
      'Jane',
      'Jasmine',
      'Jenni',
      'Lillian',
      'Lily',
      'Lisa',
      'Madeleine',
      'Maria',
      'Mary',
      'Megan',
      'Melanie',
      'Michelle',
      'Molly',
      'Natalie',
      'Nicola',
      'Olivia',
      'Penelope',
      'Pippa',
      'Rachel',
      'Rebecca',
      'Rose',
      'Ruth',
      'Sally',
      'Samantha',
      'Sarah',
      'Sonia',
      'Sophie',
      'Stephanie',
      'Sue',
      'Theresa',
      'Tracey',
      'Una',
      'Vanessa',
      'Victoria',
      'Virginia',
      'Wanda',
      'Wendy',
      'Yvonne',
      'Zoefer',
      'Jessica',
      'Joan',
      'Joanne',
      'Julia',
      'Karen',
      'Katherine',
      'Kimberly',
      'Kylie',
      'Lauren',
      'Leah'
    ])

    return {
      visible,
      initFunction () {
        // access setup variables here w/o using 'this'
        console.log('initFunction called->', visible.value)
        url.value = 'https://picsum.photos/500/300?t='
        for (let i = 0; i < 50; i++) {
          arr.value.push(Math.random())
        }
      },
      text: ref(''),
      ph: ref(''),
      dense: ref(true),
      url,
      arr,
      names
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
  serverPrefetch () {
    console.log('serverPrefetch')
  },
  beforeCreate () {
    console.log('beforeCreate..', this.$options)
  },
  created () {
    console.log('created..')
  },
  beforeMount () {
    console.log('beforeMount..')
  },
  mounted () {
    console.log('mounted..', this.$options)
    // this.$emit('showHeader', true, [])
    this.showTextLoading()
    this.initFunction()
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
  errorCaptured () {
    console.log('errorCaptured')
  },
  renderTracked () {
    console.log('renderTracked')
  },
  renderTriggered () {
    console.log('renderTriggered')
  },
  activated () {
    console.log('activates')
  },
  deactivated () {
    console.log('deactivated')
  },
  methods: {
    showTextLoading () {
      const ms = Math.floor(Math.random() * (1000 - 500 + 100) + 100)
      console.log('loaded in ', ms, ' ms')
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, ms)
    }
  }
}
</script>
