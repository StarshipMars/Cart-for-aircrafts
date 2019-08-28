
 class Order{
 	constructor(sSelector){
       this.orderForm = document.querySelector(sSelector);
       this.name = this.orderForm.querySelector(`.b-order__textfield_name`);
       this.email = this.orderForm.querySelector(`.b-order__textfield_email`);
       this.tel = this.orderForm.querySelector(`.b-order__textfield_tel`);
       this.goods = this.orderForm.querySelector(`.b-order__textfield_goods`);
       this.messages = this.orderForm.querySelector(`.b-order__message`);
       this.dates = {};
       
       this.createEvents();
 	}

 	ajax(event){
 		event.preventDefault();

 		this.dates = {
            "name"  : this.name.value,
            "email" : this.email.value,
            "tel"   : this.tel.value,
            "goods" : this.goods.value
 		};

 		this.sendOrderforAjax('order.php', 'POST', this.showDate.bind(this), this.dates);
 	}


 	sendOrderforAjax(url, method, functionName, dataArray){
       let xhttp = new XMLHttpRequest();
           xhttp.open(method, url, true);
           xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
           xhttp.send(this.requestData(dataArray));

           xhttp.onreadystatechange = () =>{
           	  if(xhttp.readyState == 4 && xhttp.status == 200){
           	  	  console.log(xhttp);
 			         functionName(xhttp.response);
 		     }
           }
 	} 

 	requestData(dataArr){
       let out = ``;
       for(let key in dataArr){
       	out += `${key}=${dataArr[key]}&`;
       }
       return out.slice(0, out.length - 1);

 	}

 	  showDate(data){
 	  	data = JSON.parse(data);
        this.messages.innerHTML = data.message;
 	  } 

 	  createEvents(){
 	  	 this.orderForm.addEventListener(`submit`, this.ajax.bind(this));
 	  } 

 }