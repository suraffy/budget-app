

//Budget Controller
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;        
    };
    
    var calculateTotal = function(type) {
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
    }
    
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            //Create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            //Creating a new item based on 'inc' or 'exp' type
            if(type === 'inc') {
                newItem = new Income(ID, des, val);
            } else if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            }
            
            //Push it into our datastructure
            data.allItems[type].push(newItem);
            
            //return the new element
            return newItem;           

        },
        
        deleteItem: function(type, id) {
            var ids, index;
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            
            index = ids.indexOf(id);
            
            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }          
        },
        
        calculateBudget: function() {
            // Calculate total income and expense
            calculateTotal('inc');
            calculateTotal('exp');
            
            // Calculate the budget: totalIncome - totalExpense
            data.budget = data.totals['inc'] - data.totals['exp'];
                    
            // Calculate the percentage of the income that we spent
            if(data.totals['inc'] > 0) {
            data.percentage = Math.round((data.totals['exp'] / data.totals['inc']) * 100);
            }
        },
        
        calculatePercentage: function() {
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
            }
        },
        
        testing: function() {
            console.log(data);
        }
    }
    
    
    
    
})();





















//UI Controller
var UIController = (function() {
    
    var DOMstring = {
        inputType: '.type',
        inputDescription: '.description',
        inputValue: '.value',
        inputBtn: '.btn',
        incomeContainer: '.income_list',
        expenseContainer: '.expense-list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.list_container',
        expensePercentageLabel: '.item_percentage',
        month_year: '.budget__title--month',
        budgetLabel2: '.budget_value_2',
        incomeLabel2: '.budget_income_value_2',
        expenseLabel2: '.budget_expenses_value_2'
    };
    
    var numberFormat = function(num, type) {
        var int, dec, numSplit, sign;
        
        num = Math.abs(num);
        num = num.toFixed(2);
        
        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];
        
        if(int.length > 3) {
            var newInt = int;
            for(var i = int.length ; i > 3; i -= 3){
                newInt = newInt.substr(0, i-3) + ',' + newInt.substr(i-3, int.length);
            }
            num = newInt + '.' + dec;
        } else {
            num = int + '.' + dec;
        }
                        
        if(type === 'inc') { sign = '+' }
        else if(type === 'exp') { sign = '-' }
        else {sign = ''}
        
        return sign + ' ' + num;
        
        
    };
    
    var nodeListForEach = function(list, callback) {
                for(var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            }
    
    
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value, // either inc or exp
                description: document.querySelector(DOMstring.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstring.inputValue).value)
            }
        },
        
        addListItem: function(obj, type) {
            var html, newHtml, element;
            //Create html string with some placeholder text
            if(type === 'inc') {
                element = DOMstring.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_delete"><button class="item_delete_btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                element = DOMstring.expenseContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_percentage">21%</div><div class="item_delete"><button class="item_delete_btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            
            //Replace the placeholder with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', numberFormat(obj.value, type));
            
            
            //Insert the html to DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
            
        },
        
       
    
        clearFields: function() {
            /*var disc, val;
            
            disc = document.querySelector(DOMstring.inputDescription);
            val = document.querySelector(DOMstring.inputValue);
            
            disc.value = "";
            val.value = "";
            
            disc.focus();   //After clearing the focus to be in the discription input field*/
            
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstring.inputDescription + ', ' + DOMstring.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
    
            fieldsArr.forEach(function(cur, index, array) {
                cur.value = "";
            });
            fieldsArr[0].focus();        
        },
        
        deleteListItem: function(type, itemID) {
            var el = document.getElementById(itemID);
            el.parentNode.removeChild(el);
        },
        
        displayBudget: function(obj) {
            var type;
            if(obj.budget > 0) { type = 'inc'}
            else if(obj.budget < 0) { type = 'exp'}
            else { type = '' }
            
            document.querySelector(DOMstring.budgetLabel).textContent = numberFormat(obj.budget, type);
            document.querySelector(DOMstring.incomeLabel).textContent = numberFormat(obj.totalInc, 'inc');
            document.querySelector(DOMstring.expenseLabel).textContent = numberFormat(obj.totalExp, 'exp');
            
            document.querySelector(DOMstring.budgetLabel2).textContent = numberFormat(obj.budget, type);
            document.querySelector(DOMstring.incomeLabel2).textContent = numberFormat(obj.totalInc, 'inc');
            document.querySelector(DOMstring.expenseLabel2).textContent = numberFormat(obj.totalExp, 'exp');
            
            if(obj.percentage >= 0) {
                document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstring.percentageLabel).textContent = '---' ;
            }
        },
        
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstring.expensePercentageLabel);
            
            /* for(var i = 0; i < fields.length; i++) {
                fields[i].textContent = percentages[i];
            } */ // this is in my way
            
            
            
            nodeListForEach(fields, function(current, index) {
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---'
                }
            });
            
            
        },
        
        displayDate: function() {
            var now, month, year, months;
            
            now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            month = now.getMonth();
            year = now.getFullYear();
            
            document.querySelector(DOMstring.month_year).textContent = months[month] + ' ' + year;
        },
        
        changedType: function() {
            var fields = document.querySelectorAll(DOMstring.inputType + ',' + DOMstring.inputDescription + ',' + DOMstring.inputValue);
            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            });
            
            document.querySelector(DOMstring.inputBtn).classList.toggle('red');
        },
        
        getDOMstring: function() {
            return DOMstring;
        }
    }
    
    
})();





















//App Controller
var controller = (function(budgetCtrl, UICtrl) {
    
    var setupEventListeners = function() {
        var Dom = UICtrl.getDOMstring();
        
        document.querySelector(Dom.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        
        document.querySelector(Dom.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(Dom.inputType).addEventListener('change', UICtrl.changedType);
        
    };
    
    
    var updateBudget = function() {
        var budget;
        
        //1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        //2. Return the budget
        budget = budgetCtrl.getBudget();
        
        //3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    
    
    var updatePercentages = function() {
        var percentages;
        
        // 1. Calculate percentage
        budgetCtrl.calculatePercentage();
        
        // 2. Read percentages from the budget controller
        percentages = budgetCtrl.getPercentages();
        
        // 3. Update the UI with the new percentage
        UICtrl.displayPercentages(percentages);
    }    
    
    
    
    var ctrlAddItem = function() {
        var input, newItem;
        // 1. Get the field input data
        input = UICtrl.getInput();
        
        if(input.description !== '' && !isNaN(input.value) && input.value > 0) {
            
            // 2. Add the items to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the input fields
            UICtrl.clearFields();

            // 5. Calculate the budget and Display the budget on the UI
            updateBudget();
            
            // 6. Calculate the percentage and Display it on the UI
            updatePercentages();
        }        
        
    }
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. Delete the item from the datastructure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(type, itemID);

            // 3. Update the budget
            updateBudget();
            
            // 4. Update the percentages
            updatePercentages();
            
        }
    }
    
    
    return {
        init: function() {
            UICtrl.displayDate();
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage:-1
            });
            setupEventListeners();
        }
    } 
    
})(budgetController, UIController);

controller.init();






