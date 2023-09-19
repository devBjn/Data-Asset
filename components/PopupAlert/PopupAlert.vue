<template>
    <div class="text-center ma-2">
        <v-snackbar v-model="snackbar">
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
			snackbar: false
        }
    },

    methods: {
        closePopup() {
            this.snackbar = false
        },
    },
    inject: ["icons"],
}
</script>

<style lang="scss" scoped>
.v-alert {
    margin-bottom: 0;
}
</style>