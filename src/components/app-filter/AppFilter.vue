<template>
  <div class="btn-group">
    <PrimaryButton
    @click="filterHandler(btn.name)" 
    :key="btn.name" 
    v-for="btn in filterButtons" 
    :class="[filterName === btn.name ? 'btn-dark' : 'btn-outline-dark']">
     {{btn.title}}
    </PrimaryButton>
    

  </div>
</template>
<script>

export default {
 
  data() {
    return {
      filterButtons: [
        {
          title: "All movies",
          name: "all"
        },
        {
          title: "Popular movies",
          name: "popular"
        },
        {
          title: "Most viewed movies",
          name: "mostViewers"
        },
      ],
      filter: 'all',
    }
  },
  props: {
    updateFilterHandler: {
      type: Function,
      required: true,
    },
    filterName: {
      type: String,
      required: true,
    }
  },
  methods: {
    filterHandler(filter) {
      this.filter = filter
      this.updateFilterHandler(this.filter)
    }
  }
}
</script>
<style>

</style>