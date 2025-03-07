/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CombinateCreateShorUrlAndGenerateUrlsController from '#controllers/combinate_create_shor_url_and_generate_urls_controller'
import CombinatesController from '#controllers/combinates_controller'
import UrlsController from '#controllers/urls_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.post('/url', new UrlsController().index)

router.get('/shortUrl', new UrlsController().show)

router.get('/pages/goUrl', new UrlsController().shwoUrls).as('goUrl')

router.post('/delete/:id', new UrlsController().destroy)

router.post('/update/:id', new UrlsController().update)
