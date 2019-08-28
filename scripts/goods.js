  
  class Goods{
  	constructor(oGoodsElement){
        this.elem = oGoodsElement;
  	}

  	getId(){
  		return this.elem.getAttribute(`class`).match(/id_(\d{1,11})/)[1];

  	}
  }