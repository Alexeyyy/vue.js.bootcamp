<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Sign Up</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" validation>
                            <v-text-field
                                prepend-icon="mdi-email"
                                label="E-mail"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                            ></v-text-field>
                            <v-text-field
                                prepend-icon="mdi-lock"
                                name="password"
                                type="password"
                                v-model="password"
                                label="Password"
                                :rules="passwordRules"
                            >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="mdi-lock"
                                name="confirmPassword"
                                type="password"
                                label="Confirm password"
                                v-model="confirmPassword"
                                :rules="confirmPasswordRules"
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="primary" 
                            @click="onSubmit()"
                            :loading="loading"
                            :disabled="!valid || loading"
                        >
                            Create Account
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            valid: false,
            minLength: 6,
            emailRules: [
                (value) => Boolean(value) || 'E-mail is required',
                (value) => (/.+@.+\..+/).test(value) || 'E-mail must be valid'
            ],
            passwordRules: [
                (value) => Boolean(value) || 'Password is required',
                (value) => Boolean(value) && value.length >= this.minLength || 'Password is less than 6 symbols'
            ],
            confirmPasswordRules: [
                (value) => Boolean(value) || 'Please, confirm password',
                (value) => Boolean(value) && value === this.password || 'Please, repeat your password correctly'
            ]
        }
    },
    methods: {
        onSubmit () {
            if (this.$refs.form.validate()) {
                const userData = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('registerUser', userData)
                    .then(
                        this.$router.push('/') 
                    )
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    },
    computed: {
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>
