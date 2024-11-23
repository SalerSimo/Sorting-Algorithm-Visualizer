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
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
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

async function color(element){
    element.style.backgroundColor = "green";
    await sleep(100);
    element.style.backgroundColor = "white";
}

async function bubbleSort(arr, slider) {
    stopFlag = false;
    let n = arr.length;
    let j;
    // Outer loop to traverse the entire array
    for (let i = 0; i < n - 1; i++) {
        // Inner loop for comparison of adjacent elements
        for (j = 0; j < n - i - 1; j++) {
            if(stopFlag){
                //change();
                return;
            }
            // Swap if the current element is greater than the next element
            if (arr[j].offsetHeight > arr[j + 1].offsetHeight) {
                let temp = arr[j].offsetHeight;
                arr[j].style.height = arr[j + 1].offsetHeight;
                arr[j + 1].style.height = temp;
            }
            arr[j].style.backgroundColor = "#04AA6D";
            if(j%(slider.value*2) == 0){
                await sleep(10);
            }
            arr[j].style.backgroundColor = "white";
        }
        color(arr[j])
    }
    for (let i = 0; i < n; i++) {
        arr[i].style.backgroundColor = "white";
    }
    return arr;
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
        array[min].style.backgroundColor = "green";
        if(min != i){
            temp = array[i].offsetHeight;
            array[i].style.height = array[min].offsetHeight;
            await sleep(50/slider.value);
            array[min].style.backgroundColor = "white";
            array[min].style.height = temp;
        }
        array[min].style.backgroundColor = "white";
        color(array[i]);
    }
    for(let i=0; i<array.length; i++){
        array[i].style.backgroundColor = "white";
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
            array[j].style.backgroundColor = "green";
            array[j+1].style.height = array[j].offsetHeight;
            j--;
            if(j%slider.value == 0){
                await sleep(1);
            }
            array[j+1].style.backgroundColor = "white";
        }
        array[j+1].style.height = x;
    }
}

async function mergeSort(arr, slider, left = 0, right = arr.length - 1) {
    stopFlag = false;
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        // Recursively sort the left half
        await mergeSort(arr, slider, left, mid);
        // Recursively sort the right half
        await mergeSort(arr, slider, mid + 1, right);
        // Merge the sorted halves
        await merge(arr, left, mid, right, slider);
    }

    async function merge(arr, left, mid, right, slider) {
        let start2 = mid + 1;
        let originalLeft = left;
        // If the direct merge is already sorted
        if (arr[mid].offsetHeight <= arr[start2].offsetHeight) {
            return;
        }
        /*for(let i=left; i<=right; i++){
            //arr[i].style.backgroundColor = "red";
        }*/
        // Two pointers to traverse the two halves
        while (left <= mid && start2 <= right) {
            if (arr[left].offsetHeight <= arr[start2].offsetHeight) {
                left++;
            } else {
                const value = arr[start2].offsetHeight;
                let index = start2;
    
                // Shift all elements between left and start2 to the right
                while (index !== left) {
                    arr[index].style.height = arr[index - 1].offsetHeight;
                    index--;
                }
                arr[left].style.height = value;
    
                // Update all pointers
                left++;
                mid++;
                start2++;
            }
            if(stopFlag){
                //change();
                return;
            }
            arr[left-1].style.backgroundColor = "green";
            if(left%(slider.value)==0){
                await sleep(1);
            }
            arr[left-1].style.backgroundColor = "white";
        }  
        for(let i=originalLeft; i<=right; i++){
            //arr[i].style.backgroundColor = "white";
        }
    }
}

async function stalinSort1(array, slider) {
    stopFlag = false;
    let j, n = 0;
    for(let i=1; i<array.length; i++){
        if(array[i].offsetHeight < array[i-1].offsetHeight){
            for(j=i+1; j<array.length-n; j++){
                if(stopFlag){
                    return;
                }
                array[j-1].style.height = array[j].style.height;
            }
            array[j-1].style.height = "0";
            await sleep(50/(2*slider.value));
            n = n + 1;
            i--;
        }
    }
}
async function stalinSort2(array, slider) {
    stopFlag = false
    for(let i=0; i<array.length; i++){
        if(stopFlag){
            return;
        }
        array[i].style.height = "50%";
        await sleep(100/(2*slider.value));
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


document.getElementById("change").style.height = document.getElementById("number").offsetHeight;