
export const CreateData = (url, data) =>{
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => console.log(url) )
  .then((json) => console.log(json));
  console.log(data)
}

export const DeleteData = (url, dataId) =>{
    url = `${url}/${dataId}`
    console.log(url, dataId)
    fetch(url, {
      method: 'DELETE',
    })
}

export const UpdateData = (url, dataId, data) => {
    teste()
    url = `${url}/${dataId}`

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response)

}

function teste(){
    console.log("teste");
    return(alert("TESTE"))
};