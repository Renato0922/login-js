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
  const user = getUsuario.find(({ email }) => email === body.email)
  if (user) throw new Error('Usuario já cadastrado')

  postUsuario(body)

  const token = createToken(body)
  return token
}

export function login(body) {
  const user = getUsuario.find(({ email }) => email === body.email)

  if (!user) throw new Error('Usuário não encontrado')
  if (getUsuario.password !== body.password) throw new Error('Senha incorreta')

  const token = createToken(user)
  return token
}
