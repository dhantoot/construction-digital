<template>
    <div class="container p-5">
        <div class="row gap-10">
            <div class="column col-auto pt-2">
                <slot name="icon"/>
            </div>
            <div class="column width-90" style="width:94%">
                <div><slot name="header"/></div>
                <div><slot name="body"/></div>
            </div>
        </div>
        <div class="row full-width justify-end pr-5 gap-10 pt-10">
            <slot name="bottom"/>
        </div>
    </div>
</template>

<!-- <script setup>
import { ref } from 'vue'
const componentName = ref('Alertbox')

</script> -->
<style lang="scss" scoped>
.container {
    background-color: #daf8e1;
    border-radius: 14px;
    border: 1px solid #21ba45;
}
</style>
