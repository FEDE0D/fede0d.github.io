
// Custom: Single Image
$(".img-img").each(function(i, e){
	$(this).wrap("<a href='#' data-mfp-src='"+$(this).attr("src")+"' class='img-link'></a>");
});

// Custom Gallery

$(".img-gallery-make").each(function(i, e){
	var imgItems = [];
	
	$(e).find("img").each(function(j, f){
		$(f).css("cursor", "pointer");
		imgItems.push({
			src: $(f).attr("src")
		});
	});
	
	console.log(imgItems);
	
	$(this).magnificPopup({
		items: imgItems,
		gallery: { enabled: true },
    	type: 'image'
	});
});



$(document).ready(function(){
	$('.img-link').magnificPopup({
		type:'image'
	});
});

$(document).ready(function(){
	$('.img-gallery').magnificPopup({
		delegate:'a',
		gallery:{enabled:true},
		type:'image'
	});
});