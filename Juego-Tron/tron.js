
class Game {

	constructor(width, height){
	// ancho, alto y color del canvas	
		this.width = width;
		this.height = height;
		this.color_fondo = {r:50, g:50, b:50};
	// modifica el ancho y alto del canvas con los argumentos
		document.getElementById("juego").width = this.width;
		document.getElementById("juego").height = this.height;
	// inicializa el canvas
		this.canvas = document.getElementById("juego");
		this.context = this.canvas.getContext("2d");
	// asigna color y tamaño al context para poder trabajar con los límites
		this.context.fillStyle = "rgb("+this.color_fondo.r+","+this.color_fondo.g+","+this.color_fondo.b+")";
		this.context.fillRect(0,0,this.width, this.height);
	// crea los 2 objetos "moto" y le asigna posición y color
		this.moto1 = new Moto();
		this.moto1.config.color = "rgb(109, 207, 245)";
		this.moto1.config.position.x = 50;
		this.moto1.config.position.y = 250;
		this.moto1.config.jugador = "JUGADOR 1";
		this.moto2 = new Moto();
		this.moto2.config.color = "rgb(212, 13, 135)";
		this.moto2.config.position.x = 750;
		this.moto2.config.position.y = 250;
		this.moto2.config.jugador = "JUGADOR 2";
	// asigna color, tamaño y posición inicial al context de cada una de las motos
		this.moto1.pinta_moto(this.context);
		this.moto2.pinta_moto(this.context);

		this.musica = new Audio("src/media/Pacman_Game_Over.mp3");

		setInterval(() => {
			this.start_game()
		}, 30);

	}

	start_game(){
		//console.log(this.moto1.config.direction);
		if ( this.moto1.config.pause == false ){
			this.moto1.siguiente_movimiento();
			this.moto2.siguiente_movimiento();
			this.moto1.pinta_moto(this.context);
			this.moto2.pinta_moto(this.context);
			
			if ( this.moto1.detecta_siguiente_pixel() == false ){
				this.moto1.config.pause = true;
				this.musica.play();
				this.context.fillStyle = "rgb(109, 207, 245)";
				this.context.fillRect(275, 225, 250, 50);
				this.context.fillStyle = "rgb(212, 13, 135)";
				this.context.font = "bold 18px Roboto";
				this.context.fillText(this.moto1.config.jugador + " ¡PERDISTE!", 300, 255);
				//location.reload();
				//console.log(this.moto1.config.jugador + " PERDISTE!");
			} 
			if ( this.moto2.detecta_siguiente_pixel() == false ){
				this.moto1.config.pause = true;
				this.musica.play();
				this.context.fillStyle = "rgb(212, 13, 135)";
				this.context.fillRect(275, 225, 250, 50);
				this.context.fillStyle = "rgb(109, 207, 245)";
				this.context.font = "bold 18px Roboto";
				this.context.fillText(this.moto2.config.jugador + " ¡PERDISTE!", 300, 255);	
				//location.reload();
				//console.log(this.moto2.config.jugador + " PERDISTE!");
			} 
		}	
	}	

	iniciar(){
	// asigna valor a la variable direction al pulsar el botón de empezar juego
		this.moto1.config.direction = "right";
		this.moto2.config.direction = "left";
	}

}
// clase moto para después poder instanciar varias motos (en este caso 2)
class Moto {

	constructor(){
	// variables para la moto
		this.config = {
			position: {x:0, y:0},
			color: null,
			direction: null,
			size: 5,
			jugador: null,
			pause: false
		}
	}

	crash(){
		if ( this.detecta_siguiente_pixel ){
			return false;
		} else {
			return true;
		}
	}

