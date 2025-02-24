import client from '#config/edgedb'
import Url from '#models/url'

export class EdgeDBService {
  static async createUrl(data: Partial<Url>) {
    const query = `
      INSERT Url {
        shortUrl := <str>$shortUrl,
        fullUrl := <str>$fullUrl
      }
    `
    return await client.query(query, {
      shortUrl: data.shortUrl,
      fullUrl: data.fullUrl,
    })
  }

  static async getAllUrls() {
    const query = `
      SELECT Url {
        id,
        shortUrl,
        fullUrl
      }
    `
    return await client.query(query)
  }

  static async getUrlById(id: string) {
    const query = `
      SELECT Url {
        id,
        shortUrl,
        fullUrl
      }
      FILTER .id = <str>$id
    `
    return await client.querySingle(query, { id })
  }
}
