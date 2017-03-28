(function () {
    'use strict';
    
    // There are 3 aircraft manufactures, each with different requirements 
    //  for when the tires need to be changed
    //      FooPlane: 120 landings
    //      BarPlane: 75 landings
    //      BazPlane: 200 landings

    // Based on the above information and the data available in the data.js file,
    //  this function is supposed to return an array of aircrafts due for a tire change.
    function getAircraftsDueForTireChange(allAircraftData) {
        var aircraftDueForTireChanges = [];
        var numberOfAircrafts = allAircraftData.length;
        var numberOfLandings = 0;
        var countLandingsSinceLastTireChange = 0;
        var lastTireChange = '3/28/2017';
        var currentAircraftData = {};
        for (var i = 0; i < numberOfAircrafts; i++) {
            currentAircraftData = allAircraftData[i];
            numberOfLandings =  currentAircraftData.landings.length;
            countLandingsSinceLastTireChange = 0;
            lastTireChange = currentAircraftData.lastTireChange;
            for (var j = 0; j < numberOfLandings; j++) {
                if (currentAircraftData.landings[j] >= lastTireChange) {
                    // There is no need to store all the latest landing dates, it is a waste of space that grows linearly ~ O(n)
                    countLandingsSinceLastTireChange++;
                }
            }
            
            if (currentAircraftData.manufacturer == 'FooPlane' && countLandingsSinceLastTireChange >= 120)
                aircraftDueForTireChanges.push(currentAircraftData);
            else if (currentAircraftData.manufacturer == 'BarPlane' && countLandingsSinceLastTireChange >= 75)
                aircraftDueForTireChanges.push(currentAircraftData);
            else if (currentAircraftData.manufacturer == 'BazPlane' && countLandingsSinceLastTireChange >= 200)
                aircraftDueForTireChanges.push(currentAircraftData);
        }
        return aircraftDueForTireChanges;
    }

    // Test the function 
    //  To keep things simple, we are just going to check the ids and display a pass/fail.
    //  Feel free to use Jasmine or any other test framework if you're more comfortable with that,
    //  but it is NOT required.  This should be a quick exercise.
    var expected = [1, 3, 5];
    var actual = getAircraftsDueForTireChange(window.CAMP.aircraftData).map(function (aircraft) { return aircraft.id; }).sort();
    var passed = (JSON.stringify(expected) === JSON.stringify(actual));

    document.body.innerHTML += passed ? 'PASS' : 'FAIL';
    document.body.innerHTML += '<br />';
    document.body.innerHTML += 'Expected: ' + expected;
    document.body.innerHTML += '<br />';
    document.body.innerHTML += 'Actual: ' + actual;
})();