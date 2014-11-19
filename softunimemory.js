var old = null,
    mom = null, 
    clickable = true,
    allsolved = 0,
    moves = 0,
    delay = 1500,
    audio
    score = 0;;

function init(){
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
                          '<span id="moves">0</span></aside>' +
                          '<aside>Score: '+
                          '<span id="score">0</span></aside>';


  cards.innerHTML += '<aside id="win"><p>You found all trainers!&hellip; - resetting</p>'+
                     '</aside>';
  cards.addEventListener( 'click', checkcard, false );
  cards.addEventListener( 'touchmove', checkcard, false );
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
      if( allsolved === 6 ) {
        win(); 
      }
    } else {
      audio[0].play();
      clickable = false;
      x = setTimeout( clear, delay );
    }
    moves++;
    moveelm.innerHTML = moves;
      scoreelm.innerHTML = score;
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
    }

}());
function win() {

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

