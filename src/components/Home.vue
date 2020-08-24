<template>
  <div class="hello">
      <div class="header flex-box">
      <img alt='Vue logo' width="25px" height="25px" src=""  />
       <router-link v-for="route in Headers" :key="route.routepath" :to="route.routepath" class="">
         <button>{{route.routename}}</button>
      </router-link>
    </div>
     <h3>{{ msg }}</h3> 
  </div> 
</template>

<script>

export default {
  name: 'Home',
  props: {
    msg: String
  },
  data: function() {
    return {
       Headers:[]
    }
  },
  methods :{

  },
  created : function(){
              this.$http.get('http://localhost:3000/headers') 
                    .then(
                        res=>{
                            console.log(res)
                            console.log(localStorage.UserRole)
                            console.log(window.location.pathname)
                            console.log(window.location.pathname.replace('/','').toLowerCase())
                            this.Headers=res.data.filter((header)=>{
                              return header.role.match(localStorage.UserRole) && header.page.match(window.location.pathname.replace('/','').toLowerCase())
                            })
                            this.message=this.Headers.count   
                            //this.$router.push({path:'/show'})
                            //this.statusmessages.push("Order Placed Successfull!")
                            this.isSuccess=true
                        },
                        err=>{
                            console.log(err)
                        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


</style>
