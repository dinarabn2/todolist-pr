const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

    postData('internstemp.evrika.com/api​/users​/sign-in​/', json)
        .then(res => console.log(res));

    e.target.reset();
})
