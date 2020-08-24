
<template>
  <div>
    <h3>{{ msg }}</h3>
     <div>
         <span v-if="statusmessages.length" v-bind:class="[isSuccess? 'successmessage': 'errormessage']">
             <span v-for="(message, index) in statusmessages" v-bind:key="index">
                 {{message}}
             </span>
         </span>
     </div>
     <form >
         <div>
             <table>
                 <thead>
                     <td>GiftCard Id</td>
                     <td>User</td>
                     <td>Amount</td>
                     <td>Commission</td>
                 </thead>
                 <tbody>
                     <tr v-for="(giftcard,index) in giftcards" v-bind:key="index">
                        <td>{{giftcard.id}}</td>
                        <td> {{ giftcard.userid }} </td>
                        <td>{{ giftcard.giftcardvalue }}</td>
                        <td>{{ giftcard.percent }}</td>
                    </tr>
                    <tr><td colspan="4">Total Commission : {{ this.totalCommission }}</td></tr> 
                 </tbody>
             </table>
         </div>
      </form>
  </div>
</template>

<script>

export default {
  name: 'MonthlyReport',
  data: function(){
    return {
      msg: 'Monthly Report',
      giftcards: [],
      statusmessages:[],
      isSuccess:true,
      isAdmin:false,
      totalCommission : 0
    }
  },
  methods : {

  },
  created : function(){
              this.$http.get('http://localhost:3000/giftcards') 
                    .then(
                        res=>{
                            console.log(res)
                            /*this.giftcards=res.data.filter(obj=>{
                                console.log(obj.ordereddate)
                                var orderdt=new Date(obj.ordereddate)
                                console.log(orderdt.getMonth())
                                orderdt.getMonth()+1==8
                            })*/
                            this.giftcards=res.data
                            this.message=this.giftcards.count  
                            this.giftcards.forEach(obj=>{
                                this.totalCommission+=obj.percent
                            })
                            //this.$router.push({path:'/show'})
                            //this.statusmessages.push("Order Placed Successfull!")
                            this.isSuccess=true

                            if(localStorage.UserRole==="admin")
                            {
                                this.isAdmin= true
                            }
                            else
                            {
                                this.isAdmin= false
                            }
                        },
                        err=>{
                            this.message=err.message
                            console.log(err)
                        })


  },
  computed:{
  }

}
</script>