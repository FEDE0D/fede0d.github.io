---
layout: main
permalink: /contact/
---

<div class="container-fluid">
	<div class="row">
		<div class="col-sm-9">
			<div class="panel panel-post">
				<div class="panel-body">
					<p style="padding: 8px 0px;">
						<strong><i>Get in touch!</i></strong>
					</p>

					If you want to contact me you can reach me at <a href="javascript:showEmail()" id="aEmail">show email</a> and I will reply as soon as posible.
					
					<br />
					<ul>
						<li>I'm interested in working on a full-time game dev job</li>
						<li>I'm interested on participating in game jams and other short gamedev events.</li>
					</ul>

					<p>
						Read my CV <a href="/assets/CV/cv.html">here</a>.
						Download here: <a href="/assets/CV/CV - Federico Pacheco.pdf">CV.pdf</a>
					</p>
					
				</div>
				<script type="text/javascript">
					function showEmail(){
						var e = document.getElementById("aEmail");
						e.setAttribute("href", "mailto:federicogpacheco"+"@"+"gmail.com");
						e.innerHTML = "federicogpacheco"+"@"+"gmail.com";
					}
				</script>
				<div class="panel-footer">
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<img src="/assets/site/img/me.png" class="img-responsive img-thumbnail img-rounded">
		</div>
	</div>
</div>
