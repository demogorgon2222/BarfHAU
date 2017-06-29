var Logic = (function () {

    var dog = function (weight, age, activ, ageUnit, isNeutered) {
        this.weight = weight;
        this.age = age;
        this.activ = activ;
        this.ageUnit = ageUnit;
        this.isNeutered = isNeutered;
    }

    var portion = function (portion) {
        this.portion = portion;
    }

    return {
        // calculates the weight of a food portion per day given the dog object
        calculatePortion: function (obj) {
            console.log('calculatePortion');

            var portion;

            if (obj.ageUnit === 2) {
                console.log('checking age unit');
                obj.age = obj.age / 12;
            }

            //weight
            if (obj.weight <= 10) {
                //activity
                if (obj.age <= 1 && obj.activ === 1) {
                    portion = obj.weight * 10 * 5;
                } else if (obj.age <= 1 && obj.activ === 2) {
                    portion = obj.weight * 10 * 6;
                } else if (obj.age <= 1 && obj.activ === 3) {
                    portion = obj.weight * 10 * 7;
                    //age
                } else if (obj.age > 1 && obj.activ === 1) {
                    portion = obj.weight * 10 * 4;
                } else if (obj.age > 1 && obj.activ === 2) {
                    portion = obj.weight * 10 * 5;
                } else if (obj.age > 1 && obj.activ === 3) {
                    portion = obj.weight * 10 * 6;
                }
            }
            //weight
            if (obj.weight > 10) {
                //activity
                if (obj.age <= 1 && obj.activ === 1) {
                    portion = obj.weight * 10 * 3;
                } else if (obj.age <= 1 && obj.activ === 2) {
                    portion = obj.weight * 10 * 4;
                } else if (obj.age <= 1 && obj.activ === 3) {
                    portion = obj.weight * 10 * 5;
                    //age
                } else if (obj.age > 1 && obj.activ === 1) {
                    portion = obj.weight * 10 * 2;
                } else if (obj.age > 1 && obj.activ === 2) {
                    portion = obj.weight * 10 * 3;
                } else if (obj.age > 1 && obj.activ === 3) {
                    portion = obj.weight * 10 * 4;
                }
            }
            if (obj.isNeutered) {
                portion = portion * 0.8;
            }
            return portion;
        },

        newDog: function (we, a, ac, au, isN) {
            console.log('newDog');
            var theDog = new dog(we, a, ac, au, isN);
            return theDog;
        },

        calculateDetails: function (foodAmount, bonesType) {
            console.log('calculateDetails');
            var bones, meat, pluck, liver, veggies;
            //meaty bones containing 45% of meat
            if (bonesType === 1) {
                bones = foodAmount * 0.3;
                meat = foodAmount * 0.35;
                pluck = foodAmount * 0.1;
                liver = foodAmount * 0.05;
                veggies = foodAmount * 0.2;
            } else if (bonesType === 2) {
                bones = foodAmount * 0.5;
                meat = foodAmount * 0.15;
                pluck = foodAmount * 0.1;
                liver = foodAmount * 0.05;
                veggies = foodAmount * 0.2;
            } else if (bonesType === 3) {
                bones = foodAmount * 0.15;
                meat = foodAmount * 0.5;
                pluck = foodAmount * 0.1;
                liver = foodAmount * 0.05;
                veggies = foodAmount * 0.2;
            }
            console.log(bones, meat, pluck, liver, veggies);
            var arr = [bones, meat, pluck, liver, veggies];

            for (var i = 0; i < arr.length; i++) {
                if (typeof arr[i] === "number") {
                    arr[i] = arr[i].toFixed(2);
                }
            }

            return arr;

        },

        calculateSuplements: function (foodAmount, obj) {
            var yeast, krill, algae, msm, rose;

            yeast = {
                min: (foodAmount / 1000 * 2).toFixed(2),
                max: (foodAmount / 1000 * 30).toFixed(2)
            };

            krill = 'Z uwagi na różną zawartość fluorków w krylu różnych firm i kwasów omega-3 w różnych olejach, zaleca się stosowanie dawkowania podanego przez producenta.';

            algae = obj.weight / 5;
            msm = obj.weight / 10;
            rose = obj.weight / 5;

            var arr = [yeast, krill, algae, msm, rose];
            for (var i = 0; i < arr.length; i++) {
                if (typeof arr[i] === "number") {
                    arr[i] = arr[i].toFixed(2);
                }
            }

            return arr;
        }

    };

})();


/////////////////////////////////////////////////////////////////////////////////

