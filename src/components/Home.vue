<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel v-model="model">
                        <v-carousel-item
                            v-for="ad in promoAds"
                            :key="ad.id"
                            :src="ad.imgSrc"
                        >
                            <v-sheet
                                height="100%"
                                tile
                            >
                                <div class="car-link">
                                    <v-btn 
                                        class="error"
                                        :to="'/ad/' + ad.id"
                                    >
                                        {{ ad.title }}
                                    </v-btn>
                                </div>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex 
                    xs12
                    sm6
                    md4
                    v-for="ad of ads"
                    :key="ad.id"
                >
                    <v-card
                        class="mx-auto my-12"
                        max-width="374"
                    >
                        <v-img
                            height="200"
                            :src="ad.imgSrc"
                        ></v-img>

                        <v-card-title>
                            {{ ad.title }}
                        </v-card-title>

                        <v-card-text>
                            <div>
                                {{ ad.description }}
                            </div>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn 
                                color="secondary" 
                                :to="'/ad/' + ad.id"
                            >
                                Open
                            </v-btn>
                            <buy-modal :ad="ad"></buy-modal>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-container>
            <v-layout raw>
                <v-flex xs12 class="text-xs-center pt-10">
                    <v-progress-circular
                        class="loader"
                        :size="100"
                        :width="4"
                        color="primary"
                        indeterminate
                        >
                    </v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import BuyModal from './shared/BuyModal.vue'
export default {
  components: { BuyModal },
    data () {
        return {
            model: 0,
        }
    },
    computed: {
        promoAds() {
            console.log(this.$store.getters.promoAds)
            return this.$store.getters.promoAds
        },
        ads() {
            return this.$store.getters.ads
        },
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>

<style scoped>
    .car-link {
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgb(0, 0, 0, .3);
        transform: translate(-50%, 0);
        padding: 10px 20px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;        
    }

    .loader {
        display: block;
        margin: 0 auto;
    }
</style> 