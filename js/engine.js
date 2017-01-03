$(document).ready(function(){

	$('.zaznacz_tekst').click(function(){
		$(this).select();
	})
	
	$('#generuj').click(function(){
	
		var tytul_array = $('#tytul_input').val().split('\n');
		$('#tytul_output').val(tytul_array[Math.floor(Math.random()*tytul_array.length)]);
		
		var kluczowe_input = $('#kluczowe_input').val()+' ';
		var kluczowe_array = kluczowe_input.split(', ');
		kluczowe_array.sort(function () {
			return( parseInt( Math.random()*10 ) %2 );
		});
		$('#kluczowe_output').val(kluczowe_array.join(', '));
	
		var opis_input = $('#opis_input').html();
		opis_input = opis_input.replace(/<span class="blue">{/g, "{");
		opis_input = opis_input.replace(/}<\/span>/g, "}");
		var opis_output = '';
		var znak = 0;
		
		do{
			znak = opis_input.indexOf('{');
			opis_output += opis_input.substring(0, znak);
			znak2 = opis_input.indexOf('}');
			var synonimy = opis_input.substring(znak+1,znak2);
			var synonimy_array = synonimy.split('|');
			opis_output += synonimy_array[Math.floor(Math.random()*synonimy_array.length)];
			opis_input = opis_input.substring(znak2+1, opis_input.length);
		}while(opis_input.indexOf('{')!=-1)
		
		opis_output += opis_input;
		
		$('#opis_output').val(opis_output).select();
		return false;
	})
	
	function textareaClicked() {
		var divHtml = $(this).html();
		divHtml = divHtml.replace(/<span class="blue">{/g, "{");
		divHtml = divHtml.replace(/}<\/span>/g, "}");
		var editableText = $("<textarea id='opis_input' class='textarea'/>");
		editableText.val(divHtml);
		$("#opis").val(divHtml);
		$(this).replaceWith(editableText);
		editableText.focus();
		editableText.blur(editableTextBlurred);
	}
	$("#opis_input").click(textareaClicked);

	function editableTextBlurred() {
		var html = $(this).val();
		$("#opis").val(html);
		html = html.replace(/{/g, "<span class='blue'>{");
		html = html.replace(/}/g, "}</span>");
		var viewableText = $("<div id='opis_input' class='textarea'>");
		viewableText.html(html);
		$(this).replaceWith(viewableText);
		viewableText.click(textareaClicked);
	}
	
	jQuery("#facebook2_2").hover(function(){jQuery(this).stop(true,false).animate({right: "0px"}, 500 );},
		function(){jQuery("#facebook2_2").stop(true,false).animate({right: "-304px"}, 500 );});
	$('.fb-like-box').attr('data-height',$('#facebook2_2').height());
	$( window ).resize(function() {
		$('.fb-like-box').attr('data-height',$('#facebook2_2').height());
	})
});


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&appId={$ustawienia.facebook_api}&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
