<template>
  <q-input standout text-color="black" v-model="text" :dense="dense" class="q-ma-xs q-mt-sm text-black" clearable>
        <template v-slot:append>
          <q-avatar>
            <q-icon name="las la-search"/>
          </q-avatar>
        </template>
      </q-input>
  <!-- <q-card class="my-card q-ma-sm"> -->
    <q-list bordered separator class="scroll" style="height: 83vh">
        <q-item clickable v-ripple @click='$router.push({ path: `/detail` })' v-for="item in arr" :key="item">
          <q-item-section thumbnail>
          <img class="q-ml-sm rounded-borders" :src="`${url}${item}`">
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">{{ names[item.toString().split('.')[1].slice(-2)] }} Residence</q-item-label>
            <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
              elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>

        </q-item>
    </q-list>
    <!-- <q-skeleton square /> -->
    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
       <q-btn fab icon="add" color="grey-1" class="text-green" @click="this.$router.push({path: '/new-project'})"/>
    </q-page-sticky>
  <!-- </q-card> -->
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
    this.$emit('showHeader', true, [])
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
    }
  }
}
</script>
