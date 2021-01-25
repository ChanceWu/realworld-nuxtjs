import {request} from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

// 获取关注的用户文章列表
export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        // Authorization: Token jwt.token.here
        // headers: {
        //     // 注意数据格式：Token空格数据Token
        //     Authorization: Token   ``
        // }
        params
    })
}

// 添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

// 取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 获修改文章详情
export const updateArticle = (slug, data) => {
    return request({
        method: 'put',
        url: `/api/articles/${slug}`,
        data

    })
}

// 创建文章
export const addArticle = data => {
    return request({
        method: 'post',
        url: `/api/articles`,
        data
    })
}

// 删除文章
export const delArticle = slug => {
    return request({
        method: 'delete',
        url: `/api/articles/${slug}`
    })
}

// 获取文章评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}

// 新增文章评论
export const addComments = (slug, data) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
}

// 新增文章评论
export const delComments = (slug, commentid) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${commentid}`
    })
}
