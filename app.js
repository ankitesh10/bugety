// BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    (this.id = id),
      (this.description = description),
      (this.value = value),
      (this.percentage = -1);
  };

  Expense.prototype.calcPercentage = function(totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value / totalInc) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

  var Income = function(id, description, value) {
    (this.id = id), (this.description = description), (this.value = value);
  };

  var calcTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 1;
      }

      if (type === "inc") {
        newItem = new Expense(ID, des, val);
      } else if (type === "exp") {
        newItem = new Expense(ID, des, val);
      }

      data.allItems[type].push(newItem);

      return newItem;
    },

    deleteItem: function(type, id) {
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function() {
      // Calculate total Income and expenses
      calcTotal("exp");
      calcTotal("inc");

      // Calculate the Budget
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate Percentage the percentage of income that we spent

      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        percentage = -1;
      }
    },

    calcPercentages: function() {
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var allPerc = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });

      return allPerc;
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function() {
      return console.log(data);
    }
  };
})();

// UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expPercLabel: ".item__percentage"
  };

  var formatNumber = function(num, type){


    // 1234567
    var num,int,dec;

    num = Math.abs(num);
    num = num.toFixed(2);
    
    numSplit = num.split('.');
    int = numSplit[0];
    dec = numSplit[1];

    if(int.length > 3){
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length-3, 3);
    }

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //value will either be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      // Create Html String with Placeholder
      if (type === "inc") {
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>';
        element = document.querySelector(DOMstrings.incomeContainer);
      } else if (type === "exp") {
        html =
          ' <div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
        element = document.querySelector(DOMstrings.expenseContainer);
      }

      // Replace html string with real time value
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type) );

      // Insert the Html Into Dom

      element.insertAdjacentHTML("beforeend", newHtml);
    },

    displayBudget: function(obj) {

      obj.budget>0 ? type = 'inc' : type = 'exp'; 

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type) ;
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =  obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },

    displayPercentages: function(percentages) {
      var fields =  document.querySelectorAll(DOMstrings.expPercLabel);

      var nodeListforeach = function(list, callback){

        for(var i=0; i<list.length; i++){
          callback(list[i], i);
        }
      }

      nodeListforeach(fields, function(current,index){
        if(percentages[index] > 0){
          current.textContent = percentages[index] + '%';
        }else{
          current.textContent = "---";
        }

      })


    },

    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
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

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };

  var updateBudget = function() {
    // 1. calculate the budget
    budgetCtrl.calculateBudget();

    // 2. return the budget
    var budget = budgetCtrl.getBudget();

    // 3. display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    // 1. Calculate Percentage
    budgetCtrl.calcPercentages();
    // 2. Read percentage from budget controller
    var percentages = budgetCtrl.getPercentages();

    // 3. Update the UI with new percentage
    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function() {
    var newItem, input;
    // 1. Get the Field Input Data
    input = UICtrl.getInput();

    if (input.type !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget Controller
      newItem = budgetController.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3. Add the item to the UI
      UIController.addListItem(newItem, input.type);
      // 4. Clear the input Fields
      UIController.clearFields();

      // 5. calculate and update budget
      updateBudget();

      // 6. Calculate and update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemID, el;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split("-");
      var type = splitID[0];
      var ID = parseInt(splitID[1]);

      // 1.Delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);

      // 2.Delete the the item from the UI

      el = document.getElementById(itemID);

      el.parentNode.removeChild(el);

      // 3.Update and show the new budget

      updateBudget();

      // 4. Calculate and update percentages
      updatePercentages();
    }
  };

  return {
    init: function() {
      setupEventListners();

      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
    },

    testing: function() {
      return newItem;
    }
  };
})(budgetController, UIController);

controller.init();
