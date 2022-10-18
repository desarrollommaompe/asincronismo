const somethingWillHappen = () => {
    return new Promise((resolve,  reject) => {
        if (true) {
            resolve('Hey');
        }   else {
            reject('Whooops!!');
        }
    });
};

const somethingWillHappen2 = () => {
    return new Promise((resolve,  reject) => {
        if (true) {
            setTimeout(() => {
                resolve('true');    
            }, 2000);
        }   else {
            const error = new Error('Whooops!!');
            reject(error);
        }
    });
};

somethingWillHappen()
    .then(response => console.log(response))
    .catch(err => console.error(err));

    somethingWillHappen2()
    .then(response => console.log(response))
    .catch(err => console.error(err));

    Promise.all([somethingWillHappen(), somethingWillHappen2()])
        .then(response => {
            console.log('Array of resoults', response);
        })
        .catch(err => {
            console.error(err);
        })