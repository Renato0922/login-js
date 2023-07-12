const url = 'https://backend-login-js.vercel.app/user'

export const getUsuario = () => {
  return fetch(url + '/').then(response => {
    if (response.status != 200) {
      console.log(`Erro no servidor: ${response.status}`)
    } else {
      return response.json()
    }
  })
}

export const postUsuario = body => {
  console.log('body: ', JSON.stringify(body))
  return fetch(url + '/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => {
    if (response.status != 200) {
      console.log(`Erro no servidor: ${response.status}`)
    } else {
      alert(`Sucesso ao salvar: ${response.status}`)
    }
  })
}
