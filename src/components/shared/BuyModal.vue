<template>
    <v-dialog width="400px" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
                class="success" 
                plain
                v-bind="attrs"
                v-on="on" 
            >
                Buy it!
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout raw>
                    <v-flex xs12>
                        <v-card-title>
                            <h1 class="text--primary">
                                Do you want to buy it?
                            </h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout raw>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                name="name"
                                label="Your name"
                                type="text"
                                v-model="name"
                            ></v-text-field>
                            <v-text-field
                                name="phone"
                                label="Your phone"
                                type="text"
                                v-model="phone"
                            ></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout raw>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn 
                                plain 
                                class="warning"
                                @click="onClose()"
                                :disabled="localLoading"
                            >
                                Close
                            </v-btn>
                            <v-btn 
                                plain
                                :loading="localLoading"
                                class="success"
                                @click="onBought()"
                                :disabled="localLoading"
                            >
                                Buy it!
                            </v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['ad'],
    data () {
        return {
            dialog: false,
            name: '',
            phone: '',
            localLoading: false
        }
    },
    methods: {
        onBought () {
            if (this.name !== '' && this.phone !== '') {
                this.localLoading = true
                this.$store.dispatch('createOrder', {
                    name: this.name,
                    phone: this.phone,
                    adId: this.ad.id,
                    ownerId: this.ad.ownerId
                })
                .finally(() => {
                    this.name = ''
                    this.phone = ''
                    this.localLoading = false
                    this.dialog = false
                })
            }
        },
        onClose () {
            this.phone = ''
            this.name = ''
            this.localLoading = false
            this.dialog = false
        }
    }
}
</script>

<style scoped>

</style>