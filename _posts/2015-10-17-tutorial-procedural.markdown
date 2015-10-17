---
layout: post
title:  "Procedural Generation para la creación de niveles - Parte I"
date:   2015-10-17 03:55:00
categories:
 - blog
tags:
 - blog
 - spanish
 - tutorial
 - procedural
images:
 - tutorial-procedural/image.png
download-title: Descargas
downloads:
 - info: Primera parte – Reglas Gramáticas para la creación de palabras.
   url: /assets/posts/tutorial-procedural/Procedural Generation - Primera Parte.pdf
   icon: pdf.png
 - info: Projecto Java probando diferentes técnicas para la creación de nombres
   url: /assets/posts/tutorial-procedural/NameGeneration.zip
   icon: download.png
comments: true
---

En esta primera parte explico como llegué a conocer la temática de la creación de palabras a partir de reglas gramáticas y cómo se pueden utilizar en el desarrollo de videojuegos para la creación “infinita” de nombres de personajes, lugares, etc.

<!--more-->

<p class="h2 text-center" style="padding-top: 64px; padding-bottom: 64px;">
	Procedural Generation<br>
	para la creación de niveles
</p>

<p class="h3 text-left">
	Primera parte – Reglas Gramáticas para la creación de palabras.
</p>

<br>

<div class="well">
	<div class="row">
		<div class="col-xs-3">
			<img class="img-responsive img-thumbnail" src="/assets/posts/tutorial-procedural/imgs/1.png">
		</div>
		<div class="col-xs-6">
			<img class="img-responsive img-thumbnail" src="/assets/posts/tutorial-procedural/imgs/2.png">
		</div>
		<div class="col-xs-3">
			<img class="img-responsive img-thumbnail" src="/assets/posts/tutorial-procedural/imgs/3.png">
		</div>
	</div>
</div>

<p class="text-justify">Hace unos años me surgió la idea de escribir historias y relatos fantásticos. Escribí un par de cuentos cortos con personajes como magos, brujos, guerreros de tierras lejanas, etc. Pasado un tiempo me propuse juntar estos relatos bajo un solo universo. Así nació “Anmer”, un continente con una historia muy rica y extensa, llena de bestias y personajes buenos y malos. Escribí la idea general para las diferentes épocas de “Anmer” (etapas temporales del continente en donde iban a encajar los relatos que ya había escrito).</p>

<br>
<p><strong class="text-warning">Pero, ¿qué tiene que ver esto con la creación de niveles usando algoritmos procedurales?</strong></p>
<br>


<div class="row text-justify">
	<div class="col-sm-3 col-md-4">
		<div class="thumbnail">
			<img class="img-responsive img-thumbnail" src="/assets/posts/tutorial-procedural/imgs/3.1.png">
		</div>
	</div>
	<div class="col-sm-9 col-md-8">
		<p>Bueno, como venía diciendo empecé con la creación de un universo que encapsulara todos los relatos. Para esto fue necesario diseñar (en mi cabeza) el concepto general de este mundo. Fui respondiendo a preguntas como: qué tamaño tiene, qué tan antiguo es, qué personajes habitan allí, cuál es la historia general de esta tierra, etc. Tenía mas o menos todo resuelto, pero había algo que me picaba la curiosidad: ¿qué <mark>lenguas</mark> hablaban en “Anmer”?<br>
		<br>
		Me vino a la mente la idea de Tolkien, que usó sus propios lenguajes como marco para todas su obras. Las historias aparecían después de la lengua, y no al revés. Muchas veces inventaba las palabras para los nombres y lugares y luego a partir de su significado le descubría su lugar en la historia. Yo nunca había inventado ningún lenguaje, mucho menos sabía como empezar a crear uno.<br>
		<br>
		Google! En internet existe material para todo, si sabés cómo buscar.</p>

		<p>Investigué un tiempo sobre la creación de lenguajes artificiales <mark>“Conlangs”</mark>. Aprendí mucho sobre cómo funcionan las lenguas en general y no solo mi propia lengua materna (español). Cuando creí haber juntado un mínimo de información sobre la creación de los lenguajes artificiales me tiré de lleno a la idea.<br></p>
	</div>
</div>

<br>