var UIController = (function () {

    var DOMStrings = {
        weight: 'input-weight',
        age: 'input-age',
        ageUnit: 'input-age-unit',
        activ: 'input-activ',
        btn: 'submit-1',
        portionOutput: 'output-portion',
        bonesInput: 'input-bones-type',
        bonesOutput: 'output-bones',
        meatOutput: 'output-meat',
        pluckOutput: 'output-pluck',
        liverOutput: 'output-liver',
        veggiesOutput: 'output-veggies',
        yeastOutput: 'output-yeast',
        krillOutput: 'output-krill',
        algaeOutput: 'output-algae',
        msmOutput: 'output-msm',
        roseOutput: 'output-rose',
        btnClear: 'clear',
        checkbox: 'input-neutered'
    };

    return {

        getInput: function () {
            console.log('getInput');;
            return {
                weight: parseFloat(document.getElementById(DOMStrings.weight).value),
                age: parseFloat(document.getElementById(DOMStrings.age).value),
                activ: parseFloat(document.getElementById(DOMStrings.activ).value),
                ageUnit: parseFloat(document.getElementById(DOMStrings.ageUnit).value),
                bonesType: parseFloat(document.getElementById(DOMStrings.bonesInput).value),
                isNeutered: (document.getElementById(DOMStrings.checkbox)).checked
            };
        },

        getDOMStrings: function () {
            console.log('getDOMStrings');
            return DOMStrings;
        },

        sayGramsCorrectly: function (numb) {
            var grams;
            if (numb < 1) {
                grams = 'grama';
            } else if (numb === 1) {
                grams = 'gram';
            } else if (numb > 1 && numb <= 4 && numb % 1 === 0) {
                grams = 'gramy';
            } else if (numb % 1 !== 0) {
                grams = 'grama';
            } else {
                grams = 'gramów';
            }
            return numb + ' ' + grams;
        }

    };

})();

//////////////////////////////////////////////////////////////////////////////////////

var App = (function (LogicCtrl, UICtrl) {

    var setupListeners = function () {
        console.log('setupListeners');
        var DOM = UICtrl.getDOMStrings();

        document.getElementById(DOM.btn).addEventListener('click', function () {
            var theDog = LogicCtrl.newDog(UICtrl.getInput().weight, UICtrl.getInput().age, UICtrl.getInput().activ, UICtrl.getInput().ageUnit, UICtrl.getInput().isNeutered);
            console.log(theDog);

            var portion = LogicCtrl.calculatePortion(theDog);
            console.log(portion);
            console.log(UICtrl.getInput().bonesType);

            document.getElementById(DOM.portionOutput).value = UICtrl.sayGramsCorrectly(portion);

            var portionDetails = LogicCtrl.calculateDetails(portion, UICtrl.getInput().bonesType);
            console.log(portionDetails);

            document.getElementById(DOM.bonesOutput).value = UICtrl.sayGramsCorrectly(portionDetails[0]);
            document.getElementById(DOM.meatOutput).value = UICtrl.sayGramsCorrectly(portionDetails[1]);
            document.getElementById(DOM.pluckOutput).value = UICtrl.sayGramsCorrectly(portionDetails[2]);
            document.getElementById(DOM.liverOutput).value = UICtrl.sayGramsCorrectly(portionDetails[3]);
            document.getElementById(DOM.veggiesOutput).value = UICtrl.sayGramsCorrectly(portionDetails[4]);

            var suplements = LogicCtrl.calculateSuplements(portion, theDog);
            console.log(suplements);

            document.getElementById(DOM.yeastOutput).value = UICtrl.sayGramsCorrectly(suplements[0].min) + ' - ' + UICtrl.sayGramsCorrectly(suplements[0].max);
            document.getElementById(DOM.krillOutput).value = suplements[1];
            document.getElementById(DOM.algaeOutput).value = UICtrl.sayGramsCorrectly(suplements[2]);
            document.getElementById(DOM.msmOutput).value = UICtrl.sayGramsCorrectly(suplements[3]);
            document.getElementById(DOM.roseOutput).value = UICtrl.sayGramsCorrectly(suplements[4]);

        });


        document.getElementById(DOM.btnClear).addEventListener('click', function () {
            var inputFields = document.getElementsByClassName('inp');
            for (var i = 0; i < inputFields.length; i++) {
                inputFields[i].value = '';
            }
            var selectors = document.getElementsByTagName('select');
            for (var i = 0; i < selectors.length; i++) {
                selectors[i].value = 1;
            }
        });


    };

    return {

        init: function () {
            console.log('The app started');
            setupListeners();
        }

    };

})(Logic, UIController);

App.init();
