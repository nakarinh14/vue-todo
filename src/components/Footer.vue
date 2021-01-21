<template>
    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer" v-if="todos.length">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count">
                    <strong>
                        {{ activeTodos.length }}
                    </strong>
                    item(s) left
                </span>

        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a class="selected" href="#/">All</a>
            </li>
            <li>
                <a href="#/active">Active</a>
            </li>
            <li>
                <a href="#/completed">Completed</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" @click="clearCompleted" v-show="completedTodos.length">Clear completed</button>
    </footer>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Footer",
    methods: {
        ...mapActions([
            'clearCompleted',
            'toggleAllStatus'
        ]),
    },
    computed: {
        ...mapGetters([
            'activeTodos',
            'completedTodos',
            'isAllComplete',
            'todos'
        ])
    },
}
</script>

