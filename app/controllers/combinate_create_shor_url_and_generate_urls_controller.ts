import type { HttpContext } from '@adonisjs/core/http'
import UrlsController from './urls_controller.js'
import QrsController from './qrs_controller.js'

export default class CombinateCreateShorUrlAndGenerateUrlsController {
  public async combinateUrlAndQrCode(ctx: HttpContext) {
    const urlController = new UrlsController()
    const qrController = new QrsController()

    try {
      const parseUrlsToJSON = await urlController.index(ctx)
      await qrController.generateQrCode(ctx)

      return ctx.view.render('pages/goUrl', { parseUrlsToJSON })
    } catch (error) {
      return ctx.response.status(500).send('Error')
    }
  }
}
