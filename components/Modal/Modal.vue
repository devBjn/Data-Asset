<template>
    <div>
        <v-dialog :transition='transition' v-model="dialog" :width="colorBtn ? 800 : 500">
            <template v-slot:activator="{ on, attrs }">
                <!-- 
                <v-list-item :class="colorBtn" class="rounded" tag="button" :style="{ width: '100%' }" v-bind="attrs"
                    v-on="on"> -->
                <slot :on="on" name="modalButton" />

                <!-- </v-list-item> -->
            </template>
            <v-card>
                <slot name="modalContent">
                </slot>

            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: "Modal",
            dialog: false
        }
    },
    props: {
        // dialog: Boolean,
        transition: {
            type: String,
            default: () => { },
        },
        colorBtn: {
            type: String,
            default: () => { }
        }
    },
    computed: {
        localDialog: {
            get() {
                return this.dialog
            },
            set() {
                this.$emit("close")
            }
        }
    },

}
</script>

<style lang="scss" scoped>
.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
    margin-right: 10px
}
</style>