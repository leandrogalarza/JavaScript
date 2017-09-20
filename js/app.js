var calculadora = { // modulo principal
// Variables del objeto

pantalla:document.getElementById("display"), // variable visor
guardar:"0", // captura el numero
numero1:"", // operando 1
numero2:"", // operando 2
iniciar: 1, // inicia para nuevo operando // 1:inicia
decimal: 0, // estado decimal, 0: true
teclaid: "", // variable que representa la tecla oprimida
operador:"", // operador
continuar:0, // variable que permite continuar una operacion a partir de un resultado
solucion:0, // resultado 
continuarIgual:0, // variable que permite volver a oprimir el igual y tomar el resultado como operando1, operandor que estaba asignado y operando2 que estaba asignado 


	init: function(){ // inicia desde aca
		for (var i = 0; i<document.getElementsByClassName("tecla").length;i++){ // recorre la tecla oprimida
			document.getElementsByClassName("tecla")[i].onmousedown = this.efectoAbajo; // Mouse abajo, llama a evento para bajar la tecla
			document.getElementsByClassName("tecla")[i].onmouseup = this.efectoArriba; // Mouse arriba, llama a evento para subir la tecla
			document.getElementsByClassName("tecla")[i].onclick = this.capturaTecla; // Click, captura la tecla oprimida
		}
	},

	efectoAbajo: function(event){ // evento tecla abajo
		this.teclaid = event.target.id; // caputa el id
		document.getElementById(this.teclaid).style= "transform:scale(0.98);" // Estilo que achica el box
	},

	efectoArriba: function(){ // evento tecla arriba
		document.getElementById(this.teclaid).style= "transform:scale(1);" // Estilo que vuelve el box a su estado original
	},

	capturaTecla: function(){
		if (this.teclaid <=9){ // Reconoce si la tecla es un numero
			calculadora.ingresaNumero(this.teclaid); // llama a procedimiento al ser numero
			
		}else if (this.teclaid == "punto"){ // Reconoce si la tecla es punto
			calculadora.numeroDecimal(this.teclaid); // Llama a procedimiento para numeros decimales
			
		}else if (this.teclaid == "dividido" || this.teclaid == "mas" || this.teclaid == "por" || this.teclaid == "menos"){ // Reconoce si la tecla es una operacion
			switch(this.teclaid){ // Selecciona operador segun tecla oprimida
				case "mas": // Oprime tecla +
					this.operador = "+";
				break; 
				case "menos": // Oprime tecla -
					this.operador = "-";
				break;
				case "por": // Oprime tecla *
					this.operador = "*"; 
				break;
				case "dividido": // Oprime tecla /
					this.operador = "/";
				break;
			}
			calculadora.capturaOperador(this.operador); // Llama a la funcion para realizar una operacion
			
		}else if (this.teclaid == "on"){ // Oprime tecla para borrar
			calculadora.teclaOn(); // Llama a evento de borrar pantalla
		}else if (this.teclaid == "sign"){
			calculadora.cambioSigno();
			
		}else if (this.teclaid == "igual"){ // Oprime igual
			calculadora.resolver(); // Llama a evento para resolver
			
		}else if (this.teclaid == "raiz"){ // Oprime raiz cuadrada
			calculadora.raizCuadrada(); // Llama a evento que realiza la operacion de raiz cuadrada

		}
	},

	ingresaNumero: function(digito){ // Capura numero correspondiente a la tecla oprimida
		if (this.pantalla.innerHTML.length < 8){ // Limita a 8 caracteres el numero en pantalla
           	if (this.guardar=="0" || this.iniciar==1){ // Condicional si no hay numero en pantalla y si iniciar esta en true
            	this.pantalla.innerHTML=digito; // Captura el primer digito
            	this.guardar=digito; // almacena en variable guardar primer digito
            } else { // Guardar ya tiene almacenado algo o iniciar esta en false
            	this.pantalla.innerHTML+=digito; // Muestra en pantalla
        	    this.guardar+=digito // Almacena los demas digitos
			}
  		}	  
		this.iniciar=0; // Cambia estado de iniciar 
		this.continuar=0; // cambia el estado de continuar operacion
		this.continuarIgual=0; // cambia el estado de continuar el igual
	},
    
	numeroDecimal: function(){ // funcion para numero decimales
		if (this.pantalla.innerHTML.length < 8){ // Limita los digitos a 8
			if (this.decimal==0 && this.iniciar==1){ // Si variable decimal esta en 0 y el numero es nuevo
				this.pantalla.innerHTML="0."; // Imprime cero coma.
				this.guardar="0."; // guarda el numero
			} else if (this.decimal==0 && this.iniciar==0){ // si decimal esta para incorporar y el numero esta empezado
				this.pantalla.innerHTML+=".";//Concatena lo que habia con la coma
				this.guardar+="."; // Guarda el numero decimal
			}
			this.iniciar=0; // Cambia para continuar el numero
			this.decimal=1; // Desactiva la funcion de incorporar otra coma
		}
	},

	capturaOperador: function(tipooperador){ // Funcion para capturar operador
		this.operador= tipooperador; // Toma la operacion
		this.decimal=0; // permite incorporar decimal ya que se trata de un numero nuevo
			if (this.continuar==0){ // Si la variable esta en 0 almacena en operando1 el numero que tipeamos
			this.numero1=this.guardar; 
			}else{ // Si continuar es distinto a 0 , toma el numero de la pantalla, que es el resultado de la operacion anterior. 
			this.numero1=this.pantalla.innerHTML;	
			}
		this.iniciar=1; // Permite incorporar nuevo nuemero
	    this.pantalla.innerHTML=""; // Pantalla vacia a la espera de nuevo numero
	    this.continuar=0; // Continuar lo devuelve a 0
	    this.continuarIgual=0; // cambia el estado de continuar el igual
	},

	raizCuadrada: function(){ // Funcion raiz cuadrada
		if (this.continuar == 0){ // Si continuar es 0 capta el numero de guardar
			this.numero1=this.guardar;
		} else { //Si continuar NO es 0, lo toma de la pantalla, podria venir de un resultado previo
			this.numero1=this.pantalla.innerHTML;
		};

		this.numero1 = Math.sqrt(this.numero1); // Realiza la operacion de la raiz cuadrada
		
		if (this.numero1.toString().length <= 8){ // Valida hasta 8 caracateres
			this.solucion=Number(this.numero1); // Convierte a numero
			this.pantalla.innerHTML=this.solucion; // Imprime en pantalla
		} else { // El resultado es mayor a 8 caracteres
			if (this.numero1 % 1 != 0) { // Si es decimal
				var posicion = this.numero1.toString().lastIndexOf('.'); // Busca la coma
				this.numero1 = Number(this.numero1); // Convierte a numero
				this.numero1 = this.numero1.toFixed(7-posicion); // Recorta las decimales hasta completar 8 caracteres
				this.solucion = Number(this.numero1); // Convierte a numero
				this.pantalla.innerHTML=this.solucion; // Imprime en pantalla
			}else{ // El resultado es mayor a 8 caracteres pero es entero
				this.pantalla.innerHTML="Err"; // Imprimer Err
	    	}
		};
		this.continuar=1; // Activa la funcion de poder continuar
	},

	teclaOn: function(){ //Tecla ON
		this.guardar="0"; // Almacena 0 en guardar
		this.pantalla.innerHTML=this.guardar; // Imprime el 0
		
	},

	
	cambioSigno: function(){ // Funcion que cambia de signo
		signo=Number(this.pantalla.innerHTML); // Toma de la pantalla el valor y lo convierte en numero
        signo=-signo; // Cambia el signo del numero tomado
        this.guardar=Number(signo); // Almacena en guardar el numero
        this.pantalla.innerHTML=this.guardar; // Imprime
    },

	resolver: function(){ 	//Resolver 
		if (this.continuarIgual ==0 ){ // No hay resultados previos
			this.numero2=this.guardar; // Almacena el operando 2
			this.continuarIgual=1;
		} else { // Con resultado previo almacena el resultado en numero1
			this.numero1=this.solucion;
		}
			solution=this.numero1+this.operador+this.numero2; // Realiza la cadena de la operacion completa
			this.solucion=eval(solution); // Realiza la operancion
			
			if (this.solucion.toString().length <= 8){ // Valida hasta 8 caracteres
				this.pantalla.innerHTML=Number(this.solucion); // Si es menor a 8 imprime resultado
				 
			} else { // Si es mayor a 8 caracteres
				if (this.solucion % 1 != 0) { // Es mayor a 8 caracteres y el resultado es decimal
						var posicion = this.solucion.toString().lastIndexOf('.'); // Busca la posicion de la coma
						this.solucion = Number(this.solucion); // Convierte la solucion en numero
						this.solucion = this.solucion.toFixed(7-posicion); // Recorta los decimales de acuerdo a la posicion de la coma
						this.solucion = Number(this.solucion); // Convierte a numero la solucion
						this.pantalla.innerHTML=this.solucion;	// Imprime
					} else { // El resultado es un numero entero pero mayor a 8 caracteres
						this.pantalla.innerHTML="Err"; // Imprime el error
	    			}
			 	}
			
			this.continuar=1; //Permite continuar si no oprime un numero
	        this.iniciar=1; // Permite iniciar otro numero
	        this.decimal=0; // Permite incorporar una coma
			
	    }
};	
	
calculadora.init();	// Inicia el modulo