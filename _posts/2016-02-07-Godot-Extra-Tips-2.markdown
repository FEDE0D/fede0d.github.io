---
layout: post
title:  "Godot Extra Tips #2: Scene Transitions"
date:   2016-02-07 20:10:32
categories:
 - blog
tags:
 - godot
 - tutorial
 - transition
comments: true
images:
 - "tip2/thumbnail.png"
download-title: "Download the sample project"
downloads:
 - info: "Download the project for Godot Engine from GitHub"
   url: "https://github.com/FEDE0D/godot-extra-tips/tree/master/2"
   icon: "github.png" 
---

<div style="text-align:center;">
	<h2>Godot Extra Tip #2</h2>
	<h3>Scene Transitions</h3>
</div>
<!--more-->

<br>

<div style="text-align: center;">
	<img src="/assets/posts/tip2/thumbnail.png" class="img-responsive img-thumbnail"/>
</div>

<br><br>
<p>
	Hello Godot users! This time I'm gonna talk a bit about scene transitions in Godot Engine.<br>
	You can take a look at <a href="#final_result">the final result here</a>.<br>
	<br>
	Every game has to change from one screen to another at some point. When we make games we can have several screens for different purposes: main menu, options screen, the main game screen, credits, etc.<br>
	In Godot these screens are implemented using <strong>scenes</strong>. Scenes a collection of nodes that can be instanciated at any point and can be added to the main tree of nodes on our game, and these scenes are saved in a <strong>.scn</strong> file somewhere on the project directory.<br>
	When we want to switch to another scene we can make use of the <code>change_scene</code> method in the <code>SceneTree</code> class.<br>
	<br>
	Something like this:<br>
	<div class="well">
		# using a string as a path<br>
		<code>get_tree().change_scene("res://path/to/scene.scn")</code><br>
		<br>
		# using a preloaded PackedScene<br>
		<code>var packed_scene = load("res://path/to/scene.scn")<br>
		get_tree().change_scene_to(packed_scene)</code>
	</div>
</p>

<p>
	How does it work? When we call <code>change_scene()</code> the engine frees the hierarchy of nodes of the current scene from the main node tree, and then it loads the new scene into the game tree. This change can take some time if the scene you're loading is big or contains a lot of nodes and can be very noticeable if we have a change of music or graphics between scenes.
</p>

<p>
	What can we do? There are some things we can do to hide to the player the fact that the new scene is loading.<br>
	If we want to have the music play smoothly while the scene is switched we can use a singleton node as I explain <a href="/blog/2015/10/18/tutorial-singleton-music.html">on this tutorial</a>.<br>
	But there's something else we can do that is easy and it adds a lot of personality to our game.
</p>

<br>
<h2>Transitions!</h2>
<p>
	In Godot we can make very simple but effective screen transitions using the <code>AnimationPlayer</code> node. We can create an animation that functions as a transition between scenes. For example we can create a fadeIn-fadeOut transition using nothing but an <code>AnimationPlayer</code> and a <code>TextureFrame</code> node. Or even better, we can use a bunch of <code>Sprite</code> nodes and make the transition a little more fun by adding character sprites or game assets on the mix.
</p>

<p>
	In this tutorial we're going to do a very simple fadeIn/fadeOut transition. On top of that we're going to add a feathered heart, because why not?<br>
	Here's the sprites we'll be using:
	<div style="text-align: left;">
		<img src="/assets/posts/tip2/heart.png" class="img-responsive img-thumbnail" style="max-width: 128px;"/>
		<i>A feathered heart</i>
		<br>
		<br>
		<img src="/assets/posts/tip2/white.png" class="img-responsive img-thumbnail" style="max-width: 128px; min-width: 64px;"/>
		<i>A white square</i>
	</div>
</p>

<h2>Let's do it!</h2>

<p>
	1. Create a new project. Change the screen size to 800x600.
</p>
<p>
	2. Now we're going to create two scenes (sceneA.scn &amp; sceneB.scn). I've added some text to make them different and buttons to change from one to another.
	<div class="row">
		<div class="col-md-6">
			<img src="/assets/posts/tip2/2A.png" class="img-responsive img-thumbnail"/>
		</div>
		<div class="col-md-6">
			<img src="/assets/posts/tip2/2B.png" class="img-responsive img-thumbnail"/>
		</div>
	</div>
</p>
<p>
	3. Now we're going to creating the Transition scene. For this we'll use an <a href="/blog/2015/10/18/tutorial-singleton-music.html">Autoload</a> to have only one instance of the Transition scene on our game at all times. <br>
	Create a new scene. Use a <code>CanvasLayer</code> as the root node for the scene. Change the CanvasLayer layer property to something bigger than 1 and save it as <i>Transition.scn</i>. The layer property tells Godot in which order the nodes should be rendered, in this case we want to draw the Transition on top of everything else.
</p>

