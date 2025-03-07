import type { HttpContext } from '@adonisjs/core/http'
import UrlsController from './urls_controller.js'
import QrsController from './qrs_controller.js'

export default class CombinatesController {
  public async combinates(ctx: HttpContext) {
    const urlController = new UrlsController()
    const qrControllern = new QrsController()

    try {
      const parseUrlsToJSON = await urlController.shwoUrls(ctx)
      const parseQrCodesToJSON = await qrControllern.showQrCode(ctx)

      console.log(parseUrlsToJSON)
      console.log(parseQrCodesToJSON)

      if (!parseQrCodesToJSON) {
        return ctx.view.render('pages/goUrl', { parseUrlsToJSON })
      }

      return ctx.view.render('pages/goUrl', { parseUrlsToJSON, parseQrCodesToJSON })
    } catch (error) {
      console.log(error)
      return ctx.response.status(500).send('Error')
    }
  }
}
