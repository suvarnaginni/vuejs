<template>
    <div>
        <h3>Login</h3>
        <span v-if="statusmessages.length" v-bind:class="[isSuccess? 'successmessage': 'errormessage']">
             <span v-for="(message, index) in statusmessages" v-bind:key="index">
                 {{message}}
             </span>
         </span>
        <br/>
        Username : <input type="text" ref="username"  v-model.lazy="user.username"  required>
        <br/>
        Password : <input type="text" ref="password" v-model.lazy="user.password"  required>
        <br/>
        <button v-on:click.prevent="validateLogin()">Login</button>
    </div>
</template>
<script>


export default {
    name : "Login",
    data: function(){
    return {
      msg: 'Login!!!!',
      user: {
          "username":"",
          "password":""
      },
      statusmessages:[],
      isSuccess: true
    }
  },
  methods: {
        validateLogin : function(){
            this.statusmessages=[]
            localStorage.clear()
            if(this.user.username.trim()=="")
            {
                this.$refs.username.focus()
                this.statusmessages.push("Enter Username")
                return
            }
            else if (this.user.password.trim()=="")
            {
                this.$refs.password.focus()
                this.statusmessages.push("Enter password")
                return
            }
            else{
                console.log('in validatelogin else block')
                this.$http.get('http://localhost:3000/users') 
                 .then(
                     res=>{
                         console.log(res.data)
                         res.data.filter((user)=> {
                             if(user.username.match(this.user.username) && user.password.match(this.user.password))
                             {
                                localStorage.UserRole=user.role
                                localStorage.UserId=user.id
                                this.$router.push({ path: '/viewgiftcard' })
                             }
                         })
                     },
                     err=>{
                         console.log(err)
                         return false
                     }
                 )
                         this.statusmessages.push("Invalid Credentails")
                         this.$refs.username.focus()
            }
        }
}
}

</script>