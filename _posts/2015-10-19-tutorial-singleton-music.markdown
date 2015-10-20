---
layout: post
title:  "Tutorial: Singleton Music Node in Godot Engine"
date:   2015-10-18 19:57:00
categories:
 - blog
tags:
 - godot
 - tutorial
images:
 - "tutorial-singleton-music/thumbnail.png"
downloads:
 - info : "Download the sample project on GitHub"
   url: "https://github.com/FEDE0D/tutorials/tree/master/singleton-music"
   icon: github.png
comments: true
---

<p>In this tutorial we're going to use the Autoload functionality in Godot Engine to play music on the background without cuts between scene changes.</p>

<!--more-->

<h2>Autoloaded Scenes</h2>

<p>Godot Engine has a functionality for creating Autoloaded Singleton scenes. That means you can tell Godot to load a scene automatically and only once, when the game is loading. That scene will remain on the SceneTree of the game even when switching between scenes.</p>
<p>We will use this to have a single stream of music playing on the background of every scene of our game. </p>

<p><strong>You can check the official tutorial on Singleton Scenes <a href="https://github.com/okamstudio/godot/wiki/tutorial_singletons">on the Godot Wiki.</a></strong></p>

<h2>How to do it</h2>

<p>
	<ul style="list-style: decimal;">
		<li>Create a new scene on your project. This will be our autoloaded scene</li>
		<li>Add a <code>StreamPlayer</code> as the root of the scene.</li>
		<li>On the <code>StreamPlayer</code> properties, click on <strong>Stream > Load</strong> and load the music file.<br>
			Don't forget to check the <code>Loop</code> and <code>Autoplay</code> checkboxes. This will autoplay the music on loop when the scene is loaded.
		</li>
		<li>Now go to the Autoload panel. Click on the menu <strong>Scene > Project Settings</strong> and go to the <strong>Autoload</strong> tab</li>
		<li>To create a new autoloaded scene enter the name the node and then click on the <kbd>..</kbd> button to choose the scene you want to load.
			<p>
			<div class="row">
				<div class="col-xs-2"></div>
				<div class="col-xs-8"><img class="img-thumbnail img-responsive" src="/assets/posts/tutorial-singleton-music/autoload.png"></div>
				<div class="col-xs-2"></div>
			</div>
			</p>
		</li>
		<li>Finally click on the <kbd>Add</kbd> button to add the autoload.</li>
	</ul>
</p>

<p>That's it! Now we have the music playing on the background even if we switch between scenes.</p>

<br>

<p>Let's take a look at the scene tree of the game while is running:</p>
<div class="row">
	<div class="col-xs-6"><img class="img-thumbnail img-responsive" src="/assets/posts/tutorial-singleton-music/tree_a.png"></div>
	<div class="col-xs-6"><img class="img-thumbnail img-responsive" src="/assets/posts/tutorial-singleton-music/tree_b.png"></div>
</div>
<br>
<p>In this example we have first the "scene A" and then we switched to "scene B". Notice how the MusicPlayer scene remains loaded even when we switch scenes.<br>
<span class="text-info bg-info">If you want to inspect the scene tree of you game go to the scrips view and then <strong>Debug > Show debugger</strong> (altough it should be opened automatically when the game is running). Then go to the <strong>Info</strong> tab and click on the <strong>refresh</strong> icon.</span>
</p>

<hr>

<p>That's all for now. If you found this tutorial hard to follow or if you are just curious I will leave an example project in the download section below.</p>
<p>Bye!</p>
	
