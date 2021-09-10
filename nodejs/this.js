console.log(this===exports);

function functionThis(){
    console.log(this ===exports,this === global);
}

functionThis();