import levelup from 'levelup'
import sublevel from 'level-sublevel'

export const db = sublevel(levelup('./leveldb'))
