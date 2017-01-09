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
// Última modificação em: 08/04/2015 19:34
function selects(que) {
	var sala = localStorage[que];
	if (!sala) {
		return;
	}
	var select = document.getElementById(que);
	for (var i = 0; i < select.children.length; i++) {
		var child = select.children[i];
		if (child.value == sala) {
			child.selected = "true";
			break;
		} else {
			child.selected = "";
		}
	}
}

$(function () {
	$('#navopcoes').click(function () {
		document.title = "Op\u00e7\u00f5es - RebuApp";
		$('#opcoes').show();
		$('#sobre').hide();
		$("#navopcoes").addClass("navbar-item-selected");
		$("#navsobre").removeClass( "navbar-item-selected" );
	});
	$('#navsobre').click(function () {
		document.title = "Sobre - RebuApp";
		$('#sobre').show();
		$('#opcoes').hide();
		$("#navsobre").addClass("navbar-item-selected");
		$("#navopcoes").removeClass( "navbar-item-selected" );
	});
	
	$('#cor').change(function () {
		$('hr').css('background-color', '#' + $("#cor").val());
		chrome.browserAction.setBadgeBackgroundColor({ color : '#' + $("#cor").val() });
		localStorage['cor'] = $("#cor").val();
	});

	$('#notifnotificacoes').change(function () {
		localStorage["notifnotificacoes"] = document.getElementById("notifnotificacoes").checked;
	});
	$('#notiflastnotificacoes').change(function () {
		localStorage["notiflastnotificacoes"] = document.getElementById("notiflastnotificacoes").checked;
	});
	$('#sala').change(function () {
		localStorage["sala"] = document.getElementById("sala").value;
	});
	$('#clube').change(function () {
		localStorage["clube"] = document.getElementById("clube").value;
	});
	$('#eletiva').change(function () {
		localStorage["eletiva"] = document.getElementById("eletiva").value;
	});
	$('#categorias').click(function () {
	$("#dialog-message").dialog({
				modal : true,
				buttons : {
					Ok : function () {
						$('#dialog-message').dialog('close');
					}
				}
			});
	});
	$('#painel').change(function () {
		localStorage["painel"] = document.getElementById("painel").checked;
	});
	$('#isrespon').change(function () {
		localStorage["isrespon"] = document.getElementById("isrespon").checked;
	});
	$('#cantinanotif').change(function () {
		localStorage["cantinanotif"] = document.getElementById("cantinanotif").checked;
	});
	$('input[name=numbericon]').change(function () {
		localStorage["numbericon"] = $('input[name=numbericon]:checked').val();
		chrome.extension.getBackgroundPage().updateBadge();
	});
	document.getElementById("notifnotificacoes").checked = JSON.parse(localStorage["notifnotificacoes"]);
	document.getElementById("notiflastnotificacoes").checked = JSON.parse(localStorage["notiflastnotificacoes"]);
	document.getElementById("painel").checked = JSON.parse(localStorage["painel"]);
	document.getElementById("isrespon").checked = JSON.parse(localStorage["isrespon"]);
	document.getElementById("cantinanotif").checked = JSON.parse(localStorage["cantinanotif"]);
	document.getElementById(localStorage["numbericon"]).checked = true;
	selects("sala");
	selects("clube");
	selects("eletiva");
	selects("cor");
	$('hr').css('background-color', '#' + $("#cor").val());

	$('#import').click(function () {
		$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/config.php')
		.done(function (json) {
			json = JSON.parse(json)
			localStorage["sala"] = json.sala;
			localStorage["clube"] = json.clube;
			localStorage["eletiva"] = json.eletiva;
			localStorage["painel"] = json.painel;
			localStorage["isrespon"] = json.isrespon;
			localStorage["cantinanotif"] = json.cantinanotif;
			localStorage["cor"] = json.cor;
			location.reload();
		})
		.fail(function () {
			alert('Falha ao importar configu\u00e7\u00f5es');
		});
	});
});

$(window).unload(function () {
	chrome.extension.getBackgroundPage().updateBadge();
});