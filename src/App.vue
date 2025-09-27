<template>
<router-view />
</template>

<script>
export default {

    name: "App",

    data() {
        return {
            locale: 'en',
        }
    },

    mounted() {

        const savedLang = localStorage.getItem('lang')
        if (savedLang) {
            this.locale = savedLang
            document.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
            document.documentElement.lang = savedLang
        }
    },

    methods: {
        switchLanguage() {
            this.locale = this.locale === 'ar' ? 'en' : 'ar'
            localStorage.setItem('lang', this.locale)
            document.dir = this.locale === 'ar' ? 'rtl' : 'ltr'
            document.documentElement.lang = this.locale
            window.location.reload()
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

#app {
    font-family: "Inter", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
