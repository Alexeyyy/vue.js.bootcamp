import firebase from 'firebase'

class Order {
   constructor (name, phone, adId, done = false, id = null) {
       this.name = name
       this.phone = phone
       this.adId = adId
       this.done = done
       this.id = id
   } 
}

export default {
    state: {
        orders: []
    },
    mutations: {
        loadOrders (state, payload) {
            state.orders = payload
        }
    },
    actions: {
        async createOrder ({ commit }, { name, phone, adId, ownerId }) {
            commit('clearError')
            
            const order = new Order(
                name,
                phone,
                adId
            )

            try {
                await firebase.database().ref(`/users/${ownerId}/orders/`).push(order)
            } catch (error) {
                commit('setError', error.message)
                throw error
            }
        },
        
        async fetchOrders ({ commit, getters }) {
            commit('clearError')
            commit('setLoading', true)

            const resultOrders = []

            try {
                const fbVal = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')
                const orders = fbVal.val()

                Object.keys(orders).forEach(key => {
                    const order = orders[key]
                    resultOrders.push(new Order(
                        order.name,
                        order.phone,
                        order.adId,
                        order.done,
                        key
                    ))
                })

                commit('loadOrders', resultOrders)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
            }
        },

        async markOrderDone ({commit, getters}, orderId) {
            commit('clearError')
            try {
                await firebase.database().ref(`/users/${getters.user.id}/orders`).child(orderId).update({
                    done: true
                })
            } catch (error) {
                commit('setError', error.message)
            }
        }
    },
    getters: {
        orders (state, getters) {
            return getters.undoneOrders.concat(getters.doneOrders)
        },
        doneOrders (state) {
            return state.orders.filter(o => { return o.done })
        },
        undoneOrders (state) {
            return state.orders.filter(o => { return !o.done })
        }
    }
}