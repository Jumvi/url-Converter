import QrCode from '#models/qr_code'
import Url from '#models/url'
import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'

export default class QrsController {
  public async generateQrCode({ response, request }: HttpContext) {
    const url = request.input('url')

    console.log('test ici', url)

    if (!url) {
      return response.status(400).send('No url provided')
    }

    const qrCode = await QRCode.toDataURL(url)
    console.log('test ici', qrCode)

    const getUrl = await Url.findBy('fullUrl', url)
    console.log('test ici', getUrl)
    if (!getUrl) {
      return response.status(404).send('Url not found')
    }

    console.log('test ici haut')

    const newQrCode = await QrCode.create({ qr_code: qrCode, url_id: getUrl.id })
    console.log('test ici bas', newQrCode)

    return newQrCode
  }

  public async showQrCode({ response }: HttpContext) {
    const qrcodes = await QrCode.all()
    if (!qrcodes) {
      response.status(200).send([])
    }

    const parseQrCodesToJSON = qrcodes.map((qrcode) => qrcode.toJSON())

    console.log('parseQrCodesToJSON', parseQrCodesToJSON)

    if (!parseQrCodesToJSON) {
      return response.status(200).send([])
    }
    return parseQrCodesToJSON
  }
}
