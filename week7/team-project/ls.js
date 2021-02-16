// read data from ls

export function readFromLs(key){
    let localArray = JSON.parse(localStorage.getItem(key));
    return localArray;
}

// write data from ls

export function writeToLs(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}