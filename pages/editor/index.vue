<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group">
                <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input v-model="article.tagList" type="text" class="form-control" placeholder="多个标签分号分隔"><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { addArticle, getArticle, updateArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  // data() {
  //   return {
  //     article: {
  //       title: '',
  //       description: '',
  //       body: '',
  //       tagList: []
  //     }
  //   }
  // },
  async asyncData({ params }) {
    let data = {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
    if (params.slug) {
      data = (await getArticle(params.slug)).data
    }
    const { article } = data
    // const md = new MarkdownIt()
    // article.body = md.render(article.body)
    return {
      article
    }
  },
  methods: {
    async onSubmit() {
      const tagList = this.article.tagList?this.article.tagList.split(';'):[]
      this.article.tagList = tagList
      const { data }= this.article.slug?await updateArticle(this.article.slug, {article: this.article}):await addArticle({ article: this.article })
      this.$router.push(`/article/${data.article.slug}`)
    }
  }
}
</script>

<style>

</style>