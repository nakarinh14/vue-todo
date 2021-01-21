<template>
    <header class="header">
        <h1>Todos</h1>
        <input class="new-todo" placeholder="What needs to be done?"
               @keyup.enter="createTodo"
               autofocus
        >
    </header>
</template>

<script>
export default {
    name: "Header",
    methods: {
        createTodo(event) {
            const textbox = event.target;
            // prevent empty string being appended
            if(textbox.value.trim().length > 0){
                this.$store.dispatch('pushTodos', {text: textbox.value.trim()})
                textbox.value = '';
            }
        },
    }
}
</script>

<style scoped>

</style>