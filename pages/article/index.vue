<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">
      <h1>{{article.title}}</h1>
      <article-meta :article="article" :isMyArticle="isMyArticle" />
    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <div class="col-md-12" v-html="article.body"></div>
      <ul class="tag-list">
          <!-- ngRepeat: tag in $ctrl.article.tagList -->
          <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">
              {{tag}}
          </li>
          <!-- end ngRepeat: tag in $ctrl.article.tagList -->
        </ul>
    </div>
    
    <hr />

    <div class="article-actions">
      <article-meta :article="article" :isMyArticle="isMyArticle" />
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">
        <article-comments :article="article" />
      </div>

    </div>

  </div>

</div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
import { mapState } from 'vuex'
export default {
    middleware: 'authenticated',
    name: 'ArticleIndex',
    async asyncData({ params }) {
      const { data } = await getArticle(params.slug)
      const { article } = data
      const md = new MarkdownIt()
      article.body = md.render(article.body)
      return {
        article
      }
    },
    computed: {
      ...mapState(['user']),
      isMyArticle() {
        return this.user.username === this.article.author.username
      }
    },
    components: {
      ArticleMeta,
      ArticleComments
    },
    head() {
      return {
        title: `${this.article.title} - realworld`,
        meta: [
          { hid: 'description', name: 'description', content: this.article.description }
        ]
      }
    }
}
</script>

<style>

</style>