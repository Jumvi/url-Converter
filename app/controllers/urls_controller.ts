import Url from '#models/url'
import type { HttpContext } from '@adonisjs/core/http'

export default class UrlsController {
  async index({ request, response }: HttpContext) {
    const url = request.input('url')
    const shortUrl = request.input('shortUrl')
    const urlData = {
      shortUrl: shortUrl,
      fullUrl: url,
    }

    console.log('urlData', urlData)

    const postUrl = await Url.create(urlData)

    if (!postUrl) {
      return response.status(400).send('Error creating new url')
    }

    return response.redirect().toRoute('goUrl')
  }

  async shwoUrls({ view, response }: HttpContext) {
    const urls = await Url.all()

    if (!urls) {
      response.status(404).send('No urls found')
    }

    const parseUrlsToJSON = urls.map((url) => url.toJSON())

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
}
