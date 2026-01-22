<script setup>
import { computed, ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: {},
    label: String,
    options: Object,
    trackBy: {},
    labelBy: {},
    searchBy: Function,
});

function trackBy(option) {
    if (typeof props.trackBy == "function") return props.trackBy(option);
    if (typeof props.trackBy == "string") return option[props.trackBy];
    if (typeof option == "object") return option.value;
    return option;
}

function labelBy(option) {
    if (typeof props.labelBy == "function") return props.labelBy(option);
    if (typeof props.labelBy == "string") return option[props.labelBy];
    if (typeof option == "object") return option.label;
    return option;
}
function searchBy(option) {
    if (props.searchBy) return props.searchBy(option);
    return labelBy(option);
}

const input = ref();

const focused = ref(false);
const mouseover = ref(false);
const showed = computed(() => focused.value || mouseover.value);
const delay_showed = ref(false);
watch(
    () => showed.value,
    () => {
        setTimeout(() => (delay_showed.value = showed.value), 1);
    }
);

const search_value = ref("");

const selected_value_label = computed(() => {
    var option = props.options.find((option) => trackBy(option) == props.modelValue);
    if (option) return labelBy(option);
    return null;
});

const sorted_options = computed(() => {
    return props.options.sort((a, b) => (labelBy(a) > labelBy(b) ? 1 : -1));
});

const options = computed(() => {
    var _search_value = search_value.value.toLowerCase();
    return sorted_options.value.filter((option) => searchBy(option).toLowerCase().indexOf(_search_value) !== -1);
});

function select(option) {
    input.value.blur();
    mouseover.value = false;
    emit("update:modelValue", trackBy(option));
}

function select_first() {
    if (options.value.length > 0) select(options.value[0]);
}
</script>

<template>
    <div class="my-2">
        <div
            class="relative border rounded-lg h-11 border-slate-400/32 focus-within:border-slate-400/32 flex items-center pr-2"
            :class="{ 'rounded-b-none': showed }"
        >
            <input
                type="text"
                class="py-[13px] px-4 text-sm leading-none appearance-none focus:outline-hidden bg-transparent w-full"
                :value="showed ? search_value : selected_value_label"
                @input="search_value = $event.target.value"
                @focusin="(focused = true) && (search_value = '')"
                @focusout="focused = false"
                v-on:keyup.enter="select_first"
                ref="input"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 256 256"
                class="text-slate-600 transition-transform duration-200"
                :class="{ 'rotate-180': showed }"
            >
                <path
                    fill="currentColor"
                    d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"
                />
            </svg>
            <label
                class="absolute top-0 left-0 cursor-text bg-white mt-[14px] mx-[16px] z-0 duration-200 origin-0 text-sm leading-none truncate overflow-hidden max-w-[85%] pointer-events-none text-slate-400"
            >
                {{ label }}
            </label>
            <div
                class="absolute top-10 -inset-x-px bg-white border border-slate-400/32 max-h-60 overflow-y-scroll rounded-b-lg z-10 transition-all duration-200"
                :class="[delay_showed && showed ? 'max-h-60 shadow-card' : 'max-h-0 shadow-card/0']"
                v-if="showed || (delay_showed && !showed)"
                @mouseenter="mouseover = true"
                @mouseleave="mouseover = false"
            >
                <div
                    v-if="options.length == 0"
                    class="h-9 flex items-center justify-center text-sm text-slate-600 pointer-events-none"
                >
                    Ничего не найдено
                </div>
                <button
                    type="button"
                    v-for="option of options"
                    class="block w-full text-left px-4 h-8 text-sm text-slate-800 hover:bg-slate-400/10"
                    @click="select(option)"
                    :class="{
                        'text-green-500 bg-green-500/10': trackBy(option) == modelValue,
                    }"
                >
                    {{ labelBy(option) }}
                </button>
            </div>
        </div>
    </div>
</template>
