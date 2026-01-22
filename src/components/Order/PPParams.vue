<script setup lang="ts">
import BaseInput from "@/components/ui/BaseInput.vue";
import { usePartnersStore } from "@/store/partners";

</script>
<template>
    <div class="flex flex-col" v-if="usePartnersStore().partner">
        <BaseInput v-for="(label, key) of usePartnersStore().partner.props" :label="label" :key="key" v-model="usePartnersStore().partner_props.value[key]" />
    </div>
</template>
