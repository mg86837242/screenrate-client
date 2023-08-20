// @index('./**/*.{ts,tsx}', f => f.name === 'index' ? `export * from '${f.path.slice(0, -6)}'` : `export * from '${f.path}'`)
export * from './axios';
export * from './reactQuery/useAddReview';
export * from './reactQuery/useMovie';
export * from './reactQuery/useMovies';
