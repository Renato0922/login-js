import jwt from 'jsonwebtoken'

import { getUsuario, postUsuario } from './index'

let users = []

const SECRET = process.env.PORT || JWT_SECRET

function createToken(user) {
  return jwt.sign({ email: user.email, name: user.name }, SECRET)
}

function readToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    throw new Error('Token inválido')
  }
}

export function verifica(token) {
  return readToken(token)
}

export function cadastro(body) {
  const email = []
  getUsuario().then(dados => {
    dados.forEach(element => {
      if (element.email != null) {
        email.push(element.email)
      }
    })
  })

  const user = email.find(({ email }) => email === body.email)
  if (user) throw new Error('Usuario já cadastrado')

  postUsuario(body)

  const token = createToken(body)
  return token
}

export function login(body) {
  const senha = []
  const email = []
  getUsuario().then(dados => {
    dados.forEach(element => {
      if (element.email != null) {
        email.push(email.push)
        password.push(element.password)
      }
    })
  })

  const password = senha.find(({ email }) => email === body.email)

  if (!email) throw new Error('Usuário não encontrado')
  if (password !== body.password) throw new Error('Senha incorreta')

  const token = createToken(password)
  return token
}
