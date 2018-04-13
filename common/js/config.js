import developmentConfig from '../../server/config/development'
import productionConfig from '../../server/config/production'
let config;
if(process.env.NODE_ENV === 'development') {
  config = {...developmentConfig}
} else if (process.env.NODE_ENV === 'production') {
  config = {...productionConfig}
}
export default config;