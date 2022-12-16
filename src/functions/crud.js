
export const CreateData = (url, data) =>{
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => console.log(json));
}

export const DeleteData = (url, dataId) =>{
    url = `${url}/${dataId}`
    fetch(url, {
      method: 'DELETE',
    })
    // alert(`Dado de ID ${dataId} deletado com sucesso!`)
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
    // return(alert("ATUALIZADO"))
}

function teste(){
    console.log("teste");
    return(alert("TESTE"))
};