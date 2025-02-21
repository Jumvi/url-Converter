/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UrlsController from '#controllers/urls_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.post('/url', new UrlsController().index)

router.get('/shortUrl', new UrlsController().show)

router.get('/pages/goUrl', new UrlsController().shwoUrls).as('goUrl')

router.post('/delete/:id', new UrlsController().destroy)

router.post('/update/:id', new UrlsController().update)
