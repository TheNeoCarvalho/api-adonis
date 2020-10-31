'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/', 'UserController.home')
Route.get('/users', 'UserController.index').middleware('auth')
Route.get('/user/:id', 'UserController.show').middleware('auth')
Route.delete('/user/:id', 'UserController.destroy').middleware('auth')
Route.put('/user/:id', 'UserController.update').middleware('auth')
Route.post('/users/create', 'UserController.store').middleware('auth')
Route.post('/login', 'UserController.login')
Route.post('/logout', 'UserController.logout')


