<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img src="http://i.imgur.com/Qr71crq.jpg" class="user-img" />
          <h4>{{user.username}}</h4>
          <p>
            Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games
          </p>
          <nuxt-link class="btn btn-sm btn-outline-secondary action-btn"
            to="/settings"
          >
            <i class="ion-gear-a"></i>
            &nbsp;
            设置个人信息
          </nuxt-link>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :class="{
                    active: tab==='your_feed'
                }"
                exact
                :to="{
                    name: 'profile',
                    params: {
                        username: '@'+user.username
                    }
                }"
              >我的文章</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :class="{
                    active: tab==='favorites'
                }"
                exact
                :to="{
                    name: 'profile',
                    params: {
                        username: '@'+user.username
                    },
                    query: {
                        tab: 'favorites'
                    }
                }"
              >喜欢的文章</nuxt-link>
            </li>
          </ul>
        </div>

        <div
          class="article-preview"
          v-for="article in articles"
          :key="article.slug"
        >
          <div class="article-meta">
            <nuxt-link :to="{
                name: 'profile',
                params: {
                    username: article.author.username
                }
            }">
                <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
                <nuxt-link class="author" :to="{
                    name: 'profile',
                    params: {
                        username: article.author.username
                    }
                }">
                    {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button
              class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{
                  active: article.favorited
              }"
              @click="onFavorite(article)"
              :disabled="article.favoriteDisabled"
            >
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link class="preview-link" :to="{
            name: 'article',
            params: {
                slug: article.slug
            }
          }">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list">
              <!-- ngRepeat: tag in $ctrl.article.tagList -->
              <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">
                  {{tag}}
              </li>
              <!-- end ngRepeat: tag in $ctrl.article.tagList -->
            </ul>
          </nuxt-link>
        </div>
        <div v-if="!articles.length">没有数据</div>

        <!-- 分页列表 -->
        <nav>
          <ul class="pagination">
          <li
            class="page-item"
            :class="{
              active: item === page
            }"
            v-for="item in totalPage"
            :key="item"
          >
            <nuxt-link
              class="page-link"
              :to="{
                name: 'profile',
                params: {
                    username: '@'+user.username
                },
                query: {
                  page: item,
                  tab: tab
                }
              }"
            >{{ item }}</nuxt-link>
          </li>
          </ul>
        </nav>
        <!-- /分页列表 -->

      </div>

    </div>
  </div>

</div>
</template>

<script>
import {
    getArticles,
    // getFeedArticles,
    addFavorite,
    deleteFavorite,
} from '@/api/article'
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated',
  name: 'ProfileIndex',
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page||1)
    const limit = 10
    const { tab } = query
    const loadArticles = getArticles
    const _params = !tab ? {
        limit,
        offset: (page - 1) * limit,
        author: store.state.user.username
    }: {
      limit,
      offset: (page - 1) * limit,
      favorited: store.state.user.username
    }
    const { data } = await loadArticles(_params)

    const { articles, articlesCount } = data

    articles.forEach(article => article.favoriteDisabled = false)

    return {
        articles: [...articles],
        articlesCount,
        limit,
        page,
        tab,
    }
  },
  watchQuery: ['page', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
        return Math.ceil(this.articlesCount/this.limit)
    }
  },
  methods: {
    async onFavorite (article) {
      article.favoriteDisabled = true
      if (article.favorited) {
          // 取消点赞
          await deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount -= 1
      } else {
          // 添加点赞
          await addFavorite(article.slug)
          article.favorited = true
          article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style>

</style>