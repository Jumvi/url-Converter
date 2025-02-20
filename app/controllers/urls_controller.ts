import Url from '#models/url'
import type { HttpContext } from '@adonisjs/core/http'

export default class UrlsController {
  async index({ view, request, response }: HttpContext) {
    const url = request.qs().url
    const shortUrl = request.qs().shortUrl
    const urlData = {
      shortUrl: shortUrl,
      fullUrl: url,
    }

    console.log('urlData', urlData)

    const postUrl = await Url.create(urlData)

    const getAllUrls = await Url.all()

    const parseAllUrls = getAllUrls.map((url) => url.toJSON())

    if (!postUrl) {
      return response.status(400).send('Error creating new url')
    }

    return view.render('pages/goUrl', { parseAllUrls: parseAllUrls })
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
}
