var old = null,
    mom = null, 
    clickable = true,
    allsolved = 0,
    moves = 0,
    delay = 1500,
<<<<<<< HEAD
    audio;
	
var score=0,highscore=0;

function Add_Score()
{
	//to do: add score dependant on time
	score+=10;
}

function Dec_Score()
{
	//to do: time dependant and penalties for multiple wrong moves
	score--;
}
=======
    audio
    score = 0;;
>>>>>>> origin/master

function init(){

  // score related
  // to do: highscores
  timer.restart();
  score=0;
  moves = 0;
  
  var trainers = 't1-t2-t3-t4-t5-t6'.split( '-' ),
      ar = trainers.concat( trainers ),
      sa = [],
      cards = document.querySelector('#cards'),
      out = '', i = 0, x = 0;
  while (ar.length) {
    sa.push( ar.splice( Math.random() * ar.length, 1) );
  };
  while (sa.length) {
    ar.push( sa.pop() );
  };

  for ( i = 0; i < ar.length; i++ ) {
    x = 10 * Math.random() -5;
    out += '<section class="container"><div class="card">'+
           '<figure class="front"></figure>'+
           '<figure class="back ' + ar[ i ] + '"></figure>'+
           '</div></section>';
  }
  cards.innerHTML = out + '<aside>Moves: '+
<<<<<<< HEAD
                          '<span id="moves">0</span></aside>';
	
  cards.innerHTML += '<aside>Score: '+
                          '<span id="score">0</span></aside>';
						  
=======
                          '<span id="moves">0</span></aside>' +
                          '<aside>Score: '+
                          '<span id="score">0</span></aside>';


>>>>>>> origin/master
  cards.innerHTML += '<aside id="win"><p>You found all trainers!&hellip; - resetting</p>'+
                     '</aside>';
  cards.addEventListener( 'click', checkcard, false );
  cards.addEventListener( 'touchmove', checkcard, false );
  scoreelm = document.querySelector('#score');
  moveelm = document.querySelector( '#moves' );
    scoreelm = document.querySelector( '#score ')
  document.body.className = document.body.className.replace( 'win', '' );

  if ( document.body.style.WebkitPerspective === undefined && 
       document.body.style.MozPerspective === undefined ) {
    delay = 500;
    document.body.className = 'notransforms';
  }  
  audio = document.querySelectorAll( 'audio' );
}

function checkcard( e ) {
  
  if ( !clickable ) { return; }

  if ( e.touches && e.touches.length === 1 ) {
    e.target = e.touches[0].target;
  }
  
  if ( e.target.tagName !== 'FIGURE' ) { return; }
  mom = e.target.parentNode;
  if ( mom.solved ) { return; }

  if ( !old ) {
    old = mom;
      score-=5;
      mom.className += ' flipped';
  } else {
    mom.className += ' flipped';
  }

  if ( old && mom && old !== mom ) {
    if ( old.lastChild.className === mom.lastChild.className ) {
      old.solved = mom.solved = true;
      old = null;
      score+=20;
      allsolved++;
      audio[1].play();
<<<<<<< HEAD
	  Add_Score();
      if( allsolved === 6 ) { 
=======
      if( allsolved === 6 ) {
>>>>>>> origin/master
        win(); 
      }
    } else {
      audio[0].play();
      clickable = false;
	  Dec_Score();
      x = setTimeout( clear, delay );
    }
    moves++;
    moveelm.innerHTML = moves;
<<<<<<< HEAD
	scoreelm.innerHTML = score;
=======
      scoreelm.innerHTML = score;
>>>>>>> origin/master
  }

}
//TIMER
	var timer = (function() {
    var basePeriod = 1000;
    var currentSpeed = 1;
    var timerElement;
    var timeoutRef;
	var minutes = 0;
    var seconds = 0;

    return {
      start : function(speed, id) {
        if (speed >= 0) {
          currentSpeed = speed;
        }
        if (id) {
          timerElement = document.getElementById(id);
        }
        timer.run();	
      },

      run: function() {
		
        if (timeoutRef) clearInterval(timeoutRef);
        if (timerElement) {
          timerElement.innerHTML = minutes + ':' + seconds;
        }
		if(seconds >= 59){
		seconds = 0;
		minutes++;
		}
        if (currentSpeed) {
          timeoutRef = setTimeout(timer.run, basePeriod/currentSpeed);
        }
        ++seconds;
      },

      setSpeed: function(speed) {
        currentSpeed = +speed;
        timer.run();
      }
	  ,
	  restart: function(){
		seconds=0;
		minutes=0;
		currentSpeed=1;
		//timer.run();
	  },
	  stop: function()
	  {
		currentSpeed=0;
	  }
    }

}());
function win() {

  timer.stop();
  document.body.className += ' win';
  audio[2].play();
  setTimeout( function() {
    var cards = document.querySelectorAll( '.card' );
    for (i = cards.length-1; i >= 0; i-- ) {
      cards[ i ].className = cards[ i ].className.replace( ' flipped', '' );
    }  
    setTimeout( init, 1000 );
  }, 3000);

}

function clear() {
  clickable = true;
  old.className = old.className.replace(' flipped','');
  mom.className = mom.className.replace(' flipped','');
  old = null;
  mom = null;
  clearTimeout(x);

}

window.addEventListener ( 'load', init, false );
window.onload = function(){timer.start(1, 'timer');};

