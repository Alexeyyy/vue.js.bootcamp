<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3 mt-3">
                    New Ad
                </h1>
                <v-form v-model="valid" ref="form" validation>
                    <v-text-field
                        label="Title"
                        type="text"
                        v-model="title"
                        required
                        :rules="[ value => Boolean(value) || 'Title is required']"
                    ></v-text-field>
                    <v-textarea
                        label="Description"
                        type="text"
                        v-model="description"
                        required
                        multi-line
                        rows="3"
                        :rules="[ value => Boolean(value) || 'Description is required']"
                    ></v-textarea>
                </v-form>
                <v-layout class="mb-3" row>
                    <v-flex xs12>
                        <v-btn
                            color="blue-grey"
                            class="ma-2 white--text warning"
                            @click="triggerUpload()"
                        >
                            Upload
                            <v-icon
                                right
                                dark
                            >
                                mdi-cloud-upload
                            </v-icon>
                        </v-btn>
                        <input 
                            ref="fileInput" 
                            type="file" 
                            class="no-display" 
                            accept="image/*" 
                            @change="onFileChanged">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <img :src="imgSrc" height="100">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch
                            label="Add to promo?"
                            color="primary"
                            v-model="promo"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn
                            :loading="loading"
                            :disabled="!valid || !img || loading"
                            class="success"
                            @click="createAd()"
                        >
                            Create Ad
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            description: '',
            promo: false,
            valid: false,
            img: null,
            imgSrc: ''
        }
    },
    methods: {
        createAd() {
            if (this .$refs.form.validate() && this.img) {
                 const ad = {
                     title: this.title,
                     description: this.description,
                     promo: this.promo,
                     img: this.img,
                 }
                 this.$store.dispatch('createAd', ad)
                    .then(() => {
                        this.$router.push("/list")
                    })
                    .catch(() => {})
            }
        },
        triggerUpload () {
            this.$refs.fileInput.click()
        },
        onFileChanged (event) { 
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.onload = e => {
                this.imgSrc = reader.result
            }
            reader.readAsDataURL(file)
            this.img = file
        }
    },
    computed: {
        loading () {
            return  this.$store.getters.loading
        }
    }
}
</script>

<style scoped>
    .no-display {
        display: none;
    }
</style>