<div class="row text-justify">
	<div class="col-sm-9 col-md-8">
		<p>Primero cree una forma escrita para la lengua: un alfabeto de pocos símbolos que me servía para escribir en español e inglés (y con suerte también en la lengua que quería crear). Comencé a experimentar con diferentes sonidos y creé un par de palabras, ajustando al mismo tiempo la pronunciación y la forma escrita.<br></p>
		<p>En ese momento se me ocurrió la idea de <mark>automatizar</mark> la creación de nuevas palabras, nombres y frases. Como me gusta programar pensé que se podía hacer algo para obtener 1000 palabras con un solo click.</p>
		<p>Me encontré con que esto ya se había hecho antes, y muchas veces. En internet hay docenas de sitios que permiten generar nombres aleatoriamente, entre ellos <a href="http://fantasynamegenerators.com/">http://fantasynamegenerators.com/</a> (generador de nombres fácil de usar), <a href="http://klh.karinoyo.com/generate/words/">http://klh.karinoyo.com/generate/words/</a> (generador de palabras utilizando reglas gramaticales)</p>

		<p> Investigando un poco más me topé con un sitio que explicaba como se realizaban estos generadores supuestamente “aleatorios” de nombres.
		Probé varias formas para generar texto “aleatorio”, entre ellas las <a href="https://es.wikipedia.org/wiki/Cadena_de_M%C3%A1rkov">Cadenas de Markov</a> fueron las más interesantes. Pero lo que me terminó interesando más fue el concepto de grámaticas. 
		Este es un concepto muy parecido a lo que se utiliza en lenguajes de programación para la verificación de la sintaxis y semántica, aunque no lo sabía en ese entonces.</p>
	</div>
	<div class="col-xs-3">
		<div class="thumbnail">
			<img class="img-responsive img-thumbnail" src="/assets/posts/tutorial-procedural/imgs/3.2.png">
		</div>
	</div>
	<div class="col-xs-3">
		<div class="thumbnail">
			<img class="img-responsive img-thumbnail" src="/assets/posts/tutorial-procedural/imgs/3.3.png">
		</div>
	</div>
</div>

<br>

<p class="h2">Gramáticas</p>

<p>La idea es crear las palabras o el texto de acuerdo a un conjunto predeterminado de reglas. Las palabras son el resultado de la combinación de estas reglas. Por ejemplo, para generar un nombre corto podríamos tener estas reglas:</p>

<div class="well">
	<code>[NOMBRE]</code> = [C][V][C][V][C]<br>
	<code>[C]</code> = v | c | d | r | t <br>
	<code>[V]</code> = a | e | i | o <br>
</div>

<p>En este esquema tenemos 3 reglas: regla principal (<code>NOMBRE</code>), consonantes (<code>C</code>) y vocales (<code>V</code>)</p>
<p>
	<ul>
		<li>La regla <code>NOMBRE</code> está definida en función de otras reglas de tipo <code>C</code> y <code>V</code>.</li>
		<li>Las reglas <code>C</code> y <code>V</code> no utilizan otras reglas, pero tienen asignados todos los posibles valores que podrían tomar, en este caso <code>C</code> solo podría ser una de las letras: v, c, d, r, t; y <code>V</code> puede tomar valores: a, e, i, o. El valor que toma <code>C</code> y <code>V</code> se decide aleatoriamente de acuerdo a los posibles valores.</li>
	</ul>
	<span class="text-muted">Notar que el símbolo | (pipe) se utiliza para representar una alternativa entre las diferentes opciones.</span>
</p>

<p>
	Para generar un nuevo nombre entonces utilizamos este esquema simple con nuestras tres reglas:
	<ul style="list-style-type: decimal;">
		<li>Primero se elige una regla para comenzar (en nuestro caso es la regla <code>NOMBRE</code>) y se evalúa y resuelve recursivamente.</li>
		<li>Evaluamos el primer elemento de la regla <code>NOMBRE</code> , que es <code>[C]</code>. <br>
			C es también es una regla, por lo tanto la resolvemos. Sabemos que <code>C</code> solo puede tomar uno de los valores indicados (v, c, d, r, t) así que elegimos uno al azar: este es el primer carácter de nuestro nombre.</li>
		<li>Si seguimos así con los demás elementos de la regla <code>NOMBRE</code> completamos toda la palabra.</li>
	</ul>
	<p>Posibles resoluciones para la regla NOMBRE: “Roder”, “Darod”, “Vader”, etc.</p>
</p>

<br>

