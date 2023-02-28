import Page from '~/parentClass/Page'
import { isIos, isAndroid, isMobile } from '~/utils/navigator'

//
// main
//

class PageCurrent extends Page {
  onInit() {
    let bt
    this.card = this.el.querySelector('.card')
    this.style = this.el.querySelector('.hover')
    window.addEventListener('load', () => {
      if (
        (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof DeviceOrientationEvent.requestPermission === 'function') ||
        isMobile
      ) {
        bt = document.createElement('a')
        bt.classList.add('bta2')
        bt.innerHTML = 'ジャイロセンサーをON'
        bt.addEventListener('click', function() {
          if (isIos) ios13()
          else if (isAndroid) android()
        })
        document.querySelector('.setting').appendChild(bt)
      } else {
        this.card.addEventListener('mousemove', e => {
          this.card.classList.add('active')
          let pos = [e.offsetX, e.offsetY]
          e.preventDefault()
          const cardWidth = this.card.clientWidth
          const cardHeight = this.card.clientHeight
          let currentX = pos[0]
          let currentY = pos[1]
          let px = Math.abs(Math.floor((100 / cardWidth) * currentX) - 100)
          let py = Math.abs(Math.floor((100 / cardHeight) * currentY) - 100)
          // let lp = 50 + (px - 50) / 1.5
          // let tp = 50 + (py - 50) / 1.5
          // let ty = ((tp - 50) / 2) * -1
          // let tx = ((lp - 50) / 1.5) * 0.5
          let grad_pos = `background-position: ${px}% ${py}%;`
          // let tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
          let style = `.card.active:before { ${grad_pos} }`
          // this.card.setAttribute('style', tf)
          this.style.innerHTML = style
        })
        this.card.addEventListener('mouseout', () => {
          this.card.classList.remove('active')
          this.style.innerHTML = ''
          this.card.removeAttribute('style')
        })
      }
    })

    function ios13() {
      DeviceOrientationEvent.requestPermission()
        .then(function(response) {
          if (response === 'granted') {
            bt.innerHTML = 'ジャイロセンサーをONにしました'
            devIos()
          }
        })
        .catch(function(e) {
          console.log(e)
        })
    }
    function android() {
      devAndroid()
    }

    let devIos = () => {
      window.addEventListener('deviceorientation', e => {
        // let z = e.alpha //z軸 0～360
        let x = e.beta //x軸
        let y = e.gamma //y軸
        if (x > 45) {
          x = 45
        }
        if (x < -45) {
          x = -45
        }
        if (y > 45) {
          y = 45
        }
        if (y < -45) {
          y = -45
        }
        this.card.classList.add('active')
        let px = Math.abs(Math.floor((x / 45) * 100))
        let py = Math.abs(Math.floor((y / 45) * 100))
        let grad_pos = `background-position: ${px}% ${py}%;`
        let style = `.card.active:before { ${grad_pos} }`
        this.style.innerHTML = style

        //   document.getElementById('orientation').innerHTML =
        //     'alpha(z軸):' +
        //     z.toFixed(3) +
        //     '<br>' +
        //     px +
        //     ' beta(x軸):' +
        //     x.toFixed(3) +
        //     '<br>' +
        //     py +
        //     ' gamma(y軸):' +
        //     y.toFixed(3)
      })
    }
    let devAndroid = () => {
      window.addEventListener('deviceorientationabsolute', e => {
        let x = e.beta //x軸
        let y = e.gamma //y軸
        if (x > 45) {
          x = 45
        }
        if (x < -45) {
          x = -45
        }
        if (y > 45) {
          y = 45
        }
        if (y < -45) {
          y = -45
        }
        this.card.classList.add('active')
        let px = Math.abs(Math.floor((x / 45) * 100))
        let py = Math.abs(Math.floor((y / 45) * 100))
        let grad_pos = `background-position: ${px}% ${py}%;`
        let style = `.card.active:before { ${grad_pos} }`
        this.style.innerHTML = style
      })
    }
  }
}
new PageCurrent()
