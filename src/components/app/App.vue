<template>
  <div class="app font-monospace">
    <div class="content">
      <AppInfo :allMoviesCount="movies.length" :favouriteMoviesCount="movies.filter(c => c.favourite).length" />
      <Box class="search-panel">
        <SearchPanel :updateTermHandler="updateTermHandler" />
        <AppFilter :updateFilterHandler="updateFilterHandler" :filterName="filter" />
      </Box>
      <Box v-if="!movies.length && !isLoading">
        <p class="text-center fs-3 text-danger">No Movies :(</p>
      </Box>
      <Box v-else-if="isLoading" class="d-flex justify-content-center">
        <Loader />
      </Box>
      <MovieList v-else :movies="onFilterHandler(onSearchHandler(movies, term), filter)" @onLike="onLikeHandler"
        @onToggle="onToggleHandler" @onRemove="onRemoveHandler" />
      <Box class="d-flex justify-content-center">
        <nav aria-label="pagination">
          <ul class="pagination pagination-sm">
            <li v-for="pageNumber in totalPages" :key="pageNumber" class="page-item"
              :class="{ active: pageNumber == page }" @click="changePageHandler(pageNumber)">
              <span class="page-link">{{ pageNumber }}</span>
            </li>
          </ul>
        </nav>
      </Box>
      <MovieAddForm @createMovie="createMovie" />
    </div>
  </div>
</template>



<script>
import SearchPanel from '@/components/search-panel/SearchPanel.vue'
import AppInfo from '@/components/app-info/AppInfo.vue'
import MovieList from '@/components/movie-list/MovieList.vue'
import AppFilter from "@/components/app-filter/AppFilter.vue"
import MovieAddForm from '@/components/movie-add-form/MovieAddForm.vue'
import axios from 'axios'
export default {
  components: {
    AppInfo,
    SearchPanel,
    AppFilter,
    MovieList,
    MovieAddForm,
  },
  data() {
    return {
      movies: [],
      term: '',
      filter: 'all',
      isLoading: false,// state = holat
      limit: 10,
      page: 1,
      totalPages: 0,
    }
  },
  methods: {
    async createMovie(item) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', item)
        this.movies.push(item)
      } catch (error) {
        alert(error.message)
      }
    },
    onToggleHandler({ id, prop }) {
      this.movies = this.movies.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item
      })
    },
    async onRemoveHandler(id) {
      try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        console.log(response)
        this.movies = this.movies.filter(c => c.id !== id)
      } catch (error) {
        alert(error.message)
      }
    },
    onSearchHandler(arr, term) {
      if (term.length == 0) {
        return arr
      }
      return arr.filter(c => c.name.toLowerCase().indexOf(term) > -1)
    },
    updateTermHandler(term) {
      this.term = term
      this.updateTermHandler(this.term)
    },
    onFilterHandler(arr, filter) {
      switch (filter) {
        case "popular":
          return arr.filter(c => c.like)
        case "mostViewers":
          return arr.filter(c => c.viewers > 500)
        default:
          return arr
      }
    },
    updateFilterHandler(filter) {
      this.filter = filter
    },
    async fetchPosts() {
      try {
        this.isLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page,
          }
        })
        const newArr = response.data.map(item => ({
          id: item.id,
          name: item.title,
          like: false,
          favourite: false,
          viewers: item.id * 10
        }))
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.movies = newArr
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
    },
    changePageHandler(page) {
      this.page = page
    },
  },
  mounted() {
    this.fetchPosts()
  },
  watch: {
    page() {
      this.fetchPosts()
    }
  }
}
</script>


<style>
.app {
  height: 100vh;
  color: #000;
}

.content {
  width: 1000px;
  min-height: 700px;
  background-color: #fff;
  margin: 0 auto;
  padding: 5rem 0px;
}

.search-panel {
  margin-top: 2rem;
}
</style>
