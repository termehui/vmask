<template>
    <section>
        <h1>Function</h1>
        <div>
            <input type="text" v-model="funcInput" />
            <input type="text" v-model="funcMask" />
            <button @click.prevent="funcRes = mask(funcInput, funcMask)">
                Mask
            </button>
            <button @click.prevent="funcRes = unMask(funcInput, funcMask)">
                unMask
            </button>
            <p>{{ funcRes }}</p>
        </div>
    </section>
    <section>
        <h1>Directive</h1>
        <div>
            <input type="text" v-model="dirInput" v-mask="options" />
            <input type="text" v-model="dirMask" />
            <input type="text" v-model="placeholder" />
            <div>
                <input type="checkbox" id="guide" v-model="guide" />
                <label for="guide">Show guide?</label>
            </div>
            <p>{{ dirInput }}</p>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { mask, unMask } from "../src/index";
const funcInput = ref("");
const funcMask = ref("####-##-#");
const funcRes = ref("");
const dirInput = ref("");
const dirMask = ref("(0###) ###-####");
const guide = ref(false);
const placeholder = ref("#");
const options = computed(() => ({
    mask: dirMask.value,
    options: {
        guide: guide.value,
        placeholderChar: placeholder.value,
    },
}));
</script>

<style>
body {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 2rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    font-size: 13px;
    color: #03071e;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#app {
    display: block;
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
}

section {
    padding: 1rem;
}

h1 {
    font-size: 2rem;
    font-weight: normal;
    margin: 0;
    color: #42b883;
}

input[type="text"] {
    display: block;
    width: 20rem;
    max-width: 100%;
    margin: 0.2rem 0;
    padding: 0.5em 1em;
    border: 1px solid #6c757d;
    font: inherit;
}

input[type="text"]:focus {
    outline: none;
    border-color: #42b883;
}

.desc {
    display: block;
    box-sizing: border-box;
    margin: 0;
    padding: 0.5rem 0;
    color: #6c757d;
}

.wrapper {
    background: #e9ecef;
    border-radius: 3px;
    border: 1px solid #e9ecef;
    padding: 1rem;
}

.wrapper.has-focus {
    border-color: #dc2f02;
}
</style>
