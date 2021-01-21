<template>
    <div>
        <section class="todoapp">
            <Header></Header>
            <Main></Main>
            <Footer></Footer>
        </section>
    </div>

</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";


export default {
    name: 'Todo',
    components: {Main, Header, Footer}
}
</script>