<template>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main" v-if="todos.length">
        <input
            @click="toggleAllStatus"
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            :checked="isAllComplete"
        >
        <label for="toggle-all">Mark all as complete</label>
        <Card></Card>
    </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Card from "@/components/Card";

export default {
    name: "Main",
    components: {Card},
    methods: {
        ...mapActions([
            'clearCompleted',
            'toggleAllStatus'
        ]),
    },
    computed: {
        ...mapGetters([
            'isAllComplete',
            'todos'
        ])

    },
}
</script>