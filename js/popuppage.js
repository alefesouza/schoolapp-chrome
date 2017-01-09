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
// Última modificação em: 09/03/2015 20:50
$(function () {
	$('#back').click(function () {
		window.open('../popup.html', '_self');
	});
	
	var nome = null;
	if(_GET("nome") == "Notificações") {
		nome = "notificacoes";
	} else {
		nome = _GET("nome").toLowerCase();
	}
	
	if (_GET("oque") == "painel") {
		document.getElementById("frame").src = "http://apps.aloogle.net/web/rebuapp/painel.php";
	} else {
		document.getElementById("frame").src = "ajax.html?oque=" + _GET("oque");
	}

		$('#open').click(function () {
			window.open("http://apps.aloogle.net/web/rebuapp/" + nome + ".php");
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
