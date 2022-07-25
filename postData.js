const login = document.querySelector('input[name="login"]'),
      password = document.querySelector('input[name="password"]');


// let data = JSON.stringify({
//     "data": {
//       "type": "TokenObtainPairView",
//       "attributes": {
//         "email": `${login.value}`,
//         "password": `${password.value}`
//       }
//     }
// });

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const postData = async (url, data) => {
//         let res = await fetch(url, {
//             method: "POST",
            // headers: {
            //     "Content-Type": "application/vnd.api+json"
            // },
//             body: data
//         });
    
//         return await res.text();
//     };

//     postData("http://internstemp.evrika.com/api/users/sign-in/", data)
//         .then(result => localStorage.setItem("token", result.ac))
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));

//     if (localStorage.getItem("token")) {
//         window.location.href = 'index.html';
//     }

//     e.target.reset();
// })

function signIn() {
    let data = JSON.stringify({
        "data": {
        "type": "TokenObtainPairView",
        "attributes": {
            "email": `${login.value}`,
            "password": `${password.value}`
            }
        }
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/vnd.api+json"
        },
        body: data,
        redirect: 'follow'
      };
      
    fetch("http://internstemp.evrika.com/api/users/sign-in/", requestOptions)
        .then(response => response.text())
        .then(result => {
            let obj = JSON.parse(result);

            if (obj.data) {
                localStorage.setItem('access', obj.data.access);
                localStorage.setItem('refresh', obj.data.refresh);
            } else {
                console.log(obj);
            }
        })
        .then(() => {
            if (localStorage.getItem('access', 'refresh')) {
                window.location.href = 'index.html';
            }
        })
        .catch(error => console.log('error', error))
        .finally(() => {
            login.value = '';
            password.value = '';
        })

}
