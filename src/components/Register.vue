<template>
  <div>
    <h3>{{ msg }}</h3>
    <form >
         <span v-if="statusmessages.length" v-bind:class="[isSuccess? 'successmessage': 'errormessage']">
             <span v-for="(message, index) in statusmessages" v-bind:key="index">
                 {{message}}
             </span>
         </span>
         <table>
             <tr>
                 <td>Username : </td>
                 <td><input type="text" v-model.lazy="user.username"  required></td>
            </tr>
             <tr>
                 <td>Password:</td>
                 <td><input type="password" ref="password" v-model.lazy="user.password"  required></td>
            </tr>
            <tr>
                 <td>Confirm Password:</td>
                 <td><input type="password" ref="confirmpwd" required></td>
            </tr>
            <tr>
                 <td>Email:</td>
                 <td><input type="email"  v-model.lazy="user.email"  required></td>
            </tr>
            <tr><td><button v-on:click.prevent="registration()">Register</button></td></tr>
         </table>
      </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: function(){
    return {
      msg: 'Registration!!!!',
      user: {
          "username":"",
          "password":"",
          "email":"",
          "role": "USER"
      },
      statusmessages:[],
      isSuccess:true
    }
  },
  methods:{
      registration : function(){
          this.statusmessages=[];
          let validity= this.validateinputs();
          if(validity){
              this.$http.post('http://localhost:3000/users', this.user) 
                    .then(
                        res=>{
                            console.log(res)
                            //this.$router.push({path:'/show'})
                            this.statusmessages.push("Registration Successfull!")
                            this.isSuccess=true
                        },
                        err=>{
                            console.log(err)
                        })
          }
          else
          {
              this.isSuccess=false
          }
      },
      validateinputs: function(){
           if(this.user.username.trim() =="" || this.user.email.trim() ==""|| this.user.password.trim() =="")
           {
            this.statusmessages.push("Please provide all mandatory fields.")
            this.isSuccess=false
            return false;
           }
           else if(this.$refs.password.value.trim()!=this.$refs.confirmpwd.value.trim())
           {
            this.statusmessages.push("Password and Confirm Password Does'nt match")
            this.isSuccess=false
            return false;
           }
           else
           {
               this.isSuccess=true
                return true;
           }
      }
  }
}
</script>