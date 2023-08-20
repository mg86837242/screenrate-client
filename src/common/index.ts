// @index('./**/*.{ts,tsx}', f => f.name === 'index' ? `export * from '${f.path.slice(0, -6)}'` : `export * from '${f.path}'`)
export * from './movie';
export * from './review';
export * from './types';
