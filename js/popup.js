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
// Última modificação em: 08/04/2015 18:29
$(function () {
	var botoes = JSON.parse(localStorage["botoes"]);
	for (var i = 0; i < botoes.length; i++) {
		$('#' + botoes[i]).show();
	}
	
	$('#logo').click(function () {
		window.open('http://apps.aloogle.net/web/rebuapp');
	});
	$('#sala').click(function () {
		window.open('paginas/popuppage.html?oque=' + localStorage["sala"] + '&nome=Sala', '_self');
	});
	$('#clube').click(function () {
		window.open('paginas/popuppage.html?oque=' + localStorage["clube"] + '&nome=Clube', '_self');
	});
	$('#eletiva').click(function () {
		window.open('paginas/popuppage.html?oque=' + localStorage["eletiva"] + '&nome=Eletiva', '_self');
	});
	$('#comunicados').click(function () {
		window.open('paginas/popuppage.html?oque=comunicados' + '&nome=Comunicados', '_self');
	});
	$('#anotacoes').click(function () {
		window.open('http://apps.aloogle.net/web/rebuapp/anotacoes.php');
	});
	$('#notificacoes').click(function () {
		window.open('paginas/popuppage.html?oque=notificacoes&sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&nome=Notifica%C3%A7%C3%B5es', '_self');
	});
	$('#biblioteca').click(function () {
		if (!localStorage['avisobusca']) {
			$("#dialog-biblioteca").dialog({
				modal : true,
				buttons : {
					Ok : function () {
						window.open('http://apps.aloogle.net/web/rebuapp/biblioteca.php');
					}
				}
			});
			localStorage['avisobusca'] = "true";
		} else {
			window.open('http://apps.aloogle.net/web/rebuapp/biblioteca.php');
		}
	});
	$('#cantina').click(function () {
		window.open('paginas/cantina.html', '_self');
	});
	$('#dicionario').click(function () {
		if (!localStorage['avisodicionario']) {
			$("#dialog-dicionario").dialog({
				modal : true,
				buttons : {
					Ok : function () {
						window.open('http://apps.aloogle.net/web/rebuapp/dicionario.php');
					}
				}
			});
			localStorage['avisodicionario'] = "true";
		} else {
			window.open('http://apps.aloogle.net/web/rebuapp/dicionario.php');
		}
	});
	$('#blog').click(function () {
		window.open('paginas/popuppage.html?oque=blog&nome=Blog', '_self');
	});
	$('#jornal').click(function () {
		window.open('paginas/popuppage.html?oque=jornal&nome=Jornal', '_self');
	});
	$('#painel').click(function () {
		window.open('paginas/popuppage.html?oque=painel&nome=Painel', '_self');
	});

	if (localStorage['painel'] == "true") {
		$('#painel').show();
	}

	var json = JSON.parse(localStorage["total"]);
	var totalnotif;
	if(json.notificacoes == "") { totalnotif = "0"; } else { totalnotif = json.notificacoes; }

	$('#numbersala').html(json.sala);
	$('#numberclube').html(json.clube);
	$('#numbereletiva').html(json.eletiva);
	$('#numbercomunicados').html(json.comunicados);
	$('#numbernotificacoes').html(totalnotif);
});
