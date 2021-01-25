<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">设  置</h1>

        <form @submit.prevent="saveSettings">
          <fieldset>
              <fieldset class="form-group">
                <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                保存设置
              </button>
          </fieldset>
        </form>
        <hr>
        <button class="btn btn-outline-danger" @click="logout">
          退出
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { getUserInfo, updateUserInfo } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  async asyncData({ params }) {
    const { data } = await getUserInfo(params.slug)
    const { user } = data
    // const md = new MarkdownIt()
    // article.body = md.render(article.body)
    return {
      user
    }
  },
  methods: {
    async logout() {
      try {
        this.$store.commit('setUser', null)
        Cookie.remove('user')
        this.$router.push('/login')
      } catch (err) {
        
      }
    },
    async saveSettings() {
      const { data } = await updateUserInfo({user: this.user})
      // TODO：保存用户的登录状态
      this.$store.commit('setUser', data.user)

      // 为了防止刷新页面丢失数据，需要把数据持久化（存入cookie）
      Cookie.set('user', data.user)
    }
  }
}
</script>

<style>

</style>