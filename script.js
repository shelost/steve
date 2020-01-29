const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const CENT_X = canvas.width/2
const CENT_Y = canvas.height/2

var math = new Image()
math.src = 'math.png'

function Ball(){

    return {

        x: Math.random()*(canvas.width-300)+150,
        y: Math.random()*(canvas.height-300)+150,

        xspeed: (Math.random()*3)*Math.random()>.5?1:-1,
        yspeed: (Math.random()*3)*Math.random()>.5?1:-1,

        r: 5,
        clicked: false
    }
}

function CollideRect(circ, rect){

    if (circ.x > rect.x -circ.r && circ.x < rect.x + rect.w +circ.r&& circ.y > rect.y-circ.r && circ.y < rect.y + rect.h+circ.r){
  
      return true;
  
    }else{
  
      return false;
    }
  }

var Balls = []

for (i=0;i<40;i++){

    var b = new Ball()

    Balls.push(b)
}

var M_X, M_Y, MOUSE, C_X, C_Y

var M_BOX = 100

function Move(e){

    M_X = e.pageX
    M_Y = e.pageY

    MOUSE = {

        x: M_X,
        y: M_Y,
        w: M_BOX,
        h: M_BOX
    }

}

function Click(e){

    C_X = e.pageX
    C_Y = e.pageY

}

var colors = [

    'royalblue',
    'purple',
    'green',
]

var rand = Math.floor(Math.random()*colors.length)

const loop = () => {

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight



    ctx.drawImage(math, 0,0,canvas.width, canvas.height)

    ctx.fillStyle = 'royalblue'
    ctx.globalAlpha = 0.7
    ctx.fillRect(0,0,canvas.width, canvas.height)
    ctx.globalAlpha = 1


    for (v=0;v<Balls.length;v++){

        var ball = Balls[v]

        if (Balls[v+1]){

            var nextBall = Balls[v+1]

        }else{

            var nextBall = Balls[0]
        }

        
       

        if (M_X > ball.x -200 && M_X < ball.x+200 && M_Y > ball.y-200 && M_Y < ball.y+200){

            ctx.strokeStyle = '#5E80FF'
            ball.r = 55
            ball.clicked = true
            
           
        }else{
           
            ctx.strokeStyle = '#5E80FF'
            ball.r = 50
            ball.clicked = false
           
        }

        if (ball.clicked){

            if (ball.x < M_X){

                ball.xspeed += 0.1
            }else{

                ball.xspeed -= 0.1
            }

            if (ball.y < M_Y){

                ball.yspeed += 0.1
            }else{

                ball.yspeed -= 0.1
            }

        }
        
        ctx.globalAlpha = 0.5

        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2)
        ctx.stroke()
        ctx.closePath()
        ctx.globalAlpha = 1

        ball.x += ball.xspeed;
        ball.y += ball.yspeed;

        ball.xspeed *= 0.9;
        ball.yspeed *= 0.9;

        if (ball.xspeed >= 0){

            ball.xspeed +=0.1;
        }else{
    
            ball.xspeed -=0.1;
        }
       if (ball.yspeed >= 0){
    
        ball.yspeed +=0.1;
       }else{
    
        ball.yspeed -=0.1;
       }

        if (ball.x<ball.r || ball.x >canvas.width-ball.r){

            ball.xspeed *= -1;
        }

        if (ball.y<ball.r || ball.y >canvas.height-ball.r){

            ball.yspeed *= -1;
        }

        
    }

  

    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
window.addEventListener('mousemove', Move)
window.addEventListener('click', Click)
