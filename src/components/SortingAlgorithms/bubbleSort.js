function bubbleSort(bars) {
    var barStates = [];
    var length = bars.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            // set default action (not being swapped)
            bars[j].action = 0;
            // check if bars need swapping
            if (bars[j].value > bars[j + 1].value) {
                // change action to 1 to represent currently swapping
                bars[j].action = 1;
                bars[j + 1].action = 1;
                // perform swap
                [bars[j].value, bars[j + 1].value] = [bars[j + 1].value, bars[j].value];
                // clear actions before
                for (let k = j + 2; k < length; k++) {
                    bars[k].action = 0;
                }
                // push to state list
                barStates.push(JSON.parse(JSON.stringify(bars)));
                // clear states after current swap
                for (let k = 0; k < j+1; k++){
                    bars[k].action = 0;
                }
            }
        }
    }
    return barStates;
}

export default bubbleSort;