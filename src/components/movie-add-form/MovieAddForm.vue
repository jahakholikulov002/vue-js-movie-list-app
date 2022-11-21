<template>
    <Box class="movie-add-form">
        <h3>Add new movie</h3>
        <form class="add-form d-flex" @submit.prevent>
            <Input class="new-movie-label" placeholder="What movie?" v-model="name" />
            <Input class="new-movie-label" placeholder="How many times has it been seen?" type="number"
                v-model="viewers" />
            <PrimaryButton @click="addMovie" class="btn-outline-dark" type="submit">Add</PrimaryButton>
        </form>
    </Box>
</template>
<script>
import PrimaryButton from '@/ui-components/PrimaryButton.vue'
export default {
    components: {
        PrimaryButton,
    },
    data() {
        return {
            name: '',
            viewers: '',
        }
    },
    methods: {
        addMovie(e) {
            if (!this.name || !this.viewers) return
            const newMovie = {
                name: this.name,
                viewers: this.viewers,
                favourite: false,
                like: false,
            }
            this.$emit("createMovie", newMovie),
                this.name = '',
                this.viewers = ''
        },
    }
}
</script>
<style scoped>
.movie-add-form {
    margin-top: 2rem;
}
</style>