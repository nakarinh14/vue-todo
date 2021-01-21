const LOCAL_STORAGE_KEY = 'todo-app-vue';
const currDate = new Date();

export default {
    state: {
        todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
            {text: 'Learn JavaScript ES6+ goodies', isDone: true, date: currDate, desc: "", view: false},
            {text: 'Learn Vue', isDone: false, date: currDate, desc: "", view: false},
            {text: 'Build something awesome', isDone: false, date: currDate, desc: "", view: false},
        ],
        editing: null,
        descEditing: null
    },

    mutations: {
        pushTodos(state, val) {
            state.todos.push({text: val.text, isDone: false, date: new Date(), desc: "", view: false})
        },
        destroyTodo(state, val) {
            state.todos.splice(val.index, 1);
        },
        toggleAllStatus(state, val) {
            state.todos = state.todos.map(item => ({
                text: item.text,
                isDone: val.status
            }))
        },
        toggleFooter(state, val){
            state.todos[val.index].view = !state.todos[val.index].view
        },
        clearCompleted(state, val){
            state.todos = val.todos;
        },
        setEdit(state, val){
            state.editing = val.val;
        },
        setEditText(state, val){
            state.editing.text = val.text
        },
        setDesc(state, val){
            state.descEditing = val.val
        },
        setDescText(state, val){
            state.descEditing.desc = val.text
        }
    },

    actions: {
        pushTodos({commit}, payload) {
            commit('pushTodos', payload)
        },
        destroyTodo({commit}, payload) {
            commit('destroyTodo', payload)
        },
        toggleAllStatus({commit, getters}) {
            commit('toggleAllStatus', {status: !getters.isAllComplete})
        },
        toggleFooter({commit}, payload){
            commit('toggleFooter', payload)
        },
        clearCompleted({commit, getters}){
            commit('clearCompleted', {todos: getters.activeTodos})
        },
        setEdit({commit}, payload){
            commit('setEdit', payload)
        },
        setEditText({commit}, payload){
            commit('setEditText', payload)
        },
        setDesc({commit}, payload){
            commit('setDesc', payload)
        },
        setDescText({commit}, payload){
            commit('setDescText', payload)
        }
    },

    getters: {
        todos(state) {
            return state.todos
        },
        completedTodos(state) {
            return state.todos.filter(t => t.isDone);
        },
        activeTodos(state) {
            return state.todos.filter(t => !t.isDone);
        },
        isAllComplete(state, getter){
            return state.todos.length === getter.completedTodos.length
        },
        editing(state){
            return state.editing
        },
        descEditing(state){
            return state.descEditing
        }
    }
}