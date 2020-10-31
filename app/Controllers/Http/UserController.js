'use strict'

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {

  async home({ request, response }) {
    return response.json({ msg: 'Bem Vindo a nossa API em Adonis JS' })
  }

  async index({ request, response }) {
    const users = await User.all()
    return users
  }

  async create({ request, response }) {
  }

  async store({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)

    return user
  }

  async show({ params, request, response }) {
    const { id } = params

    const user = await User.query().where('id', '=', id).first()

    if (!user) {
      return response.json({ msg: 'User not found!' })
    }

    return response.json(user)
  }

  async edit({ params, request, response }) {
  }

  async update({ params, request, response }) {
    const { id } = params


    const user = await User.find(id)
    const data = request.only(['username', 'email', 'password'])

    if (!user) {
      return response.json({ msg: 'User not found!' })
    } else {
      user.username = data.username
      user.email = data.email
      user.passoword = data.passoword

      await user.save()
      return response.json({ msg: 'User updated!', user })
    }


  }

  async destroy({ params, request, response, auth }) {
    const { id } = params

    const user = await User.find(id)

    if (!user) {
      return response.json({ msg: 'User not found!' })
    } else {
      await user.delete()
    }

    return response.json({ msg: 'User deleted!' })

  }

  async login({ request, response, auth }) {

    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    return token
  }

  async logout({ auth, response }) {
    await auth
      .authenticator('jwt')
      .revokeTokens()
    return response.json({ msg: 'Logout account' })
  }
}

module.exports = UserController
