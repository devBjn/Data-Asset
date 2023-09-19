
<template>
    <v-data-table :calculate-widths="true" :loading="isLoading" loading-text="Please wait....." :headers="headers"
        :items="this.getData" :items-per-page="5" show-select :single-select="singleSelect" class="elevation-1">
        <template v-slot:item.component="{ item }">
            <NuxtLink :to="{ name: 'editData', params: { id: item.id } }">
                <div class="d-flex justify-space-between align-center pa-3">
                    <img class="image" :src="item.imgUrl" alt="">
                    <p>{{ item.component }}</p>
                </div>
            </NuxtLink>


        </template>
        <template v-slot:item.type="{ item }">
            <div class="d-flex justify-space-between align-center pa-3">
                <p>{{ item.type }}</p>
                <Menu :itemId="item.id">
                </Menu>
            </div>
        </template>
        <template v-slot:item.dateAdded="{ item }">
            <p>{{ formatDate(item.dateAdded) }}</p>
        </template>
    </v-data-table>
</template>



<script>
import { mapGetters } from 'vuex'


export default {
    name: "TableData",
    data() {
        return {
            singleSelect: false,
            selected: [],
            headers: [
                {
                    text: 'Component',
                    align: 'start',
                    sortable: false,
                    value: ['component'],
                },
                { text: 'Category', value: 'category' },
                { text: 'Date Added', value: 'dateAdded' },
                { text: 'Size', value: 'size' },
                { text: 'Type', value: 'type' },
            ],
            isLoading: true,

        };
    },
    computed: {
        ...mapGetters("store", ["getData"]),

    },
    methods: {
        async getDataAsset() {
            await this.$store.dispatch("store/getData")
            this.isLoading = false;
        },
        formatDate(inputDate) {
            const date = new Date(inputDate);
            const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading zeros
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (add 1 because months are zero-based) and pad with leading zeros
            const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

            return `${day}/${month}/${year}`;
        }
    },
    mounted() {
        this.getDataAsset();
    },

}
</script>

<style scoped>
/* .v-chip.v-size--default {
    height: 500px;
    width: 500px;
    object-fit: contain;
} */

.image {
    width: 200px;
    height: 200px;
}
</style>