<p>
	4. Go the Project Settings and create the autoload for this scene. Make sure the <strong>singleton</strong> option is checked. This is new to the 2.0 version of Godot, if you don't use this version you can obtain the reference to the singleton using <code>Globals</code> or the old-school way <code>get_node("/root/Transition")</code>. On this version of Godot if you activate the <strong>singleton</strong> option you can use the name of the autoload directly from any script to get access to the autoloaded node, like this:<br>
	<div class="well">
		<code>Transition.do_something()</code>
		# where "Transition" is the name you assign to the node in the Autoload options tab.
	</div>
</p>

<p>
	5. Now that we have our Transition singleton we're going back to the scenes A &amp; B and add some behaviour to the buttons. Connect the <code>pressed</code> signal for the buttons to a function somewhere and add this code on each one:
	<div class="well">
		# on scene A<br>
		<code>func _on_Button_pressed():</code><br>
		<code>&nbsp;&nbsp;Transition.fade_to("res://sceneB.scn")</code>
		<br>
		<br>
		# on scene B<br>
		<code>func _on_Button_pressed():</code><br>
		<code>&nbsp;&nbsp;Transition.fade_to("res://sceneA.scn")</code>
	</div>
</p>
<p>
	What this will do is just call our <code>fade_to</code> function when we press the button. We just use "<strong>Transition</strong>" to get the reference to the singleton and then we call the function <code>fade_to</code>, and we pass the path to the scene we want to switch to.<br>
	Now, let's implement this function.
</p>

<p>
	6. Go back to the Transition scene and add a script to the root node. In this script we're going to add the <strong>fade_to</strong> function.<br>
	<div class="well">
		<pre>extends CanvasLayer

# STORE THE SCENE PATH
var path = ""


# PUBLIC FUNCTION. CALLED WHENEVER YOU WANT TO CHANGE SCENE
func fade_to(scn_path):
	self.path = scn_path # store the scene path
	get_node("AnimationPlayer").play("fade") # play the transition animation

# PRIVATE FUNCTION. CALLED AT THE MIDDLE OF THE TRANSITION ANIMATION
func change_scene():
	if path != "":
		get_tree().change_scene(path)
		</pre>
	</div>
</p>

<p>
	The code it's pretty easy to understand. The <code>fade_to</code> function just stores the scene_path argument for later use, and then it plays the fade animation. At the middle of the animation the <code>AnimationPlayer</code> will call the <code>change_scene()</code> function, effectively switching the scene. After the scene is switched the player continues playing the rest of the animation. 
</p>

<p>
	8. All we have to do now is just create the <strong>fade</strong> animation and we're good to go!<br>
	For this we'll add a <code>TextureFrame</code> node that takes up the whole screen size. Just set it's texture to the <strong>white square</strong> texture I've listed above, set it's extend property to true and set it's anchor to <code>Full Rect</code>.<br>
	Check this video tutorial I've made about <a href="https://www.youtube.com/watch?v=V-2CgHkBl7w">responsive UI</a> if you don't know what I'm talking about.
</p>
<p>
	All the animation do is animate the <strong>modulate</strong> property, changing the alpha value to make the fade in &amp; out effect.<br>
	Set the animation duration to 2 seconds. Add an <code>animation key</code> at 0, 1 and 2 second time with the alpha value at 0, 255 and 0 respectively.<br>
	You will end up with something like this:
	<div style="text-align: center;">
		<img src="/assets/posts/tip2/8A.png" class="img-responsive img-thumbnail"/>
	</div>
</p>

<p>
	9. Now the final part. We need to call the <code>change_scene()</code> function at the middle of the animation. We do this by adding a <strong>call function track</strong> to the animation. The <strong>function track</strong> works like the other tracks except instead of animating properties like color or position, it makes calls to a function of a certain node.<br><br>
	Add a new <code>function track</code> pressing on the <strong>big plus icon</strong> at the bottom of the animation panel. Click on <i>Add Call Func Track</i>. It will open a new window asking for a node where to make the calls to. Select the <strong>root node</strong> (the <code>CanvasLayer</code> node) and press <i>OK</i>.<br><br>
	<div style="text-align: center;">
		<img src="/assets/posts/tip2/8B.png" class="img-responsive img-thumbnail"/>
	</div>
	<br>
	Now move the animation timeline to the 1 second mark and add a new animation key to the call function track. You can do this by pressing on the <strong>little green plus icon</strong> at the right end of the track. A new animation key will appear on the timeline.<br><br>
	Press <kbd>CONTROL + LEFT CLICK</kbd> on the animation key to open the key editor. In the editor change the <code>name</code> property to "<strong>change_scene</strong>" (the name of the function we want to call).<br><br>
	That's it! Now the function will be called at exactly the middle of the animation.<br>
</p>

<h2 id="final_result">Final Result</h2>
<p>Here's how the transition looks like:</p>
<a id="a_load" href="javascript:void(0);" onclick="load_demo()"><strong>Show demo</strong></a>
<br>

<div id="embed" class="embed-responsive embed-responsive-4by3"> </div>
<script type="text/javascript">
	function load_demo(){
		var iframe = document.createElement("iframe");
		iframe.setAttribute("src", "/assets/posts/tip2/html/index.html");
		document.getElementById("embed").appendChild(iframe);
		document.getElementById("a_load").innerHTML="";
	}
</script>
<br>
<br>
<br>
<br>