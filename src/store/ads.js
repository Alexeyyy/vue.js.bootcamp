import firebase from 'firebase'

class Ad {
     constructor(title, description, ownerId, imgSrc = '', promo = false, id = null) {
         this.title = title
         this.description = description
         this.ownerId = ownerId
         this.imgSrc = imgSrc
         this.promo = promo
         this.id = id
     }
}

export default {
    state: {
        ads: [
            { title: 'First', description: 'fd', promo: true, imgSrc: 'https://i1.wp.com/storage.googleapis.com/blog-images-backup/1*wFL3csJ96lQpY0IVT9SE3w.jpeg?ssl=1', id: '1', color: 'primary' },
            { title: 'Second', description: 'sd', promo: true, imgSrc: 'https://oecdenvironmentfocusblog.files.wordpress.com/2020/06/wed-blog-shutterstock_1703194387_low_nwm.jpg?w=640', id: '2', color: 'secondary' },
            { title: 'Third', description: 'td', promo: false, imgSrc: 'https://oecdenvironmentfocusblog.files.wordpress.com/2020/06/wed-blog-shutterstock_1703194387_low_nwm.jpg?w=640', id: '3', color: 'yellow darken-2' }
        ]
    },
    mutations: {
        createAd (state, payload) {
            state.ads.push(payload)
        },
        loadAds (state, payload) {
            state.ads = payload
        },
        updateAd (state, { title, description, id }) {
            const ad = state.ads.find(a => {
                return a.id === id
            })
            ad.title = title
            ad.description = description
        }
    },
    actions: {
        async createAd ({ commit, getters }, payload) {
            commit('clearError')
            commit('setLoading', true)

            const image = payload.img            
            try {
                const newAd = new Ad(
                    payload.title, 
                    payload.description, 
                    getters.user.id, 
                    '', 
                    payload.promo
                )

                const ad = await firebase.database().ref('ads').push(newAd)

                const imageExt = image.name.slice(image.name.lastIndexOf('.') + 1)
                const path = `ads/${ad.key}.${imageExt}`
                const fileData = await firebase.storage().ref(path).put(image)
                const imgUrl = await firebase.storage().ref(path).getDownloadURL()

                await firebase.database().ref('ads').child(ad.key).update({
                    imgSrc: imgUrl
                })

                commit('createAd', { 
                    ...newAd, 
                    id: ad.key,
                    imgSrc: imgUrl
                })

                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async fetchAds ({commit}) {
            commit('clearError')
            commit('setLoading', true)

            const data = []
            try {
                const fbValue = await firebase.database().ref('ads').once('value')
                const ads = fbValue.val()
                Object.keys(ads).forEach(key => {
                    const ad = ads[key]
                    data.push(new Ad(
                        ad.title, 
                        ad.description,
                        ad.ownerId,
                        ad.imgSrc,
                        ad.promo,
                        key))
                })

                commit('loadAds', data)
                commit('setLoading', false)
            } catch(error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async updateAd({ commit }, { title, description, id }) {
            commit('clearError')
            commit('setLoading', true)

            try {
                await firebase.database().ref('ads').child(id).update({
                    title, description
                })
                commit('updateAd', {
                    title, description, id
                })
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        }
    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter(ad => {
                return ad.promo === true
            })
        },
        myAds(state, getters) {
            return state.ads.filter(ad => {
                return ad.ownerId === getters.user.id
            })
        },
        adById(state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        } 
    }
}