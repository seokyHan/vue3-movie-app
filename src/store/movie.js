import axios from 'axios'
// lodash 배열 중복 제거
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
    // module
    namespaced: true,
    // data
    state: () => ({
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: {}
    }),
    // computed랑 비슷
    getters: {},
    // methods
    // 데이터를 변경시켜주는 메서드만 mutation에 
    mutations: {
        updateState(state, payload){
            // ['movies', 'message', 'loading']
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    // default로 비동기 처리됨
    actions: {
        async searchMovies({ state, commit }, payload) {
            if(state.loading) {
                return 
            }

            commit('updateState', {
                message: '',
                loading: true
            })

            try {
                const response = await _fetchMovie({
                    ...payload, 
                    page: 1
                })
                const { Search, totalResults } = response.data
                commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID')
                })
    
                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)
    
                // 추가 요청
                if(pageLength > 1){
                    for(let page = 2; page <= pageLength; page++){
                        if(page > (payload.number / 10)){
                            break
                        }
                        const response = await _fetchMovie({
                            ...payload, 
                            page
                        })
                        const { Search } = response.data
                        commit('updateState', {
                            movies: [...state.movies, ..._uniqBy(Search,'imdbID')]
                        })
                    }
                }
            } catch ({message}) {
                commit('updateState', {
                    movies: [],
                    message
                }) 
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        },

        async searchMovieWithId({state, commit}, payload){
            if(state.loading) {
                return
            }

            commit('updateState', {
                theMovie: {},
                loading: true
            })

            try {
                const response = await _fetchMovie(payload)
                commit('updateState', {
                    theMovie: response.data
                })
            } catch (error) {
                commit('updateState', {
                    theMovie: {}
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        }

    }
}

async function _fetchMovie(payload) {
    return await axios.post('/.netlify/functions/movie', payload)
}