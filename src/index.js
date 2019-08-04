const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
// 콘텐츠 데이터
const my_data = require('../public/js/data')
console.log('data= ', my_data.product);

// Define paths for Express config
const public_dir = path.join(__dirname, '../public')
// views 기본 경로를 templates로 변경
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
console.log(__dirname)

// Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)  // view path  변경
hbs.registerPartials(partialPath) // 추가된 views 경로 등록
// hbs limit result data setup
hbs.registerHelper('limit', function (arr, limit) {
  if (!Array.isArray(arr)) { return []; }
  return arr.slice(0, limit);
});

// static 문서 경로(서버상 기본 파일들의 경로 설정)
app.use(express.static(public_dir))

// dynamic index.hbs
app.get('', (req, res)=>{
  // render dynamic html(hbs)
  /** 주의: public의 index.html 삭제 */
  res.render('index', {
    title: 'CoffeFree',
    data: my_data,
  })
})

app.get('/about', (req, res)=>{
  res.render('about', {
    title: 'About Me',
    name: 'Michael Kwon',
  })
})

app.get('/help', (req, res)=>{
  res.render('help', {
    title: 'Help',
    name: 'Michael Kwon',
    img_src: 'http://placeimg.com/400/300/any',
  })
})

app.get('/weather', (req, res) => {
  let weather = {
    forecast: 'It is ranning',
    location: 'Seoul'
  }
  res.send(weather)
})

// 404 페이지 처리
app.get('*', (req, res) => {
  // res.send('404 page not found')
  res.render('404', {
    title: '404',
    errorMessage: '404 page not found!!',
  })
})

app.listen(process.env.PORT || 3000, ()=>{
  console.log('Server running')
})
