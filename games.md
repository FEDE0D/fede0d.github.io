---
layout: main
permalink: /games/
---

<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-post">
				<div class="panel-body">
					<p>These are all the games that have been released.<br />
					You will find some desktop games for <strong>Windows</strong>, <strong>GNU/Linux</strong> &amp; <strong>MacOS</strong> and also mobile games for <strong>Android</strong> phones and tablets.</p>
				</div>
				<div class="panel-footer">				
					All the games listed here are <strong>FREE</strong> to download! So give them a try!
				</div>
			</div>
		</div>
	</div>
</div>
<div class="row">
	
	{% assign game_posts = ''|split:',' %}
	
	{% for post in site.posts %}
	{% if post.categories contains "game" %}
		{% assign game_posts = game_posts | push: post %}
	{% endif %}
	{% endfor %}
	
	{% for i in (0..2) %}
		<div class="col-sm-4">
			{% for post in game_posts %}
			{% assign j = forloop.index | modulo: 3 %}
			{% if j == i %}
				<div class="panel panel-post">
					<div class="panel-heading">
						<a href="{{post.url}}">{{post.title}}</a>
						<a href="{{post.url}}" target="_blank" title="Open in new tab" class="pull-right"><span class="glyphicon glyphicon-share-alt"> </span></a>
					</div>
					<div class="panel-body">
						{% if post.videos.size > 0 %}
							<a href="{{post.url}}">
								<div class="embed-responsive embed-responsive-16by9">
									<iframe class="embed-responsive-item" src="{{post.videos[0]}}" frameborder="0" allowfullscreen></iframe>
								</div>
							</a>
						{% elsif post.images.size > 0 %}
							<a href="{{post.url}}">
								<img class="img-responsive img-thumbnail" src="{{site.baseurl}}/assets/posts/{{post.images[0]}}" />
							</a>
						{% else %}
							<a href="{{post.url}}">
								<img class="img-responsive img-thumbnail" src="{{site.baseurl}}/assets/site/img/empty-img.png" />
							</a>
						{% endif %}
					</div>
					<div class="panel-footer text-right">
						{% for tag in post.tags %}
						<a href="#" class="tag">{{tag}}</a>
						{% endfor %}
						 <span class="text-muted glyphicon glyphicon-tag"> </span>
					</div>
				</div>
			{% endif %}
			{% endfor %}
		</div>
	{% endfor %}
	
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="well well-lg">
					<p>More games to come... I have so many ideas for great games. <br />In the meantime you can check the development blog <a href="{{site.baseurl}}/">here</a> to get the latest news and info on fresh new games.</p>
				</div>
			</div>
		</div>
	</div>
	
</div>