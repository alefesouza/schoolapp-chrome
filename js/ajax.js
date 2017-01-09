/*
 * Copyright (C) 2015 Alefe Souza <contato@alefesouza.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Última modificação em: 13/03/2015 16:17
$(function () {
var url = null;
if(_GET("oque") == "notificacoes") {
	url = 'http://apps.aloogle.net/web/rebuapp/json/gc/get.php?oque=notificacoes&sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"];
} else {
	url = 'http://apps.aloogle.net/web/rebuapp/json/gc/get.php?oque=' + _GET("oque");
}

$.ajax(url)
	.done(function (json) {
		localStorage[_GET("oque") + "evens"] = json;
		contructJson(json);
	})
	.fail(function () {
		if(!localStorage[_GET("oque") + "evens"]) {
			$('body').css('background-image', 'none');
			$("#eventos").append("<section class=\"margin card\" style=\"width: auto; height: auto; text-align: center;\"><b>Verifique sua conex&atilde;o de internet.</b></section>");
		} else {
			$("#eventos").append("<section class=\"margin card\" style=\"width: auto; height: auto; text-align: center;\"><b>Essas informa&ccedil;&otilde;es podem estar desatualizadas, para atualiza-las verifique sua conex&atilde;o de internet.</b></section>");
			contructJson(localStorage[_GET("oque") + "evens"]);
		}
	});

function contructJson(json) {
	json = JSON.parse(json);
	
	var clickable = " clickable";
	var clickablen = "";
	var summary = "";
	if(_GET("oque") == "notificacoes") { clickable = ""; }
	if(json.grupoid != "") { clickablen = " clickable"; }
	
	if(_GET("oque") != "notificacoes" && _GET("oque") != "comunicados") {
	$("#eventos").append("<section class=\"margin card" + clickablen + "\" id=\"nome\" style=\"width: auto; height: auto; text-align: center;\"><b>" + json.nome + "</b></section>"); }
	
	if(json.grupoid != "") { $('#nome').click(function () { window.open('http://www.facebook.com/groups/' + json.grupoid); }); }
	
for (var i=0; i < json.dados.length; i++) {
  if(_GET("oque") == "notificacoes") { summary = "<hr>" + json.dados[i].summary; }
  $("#eventos").append("<section class=\"margin card" + clickable + "\" style=\"\width: auto; height: auto\" id=\"" + json.dados[i].id + "\"><p><b>" + json.dados[i].title + "</b></p><p>" + json.dados[i].description + "</p>" + summary + "</section>");
  
  if(_GET("oque") != "notificacoes") { 
	configClick(json.dados[i].id);
  }
}
     $('body').css('background-image', 'none');
}

function configClick(id) {
	$('#' + id).click(function () {
		window.open('http://apps.aloogle.net/web/rebuapp/evento.php?id=' + id);
	});
}

function _GET(name){
    var url = window.location.search.replace("?", "");
    var itens = url.split("&");

    for(n in itens){
        if(itens[n].match(name)){
            return decodeURIComponent(itens[n].replace(name+"=", ""));
        }
    }
}
});