import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import QrCode from './qr_code.js'

export default class Url extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare shortUrl: string

  @column()
  declare fullUrl: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => QrCode, {
    foreignKey: 'url_id',
  })
  declare qrcode: HasOne<typeof QrCode>
}
