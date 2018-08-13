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
        
        return newItem;

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
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list"
  };


  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //value will either be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    addListItem : function(obj, type){
      var html, newHtml,element;
      // Create Html String with Placeholder
      if(type === 'inc'){
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>'
        element = document.querySelector(DOMstrings.incomeContainer);
      }else if(type === 'exp'){
        html = ' <div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>'
        element = document.querySelector(DOMstrings.expenseContainer);        
      }

      // Replace html string with real time value
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // Insert the Html Into Dom
      
      element.insertAdjacentHTML('beforeend', newHtml);

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
    var newItem, input;
    // 1. Get the Field Input Data
    input = UICtrl.getInput();
    // 2. Add the item to the budget Controller
    newItem = budgetController.addItem(input.type, input.description, input.value);
    // 3. Add the item to the UI
    UIController.addListItem(newItem, input.type);
    

    // 4. Calculate the budget

    // 5. Display the budget on the UI
  };

return{
    init: function(){
        setupEventListners();
    },

    testing: function(){
      return newItem;
    }
}


})(budgetController, UIController);


controller.init();