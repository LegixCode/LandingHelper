<script setup>
import Input from "@/components/ui/Input.vue";
import { usePartnersStore } from "@/store/partners";

</script>
<template>
    <div class="flex flex-col" v-if="usePartnersStore().partner">
        <Input v-for="(label, key) of usePartnersStore().partner.props" :label="label" :key="key" v-model="usePartnersStore().partner_props.value[key]" />
    </div>
</template>
