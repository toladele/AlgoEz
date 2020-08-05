function heapSort(bars) {
    const animations = [];
    pushAnimation(animations, bars);
    var length = bars.length;
    if (length <= 1) return animations;
    
    //build heap
    for (var i = Math.floor(length / 2); i >= 0; i -= 1)      {
        heapify(bars, length, i, animations);
    }
    
    //swap root with last index. Decrement bars length. Then heapify starting from root. 
    for (i = length - 1; i > 0; i--) {
        //change colours of bars being swapped
        changeBarColours(bars, 0, i, 1, 1);
        pushAnimation(animations, bars);

        swap(bars, 0, i);
        pushAnimation(animations, bars);

        //colour sorted bar blue and other bar yellow
        changeBarColours(bars, 0, i, 0, 2);
        pushAnimation(animations, bars);
        
        swap(bars, 0, i);      
        heapify(bars, i, 0, animations);
    }

    bars[0].action = 2;
    pushAnimation(animations, bars);

    return animations;

} 

function heapify(bars, size, idx, animations) {
    var left = 2 * idx + 1;
    var right = 2 * idx + 2;
    var max = idx;

    if (left < size && bars[left].value > bars[max].value) {
        changeBarColours(bars, left, max, 1, 1);
        pushAnimation(animations, bars);
        
        changeBarColours(bars, left, max, 0, 0);
        pushAnimation(animations, bars);
        
        max = left;
    }

    if (right < size && bars[right].value > bars[max].value) {
        changeBarColours(bars, right, max, 1, 1);
        pushAnimation(animations, bars);
        
        changeBarColours(bars, right, max, 0, 0);
        pushAnimation(animations, bars);

        max = right;
    }

    if (max !== idx) {
        changeBarColours(bars, idx, max, 1, 1);
        pushAnimation(animations, bars);

        swap(bars, idx, max);
        pushAnimation(animations, bars);

        changeBarColours(bars, idx, max, 0, 0);
        pushAnimation(animations, bars);

        swap(bars, idx, max);
        heapify(bars, size, max, animations, bars);
    }
}

function changeBarColours(bars, barOneIdx, barTwoIdx, barOneColour, BarTwoColour) {
    bars[barOneIdx].action = barOneColour;
    bars[barTwoIdx].action = BarTwoColour;
}

function pushAnimation(animations, bars) {
    animations.push(JSON.parse(JSON.stringify(bars)));
}

function swap(array, idx1, idx2) {
    var temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
}

export default heapSort;