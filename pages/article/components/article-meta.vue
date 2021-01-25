<template>
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
            }">{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
        </div>
        <button
            class="btn btn-sm btn-outline-secondary"
            :class="{
                active: article.author.following
            }"
            v-if="!isMyArticle"
        >
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.username}} <span class="counter">(10)</span>
        </button>
        <button
            class="btn btn-sm btn-outline-secondary"
            :class="{
                active: article.author.following
            }"
            v-else
            @click="editArticle"
        >
            <i class="ion-edit"></i>
            &nbsp;
            Edit Article
        </button>
        &nbsp;&nbsp;
        <button
            class="btn btn-sm btn-outline-primary"
            v-if="!isMyArticle"
            :class="{
                active: article.favorited
            }"
        >
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">({{article.favoritesCount}})</span>
        </button>
        <button
            class="btn btn-sm btn-outline-danger"
            v-else
            :class="{
                active: article.favorited
            }"
            @click="delArticle"
        >
            <i class="ion-trash-a"></i>
            &nbsp;
            Delete Article
        </button>
    </div>
</template>

<script>
import { delArticle } from '@/api/article'
export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            required: true
        },
        isMyArticle: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        async delArticle() {
            await delArticle(this.article.slug)
            this.$router.push(`/`)
        },
        async editArticle() {
            // await getArticle(this.article.slug)
            this.$router.push(`/editor/${this.article.slug}`)
        }
    }
}
</script>

<style>

</style>