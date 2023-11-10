const ApiEndpoints = {
  user: {
    register: 'users/register',
    login: 'users/login',
  },
  product: {
    add: 'product/add',
    update: 'product/update',
    list: 'product/list',
    getById: 'product/get/',
    removeById: 'product/remove/',
  },
  cart: {
    add: 'cart/add',
    removeById: 'cart/remove/',
    clear: 'cart/clear',
    get: 'cart/get',
  }
}
export default ApiEndpoints