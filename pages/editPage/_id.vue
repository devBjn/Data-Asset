<template>
    <div>
        <div class="mb-10 mt-5">
            <div class="d-flex justify-space-between">
                <div>
                    <v-icon>{{ "mdi-image-multiple" }}</v-icon>
                    <span class="ml-4 text-h4">Assets</span>
                </div>
                <div>
                    <v-btn @click="handleUpdateData">Save change</v-btn>
                </div>
            </div>
        </div>
        <div class="wrapper  pa-6 rounded">

            <v-row class="pt-10" no-gutter>
                <v-col cols="12" sm="6">
                    <div>
                        <label class="text-h6 black--text" for="component">Name</label>
                        <v-text-field id="component" outlined dense v-model="formValue.component"></v-text-field>
                    </div>
                    <div class="mt-5">
                        <label class="text-h6 black--text" for="category">Category</label>
                        <v-select :items="categoryList" dense outlined v-model="formValue.category"></v-select>
                    </div>
                    <div class="mt-5">
                        <label class="text-h6 black--text" for="type">Type</label>
                        <p>{{ formValue.type }}</p>

                    </div>
                </v-col>
                <v-col cols="12" sm="6">

                    <template>
                        <v-card class="mx-auto" max-width="400">
                            <v-img class="white--text align-end" height="100%" width="100%" :src="formValue.imgUrl">

                            </v-img>

                            <v-card-subtitle class="pb-0 d-flex justify-lg-space-between">
                                <p>{{ formValue.type }}</p>
                                <p>{{ formValue.size }}</p>
                                <p>Updated on {{ formatDate(formValue.dateAdded) }}</p>
                            </v-card-subtitle>



                        </v-card>
                    </template>
                </v-col>
            </v-row>
            <PopupAlert :icons="icons.close" ref="popup">
                <v-alert type="success">{{ msgAlert }}</v-alert>
            </PopupAlert>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'EditData',
    data() {
        return {
            formValue: {
                name: "",
                category: "audio",
                imgUrl: "https://loremflickr.com/640/480/nightlife",
                type: "png",
                dateAdded: "10/09/2023",
                size: '12012',
            },
            msgAlert: "",
            icons: {
                glb: "mdi-movie-open",
                jpeg: "mdi-image-multiple",
                jpg: "mdi-image-multiple",
                obj: "mdi-cube-outline",
                png: "mdi-image-multiple",
                more: "mdi-dots-horizontal",
                plus: "mdi-plus",
                close: "mdi-close",
                arrowLeft: "mdi-arrow-left"
            },
        }
    },
    computed: {
        ...mapGetters("store", ["getData", "getDetail"]),
        categoryList() {
            return this.getData.map(item => item.category)
        },
        detailData() {
            return this.getDetail
        }
    },
    mounted() {
        this.$store.dispatch("store/getData")
        this.$store.dispatch("store/getDetailData", this.$route.params.id)
        console.log(this.$route.params);
        // After getting detailData, copy it into formValue
        this.$watch("detailData", (newDetailData) => {
            // Assuming detailData is an object with properties matching formValue
            this.formValue = { ...this.formValue, ...newDetailData };
        });
    },
    methods: {
        formatDate(inputDate) {
            const date = new Date(inputDate);
            const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading zeros
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (add 1 because months are zero-based) and pad with leading zeros
            const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

            return `${day}/${month}/${year}`;
        },
        async handleUpdateData() {
            await this.$store.dispatch("store/updateData", this.formValue);
            this.$refs.popup.snackbar = true;
            this.msgAlert = "Update data asset successfully !"
            await this.$store.dispatch("store/getData")
            await this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 70%;
    box-shadow: 5px 10px 8px 10px #888888;
}
</style>