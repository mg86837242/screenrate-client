// @index('./**/*.{ts,tsx}', f => f.name === 'index' ? `export * from '${f.path.slice(0, -6)}'` : `export * from '${f.path}'`)
export * from './Hero';
export * from './Hero/styles';
export * from './Home';
export * from './Layout';
export * from './Layout/styles';
export * from './Navbar';
export * from './Navbar/styles';
export * from './Reviews';
export * from './Reviews/ReviewForm';
export * from './Reviews/ReviewList';
export * from './Trailer';
export * from './ui/BtnPrimary';
export * from './ui/ErrorPage';
export * from './ui/NotFound';
export * from './ui/PendingPage';
