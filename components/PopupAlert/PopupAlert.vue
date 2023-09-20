<template>
    <div class="text-center ma-2">
        <v-snackbar v-model="snackbar">
            <slot />
            <template v-slot:action="{ attrs }">
                <v-icon v-bind="attrs" @click="closePopup">{{ icons }}</v-icon>
            </template>
        </v-snackbar>
    </div>
</template>

<script>

export default {
    name: "PopupAlert",
    data() {
        return {
            snackbar: false
        }
    },

    methods: {
        closePopup() {
            this.snackbar = false
        },
    },
    props: ["icons"]
}
</script>

<style lang="scss" scoped></style>