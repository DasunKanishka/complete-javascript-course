/* var ashleyTeamAvg, nimTeamAvg, gimTeamAvg;

ashleyTeamAvg = ( 89 + 120 + 103 ) / 3;
nimTeamAvg = ( 116 + 94 + 123 ) / 3;
gimTeamAvg = ( 97 + 134 + 105 ) / 3;

if ( ashleyTeamAvg > nimTeamAvg && ashleyTeamAvg > gimTeamAvg ) {
    console.log( 'Asjley\'s team has the highest average of ' + ashleyTeamAvg );
} else if ( nimTeamAvg > ashleyTeamAvg && nimTeamAvg > gimTeamAvg ) {
    console.log( 'Nim\'s team has the highest average of ' + nimTeamAvg );
} else if ( gimTeamAvg > ashleyTeamAvg && gimTeamAvg > nimTeamAvg ) {
    console.log( 'Gim\'s team has the highest average of ' + gimTeamAvg );
} else {
    console.log( 'All three teams have the same average of ' + ashleyTeamAvg );
} */

/* var bills, tips, totalPaidAmounts, tipCalculator;

bills = [124, 48, 268];
tips = [];
totalPaidAmounts = [];

tipCalculator = function ( bill ) {
    var tip;

    if ( bill <= 50 ) {
        tip = bill * .2;
    } else if ( bill > 50 && bill <= 200 ) {
        tip = bill * .15;
    } else {
        tip = bill * .1;
    }

    tips.push ( tip );
    totalPaidAmounts.push ( bill + tip );
}

bills.forEach(bill => {
    return tipCalculator ( bill );
});

console.log ( tips, totalPaidAmounts ); */

/* var ashley = {
    name: 'Ashley',
    height: 1.53,
    mass: 58,
    calculateBMI: function () {
        this.bmi = this.mass / ( this.height * this.height );

        return this.bmi;
    }
}

var nim = {
    name: 'Nim',
    height: 1.49,
    mass: 40,
    calculateBMI: function () {
        this.bmi = this.mass / ( this.height * this.height );

        return this.bmi;
    }
}

var compareBMIs = function () {
    if ( ashley.calculateBMI() > nim.calculateBMI() ) {
        return ashley.name + '\'s BMI is higher than ' + nim.name + '\'s.';
    } else if ( nim.bmi > ashley.bmi ) {
        return nim.name + '\'s BMI is higher than ' + ashley.name + '\'s.';
    } else {
        return 'Both ' + ashley.name + '\'s and ' + nim.name + '\'s BMIs are equal.';
    }
}

console.log( ashley, nim, compareBMIs() ); */

var tipCalculator, tip, ashleyBills, markBills, tipsAverage;

tipCalculator = function ( object, bills, breakPoints, percentages ) {
    bills.forEach (bill => {
        if ( bill < breakPoints[0] ) {
            tip = ( bill * percentages[0] ) / 100;

            object.tips.push ( tip );
            object.fullBillAmount.push ( bill + tip );
        } else if ( bill >= breakPoints[0] && bill < breakPoints[1] ) {
            tip = ( bill * percentages[1] ) / 100;

            object.tips.push ( tip );
            object.fullBillAmount.push ( bill + tip );
        } else {
            tip = ( bill * percentages[2] ) / 100;

            object.tips.push ( tip );
            object.fullBillAmount.push ( bill + tip );
        }
    });
};

ashleyBills = {
    bills: [124, 48, 268, 180, 42],
    tipBreakPoints: [50, 200],
    tipPercentages: [20, 15, 10],
    tips: [],
    fullBillAmount: [],
    calculateTips: function () {
        tipCalculator ( this, this.bills, this.tipBreakPoints, this.tipPercentages );

        console.log ( this );
    }
};

nimBills = {
    bills: [77, 475, 110, 45],
    tipBreakPoints: [100, 300],
    tipPercentages: [20, 10, 25],
    tips: [],
    fullBillAmount: [],
    calculateTips: function () {
        tipCalculator ( this, this.bills, this.tipBreakPoints, this.tipPercentages );

        console.log ( this );
    }
}

ashleyBills.calculateTips(); nimBills.calculateTips();

tipsAverage = function ( tips ) {
    var tipsAvg, totalTipsAmount;

    totalTipsAmount = 0;

    tips.forEach (tip => {
        totalTipsAmount += tip;
    });

    return tipsAvg = totalTipsAmount / tips.length;
}

if ( tipsAverage ( ashleyBills.tips ) > tipsAverage ( nimBills.tips ) ) {
    console.log ( 'Ashley\'s family has paid the higher tips on average than Nim\'s');
} else {
    console.log ( 'Nim\'s family has paid the higher tips on average than Ashley\'s');
}