function bubbleSort(bars) {
    var barStates = [];
    var length = bars.length;
    //let currentArray = JSON.parse(JSON.stringify(this.state.bars));
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            bars[j].action = 0;
            if (bars[j].value > bars[j + 1].value) {
                bars[j].action = 1;
                bars[j + 1].action = 1;
                [bars[j].value, bars[j + 1].value] = [bars[j + 1].value, bars[j].value];
                for (let k = j + 2; k < length; k++) {
                    bars[k].action = 0;
                }
                barStates.push(JSON.parse(JSON.stringify(bars)));
                for (let k = 0; k < j+1; k++){
                    bars[k].action = 0;
                }
                //console.log(currentArray);
            }
        }
    }
    return barStates;
}

export default bubbleSort;