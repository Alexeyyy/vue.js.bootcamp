<template>
    <v-dialog width="400px" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
                class="warning" 
                plain
                v-bind="attrs"
                v-on="on" 
            >
                Edit
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout raw>
                    <v-flex xs12>
                        <v-card-title>
                            <h1 class="text--primary">
                                Edit Ad
                            </h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout raw>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                name="title"
                                label="Title"
                                type="text"
                                v-model="editedTitle"
                            ></v-text-field>
                            <v-textarea
                                name="description"
                                label="Description"
                                type="text"
                                multi-line
                                rows="3"
                                v-model="editedDescription"
                            ></v-textarea>
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
                                @click="onCancel()"
                            >
                                Cancel
                            </v-btn>
                            <v-btn 
                                plain 
                                class="success"
                                @click="onSave()"
                            >
                                Save
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
            editedTitle: this.ad.title,
            editedDescription: this.ad.description
        }
    },
    methods: {
        onSave () {
            if (this.editedDescription !== '' && this.editedTitle !== '') {
                this.$store.dispatch('updateAd', {
                    title: this.editedTitle,
                    description: this.editedDescription,
                    id: this.ad.id
                })
                this.dialog = false
            }
        },
        onCancel () {
            this.editedDescription = this.ad.description
            this.editedTitle = this.ad.title
            this.dialog = false
        }
    }
}
</script>

<style scoped>

</style>