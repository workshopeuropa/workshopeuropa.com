import { Database } from 'bun:sqlite'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { env } from '$env/dynamic/private'
import * as schema from './schema'

const file = resolve(env.DATABASE_URL ?? './data/workshop-europa.db')
mkdirSync(dirname(file), { recursive: true })

const sqlite = new Database(file)
sqlite.exec('PRAGMA journal_mode = WAL')
sqlite.exec('PRAGMA foreign_keys = ON')

export const db = drizzle(sqlite, { schema })

// Bring the file up to date on boot so a fresh clone just runs.
const migrationsFolder = resolve('drizzle')
if (existsSync(migrationsFolder)) {
	migrate(db, { migrationsFolder })
}

export { schema }
