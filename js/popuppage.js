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
// Última modificação em: 09/04/2015 21:08
$(function () {
	$('#back').click(function () {
		window.history.back();
	});
	
	var nome = null;
	if(_GET("nome") == "Notificações") {
		nome = "notificacoes.php";
	} else if(_GET("nome") == "Cardápio") {
		nome = "evento.php?id=238&special=true";
	} else if(_GET("nome") == "Promoções") {
		nome = "evento.php?id=290&special=true";
	} else	{
		nome = _GET("nome").toLowerCase() + ".php";
	}
	
	var src;
	
	switch(_GET("oque")) {
		case "painel": src = "http://apps.aloogle.net/web/rebuapp/painel.php"; break;
		case "blog": src = "http://willianrrebua.blogspot.com/?m=1"; break;
		case "jornal": src = "https://www.facebook.com/v2.3/plugins/page.php?app_id=120074938094976&channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2F6Dg4oLkBbYq.js%3Fversion%3D41%23cb%3Df24d063e6c%26domain%3Dapps.aloogle.net%26origin%3Dhttp%253A%252F%252Fapps.aloogle.net%252Ff1bbfad3c%26relation%3Dparent.parent&container_width=1344&height=400&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2FREVOLUCIONARIOSREBUA&locale=pt_BR&sdk=joey&show_facepile=true&show_posts=true&width=305"; break;
		default: src = "ajax.html?oque=" + _GET("oque");
	}
	
	document.getElementById("frame").src = src;
	
		$('#open').click(function () {
			window.open("http://apps.aloogle.net/web/rebuapp/" + nome);
		});
		
	$('#nome').html(_GET("nome"));
	
	$('hr').css('background-color', '#' + localStorage['cor']);

	function _GET(name) {
		var url = window.location.search.replace("?", "");
		var itens = url.split("&");

		for (n in itens) {
			if (itens[n].match(name)) {
				return decodeURIComponent(itens[n].replace(name + "=", ""));
			}
		}
	}
});
