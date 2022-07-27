const login = document.querySelector('input[name="login"]'),
      password = document.querySelector('input[name="password"]'),
      remember = document.querySelector('input[name="check"]'),
      iconEye = document.querySelector('.icon-eye');

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

    if(remember.checked){ 
        setCookie ('user', login.value, 7); 
        setCookie ('pswd', password.value, 7); 
    }
}

//cookie

if(getCookie('user') && getCookie('pswd')){
    login.value = getCookie('user');
    password.value = getCookie('pswd');
    remember.checked = true;
} 

remember.addEventListener('change', () => {
    if(!remember.checked){
        deleteCookie('user');
        deleteCookie('pswd');
    }
});

function setCookie(name, value, day){
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + '; expires='+ date;    
}

function getCookie(name){
    let reg = RegExp(name+'=([^;]+)');
    let arr = document.cookie.match(reg);
    if(arr){
      return arr[1];
    }else{
      return '';
    }
}

function deleteCookie(name){
    setCookie(name, null, -1);
}


//eye

iconEye.addEventListener('click', () => {
    if (password.getAttribute('type') === 'password') {
        password.setAttribute('type', 'text');
    } else {
        password.setAttribute('type', 'password');
    }
});