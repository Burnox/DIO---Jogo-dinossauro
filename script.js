const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping = false
let position = 0

function handleKeyUp(event) {
  if (event.keyCode === 32 || event.keyCode === 38) {
    if (!isJumping) {
      jump()
    }
  }
}

function jump() {
  isJumping = true

  //subindo
  let upInterval = setInterval(() => {
    if (position >= 150) {
      //limite do pulo
      clearInterval(upInterval)

      //descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval)
          isJumping = false
        } else {
          position -= 20
          dino.style.bottom = position + 'px'
        }
      })
    } else {
      // pulando
      position += 20
      dino.style.bottom = position + 'px'
    }
  }, 20)
}

function createCactos() {
  const cactos = document.createElement('div')
  let cactosPosition = 1000
  let randomTime = Math.random() * 6000

  cactos.classList.add('cactos')
  cactos.style.left = 1000 + 'px'
  background.appendChild(cactos)

  let leftInterval = setInterval(() => {
    if (cactosPosition < -60) {
      clearInterval(leftInterval)
      background.removeChild(cactos)
    } else if (cactosPosition > 0 && cactosPosition < 60 && position < 60) {
      clearInterval(leftInterval)
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>'
    } else {
      cactos.style.left = cactosPosition + 'px'
      cactosPosition -= 10
    }
  }, 20)

  setTimeout(createCactos, randomTime)
}

createCactos()
document.addEventListener('keyup', handleKeyUp)
