function quickSort(bars, left, right, animations) {
    var index;
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
            quickSort(bars, left, index - 1, animations);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(bars, index, right, animations);
        }
    }
    return animations;
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
            //swap(bars, i, j); //sawpping two elements
            [bars[i], bars[j]] = [bars[j], bars[i]];
            i++;
            j--;
        }
    }
    return i;
}

function pushAnimation(animations, bars) {
    animations.push(JSON.parse(JSON.stringify(bars)));
}

export default quickSort;