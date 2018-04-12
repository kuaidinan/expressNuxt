// lastMod.ts 为集合添加自动更新时间
import * as mongoose from 'mongoose'

interface PluginOptions {
  lastMod?: Date,
  index?: boolean,
  mongoose?: typeof mongoose
}

interface newDocument extends mongoose.Document {
  lastMod?: Date,
}

module.exports = exports = function lastModifiedPlugin (schema:mongoose.Schema, options:PluginOptions)  {
  schema.add({ lastMod: Date })

  schema.pre('save', function (this:newDocument,next) {
    this.lastMod = new Date
    next()
  })

  if (options && options.index) {
    schema.path('lastMod').index(options.index)
  }
}