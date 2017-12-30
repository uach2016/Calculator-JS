function parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    var calculation = [],
        current = '';
    for (var i = 0, ch; ch = s.charAt(i); i++) {
        if ('^*/+-'.indexOf(ch) > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(parseFloat(current), ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }
    if (current != '') {
        calculation.push(parseFloat(current));
    }
    return calculation;
}

function calculate(calc) {
    // --- Perform a calculation expressed as an array of operators and numbers
    var ops = [{ '^': (a, b) => Math.pow(a, b) },
    { '*': (a, b) => a * b, '/': (a, b) => a / b },
    { '+': (a, b) => a + b, '-': (a, b) => a - b }],
        newCalc = [],
        currentOp;
    for (var i = 0; i < ops.length; i++) {
        for (var j = 0; j < calc.length; j++) {
            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] =
                    currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
            console.log(newCalc);
        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error: unable to resolve calculation');
        return calc;
    } else {
        return calc[0];
    }
}

$(document).ready(function () {
    var testNumLength = function (number) {
        if (number.length > 9) {
            totaldiv.text(number.substr(number.length - 9, 9));
            if (number.length > 15) {
                number = "";
                totaldiv.text("Err");
            }
        }
    };
    var number = "";
    var newnumber = "";
    var operator = "";
    var totaldiv = $("#total");
    totaldiv.text("0");
    $("#numbers button").not("#clear,#clearall").click(function () {
        number += $(this).text();
        totaldiv.text(number);
        testNumLength(number);
    });
    $("#operators button").not("#equals").click(function () {
        operator = $(this).text();
        newnumber += number+operator;
        number = "";
    });
    $("#clear,#clearall").click(function () {
        number = "";
        totaldiv.text("0");
        if ($(this).attr("id") === "clearall") {
            newnumber = "";
        }
    });
    //Add your last .click() here!
    $("#equals").click(function () {
        newnumber += number;
        number = calculate(parseCalculationString(newnumber));

        totaldiv.text(number);
        testNumLength(number);
     
        newnumber = "";
    
    });
});


