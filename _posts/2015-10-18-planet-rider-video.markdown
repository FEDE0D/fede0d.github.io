---
layout: post
title:  "Planet Rider: Procedural Generation in-game"
date:   2015-10-18 19:57:00
categories:
 - blog
tags:
 - game
 - godot
 - procedural
videos:
 - https://www.youtube.com/embed/DV1NsEfFzc4
comments: true
---

Este es un avance de la implementación que hablaba en el <a href="/blog/2015/10/17/tutorial-procedural.html">post anterior</a> sobre generación de niveles a partir de reglas gramáticas.

<!--more-->

{% include post_videos.html %}

<p>Estas son las reglas usadas para la generación de niveles que se ven en el video:</p>

<div class="well">
	# Regla principal<br>
	<code>&lt;LEVEL&gt;</code> = &lt;B_START&gt; &lt;LEVEL_MIDDLE&gt; &lt;B_END&gt;<br>
	<br>
	# Bloques atomicos<br>
	<code>&lt;B_START&gt;</code> = "block_first"<br>
	<code>&lt;B_END&gt;</code> = "block_last"<br>
	<code>&lt;B_DOWN&gt;</code> = "block_downhill"<br>
	<code>&lt;B_UP&gt;</code> = "block_uphill"<br>
	<code>&lt;B_LAKE&gt;</code> = "block_lake"<br>
	<code>&lt;B_DOWN_LAKE&gt;</code> = "block_downhill_lake"<br>
	<code>&lt;B_UP_LAKE&gt;</code> = "block_uphill_lake"<br>
	<code>&lt;B_PLANE&gt;</code> = "block_plane"<br>
	<br>
	# Reglas secundarias<br>
	<code>&lt;LEVEL_MIDDLE&gt;</code> = &lt;UP_DOWN&gt; &lt;PLANE&gt; &lt;UP_DOWN&gt; &lt;PLANE&gt; &lt;LAKE_AREA&gt; &lt;UP_DOWN&gt; | &lt;UP_DOWN&gt; &lt;PLANE&gt; &lt;UP_DOWN&gt; &lt;PLANE&gt; &lt;LAKE_AREA&gt; &lt;UP_DOWN&gt; &lt;LEVEL_MIDDLE&gt;<br>
	<br>
	<code>&lt;UP_DOWN&gt;</code> = &lt;UP&gt; | &lt;DOWN&gt;<br>
	<code>&lt;UP&gt;</code> = &lt;UP&gt; &lt;B_UP&gt; | &lt;B_UP&gt;<br>
	<code>&lt;DOWN&gt;</code> = &lt;DOWN&gt; &lt;B_DOWN&gt; | &lt;B_DOWN&gt;<br>
	<code>&lt;PLANE&gt;</code> = &lt;PLANE&gt; &lt;B_PLANE&gt; | &lt;B_PLANE&gt;<br>
	<code>&lt;LAKE_AREA&gt;</code> = &lt;B_DOWN_LAKE&gt; &lt;LAKE&gt; &lt;B_UP_LAKE&gt;<br>
	<code>&lt;LAKE&gt;</code> = &lt;LAKE&gt; &lt;B_LAKE&gt; | &lt;B_LAKE&gt;<br>
</div>
