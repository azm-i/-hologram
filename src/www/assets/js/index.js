import Page from '~/parentClass/Page'

//
// main
//

class PageCurrent extends Page {
  onInit() {
    var bt
    window.addEventListener('load', function() {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        bt = document.createElement('a')
        bt.classList.add('bta2')
        bt.innerHTML = 'ジャイロセンサーをON'
        bt.addEventListener('click', function() {
          ios13()
        })
        document.getElementById('orientation').appendChild(bt)
      } else {
        dev()
      }
    })
    let can = document.getElementById('can')
    let ct = can.getContext('2d')
    ct.scale(1, 1)
    ct.fillStyle = 'rgb(255,255,255)'
    ct.fillRect(
      0,
      0,
      can.getBoundingClientRect().width,
      can.getBoundingClientRect().height
    )
    ct.strokeStyle = '#999999'
    ct.lineWidth = 1
    for (x = 13; x < 300; x += 30) {
      ct.beginPath()
      ct.moveTo(x, 0)
      ct.lineTo(x, 299)
      ct.stroke()
    }
    for (y = 13; y < 300; y += 30) {
      ct.beginPath()
      ct.moveTo(0, y)
      ct.lineTo(299, y)
      ct.stroke()
    }

    function ios13() {
      DeviceOrientationEvent.requestPermission()
        .then(function(response) {
          if (response === 'granted') {
            document.getElementById('orientation').removeChild(bt)
            dev()
          }
        })
        .catch(function(e) {
          console.log(e)
        })
    }

    function dev() {
      window.addEventListener('deviceorientation', function(e) {
        let a = e.absolute //方位データが地球の座標フレーム基準(true)か、デバイス任意のフレーム(false)か
        let z = e.alpha //z軸 0～360
        let x = e.beta //x軸 -180～180
        let y = e.gamma //y軸 -90～90
        if (z == null) {
          z = 0
        }
        if (x == null) {
          x = 0
        }
        if (y == null) {
          y = 0
        }
        document.getElementById('orientation').innerHTML =
          ' alpha(z軸):' +
          z.toFixed(3) +
          '<br>' +
          '  beta(x軸):' +
          x.toFixed(3) +
          '<br>' +
          ' gamma(y軸):' +
          y.toFixed(3)
        let ori = document.getElementById('ori')
        // 要素の位置座標を取得
        var clientRect = ori.getBoundingClientRect()
        // ページの左端から、要素の左端までの距離
        let px = window.pageXOffset + clientRect.left
        // ページの上端から、要素の上端までの距離
        let py = window.pageYOffset + clientRect.top
        let t = document.getElementById('ori_t')
        t.style.left = (y * 300) / 180 + 150 - 5 + px + 'px'
        t.style.top = (x * 300) / 180 + 150 - 5 + py + 'px'
      })
    }
  }
}
new PageCurrent()
