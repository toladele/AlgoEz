function visualizeQuickSort() {
    /*this.setState({
        stateArray : [],
    });*/
    var currentArray = JSON.parse(JSON.stringify(this.state.bars));
    this.quickSort(currentArray, 0, currentArray.length-1);
    var speed = this.state.speed.current.value;
    var barStates = JSON.parse(JSON.stringify(this.state.stateArray));
    var currentAction = this.state.actionCount;
    for (let i = 0; i < barStates.length; i++) {
        //console.log("In for");
        setTimeout(() => {
            if (currentAction> this.state.clearedActions) {
                this.setState({bars: barStates[i]});
            }
            
            //console.log(barStates[i]);
            }, speed * i+1);
    }
}

function quickSort(bars, left, right) {
    var index;
    var animations = [];
    var length = bars.length;
    pushAnimation(animations, bars);

    if (length > 1) {
        index = partition(bars, left, right); //index returned from partition

        for (let j =0; j<index;j++){
            bars[j].action = 0;
        }
        bars[index].action = 1;

        for (let j = index+1; j< bars.length; j++){
            bars[j].action = 0;
        }
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(bars, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(bars, index, right);
        }
    }
    return bars;
}

function partition(bars, left, right) {
    var pivot = bars[Math.floor((right + left) / 2)].value, //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (bars[i].value < pivot) {
            i++;
        }
        while (bars[j].value > pivot) {
            j--;
        }
        if (i <= j) {
            swap(bars, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function swap(array, idx1, idx2) {
    var temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
}

function pushAnimation(animations, bars) {
    animations.push(JSON.parse(JSON.stringify(bars)));
}

export default quickSort;