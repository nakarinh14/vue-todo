<template>
    <div>
        <section class="todoapp">
            <Header></Header>
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
            <Footer></Footer>
        </section>
        <section>
            <p>Default</p>
        </section>
    </div>

</template>

<script>

import Card from "@/components/Card";
import { mapGetters, mapActions } from 'vuex'
import Footer from "@/components/Footer";
import Header from "@/components/Header";



export default {
    name: 'Todo',
    components: {Header, Footer, Card},
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