let stopFlag=false

function init(){
    change(0, false);
    var slider = document.getElementById("sliderSpeed");
    var output = document.getElementById("outputSlider");
    output.innerHTML = slider.value;
    
    slider.oninput = function() {
        output.innerHTML = this.value;
    }

    var select = document.getElementsByClassName("select-container");
    for(let i=0; i<select.length; i++){
        let w = select[i].offsetWidth;
        select[i].style.width = w + 50;
    }
}

function randomize(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isSorted(array){
    for(let i=0; i<array.length-1; i++){
        if (Number(array[i].offsetHeight) > Number(array[i+1].offsetHeight)) {
            return false;
        }
    }
    return true;
}

function shuffle(length, takeLength){
    stopFlag = true;
    change(length, takeLength);
    let slider = document.getElementById("sliderSpeed");
    slider.value = 5;
    document.getElementById("outputSlider").innerHTML = 5;
}

function change(length, takeLenght){
    let n = length;
    var select = document.getElementById("number");
    if(takeLenght == false){
        n = select.options[select.selectedIndex].text;
        n = Number(n);
    }
    let array = Array.from({length: n}, (_, i) => i + 1);
    randomize(array);
    const container = document.getElementById("container");
    container.innerHTML = ""
    for(let i=0; i<n; i++){
        const verticalLine = document.createElement("div");
        container.appendChild(verticalLine);
        verticalLine.classList.add("vLine");
        verticalLine.setAttribute("id", i.toString())
        verticalLine.style.width = (100/n).toString()+"%";
        verticalLine.style.height = (array[i]/n*100).toString()+"%";
        //container.appendChild(verticalLine);
        console.log(verticalLine.offsetHeight);
        /*if(i==0){
            verticalLine.style.borderBottomLeftRadius = "5px";
        }
        if(i==n-1){
            verticalLine.style.borderBottomRightRadius = "5px";
        }*/
    }
}

async function bubbleSort(array, slider) {
    stopFlag = false;
    let n = array.length;
    let j;

    for (let i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if(stopFlag){
                return;
            }
            if (array[j].offsetHeight > array[j + 1].offsetHeight) {
                let temp = array[j].offsetHeight;
                array[j].style.height = array[j + 1].offsetHeight;
                array[j + 1].style.height = temp;
            }
            if(j%(slider.value*2) == 0){
                await sleep(5);
            }
        }
    }
    return array;
}

async function selectionSort(array, slider){
    stopFlag = false;
    let min, temp;

    for(let i=0; i<array.length; i++){
        if(stopFlag){
            return;
        }
        min = i;
        for(let j=i; j<array.length; j++){
            if(array[j].offsetHeight < array[min].offsetHeight){
                min = j;
            }
        }
        if(min != i){
            temp = array[i].offsetHeight;
            array[i].style.height = array[min].offsetHeight;
            await sleep(50/slider.value);
            array[min].style.height = temp;
        }
    }
}

async function insertionSort(array, slider){
    stopFlag = false;
    let j, x;
    for(let i=1; i<array.length; i++){
        if(stopFlag){
            return;
        }
        j = i-1;
        x = array[i].offsetHeight;
        while(j>=0 &&  x < array[j].offsetHeight){
            array[j+1].style.height = array[j].offsetHeight;
            j--;
            if(j%slider.value == 0){
                await sleep(1);
            }
        }
        array[j+1].style.height = x;
    }
}

async function mergeSort(array, slider, left = 0, right = array.length - 1) {
    stopFlag = false;
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(array, slider, left, mid);
        await mergeSort(array, slider, mid + 1, right);
        await merge(array, left, mid, right, slider);
    }

    async function merge(array, left, mid, right, slider) {
        let start2 = mid + 1;
        
        if (array[mid].offsetHeight <= array[start2].offsetHeight) {
            return;
        }
        while (left <= mid && start2 <= right) {
            if (array[left].offsetHeight <= array[start2].offsetHeight) {
                left++;
            } else {
                const value = array[start2].offsetHeight;
                let index = start2;
    
                while (index !== left) {
                    array[index].style.height = array[index - 1].offsetHeight;
                    index--;
                }
                array[left].style.height = value;

                left++;
                mid++;
                start2++;
            }
            if(stopFlag){
                return;
            }
            if(left%(slider.value)==0){
                await sleep(1);
            }
        }
    }
}

