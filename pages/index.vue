<template>
  <div>
    <div class="mb-5 d-flex justify-space-between align-center">
      <div>
        <v-icon>{{ icons.png }}</v-icon>
        <span class="ml-4 text-h3">Assets</span>
      </div>
      <div>

        <Modal ref="modalRef" :colorBtn="colorBtn" :dialog="dialog" :transition="transition">
          <template #modalButton="{ on }">
            <v-icon v-on="on" color="white">
              {{ icons.plus }}
            </v-icon>
            <span>Add a new asset</span>
          </template>
          <template v-slot:modalContent>
            <v-card class="pa-3">
              <div class="d-flex justify-lg-space-between align-center">
                <v-card-title>
                  <v-icon>{{ icons.plus }}</v-icon>
                  <span class="text-h6">
                    Add a new asset
                  </span>
                </v-card-title>
                <v-btn icon>
                  <v-icon>{{ icons.close }}</v-icon>
                </v-btn>
              </div>
              <v-card-text v-if="!isRenderFormAdd" class="text-center d-flex flex-column justify-center rounded" :style="{
                border: '1px dashed gray',
                height: '250px'
              }">
                <div class="mb-3">
                  <v-icon large color="blue">{{ icons.jpeg }}</v-icon>
                </div>
                <label for="imgFile">Click on browser, or drag & drop a file to upload</label>
                <input hidden id="imgFile" type="file" @change="handleChange">
              </v-card-text>

              <v-card-text v-if="isRenderFormAdd">
                <v-row no-gutter>
                  <v-col cols="12" sm="6">
                    <div>
                      <label class="text-h6 black--text" for="name">Name</label>
                      <v-text-field id="name" outlined dense v-model="formValue.name"></v-text-field>
                    </div>
                    <div class="mt-5">
                      <label class="text-h6 black--text" for="category">Category</label>
                      <v-select :items="categoryList" dense outlined v-model="formValue.category"></v-select>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <img :src="formValue.imgUrl" :style="{
                      width: '100%',
                      height: '100%'
                    }" alt="">
                  </v-col>
                </v-row>

              </v-card-text>

              <v-card-actions class="py-5" :class="isRenderFormAdd ? 'justify-space-between' : 'justify-end'">
                <v-btn @click="isRenderFormAdd = false" v-if="isRenderFormAdd">
                  <v-icon>{{ icons.arrowLeft }}</v-icon>
                  Back to upload</v-btn>
                <v-btn @click="handleAddData" class="grey white--text">
                  <v-icon>{{ icons.plus }}</v-icon>
                  Add a new asset
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </Modal>
      </div>
    </div>
    <div>
      <table-data />
    </div>
    <div>
      <PopupAlert :snackbar='this.getSnackbar'></PopupAlert>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "IndexPage",
  data() {
    return {
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
      dialog: false,
      transition: "dialog - bottom - transition",
      colorBtn: "blue white--text",
      isRenderFormAdd: false,
      formValue: {
        name: '',
        category: "audio",
        img: '',
        imgUrl: '',
      }
    }
  },
  computed: {
    ...mapGetters("store", ["getSnackbar", "getData"]),
    categoryList() {
      return this.getData.map((item) => {
        return item.category
      })
    }
  },
  methods: {
    handleClose() {
      this.dialog = false
    },
    handleChange(e) {
      // Get the selected file
      const selectedFile = e.target.files[0];
      // Check if a file was selected
      if (selectedFile) {
        this.formValue.img = selectedFile;
        this.isRenderFormAdd = true
        // Create a URL for the file
        this.formValue.imgUrl = URL.createObjectURL(selectedFile);
      }
    },
    async handleAddData() {
      const { name, lastModifiedDate, size, type } = this.formValue.img
      const payload = {
        ...this.formValue,
        component: name,
        dateAdded: lastModifiedDate,
        size,
        type,
      }
      await this.$store.dispatch("store/postData", payload)
      this.$store.dispatch("store/getData")
      this.isRenderFormAdd = false;
    }

  },

  provide() {
    return { icons: this.icons }
  }
}
</script>
<style>
p {
  margin-bottom: 0 !important
}
</style>