<p>Este es un ejemplo muy simple, pero la generación de palabras utilizando esta técnica puede hacerse mucho más compleja y con resultados mucho más interesantes ampliando la cantidad de reglas, combinando diferentes reglas entre sí o incluso jugando con la probabilidad para la toma de los valores finales.</p>

<p>Podríamos tener un nombre más complejo utilizando otro esquema de reglas:</p>
<div class="well">
	<code>[NOMBRE]</code> = [C | V] [V] [C][FIN] <BR>
	<code>[FIN]</code> = [FIN-MUJER] | [FIN-HOMBRE (2)] <BR>
	<code>[FIN-MUJER]</code> = al | ia | ela <BR>
	<code>[FIN-HOMBRE]</code> = oir | al | il <BR>
	<code>[C]</code> = r | l | t | d | m | s <BR>
	<code>[V]</code> = a | i | y | hu | o <BR>
</div>
<p>Posibles nombres generados a partir de este esquema: “Raloir”, “Dytela”, “Huilia”, etc.</p>
<p class="text-muted">Notar que en este caso el primer elemento del nombre puede ser una consonante o una vocal. Además agregamos una terminación para diferenciar entre nombres masculinos y femeninos.<br>
Existe además doble chance de que la terminación sea para un hombre.</p>

<br>

<div class="row">
	<div class="col-xs-12">
		<img class="img-responsive img-thumbnail center-block" src="/assets/posts/tutorial-procedural/imgs/4.png">
	</div>
</div>

<br>

<p>Todo esto es muy lindo y tiene miles de usos para la generación de nombres de personajes y lugares, pero ¿cómo lo implementamos? Después de todo si queremos utilizarlo en nuestro juego vamos a necesitar informatizarlo de algún modo.</p>

<p>En mi caso realicé un programa en <mark>Java</mark> que me permitiera utilizar estas reglas. <br>
Los esquemas de reglas estaban escritos dentro de archivos de texto. Estos archivos los cargaba en mi programa: utilizando <a href="https://en.wikipedia.org/wiki/Regular_expression">expresiones regulares</a> se identificaban las reglas y los operandos. Luego se evaluaban las reglas N cantidad de veces para obtener la lista de palabras finales.</p>

<p>Esto funcionó extremadamente bien, pero por desgracia las palabras generadas por el programa no me terminaron de convencer como para incluirlas en mi lenguaje.</p>

<p><strong>Pero para incluirlas en mi videojuego no estaban nada mal!</strong> Ahora podía tener un personaje diferente en cada partida y los mapas presentaban nombres diferentes para cada jugador. Utilizando esta técnica junto con otras más se puede conseguir un nivel de aleatoridad que le da mucha rejugabilidad a nuestro juego.</p>

<br>

<div class="row">
	<div class="col-xs-4"><img class="img-responsive img-thumbnail center-block" src="/assets/posts/tutorial-procedural/imgs/5.png"></div>
	<div class="col-xs-4"><img class="img-responsive img-thumbnail center-block" src="/assets/posts/tutorial-procedural/imgs/8.png"></div>
	<div class="col-xs-4"><img class="img-responsive img-thumbnail center-block" src="/assets/posts/tutorial-procedural/imgs/7.png"></div>
</div>
<div class="row">
	<div class="col-xs-6"><img class="img-responsive img-thumbnail center-block" src="/assets/posts/tutorial-procedural/imgs/6.png"></div>
	<div class="col-xs-6"><img class="img-responsive img-thumbnail center-block" src="/assets/posts/tutorial-procedural/imgs/9.png"></div>
</div>

<br>

<p>Bueno esto fue todo por ahora. Si quieren probar el generador de nombres que hice en Java pueden hacer <a href="http://fede0d.github.io/assets/posts/tutorial-procedural/NameGeneration.zip">clic aquí</a> para descargar el proyecto.
Pueden probar todas las técnicas que usé para generar nombres, desde cadenas de Markov hasta Reglas Gramáticas.</p>

<p>En la segunda parte explicaré como aplicar este concepto de gramáticas para generar no solo palabras sino cualquier tipo de contenido dentro de nuestro juego.
Además pondremos a prueba todo esto implementando un generador de niveles dentro del motor Godot Engine.</p>

<div class="row">
	<div class="col-xs-4"></div>
	<div class="col-xs-4"><img class="img-responsive center-block" src="/assets/posts/tutorial-procedural/imgs/10.png"></div>
	<div class="col-xs-4"></div>
</div>

<br>

<p>Saludos, y hasta la próxima.</p>

<br>