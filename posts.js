---
layout: null
permalink: /posts.js
---

var POSTS = [];

{% for p in site.posts %}
	POSTS.push({
		title: "{{p.title}}",
		date: "{{p.date}}",
		url: "{{p.url}}",
		excerpt: "{{p.excerpt | escape}}"
	});
{% endfor %}

