import Url from '#models/url'
import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'

export default class UrlsController {
  async index({ request, response }: HttpContext) {
    const url = request.input('url')
    console.log('url', url)
    const shortUrl = request.input('shortUrl')
    const urlData = {
      shortUrl: shortUrl,
      fullUrl: url,
    }
    const createQrcode = await QRCode.toDataURL(url)
    console.log('postUrl', urlData)
    const postUrl = await Url.create(urlData)
    const qrcode = await postUrl
      .related('qrcode')
      .create({ qr_code: createQrcode, url_id: postUrl.id })

    if (!postUrl || !qrcode) {
      return response.status(400).send('Error creating new url')
    }

    return response.redirect().toRoute('goUrl')
  }

  async shwoUrls({ response, view }: HttpContext) {
    const urls = await Url.query().preload('qrcode').exec()

    if (!urls) {
      response.status(404).send('No urls found')
    }

    const parseUrlsToJSON = urls.map((url) => ({
      ...url.toJSON(),
      qrcode: url.qrcode ? url.qrcode.toJSON() : null,
    }))

    return view.render('pages/goUrl', { parseUrlsToJSON })
  }

  async show({ response, request }: HttpContext) {
    const shortUrl = request.qs().shortUrl
    console.log('shortUrl', shortUrl)

    const findUrlByShortUrl = await Url.findBy('shortUrl', shortUrl)

    if (!findUrlByShortUrl) {
      return response.status(404).send('Url not found')
    }

    const getFullUrl = findUrlByShortUrl.fullUrl

    return response.redirect(getFullUrl)
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const urlId = params.id

      const findUrlById = await Url.find(urlId)

      if (!findUrlById) {
        return response.status(404).send('Url not found')
      }

      await findUrlById.delete()

      return response.status(200).send('Url deleted')
    } catch (error) {
      return response.status(400).send('Error deleting url')
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const urlId = params.id

      const findUrlById = await Url.find(urlId)

      if (!findUrlById) {
        return response.status(404).send('Url not found')
      }

      const findUrlIdInQrcode = await findUrlById.related('qrcode').query().first()
      if (!findUrlIdInQrcode) {
        const qrCodeForUrl = await QRCode.toDataURL(findUrlById.fullUrl)
        await findUrlById.related('qrcode').create({ qr_code: qrCodeForUrl })
        await findUrlById.save()
      }

      const fullUrl = request.input('fullUrl')
      const shortUrl = request.input('shortUrl')

      findUrlById.merge({
        fullUrl: fullUrl,
        shortUrl: shortUrl,
      })

      await findUrlById.save()

      return response.status(200).json({
        success: true,
        data: findUrlById,
      })
    } catch (error) {
      console.error('Error updating URL:', error)
      return response.status(400).json({
        success: false,
        message: 'Error updating URL',
      })
    }
  }
}
