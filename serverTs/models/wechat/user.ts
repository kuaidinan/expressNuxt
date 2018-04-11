import * as mongoose from 'mongoose';
const lastModifiedPlugin = require('../core/lastModify')

const Schema = mongoose.Schema;

const usersSchema = new Schema({
	openid: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	nickname: String,
	sex: Number,
	language: String,
	city: String,
	province: String,
  country: String,
  headimgurl: String,
	privilege: Array,
	created_at:{
		type: Date,
		"default": Date.now
	},
  lastMod: Date,
})

// usersSchema.pre('save',function(this:any,next) {
// 	const now = new Date();
//   this.updated_at = now;
//   if ( !this.created_at ) {
//     this.created_at = now;
//   }
//   next();
// })

usersSchema.plugin(lastModifiedPlugin,{ index: true })

usersSchema.index({id:1});


const Users = mongoose.model('Users', usersSchema);

export default Users;