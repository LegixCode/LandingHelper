<script setup>
import ScrollToForm from './Partials/ScrollToForm.vue';
import DTimeNums from './Partials/DTimeNums.vue';
import SimpleTimer from './Partials/SimpleTimer.vue';

</script>
<template>
    <div class="flex flex-col lg:grid lg:grid-cols-2 2xl:grid-cols-3 gap-6 p-6">
        <ScrollToForm />
        <DTimeNums />
        <SimpleTimer />
    </div>
</template>
