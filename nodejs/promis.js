const get = url =>{
    const xhr = new XMLHttpRequest();
    xhr.open('Get',url);
    xhr.send();

    xhr.onload = ()=>{
        if(xhr.status === 200){
            console.log(JSON.parse(xhr.response));
        }else{
            console.error(`${xhr.status} ${xhr.statusText}`);
        }
    };
};

const response = get('https://jsonplaceholder.typicode.com/posts/1');
console.log(response);
