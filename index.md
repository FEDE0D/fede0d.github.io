---
layout: main
---

<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-post">
				<div class="panel-body text-center">
					<h3>Developer blog</h3>
					<p>Toughts on game dev, gameplays, tutorials and more</p>
				</div>
				<div class="panel-footer">
					If you are looking for <strong>downloads</strong> and <strong>games</strong> you can <a href="{{site.baseurl}}/games/">click here</a> to check out the latest released games.
				</div>
			</div>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-md-12">
		{% for post in site.posts %}
		{% if post.categories contains "blog" %}
		<div class="panel panel-post">
			<div class="panel-heading">
				<a href="{{post.url}}">
					<img src="{{site.baseurl}}/assets/site/img/logo.png"/>
					{{post.title}}
				</a>
				<span class="pull-right text-muted">{{post.date | date:"%D"}}</span>
			</div>
			<div class="panel-body">
				{% if post.images.size > 0 %}
				<div class="col-md-3 hidden-xs">
					<a href="{{post.url}}">
						<img class="img-responsive img-thumbnail center-block" src="{{site.baseurl}}/assets/posts/{{post.images[0]}}" style="max-height: 256px;"/>
					</a>
				</div>
				{% elsif post.videos.size > 0 %}
				<div class="col-md-3 hidden-xs">
					<a href="{{post.url}}">
						<div class="embed-responsive embed-responsive-16by9">
							<iframe class="embed-responsive-item" src="{{post.videos[0]}}" frameborder="0" allowfullscreen></iframe>
						</div>
					</a>
				</div>
				{% else %}
				<div class="col-md-3 hidden-xs">
					<a href="{{post.url}}">
						<img class="img-responsive img-thumbnail center-block" src="{{site.baseurl}}/assets/site/img/empty-img.png" />
					</a>
				</div>
				{% endif %}
				<div class="col-md-9">
					{{post.excerpt}}
					<a href="{{post.url}}">Read more...</a>
				</div>
			</div>
			<div class="panel-footer text-right">
				<span class="text-muted">
					{% for tag in post.tags %}
						 <a href="#">{{tag}}</a>
					{% endfor %}
					<span class="text-muted glyphicon glyphicon-tag"> </span>
				</span>
			</div>
		</div>
		{% endif %}
		{% endfor %}
	</div>
</div>