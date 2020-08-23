<template>
  <div>
    <h1>{{ msg }}</h1>
     <div>
         <span v-if="statusmessages.length" v-bind:class="[isSuccess? 'successmessage': 'errormessage']">
             <span v-for="(message, index) in statusmessages" v-bind:key="index">
                 {{message}}
             </span>
         </span>
     </div>
     <form >
         <table>
            <tr>
                 <td>Date :</td>
                 <td><input type="text" v-model.lazy="giftcard.ordereddate"></td>
            </tr>
             <tr>
                 <td>Recipient First Name :</td>
                 <td><input type="text" v-model.lazy="giftcard.recipient_fname"  required></td>
            </tr>
             <tr>
                 <td>Recipient Last Name :</td>
                 <td><input type="text"  v-model.lazy="giftcard.recipient_lname"  required></td>
            </tr>
            <tr>
                 <td>Gift Card Value :</td>
                 <td><input type="text" v-model="giftcard.giftcardvalue" v-on:input="computeCommission" required></td>
            </tr>
            <tr>
                 <td>Amount Payable (5% commission inclusive) :</td>
                 <td><input type="text"  v-model.lazy="giftcard.percent" required></td>
            </tr>
            <tr>
                 <td>Recipient Mobile Number :</td>
                 <td><input type="text"  v-model.lazy="giftcard.mobilenumber"  required></td>
            </tr>
            <tr>
                 <td>Address :</td>
                 <td><input type="textarea"  v-model.lazy="giftcard.address"  required></td>
            </tr>
            <tr><td><button v-on:click.prevent="placeorder()">Place Order</button></td></tr>
         </table>
      </form>
  </div>
</template>

<script>
export default {
  name: 'GiftCardOrder',
  data: function(){
    return {
      msg: 'Gift Card Order!!!!',
      giftcard: {
          "recipient_fname":"",
          "recipient_lname":"",
          "giftcardvalue":0,
          "percent":5,
          "mobilenumber":"",
          "address":"",
          "deliveryStatus": "UnDelivered",
          "ordereddate" : ""
      },
      statusmessages:[],
      isSuccess:true
    }
  },
  methods:{
      placeorder : function(){
          this.statusmessages=[];
          let validity= this.validateinputs();
          if(validity){
              this.$http.post('http://localhost:3000/giftcards', this.giftcard) 
                    .then(
                        res=>{
                            console.log(res)
                            //this.$router.push({path:'/show'})
                            this.statusmessages.push("Order Placed Successfull!")
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
           if(this.giftcard.recipient_fname.trim() =="" || this.giftcard.recipient_lname.trim() ==""|| this.giftcard.mobilenumber.trim() =="" || this.giftcard.address.trim() =="")
           {
            this.statusmessages.push("Please provide all mandatory fields.")
            return false;
           }
           return true;
      },
      computeCommission: function(){
            this.giftcard.percent= this.giftcard.giftcardvalue*(5/100)
      }
  },
  created: function(){
      var currentDate = new Date();
      var currentDateWithFormat = currentDate.toJSON().slice(0,10).replace(/-/g,'/');
      this.giftcard.ordereddate = currentDateWithFormat
      //Date().toLocaleString()
  }
}
</script>