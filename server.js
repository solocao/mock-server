const Koa = require('koa');
const Router = require('koa-router');
const qs = require('qs');

const app = new Koa();
const router = new Router();

let listData = require('./mock/list/list.js');

router.get('/api/getlist/:page/:limit', function (ctx, next) {
  const { page, limit } = ctx.params;
  const maxPage = listData.length / limit;

  // 构造返回对象
  let res = {
    errno: 0,
    data: {
      hasMore: true,
      data: []
    }
  };

  if (page > maxPage) {
    res.data.hasMore = false;
  }
  res.data.data = listData.slice(page * limit, page * limit + limit);
  ctx.body = res;

});

// 获取详情数据
const detailData = require('./mock/detail/detail.js');
router.get('/api/getdetail/:id', function (ctx, next) {
  const { id } = ctx.params.id;
  let res = {
    errno: 0,
    data: {
      data: []
    }
  };
  res.data.data = detailData;
  ctx.body = res;

});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
console.log('server is running at port:3000');







