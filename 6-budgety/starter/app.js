// Module Pattern //

var BudgetController = (function () {

    var Income = function ( id, description, value ) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Expense = function ( id, description, value ) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateBudget = function () {
        budgetData.budget = budgetData.totals.inc - budgetData.totals.exp;

        if ( budgetData.totals.inc > 0 ) {
            budgetData.percentage = Math.round( ( budgetData.totals.exp / budgetData.totals.inc ) * 100 );
        }
    }

    var budgetData = {
        allItems: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        },

        budget: 0,

        percentage: -1
    }

    return {
        addNewItem: function ( type, description, value ) {
            var newItem, ID;

            if ( budgetData.allItems[type].length !== 0 ) {
                ID = budgetData.allItems[type][budgetData.allItems[type].length - 1].id + 1;
            } else {
                ID = 1;
            }

            if ( type === 'inc' ) {
                newItem = new Income ( ID, description, value );
            } else if ( type === 'exp' ) {
                newItem = new Expense ( ID, description, value );
            }

            budgetData.allItems[type].push( newItem );

            return newItem;
        },

        calculateTotal: function ( type ) {
            var sum = 0;

            budgetData.allItems[type].forEach(function ( current ) {
                sum += current.value;
            });

            budgetData.totals[type] = sum;
        },

        getBudget: function () {
            calculateBudget();

            return {
                totalInc: budgetData.totals.inc,
                totalExp: budgetData.totals.exp,
                budget: budgetData.budget,
                expencePercentage: budgetData.percentage
            };
        }
    }

})();


var UIController = (function () {

    var DOMstrings = {
        addType: '#addType',
        addDesc: '#addDesctiption',
        addValue: '#addValue',
        addBtn: '#addButton',
        incomeList: '#incomeList',
        expensesList: '#expensesList',
        incomeLabel: '#incomeLabel',
        expenceLabel: '#expenceLabel',
        budgetLabel: '#budgetLabel',
        expencePercentage: '#expencePercentage'
    };

    var clearFields = function () {
        var fields;

        fields = document.querySelectorAll( DOMstrings.addDesc + ', ' + DOMstrings.addValue);

        fields.forEach(function ( current ) {
            current.value = "";
        });

        fields[0].focus();
    };

    return {
        getDOMstrtings: function () {
            return DOMstrings;
        },

        getInputData: function () {
            return {
                type: document.querySelector( DOMstrings.addType ),
                desc: document.querySelector( DOMstrings.addDesc ),
                value: document.querySelector( DOMstrings.addValue )
            }
        },

        displayItem: function ( itemObject, type ) {
            var element, html;

            if ( type === 'inc' ) {
                element = DOMstrings.incomeList;

                html = '<div class="item clearfix" id="income-' + itemObject.id + '"><div class="item__description">' + itemObject.description + '</div><div class="right clearfix"><div class="item__value">+ ' + itemObject.value + '</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if ( type === 'exp' ) {
                element = DOMstrings.expensesList;

                html = '<div class="item clearfix" id="expense-' + itemObject.id + '"><div class="item__description">' + itemObject.description + '</div><div class="right clearfix"><div class="item__value">- ' + itemObject.value + '</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            document.querySelector( element ).insertAdjacentHTML( 'beforeend', html );

            clearFields();
        },

        displayBudget: function ( obj ) {
            document.querySelector( DOMstrings.incomeLabel ).textContent = obj.totalInc;
            document.querySelector( DOMstrings.expenceLabel ).textContent = obj.totalExp;
            document.querySelector( DOMstrings.budgetLabel ).textContent = obj.budget;

            if ( obj.expencePercentage > 0 ) {
                document.querySelector( DOMstrings.expencePercentage ).textContent = obj.expencePercentage + '%';
            } else {
                document.querySelector( DOMstrings.expencePercentage ).textContent = '---';
            }
        }
    };

})();


var AppController = (function ( actionController, uiController ) {

    var setupEventListeners = function () {
        var DOMstrings = uiController.getDOMstrtings();

        document.querySelector( DOMstrings.addBtn ).addEventListener('click', appControlItem);

        document.addEventListener('keypress', function ( event ) {
            if ( event.keyCode === 13 || event.which === 13 ) {
                appControlItem();
            }
        });
    };

    var appControlItem = function () {
        var getInputData, addNewItem, getBudget;

        // 1. Get the input Data
        getInputData = uiController.getInputData();

        if ( getInputData.desc.value !== "" && !isNaN( getInputData.value.value ) && getInputData.value.value > 0 ) {
            // 2. Add the item to the BudgetController
            addNewItem = actionController.addNewItem( getInputData.type.value, getInputData.desc.value, parseFloat( getInputData.value.value ) );

            // 3. Add the item to the UIController
            uiController.displayItem( addNewItem, getInputData.type.value );

            // 4. Calculate the totals
            actionController.calculateTotal( getInputData.type.value );

            // 5. Get the budget
            getBudget = actionController.getBudget();

            // 6. Display the totals & budget
            uiController.displayBudget( getBudget );
        };  
    };

    return {
        init: function () {
            console.log( 'The application has started!' );

            setupEventListeners();
        }
    }

})( BudgetController, UIController );

AppController.init();