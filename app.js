// BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function(id, description, value){
        this.id = id,
        this.description = description,
        this.value = value
    }

    var Income = function(id, description, value){
        this.id = id,
        this.description = description,
        this.value = value
    }


    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return{
      addItem: function(type, des, val){
        var newItem, ID;

        
        if(data.allItems[type].length > 0){
          ID = data.allItems[type][data.allItems[type].length -1].id + 1;
        }else{
          ID = 1;
        }

        if(type === 'inc'){
          newItem = new Expense(ID, des, val)
        }else if(type === 'exp'){
          newItem = new Expense(ID, des, val)
        }

        data.allItems[type].push(newItem);
        
      },
     
      testing: function() {
        return console.log(data);
      }

    }
   
})();

// UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //value will either be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDomStrings: function() {
      return DOMstrings;
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListners = function() {
    
    DOM = UICtrl.getDomStrings();    
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };



  var ctrlAddItem = function() {
    // 1. Get the Field Input Data
    var input = UICtrl.getInput();
    // 2. Add the item to the budget Controller
    var newItem;
    newItem = budgetController.addItem(input.type, input.description, input.value);
    // 3. Add the item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI
  };

return{
    init: function(){
        setupEventListners();
    }
}


})(budgetController, UIController);


controller.init();