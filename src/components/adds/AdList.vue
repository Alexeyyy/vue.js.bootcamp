<template>
    <v-container>
        <v-layout row v-if="!loading && myAds.length !== 0">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-7 mt-3">
                    My Ads
                </h1>
                <v-card 
                    class="elevation-10 mb-10"
                    v-for="ad in myAds"
                    :key="ad.id"
                >
                    <v-layout row>
                        <v-flex xs4>
                            <v-img
                                :src="ad.imgSrc"
                                height="200"
                            ></v-img>
                        </v-flex>
                        <v-flex xs6>
                            <v-card-text>
                                <h2 class="text--primary">
                                    {{ ad.title }}
                                </h2>
                                <div>
                                    {{ ad.description }}
                                </div>
                            </v-card-text>
                        </v-flex>
                        <v-flex xs2>  
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-btn 
                                    class="info"
                                    :to="'/ad/' + ad.id"
                                >
                                    Open
                                </v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-else-if="!loading && myAds.length === 0">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="primary">You have no adds!</h1>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-progress-circular
                class="loader"
                :size="100"
                :width="4"
                color="primary"
                indeterminate
                >
            </v-progress-circular>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    computed: {
        myAds () {
            return this.$store.getters.myAds
        },
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>

<style scoped>
    .loader {
        display: block;
        margin: 0 auto;
    }
</style>