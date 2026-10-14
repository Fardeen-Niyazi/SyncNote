
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { schema } from './schema'
import Note from './models/Notes'

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'syncnote',
  jsi: false,
  onSetUpError: (error) => {
    console.error('WatermelonDB setup failed:', error)
  },
})

export const database = new Database({
  adapter,
  modelClasses: [Note],
})
