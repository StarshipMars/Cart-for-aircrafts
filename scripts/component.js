
  class Component{
  	constructor(sSelector){
  	this.element = document.querySelector(sSelector);
    
  	 if(!this.element){
        console.log(`Не найден элемент по селектору ${sSelector}`);
  	 }
  	}

  	find(selector){
       let currentElem = this.element.querySelector(selector);

       if(currentElem){
       	return currentElem;
       }
       else{
       	 console.log(`Не найден элемент по селектору ${selector}`);
       	 return null;
       }
  	}
    findForAll(elementsSelector){
         let currentElements = this.element.querySelectorAll(elementsSelector);

         return currentElements = currentElements ? currentElements : null;
    }

  	copyData(source, destination, cssClassList){
        cssClassList.forEach((cssClassName) =>{
            let currentElemFromSource = source.querySelector(cssClassName),
                currentElemFromDestination = destination.querySelector(cssClassName),
                tagName = currentElemFromSource.nodeName.toLowerCase();
            
            if(tagName == 'img'){
               currentElemFromDestination.setAttribute('src', currentElemFromSource.getAttribute('src'));
               console.log(currentElemFromDestination);
            }
            else if(tagName == 'input'){
               currentElemFromDestination.value = currentElemFromSource.value;
               
            }
            else{
               currentElemFromDestination.innerHTML = currentElemFromSource.innerHTML;
            }
        });

  	}
  }