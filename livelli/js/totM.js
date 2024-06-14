	var c=0,cj=13,ci=59; //contatore immagini
	var primo=false;	
	var contaMonete=0;//conta le monete raccolte
	var coin='immagini/soldo.gif';
	var moneta = ["immagini/soldo1.png", "immagini/soldo2.png", "immagini/soldo3.png", "immagini/soldo4.png", "immagini/soldo5.png", "immagini/soldo6.png", "simmagini/oldo7.png", "immagini/soldo8.png"]; 
	function place() 
	{		
		
		
		//crea il campo
		for(var i=0;i<60;i++)
		{
			for(var j=0;j<13;j++)
			{
				tile=matrice[i][j];
				if(tile === 1)
				{
					var x = j*box;
					var y = i*box;
					ctx.fillStyle = col;
					ctx.fillRect(x,y,box,box);
				}
				if(tile === 0)
				{
					var x = j*box;
					var y = i*box;
					ctx.fillStyle = "black";
					ctx.fillRect(x,y,box,box);
				}
				if(tile === 4)
				{
					var x = j*box;
					var y = i*box;
					ctx.fillStyle = "black";
					ctx.fillRect(x,y,box,box);
					ctx.fillStyle = bor;
					ctx.fillRect(x+8,y+8,box/2,box/2);
					ctx.fillStyle = "black";
					ctx.fillRect(x+11.50,y+11.50,8,8);
				}
				if(tile === 3)
				{
					var x = j*box;
					var y = i*box;
					ctx.fillStyle = "black";
					ctx.fillRect(x,y,box,box);
				}
				if(tile === 2)
				{
					var x = j*box;
					var y = i*box;
					ctx.fillStyle = "red";
					ctx.fillRect(x,y,box,box);
				}
				
			}
		}
		
		var cor="";
		var co=document.getElementById("tabella");
		code="<table id='punti'>";				
		code=code+"<tr><td>Punti</td></tr>";		
		code=code+"<tr><td>"+contaMonete+"</td></tr>";		
		code=code+"</table>";
		co.innerHTML=code;
		
		$(document).ready(function(){		//border color with jquery
			var bo=bor+" 12px solid"
			$("#gc").css({"border": bo/*"12px solid orange"*/});
			bo=bor+" 6px solid";
			$("#punti").css({"border": bo,"color":"yellow"});
			$("td").css({"border": bo});
		});
		
		ctx.fillStyle = "green";
		ctx.fillRect(px*box,py*box,box,box);
		var c=0;
	}
		
	function giraMonete(){
		c++;
		if(c==6)c=0;

		for(var i=0;i<60;i++)
		{
			for(var j=0;j<31;j++)
			{
				tile=matrice[i][j];
				if(tile === 3)
				{
					var x = j*box;
					var y = i*box;
					ctx.fillStyle = "black";
					ctx.fillRect(x,y,box,box);
					var img=new Image;
					img.src = moneta[c];
					ctx.drawImage(img,x+9,y+9,box/2.5,box/2.5);
				}
			}
		}
	}
	
	function erase()
	{
		ctx.fillStyle = "black";
		ctx.fillRect(px*box,py*box,box,box);
		
		var cor="";
		var co=document.getElementById("tabella");
		code="<table id='punti'>";				
		code=code+"<tr><td>Punti</td></tr>";		
		code=code+"<tr><td>"+contaMonete+"</td></tr>";		
		code=code+"</table>";
		co.innerHTML=code;
		
	}
	function draw(){
		$(document).bind('keydown', 'return', function(e) { //capisce quale tasto si preme
			switch(e.which)
			{
				case 87: erase();
				su(matrice);//su
					break;
				case 68: erase();
				destra(matrice);//dx
					break;
				case 65: erase();
				sinistra(matrice);//sx
					break;
				case 83: erase();
				giu(matrice);//giu
					break;
			}
			if(primo==false)
			{
				var timer = setInterval(function(){ coloraCampo(); }, 21);
				primo=true;
			}
			bo=bor+" 6px solid";
			$("#punti").css({"border": bo,"color":col});
			$("td").css({"border": bo});
			
		});
	}
	function move(g) {
		if(g>30)
		{
		 $('body,html').animate({scrollTop: 20*box}, 600); 
		}
		else
		{
			if(g>16)
			{
			$('body,html').animate({scrollTop: 6*box}, 400);
			}
			else
			{
				$('body,html').animate({scrollTop: 0}, 300);
			}
					
		}
	}
	function giu(matrice)
		{
			var g=py;
			while(matrice[g][px]!=1){
				if(matrice[g][px]==3)prendi1(g,px);
				if(matrice[g][px]==4){
					teleport();
				}
				
				g++;
				if(morte1(g,px))break;
			}
			g=g-1;
			
			
			py=g;
			ctx.fillStyle="green";
			ctx.fillRect(px*box,py*box,box,box);
		}
	
	function su(matrice)
		{
			var g=py;
			
			while(matrice[g][px]!=1)
				{
					if(matrice[g][px]==3)prendi1(g,px);
					if(matrice[g][px]==4){
						teleport();
					}
					if(g==40||g==25||g==15)move(g);
					g--;	
					if(morte1(g,px))break;
				}
			g=g+1;
			py=g;
			ctx.fillStyle="green";
			ctx.fillRect(px*box,py*box,box,box);
			
		}
	
	function destra(matrice)
		{	
			var g=px;
			while(matrice[py][g]!=1){
				if(matrice[py][g]==3)prendi2(py,g);
				if(matrice[py][g]==4){
					teleport();
				}
				g++;
				if(morte2(py,g))break;
			}
			g=g-1;
			px=g;
			ctx.fillStyle="green";
			ctx.fillRect(px*box,py*box,box,box);
		}
		
	function sinistra(matrice)
		{
			var g=px;
			while(matrice[py][g]!=1){
				if(matrice[py][g]==3)prendi2(py,g);
				if(matrice[py][g]==4){
					teleport();
				}
				g--;
				if(morte2(py,g))break;
			}
			g=g+1;
			px=g;
			ctx.fillStyle="green";
			ctx.fillRect(px*box,py*box,box,box);
		}
	
	function prendi1(g,px)
	{
		matrice[g][px]=0;
		contaMonete++;
		ctx.fillStyle="black";
		ctx.fillRect(px*box,g*box,box,box);
	}
	function prendi2(py,g)
	{
		matrice[py][g]=0;
		contaMonete++;
		ctx.fillStyle="black";
		ctx.fillRect(g*box,py*box,box,box);
	}
	function morte1(g,px){ //controlla la morte
		var a=false;
		if(matrice[g][px]==2){
		setTimeout(function(){$("body").html("<div id='finale'>SEI MORTO<p class='morte' onclick=location.reload()>RESTART</p></div>");}, 150);
			a=true;
		}
		return a;
	}
	function morte2(py,g){ //controlla la morte
		var a=false;
		if(matrice[py][g]==2){
		setTimeout(function(){$("body").html("<div id='finale'>SEI MORTO<p class='morte' onclick=location.reload()>RESTART</p></div>");}, 150);
			a=true;
		}
		return a;
	}
	
	function coloraCampo(){ //colora il campo gradualmente
		cj--;
		if(cj==-1){
			
			ci--;
			cj=12;
			
		}
		matrice[ci][cj]=2;
			cambioColore(ci,cj);
		if(ci==py && cj==px){
			morte2(ci,cj);
		}			
	}
	
	function cambioColore(ci,cj) 
	{				
		//modifica il campo
		var x = cj*box;
		var y = ci*box;
		ctx.fillStyle = "red";
		ctx.fillRect(x,y,box*13,box);
	}
	
	