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

  console.log('2',this)
  schema.pre('save', function (this:newDocument,next) {
    console.log('111',this)
    this.lastMod = new Date
    next()
  })

  if (options && options.index) {
    schema.path('lastMod').index(options.index)
  }
}