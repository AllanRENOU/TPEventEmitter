function EventEmitter(){

	//HashMap[event -> [[fn1, compteur1], [fn2,compeur2], ...]]
	this.callbacks = {};
	
	//Factorie
	if(!(this instanceof EventEmitter)){
		return new EventEmitter();
	}
}

EventEmitter.prototype	=	{
	times:	function(event, num, fn){
				console.log(">> Ajout de l'evenement "+ event);
				//Si l'evenement n'existe pas
				if(!this.callbacks.hasOwnProperty(event) ){
					//On crée une entrée dans le tableau
					this.callbacks[event] = [];
					}
					//On y ajoute un tableau contenant la fonction, et le nombre de fois où on pourra l'executer
					var tabTmp = [];
					tabTmp[0] = fn;
					tabTmp[1] = num;
					(this.callbacks[event]).push(tabTmp);

				return this;
			},
	once:	function(event, fn){
				//On ne peut executer la fonction qu'une fois
				this.times(event, 1, fn);
				return this;
			},
	on:		function(event,	fn){
				//-1 pour pouvoir executer la fonction indéfiniment
				this.times(event, -1, fn);
				return this;
			},
			
	off:	function(event, fn){
				if(event === undefined){
					console.log(">> Suppression de tous les evenements");
					while(this.callbacks.length != 0){
						this.callbacks.pop();
					}
				}else{
					
					if(fn === undefined ){
					
						console.log(">> Suppression de l'ecouteur "+event);

						delete this.callbacks[event];
						
					}else{
					
						console.log(">> Suppression de la fonction "+fn+" de l'ecouteur "+event);
						var index = -1;
						this.callbacks[event].forEach(function(e, i, t){	
													if(e[0] == fn){
														index = i;
													}
												});	
												
						if(index != -1){
							delete this.callbacks[event][index];
						}
					}
				}
				return this;
			},
			
	emit:	function(event){
				
				//On crée un tableau contenant tous les arguments
				var tab = [];
				for(var e in arguments){
					tab.push(arguments[e]);
				}
				//On retire le premier(le nom de l'ecouteur)
				tab.shift();
				
				if(!this.callbacks.hasOwnProperty(event)){
					console.log(">> Aucun ecouteur " + event + " existe");
				}else{
					//Si l'écouteur est enregistré, executer chaque fonction
					(this.callbacks[event]).forEach(function(e, i, t){
												//Si le compteur est différent de 0, on execute la fonction
												if(e[1] != 0){
													console.log(">> Evenement "+event+", fonction n"+i+", compeur : "+e[1]);
													e[0].apply(EventEmitter(), tab);
													
													//On diminue de 1 le compteur
													e[1] = e[1] - 1;
												}
											});
				}
				return this;
				}
};
