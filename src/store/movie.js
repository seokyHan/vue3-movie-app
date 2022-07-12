import axios from 'axios'
// lodash 배열 중복 제거
import _uniqBy from 'lodash/uniqBy'

export default {
    // module
    namespaced: true,
    // data
    state: () => ({
        movies: [],
        message: '',
        loading: false
    }),
    // computed
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
        }
    },
    // default로 비동기 처리됨
    actions: {
        async searchMovies({ state, commit }, payload) {
            const { title, type, number, year} = payload;
            const OMDB_API_KEY = '7035c60c';

            const response = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
            const { Search, totalResults } = response.data;
            commit('updateState', {
                movies: _uniqBy(Search, 'imdbID')
            })

            const total = parseInt(totalResults, 10)
            const pageLength = Math.ceil(total / 10)

            // 추가 요청
            if(pageLength > 1){
                for(let page = 2; page <= pageLength; page++){
                    if(page > number / 10){
                        break
                    }
                    const response = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
                    const { Search } = response.data
                    commit('updateState', {
                        movies: [...state.movies, ..._uniqBy(Search,'imdbID')]
                    })
                }
            }
        }

    }
}