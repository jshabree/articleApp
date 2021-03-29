export function GetDataFromServer(apiPath, reqMethod, formBody) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  if (!reqMethod && reqMethod !== "POST") {
    return fetch(apiPath, {
      method: "GET",
      headers: myHeaders
    });
  } else {
    if (formBody) {
      let fetchData = {
        method: "POST",
        body: JSON.stringify(formBody),
        headers: myHeaders,
      };

      return fetch(apiPath, fetchData);
    }
  }
}

export function GetDataFromServerToPatch(apiPath, reqMethod, formBody) {
  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  if (formBody) {
    let fetchData = {
      method: "PATCH",
      body: JSON.stringify(formBody),
      headers: myHeaders
    }
    return fetch(apiPath, fetchData)
  }
}

export function GetDataFromServerToPost(apiPath, reqMethod, formBody) {
  let myHeaders = new Headers();
  // if(window.localStorage.userLoginToken !== undefined){
  //   myHeaders.append('Authorization', 'Bearer '+window.localStorage.userLoginToken);
  // }

  myHeaders.append("Content-Type", "application/json");
  if (formBody) {
    let fetchData = {
      method: "POST",
      body: formBody,
      headers: myHeaders,
    };
    return fetch(apiPath, fetchData);
  }
}

export function deleteService(formBody, deleteApi) {
  console.log("FORM BODY" + JSON.stringify(formBody));
  let myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  return fetch(deleteApi, {
    method: "DELETE",
    body: JSON.stringify(formBody),
    headers: myHeaders,
  });
}