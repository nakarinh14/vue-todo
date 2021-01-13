<template>
    <div>
        <section class="todoapp">
            <header class="header">
                <h1>{{ title }}</h1>
                <input class="new-todo" placeholder="What needs to be done?"
                       @keyup.enter="createTodo"
                       autofocus
                >
            </header>

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
                <ul class="todo-list">
                    <!-- These are here just to show the structure of the list items -->
                    <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
                    <li v-for="(todo, index) in todos"
                        :class="{ completed: todo.isDone, editing: todo === editing }"
                        :key="index"
                    >
                        <div class="view">
                            <input class="toggle" type="checkbox" v-model="todo.isDone">
                            <label @dblclick="startEditing(todo)">{{ todo.text }}</label>
                            <button class="destroy" @click="destroyTodo(todo)"></button>

                        </div>
                        <input class="edit"
                               @keyup.esc="cancelEditing"
                               @keyup.enter="finishEditing"
                               @blur="finishEditing"
                               :value="todo.text"
                        >

                    </li>
                </ul>
            </section>
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
        </section>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <!-- Remove the below line ↓ -->
            <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
            <!-- Change this out with your name and url ↓ -->
            <p>Created by <a href="http://todomvc.com">you</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    </div>
</template>

<script>
const LOCAL_STORAGE_KEY = 'todo-app-vue';
export default {
    name: 'Todo',
    data() {
        return {
            title: 'Todos',
            todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
                { text: 'Learn JavaScript ES6+ goodies', isDone: true },
                { text: 'Learn Vue', isDone: false },
                { text: 'Build something awesome', isDone: false },
            ],
            editing: null,
            toggle: false
        }
    },
    methods: {
        createTodo(event) {
            const textbox = event.target;
            this.todos.push({text: textbox.value.trim(), isDone: false});
            textbox.value = '';
        },
        startEditing(todo) {
            this.editing = todo;
        },
        finishEditing(event) {
            if (!this.editing) { return; }
            const textbox = event.target;
            this.editing.text = textbox.value.trim();
            this.editing = null;
        },
        cancelEditing() {
            this.editing = null;
        },
        destroyTodo(todo) {
            const index = this.todos.indexOf(todo);
            this.todos.splice(index, 1);
        },
        clearCompleted() {
            this.todos = this.activeTodos;
        },
        toggleAllStatus(){
            const val = !this.isAllComplete
            this.todos = this.todos.map(item => ({
                text: item.text,
                isDone: val
            }))
        },
    },
    computed: {
        activeTodos() {
            return this.todos.filter(t => !t.isDone);
        },
        completedTodos() {
            return this.todos.filter(t => t.isDone);
        },
        isAllComplete(){
            return this.todos.length > 0 && (this.todos.length === this.completedTodos.length)
        }
    },
    watch: {
        todos: {
            deep: true,
            handler(newValue) {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
            }
        }
    },
}
</script>