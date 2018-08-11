var budgetController = (function(){

  
    
})();


var UIController = (function(){

    // some code

});


var controller = (function(budgetCtrl, UICtrl){


    var ctrlAddItem = function(){
        // 1. Get the Field Input Data
        
            // 2. Add the item to the budget Controller
        
            // 3. Add the item to the UI
        
            // 4. Calculate the budget
        
            // 5. Display the budget on the UI

            console.log('It Works')
        }

   document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

   document.addEventListener('keypress', function(event){
    
    if(event.keyCode === 13 || event.which === 13){

        ctrlAddItem();
    }
    
   });

})(budgetController, UIController);