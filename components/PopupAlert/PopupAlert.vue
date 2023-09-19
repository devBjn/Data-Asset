<template>
    <div class="text-center ma-2">
        <v-snackbar v-model="this.localSnackbar">
            <v-alert type="success">Delete successfully</v-alert>
            <template v-slot:action="{ attrs }">
                <v-icon v-bind="attrs" @click="closePopup">{{ icons.close }}</v-icon>
            </template>
        </v-snackbar>
    </div>
</template>

<script>

export default {
    name: "PopupAlert",
    data() {
        return {

        }
    },
    props: ["snackbar"],

    methods: {
        closePopup() {
            this.localSnackbar = false
        },
    },
    computed: {
        localSnackbar: {
            get() {
                return this.snackbar
            },
            set() { }
        }
    },
    inject: ["icons"],
}
</script>

<style lang="scss" scoped>
.v-alert {
    margin-bottom: 0;
}
</style>