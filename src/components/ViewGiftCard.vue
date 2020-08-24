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
                     <td>OrderId</td>
                     <td>Recipient Name</td>
                     <td>Ordered Date</td>
                     <td>Gift Card Value</td>
                     <td>Commission (5%) </td>
                     <td>Delivery Status</td>
                 </thead>
                 <tbody>
                     <tr v-for="(giftcard,index) in filterGiftCards" v-bind:key="index">
                        <td>{{giftcard.id}}</td>
                        <td> {{ giftcard.recipient_lname }} {{ giftcard.recipient_fname }}</td>
                        <td>{{giftcard.OrderedDate}}</td>
                        <td>{{ giftcard.giftcardvalue }}</td>
                        <td>{{ giftcard.percent }}</td>
                        <td>{{ giftcard.deliveryStatus }}</td>
                        <td><button v-on:click.prevent="markDelivered(giftcard)" v-if="isAdmin">Mark Delivered</button></td>
                   </tr>
                 </tbody>
             </table>
         </div>
      </form>
  </div>
</template>

<script>

export default {
  name: 'ViewGiftCard',
  components: {
    
  },
  data: function(){
    return {
      msg: 'Gift Card History',
      giftcards: [],
      statusmessages:[],
      isSuccess:true,
      isAdmin:false
    }
  },
  methods : {
      markDelivered: function(paramgiftcard){
          /*console.log("paramgiftcard" + paramgiftcard)
          var ogiftcard = this.giftcards.filter((giftcard)=> {
              return giftcard.id=paramgiftcard.id
          })
          console.log("ogiftcard" + ogiftcard)*/
          paramgiftcard.deliveryStatus='Delivered'
          this.$http.put('http://localhost:3000/giftcards/'+paramgiftcard.id , paramgiftcard)
          .then(
              res=>{
                  console.log("Success : " + res)
                  this.message=paramgiftcard.recipient_fname + " is marked Delivered!."
                  this.isSuccess=true
                  console.log(res)
              },
              err=>{
                  this.isSuccess=false
                  this.message=err.message
                  console.log(err)
              }
          )
      }
  },
  created : function(){
              this.$http.get('http://localhost:3000/giftcards') 
                    .then(
                        res=>{
                            console.log(res)
                            this.giftcards=res.data
                            this.message=this.giftcards.count   
                            //this.$router.push({path:'/show'})
                            //this.statusmessages.push("Order Placed Successfull!")
                            this.isSuccess=true

                            if(localStorage.UserRole==="admin" || localStorage.UserRole==null || localStorage==null)
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
      filterGiftCards : function(){
          return this.giftcards.filter((giftcard)=> {
              if(this.isAdmin)
              return giftcard.deliveryStatus.match("UnDelivered")
              else
              return giftcard
          })
      }
  }

}
</script>