	detecta_siguiente_pixel(){
		
			if (this.config.direction != null) {
				var pixelData = null;//juego.context.getImageData(this.config.position.x, this.config.position.y, 1, 1);
				//juego.context.fillRect(this.config.position.x+5, this.config.position.y+5, 1, 1);				
				//juego.context.fillStyle = "rgb(255, 255, 255)";
	// obtenemos datos del siguiente pixel, le estamos suma o resta px en función de la dirección del movimiento para "salvar" el tamaño de la moto y dectar correctamente el siguiente pixel
		if ( this.config.direction == "left"){
			pixelData = juego.context.getImageData(this.config.position.x-1, this.config.position.y+2, 1, 1);
			//juego.moto1.context.fillRect(this.config.position.x-1, this.config.position.y+2, 1, 1);				
			//juego.moto1.context.fillStyle = "rgb(255, 255, 255)";
		} 
		if ( this.config.direction == "right"){
			pixelData = juego.context.getImageData(this.config.position.x+5, this.config.position.y+2, 1, 1);
		} 
		
		if ( this.config.direction == "down" ){
			pixelData = juego.context.getImageData(this.config.position.x+2, this.config.position.y+5, 1, 1);
			//juego.context.fillRect(this.config.position.x+2, this.config.position.y+5, 1, 1);				
			//juego.context.fillStyle = "rgb(255, 255, 255)";
		} 
		if ( this.config.direction == "up" ){
			pixelData = juego.context.getImageData(this.config.position.x+2, this.config.position.y-1, 1, 1);
			//juego.context.fillRect(this.config.position.x+2, this.config.position.y-1, 1, 1);				
			//juego.context.fillStyle = "rgb(255, 255, 255)";
		} 
		//console.log(pixelData.data.join());
		//console.log(juego.color_fondo);
			if ( pixelData.data[0] == juego.color_fondo.r && pixelData.data[1] == juego.color_fondo.g && pixelData.data[2] == juego.color_fondo.b){
				console.log("OK");
				return true;
			} else {
				console.log("KO");
				return false;
			}
		}
	}
	// provoca el movimiento de la moto en función de la tecla pulsada
	siguiente_movimiento(){
		if 		( this.config.direction == "up") 	{this.config.position.y--;} 
		else if ( this.config.direction == "down")	{this.config.position.y++;} 
		else if ( this.config.direction == "left")	{this.config.position.x--;} 
		else if ( this.config.direction == "right")	{this.config.position.x++;}
		return this.config.position;
	}

	detecta_choque(){

	}
	// representa una moto como un cuadrado de un tamaño de pixeles determinado. También le asigna el color y la posición inicial, según se configure al crear cada nuevo objeto "moto"
	pinta_moto(context){
		this.context = context;
		this.context.fillStyle = this.config.color;
		this.context.fillRect(this.config.position.x, this.config.position.y, this.config.size, this.config.size);
	}

}
// crea los controles del teclado
class Input {
// teclas a utilizar
	constructor(){
		this.keys = {
			"ArrowLeft":	false, // controles jugador 2
			"ArrowUp":		false,
			"ArrowRight":	false,
			"ArrowDown":	false, 
			"w":			false, // controles jugador 1
			"a":			false,
			"s":			false,
			"d":			false,
			"p":			false, // para pausar el juego
			"c":			false  // para reanudar el juego tras pausa
		};
// obtiene el primer elemento del array [0] del html con que tenga la etiqueta "body"
		const body = document.getElementsByTagName("body")[0];
// cambia a true cuando se pulsa una tecla
		body.addEventListener("keydown", (e)=>{
			this.keys[e.key] = true;
			this.direction();
		});
// cambia a false cuando se deja de pulsar una tecla
		body.addEventListener("keyup", (e)=>{
			this.keys[e.key] = false;
			this.direction();
		});
	}
// asigna la dirección de la moto en función de la tecla pulsada, 4 teclas de dirección distintas para cada una de las 2 motos
	direction(){
		if 		( this.keys.ArrowUp ) 	{ juego.moto2.config.direction = "up"; } 
		else if ( this.keys.ArrowDown )	{ juego.moto2.config.direction = "down"; } 
		else if ( this.keys.ArrowLeft ) { juego.moto2.config.direction = "left"; }
		else if ( this.keys.ArrowRight ){ juego.moto2.config.direction = "right"; }
		else if ( this.keys.w )			{ juego.moto1.config.direction = "up"; }
		else if ( this.keys.s )			{ juego.moto1.config.direction = "down"; }
		else if ( this.keys.a )			{ juego.moto1.config.direction = "left"; }
		else if ( this.keys.d )			{ juego.moto1.config.direction = "right"; }
		else if ( this.keys.p )			{ juego.moto1.config.pause = true; }
		else if ( this.keys.c )			{ juego.moto1.config.pause = false; }			
	}
}

window.onload = function(){
	juego = new Game(800, 500);
	input = new Input();
}