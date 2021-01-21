<template>
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
                <button class="destroy" @click="destroyTodo(index)"></button>
            </div>
            <input class="edit"
                   @keyup.esc="cancelEditing"
                   @keyup.enter="finishEditing"
                   @blur="finishEditing"
                   :value="todo.text"
            >
            <font-awesome-icon @click="toggleFooter(index)" v-if="!todo.view" class="fa-icon" icon="chevron-down"/>
            <div class="card-footer" :class="{ hidden: !todo.view, descEditing: descEditing }">
                <p> {{ extractText(todo.desc) }}</p>
<!--                <input class="edit"-->
<!--                       @keyup.enter="finishEditingDesc"-->
<!--                       :value="todo.desc"-->
<!--                >-->
                <font-awesome-icon @click="startEditingDesc(todo)" id="edit-icon" icon="edit"/>
            </div>
            <font-awesome-icon @click="toggleFooter(index)" v-if="todo.view" class="fa-icon-visible" icon="chevron-up"/>
        </li>
    </ul>
</template>

<script>
import {mapGetters} from "vuex";

const LOCAL_STORAGE_KEY = 'todo-app-vue';

export default {
    name: "Card",
    methods: {
        finishEditing(event) {
            if (!this.editing) {
                return;
            }
            const textbox = event.target;
            this.$store.dispatch('setEditText', {text: textbox.value.trim()})
            this.$store.dispatch('setEdit', {val: null})
        },
        cancelEditing() {
            this.$store.dispatch('setEdit', {val: null})
        },
        startEditing(todo) {
            this.$store.dispatch('setEdit', {val: todo})
        },
        destroyTodo(index) {
            this.$store.dispatch('destroyTodo', {index})
        },
        toggleFooter(index) {
            this.$store.dispatch('toggleFooter', {index})
        },
        extractText(text) {
            if (text !== "") {
                return text
            }
            return "Ops. There is no description yet."
        },
        startEditingDesc(todo) {
            return; // WIP
            // this.$store.dispatch('setDesc', {val: todo})
        },
        finishEditingDesc(event) {
            if (!this.descEditing) {
                return;
            }
            const textbox = event.target;
            this.$store.dispatch('setDescText', {text: textbox.value.trim()})
            this.$store.dispatch('setDesc', {val: null})
        }
    },
    computed: {
        ...mapGetters([
            'todos',
            'editing',
            'descEditing'
        ])
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