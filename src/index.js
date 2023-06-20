import helloWord from "./hello-world"
import imgUrl from './assets/img1.png'
import svgLog from './assets/img12.svg'
import imgUrl12 from './assets/11.jpeg'
import txt1 from './assets/1.txt'
import './index.css'
import './index.less'
import './assets/style.css'
// import _ from 'lodash'
import './async-module.js'


helloWord()

// const img = document.createElement('img')
// img.src = imgUrl
// document.body.appendChild(img)

// const img1 = document.createElement('img')
// img1.src = svgLog
// document.body.appendChild(img1)


// const img12 = document.createElement('img')
// img12.src = imgUrl12
// document.body.appendChild(img12)

const block = document.createElement('div')
block.textContent = txt1
block.classList.add('block-bg')
document.body.appendChild(block)


// console.log(_.join(['11', '22', '33'], '-'))