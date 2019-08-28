
   class Cart extends Component{
    constructor(sSelector, sCartSelector){
        super(sSelector);
        this.allFormsOrder = document.querySelectorAll(`.b-order-form`);
        this.cart = document.querySelector(sCartSelector);
        this.list = this.cart.querySelector(`.b-minicart__list`);
        this.button = this.cart.querySelector(`.b-minicart__button`);
        this.total = this.cart.querySelector(`.b-minicart__total`);
        this.quantity = this.cart.querySelector(`.b-minicart__quantity`);
        this.orderLink = this.cart.querySelector(`.b-minicart__link`);
        this.orderForm = this.cart.querySelector(`.b-minicart__order`);
        this.load();
        this.goods = {};
        
        this.createEvents();
    }

    add(event){
      event.preventDefault();

      let addForm = event.target,
          currentGoods = addForm.parentNode.parentNode,
          goodsId = this.put(currentGoods);
           
          this.goods[goodsId] = currentGoods.querySelector(`.b-order-form__quantity`).value;
          this.saveCookie();
          this.list.classList.add(`b-minicart_list_block`);
          this.showCartInfo();

    }

    put(oCurrentGoods){
      let addedGoods = new Goods(oCurrentGoods),
          newGoods = this.list.children[0].rows[0].cloneNode(true),
          goodsId = addedGoods.getId();
      let existingGoods = ``;
          [].forEach.call(this.list.children[0].children[0].rows, (item) => {
                
              if(item.getAttribute(`id`) == goodsId){
               existingGoods = this.list.children[0].children[0].querySelector(`.b-good_id_${goodsId}`);
              }
              else{
                return false;
              }
             
          });
          
          
        if(existingGoods){
            super.copyData(oCurrentGoods, existingGoods, ['.b-order-form__quantity']);
         }
        else{
            super.copyData(oCurrentGoods, newGoods, ['.b-good__image', '.b-good__name', '.b-good__price', '.b-order-form__quantity']);

            newGoods.classList.add(`b-good_id_${goodsId}`);
            newGoods.setAttribute(`id`, `${goodsId}`);
            newGoods.querySelector(`.b-good__delete`).addEventListener(`click`, this.del.bind(this));
            newGoods.querySelector(`.b-good__name`).classList.add(`b-good_name-black`);

            let btns = newGoods.querySelectorAll(`.b-order-form__btn`);
             for(let btn of Array.from(btns)){
                btn.addEventListener(`click`, this.changeQuantity.bind(this));
             }

            newGoods.querySelector(`.b-order-form`).addEventListener(`submit`, this.forOrderForm.bind(this));
              
            this.list.children[0].children[0].appendChild(newGoods);

         }
         return goodsId;
           
      }

      forOrderForm(event){
          event.preventDefault();
      let currentGoods = event.target.parentNode.parentNode,
          changeGoodsId = new Goods(currentGoods).getId();

      this.goods[changeGoodsId] = currentGoods.querySelector(`.b-order-form__quantity`).value;
      this.saveCookie();
      this.showCartInfo();
      }


      saveCookie(){
        Cookies.set('cartGoods', this.goods);
        
      }

      del(event){
        console.log(event.target);

        let delLink = event.target,
            currentGoods = delLink.parentNode.parentNode,
            delGoods = new Goods(currentGoods),
            goodsId = delGoods.getId();

            currentGoods.remove();
            delete this.goods[goodsId];
            this.saveCookie();
            this.showCartInfo();
      }

      showHideOrderForm(event){
        event.preventDefault();

        this.orderForm.classList.toggle(`b-minicart__order__block`);

      }

      changeQuantity(event){
       
         let currentBtn = event.target,
             step = currentBtn.dataset.step,
             currentTextfield = currentBtn.previousElementSibling;

             if(step == 1){
             currentTextfield;
               }
              else if(step == -1){
             currentTextfield = currentTextfield.previousElementSibling;
               }

          let currentTextfieldVal = (+ currentTextfield.value) + (+ step);

             
             if(currentTextfieldVal >= 0){
               currentTextfield.value = currentTextfieldVal;
             }
             if(currentTextfieldVal < 0){
              alert(`Значения со знаком '${"-"}' не могут быть введены !`);
             }
          
      }

      load(){
       this.goods = Cookies.getJSON('cartGoods');
       console.log(this.goods);

        for(let id in this.goods){
          let currentGoods = super.find(`.b-good_id_${id}`);
          this.put(currentGoods);
        }
        this.showCartInfo();
      }

      showHideCart(){
        this.list.classList.toggle(`b-minicart_list_block`);
      }

      showCartInfo(){

        let totalQty = 0,
            totalPrice = 0,
            price = 0,
            goodsList = ``,
            name = ``;

            for(let id in this.goods){
              totalQty += + this.goods[id];
              price = + super.find(`.b-good_id_${id} .b-good__price`).innerHTML;
              totalPrice += price * this.goods[id];
              name = super.find(`.b-good_id_${id} .b-good__name`).innerHTML;
              goodsList += `<br>id:${id}, ${name}, ${price * this.goods[id]} грн/${this.goods[id]} шт`;
            }
            
          this.quantity.innerHTML = totalQty;
          this.total.innerHTML = totalPrice;

          let order = new Order(`#order1`);
              order.goods.value = goodsList;
              console.log(goodsList);

          
      }

    createEvents(){
      for(let i = 0; i < this.allFormsOrder.length; i++){
       this.allFormsOrder[i].addEventListener(`submit`, this.add.bind(this));
      }
      this.button.addEventListener(`click`, this.showHideCart.bind(this));
      this.allBtn = super.findForAll(`.b-order-form__btn`);
         for(let i = 0; i < this.allBtn.length; i++){
            this.allBtn[i].addEventListener(`click`, this.changeQuantity.bind(this));
         }
      this.orderLink.addEventListener(`click`, this.showHideOrderForm.bind(this));

    }
   }


  


