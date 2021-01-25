<template>
  <div>
        <form class="card comment-form">
            <div class="card-block">
                <textarea v-model="comment.body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                <button class="btn btn-sm btn-primary" @click="addComments">
                Post Comment
                </button>
            </div>
        </form>
        
        <div
            class="card"
            v-for="comment in comments"
            :key="comment.id"
        >
            <div class="card-block">
                <p class="card-text">{{comment.body}}</p>
            </div>
            <div class="card-footer">
                <nuxt-link class="comment-author"
                    :to="{
                        name: 'profile',
                        params: {
                            username: comment.author.username
                        }
                    }"
                >
                    <img :src="comment.author.image" class="comment-author-img" />
                </nuxt-link>
                &nbsp;
                <nuxt-link class="comment-author"
                    :to="{
                        name: 'profile',
                        params: {
                            username: comment.author.username
                        }
                    }"
                >{{comment.author.username}}</nuxt-link>
                <span class="date-posted">{{comment.createdAt|date('MMM DD,YYYY')}}</span>
                <span class="mod-options" @click="delComments(comment.id)">
                    <i class="ion-trash-a"></i>
                </span>
            </div>
        </div>
  </div>
</template>

<script>
import { getComments, addComments, delComments } from '@/api/article'
export default {
    name: 'ArticleComments',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            comments: [], // 文章评论列表
            comment: {
                body: ''
            }
        }
    },
    async mounted() {
        const { data } = await getComments(this.article.slug)
        this.comments = data.comments
    },
    watch: {
        b:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
                this.comments = val
            },
            deep:true //true 深度监听
        }
    },
    methods: {
        async addComments() {
            addComments(this.article.slug, this.comment)
        },
        async delComments(commentid) {
            await delComments(this.article.slug, commentid)
            const { data } = await getComments(this.article.slug)
            this.comments = data.comments
        }
    }
}
</script>

<style>

</style>