async function quickSort(array, slider) {
    await quickSortR(array, 0, array.length-1);
    
    async function quickSortR(array, l, r){
        let q;
        if(l >= r){
            return;
        }
        q = await partition(array, l, r);
        await quickSortR(array, l, q-1);
        await quickSortR(array, q+1, r);
    
        async function partition(array, l, r){
            let i = l-1, j = r;
            let x = array[r].offsetHeight;
            let tmp;
            let n = array.length;
            while(i<n-1 && array[++i].offsetHeight < x);
            while(j>0 && array[--j].offsetHeight > x);
            while(i < j){
                tmp = array[i].style.height;
                array[i].style.height = array[j].style.height;
                array[j].style.height = tmp;
                while(i<n-1 && array[++i].offsetHeight < x);
                while(j>0 && array[--j].offsetHeight > x);
                await sleep(100/Math.pow(slider.value, 2));
            }
            tmp = array[i].style.height;
            array[i].style.height = array[r].style.height;
            array[r].style.height = tmp;
            return i;
        }
    }
}

async function heapSort(array, slider) {
    stopFlag = false;
    function left(i){
        return 2*i + 1;
    }
    function right(i){
        return 2*i + 2;
    }

    let n = array.length;
    await heapBuild(array, n);
    n--;
    tmp = array[0].style.height;
    array[0].style.height = array[n].style.height;
    array[n].style.height = tmp;
    while(n > 0){
        if(stopFlag)
            return;
        await sleep(100/Math.pow(slider.value, 1.5));
        heapIfy(array, 0, n);
        n--;
        tmp = array[0].style.height;
        array[0].style.height = array[n].style.height;
        array[n].style.height = tmp;
    }

    async function heapBuild(array, n){
        for(let i=parseInt(n/2 - 1); i>=0; i--){
            if(stopFlag)
                return;
            heapIfy(array, i, n);
            await sleep(100/Math.pow(slider.value, 1.8));
        }

    }

    function heapIfy(array, i, size){
        let tmp, largest, l, r;
        l = left(i);
        r = right(i);
        if(l >= size || stopFlag){
            return;
        }
        if(l == n-1 || array[l].offsetHeight > array[r].offsetHeight){
            largest = l;}
        else{
            largest = r;}
        if(array[largest].offsetHeight > array[i].offsetHeight){
            tmp = array[i].style.height;
            array[i].style.height = array[largest].style.height;
            array[largest].style.height = tmp;
            heapIfy(array, largest, size);
        }
    }
}

async function bogoSort(array, slider) {
    stopFlag = false;
    let n = array.length;
    while(1){
        if(isSorted(array)){
            return;
        }
        if(stopFlag){
            return;
        }
        change(n, true);
        await sleep(80/(2*slider.value));
    }
}

async function sort(){
    stopFlag = true;
    await sleep(100);
    const array = document.getElementById("container").children;
    let slider = document.getElementById("sliderSpeed")
    //insertionSort(array);
    let startTime = performance.now();
    let option = document.getElementById("algorithm").value;
    if(option == "bubble"){
        await bubbleSort(array, slider);
    }
    else if(option == "selection"){
        await selectionSort(array, slider);
    }
    else if(option == "insertion"){
        await insertionSort(array, slider);
    }
    else if(option == "merge"){
        await mergeSort(array, slider);
    }
    else if(option == "quick"){
        await quickSort(array, slider);
    }
    else if(option == "stalin1"){
        await stalinSort1(array, slider);
    }
    else if(option == "stalin2"){
        await stalinSort2(array, slider);
    }
    else if(option == "heap"){
        await heapSort(array, slider);
    }
    else if (option == "bogo"){
        await bogoSort(array, slider);
    }
    let endTime = performance.now();
    let takenTime = endTime - startTime;
}