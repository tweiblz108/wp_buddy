const Controller = require('egg').Controller
const createPost = require('../helpers/createPost')

class Post extends Controller {
  async createPost () {
    const { ctx } = this

    const content = ctx.request.rawBody

    await createPost(content)
  }
}

module.exports = Post