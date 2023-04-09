export const BASE_URL = "https://api.mestoapp.krinitsyna.nomoredomains.work";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // теперь куки посылаются вместе с запросом
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
    credentials: 'include', // теперь куки посылаются вместе с запросом
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include', // теперь куки посылаются вместе с запросом
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
};

/*export const getContent = () => {
  return fetch(`${BASE_URL}/check`, {
    method: "GET",
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include', 
  })
    .then((res) => res.json())
    /*.then((data) => {
      //console.log(data);
      return data;
    });
};*/

export const getContent = () => {
  return fetch(`${BASE_URL}/check`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
      },
      credentials: 'include',
  })
    .then(res => {if (res.ok) {
      return(res.json());
  } else {
      return res.json()
          .then((err) => {
              throw new Error(err.message);
          })
  }})
};