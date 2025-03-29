<template>
    <q-card :bordered="!$q.dark.isActive" class="no-shadow xxx" :class="{
        'dark': $q.dark.isActive
    }">
      <q-card-section>
        <slot name="header"/>
      </q-card-section>
      <q-card-section>
        <slot name="body"/>
      </q-card-section>
    </q-card>
</template>
<style lang="scss" scoped>
.xxx {
  height: 250px;
}
</style>
