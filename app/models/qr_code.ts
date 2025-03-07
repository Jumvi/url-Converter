import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Url from './url.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class QrCode extends BaseModel {
  static table = 'qrcodes'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare url_id: number

  @column()
  declare qr_code: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Url)
  declare url: BelongsTo<typeof Url>
}
