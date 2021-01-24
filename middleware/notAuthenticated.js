export default function ({ store, redirect }) {
    // 如果验证已登录
    if (store.state.user) {
        return redirect('/')
    }
}