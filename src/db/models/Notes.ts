
import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class Note extends Model {
  static table = 'notes'

  @field('title') title!: string
  @field('body') body!: string
  @field('updated_at') updatedAt!: number
  @field('deleted_at') deletedAt!: number | null
}
