const get = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('Get', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.response));
        } else {
            console.error(`${xhr.status} ${xhr.statusText}`);
        }
    };
};

const response = get('https://jsonplaceholder.typicode.com/posts/1');
console.log(response);

const url = 'https://jsonplaceholder.typicode.com/posts/1';
const promiseGet = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error(xhr.status));
            }
        };
    });
}

promiseGet(url);


new Promise(resolve => resolve('fulfilled'))
    .then(v=>console.log(v),e=>console.error(e));
