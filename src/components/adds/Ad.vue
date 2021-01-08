<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card class="mt-3" v-if="!loading">
                    <v-img
                        :src="ad.imgSrc"
                        height="300"
                    ></v-img>
                    <v-card-text>
                        <h1 class="text--primary">
                            {{ ad.title }}
                        </h1>
                        <div>
                            {{ ad.description }}
                        </div>
                    </v-card-text>
                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <edit-ad-modal :ad="ad" v-if="isOwner"></edit-ad-modal>
                         <buy-modal :ad="ad"></buy-modal>
                    </v-card-actions>
                </v-card>
                <div v-else>
                    <v-progress-circular 
                        class="loader"
                        :size="100"
                        :width="4"
                        color="primary"
                        indeterminate
                        >
                    </v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'

export default {
    props: ['id'],
    computed: {
        ad () {
            const id = this.id
            return this.$store.getters.adById(id)
        },
        loading () {
            return this.$store.getters.loading
        },
        isOwner () {
            return this.ad.ownerId === this.$store.getters.user.id
        }
    },
    components: {
        editAdModal: EditAdModal
    }
}
</script>

<style scoped>
    .loader {
        display: block;
        margin: 0 auto;
    }
</style>