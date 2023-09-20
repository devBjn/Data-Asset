<template>
    <div class="text-center">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon rounded v-bind="attrs" v-on="on">
                    <v-icon>
                        {{ icons.more }}
                    </v-icon>
                </v-btn>
            </template>
            <v-list>
                <div>
                    <Modal>
                        <template v-slot:modalButton>
                            <v-list-item class="rounded" tag="button" @click="handleNavigate(itemId)"
                                :style="{ width: '100%' }">
                                <v-list-item-icon>
                                    <v-icon v-text="items[0].icon" :color="items[0].color">
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title :style="{ color: items[0].color }">
                                        {{ items[0].title }}

                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </Modal>

                    <Modal ref="modalRef">
                        <template #modalButton="{ on }">
                            <v-list-item v-on="on" class="rounded" tag="button" :style="{ width: '100%' }">
                                <v-list-item-icon>
                                    <v-icon :color="items[1].color">{{ items[1].icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title :style="{ color: items[1].color }">{{ items[1].title
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                        </template>
                        <template v-slot:modalContent>
                            <v-card-title class="text-h5  lighten-2">
                                <v-icon>{{ items[1].icon }}</v-icon>! Confirm delete
                            </v-card-title>
                            <v-divider></v-divider>

                            <v-card-text class="text-body-1 py-4">
                                Are you sure you want to delete this item?
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red lighten-2" @click="deleteData()">
                                    <p class="white--text">Yes</p>

                                </v-btn>
                                <v-btn @click="handleClose">
                                    <p class="black--text">No</p>
                                </v-btn>
                            </v-card-actions>

                        </template>
                    </Modal>

                </div>
            </v-list>


        </v-menu>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        dialog: false,
    }),
    props: ["itemId"],
    inject: ["icons", "msgAlert"],
    computed: {
        ...mapGetters("store", ["getData"]),
        items() {
            return [
                { title: 'Edit', icon: "mdi-pencil", color: "#2196F3" },
                { title: 'Delete', icon: "mdi-trash-can", color: "#F44336" },
            ]
        },
        msgAlert: {
            get() {
                return this.msgAlert
            },
            set() {
                this.msgAlert = "Delete data successfully !"
            }
        }
    },
    methods: {
        async deleteData() {
            try {
                await this.$store.dispatch("store/deleteData", this.itemId);
                this.$emit("delete");
                this.$emit("msg")
            } catch (error) {
                console.log(error);
            }
            this.$store.dispatch("store/getData")
            this.dialog = false;

        },
        handleNavigate(id) {
            this.$router.push({ path: `/editPage/${id}` })
        },
        handleClose() {
            this.$refs.modalRef.dialog = false
        }
    }

}
</script>

<style lang="scss" scoped></style>