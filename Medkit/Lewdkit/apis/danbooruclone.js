// general danbooru api client
const {parseString} = require('xml2js')
const superagent = require('superagent')

class DanbooruClone {
	constructor(medkit) {
		this.Medkit = medkit
		this.limit = 50
		this.generateRandom = medkit.generateRandom.bind(medkit, this.limit)
		this.domain = "http://danbooru.donmai.us"
		this.path = `/index.php?page=dapi&s=post&q=index&limit=${this.limit}&tags=`
		this.defaultTags = '-furry'
	}

	query(tags) {
		return new Promise((resolve, reject) => {
			superagent
			 .get(`${this.domain}${this.path}${tags} ${this.defaultTags}`)
			 .then((data) => {
				parseString(data.text, (err, obj) => {
					let rv = obj.posts.post[this.generateRandom()]
					console.log(rv)
					resolve(rv)
				})
			})
		})
	}

	humanize(item) {
		if (item.$.file_url[0] === '/') {
			item.$.file_url = 'https:'+item.$.file_url
		}

		return `:frame_photo: ${item.$.file_url}\n`
	}
}

module.exports = DanbooruClone