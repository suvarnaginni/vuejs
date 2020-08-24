<template>
  <div class="container" id="app">
    <Home msg="" /> 
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
  data: function() {
    return {
       Headers:[]
    }
  },
  mounted: function (){
   
    //if(localStorage)
      //localStorage.setItem(process.env.USER_ROLE_NAME, '')
  }
}
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 14px;
}

@import url(./assets/style.css);

</style>
