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
// Última modificação em: 08/04/2015 21:10
var isdic;

chrome.omnibox.onInputChanged.addListener(
	function (text, suggest) {
	if (text.indexOf('dic ') === 0) {
		isdic = true;
		var texto = text.replace("dic ", "");
		$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/dicsugestoes.php?q=' + texto)
		.done(function (json) {
			json = JSON.parse(json);
			suggest(json);
		});
	} else {
		isdic = false;
		$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/sugestoes.php?q=' + text)
		.done(function (json) {
			json = JSON.parse(json);
			suggest(json);
		});
	}
});

chrome.omnibox.setDefaultSuggestion({
	description : "Pesquisar livro na biblioteca, digite \"dic \" e uma palavra para pesquisar no dicion\u00e1rio"
});

chrome.omnibox.onInputEntered.addListener(
	function (text) {
	if (isdic) {
		var texto = text.replace("dic ", "");
		window.open('http://apps.aloogle.net/web/rebuapp/dicionario.php?palavra=' + texto);
	} else {
		window.open('http://apps.aloogle.net/web/rebuapp/busca.php?q=' + text);
	}
});

if(!localStorage['lastversions']) {
	var versions = [];
	versions.push(chrome.runtime.getManifest().version);
	localStorage['lastversions'] = JSON.stringify(versions);
}

var lastversions = JSON.parse(localStorage['lastversions']);
if($.inArray("1.1.1", lastversions) == -1) {
	lastversions.push("1.1.1");
	localStorage['lastversions'] = JSON.stringify(lastversions);
	localStorage["cantinanotif"] = "false";
}

if (localStorage["notiflastnotificacoes"] == "true") {
	notifLatest()
}

if(!localStorage.botoes) {
	localStorage["botoes"] = JSON.stringify(["sala","clube","eletiva","comunicados","notificacoes","biblioteca","cantina","anotacoes","dicionario","blog","jornal"]);
}

if (!localStorage.storagepadrao) {
	$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/config.php')
	.done(function (json) {
		json = JSON.parse(json);
		localStorage["sala"] = json.sala;
		localStorage["clube"] = json.clube;
		localStorage["eletiva"] = json.eletiva;
		localStorage["painel"] = json.painel;
		localStorage["isrespon"] = json.isrespon;
		localStorage["cantinanotif"] = json.cantinanotif;
		localStorage["cor"] = json.cor;
		updateBadge();
	})
	.fail(function () {
		localStorage["sala"] = "";
		localStorage["clube"] = "";
		localStorage["eletiva"] = "";
		localStorage["painel"] = "false";
		localStorage["isrespon"] = "false";
		localStorage["cantinanotif"] = "false";
		localStorage["cor"] = "005000";
	})
	.always(function () {
		localStorage["notifnotificacoes"] = "true";
		localStorage["notiflastnotificacoes"] = "true";
		localStorage["numbericon"] = "notificacoes";
		notifLatest();
		setTimeout(function () {
			notification()
		}, 500);
		window.open('paginas/opcoes.html');
		localStorage.storagepadrao = "true";
	});
} else {
	updateBadge();
}

function notifLatest() {
	$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/notif.php?sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&isrespon=' + localStorage["isrespon"] + '&cantinanotif=' + localStorage["cantinanotif"] + '&all=true')
	.done(function (json) {
		if (json == "[]") {
			localStorage['ultimasnotificacoes'] = json;
			if (!localStorage['examplenotifs']) {
				var content = '[{"title": "", "message": "T\u00edtulo da notifica\u00e7\u00f5o 1"}, {"title": "", "message": "T\u00edtulo da notifica\u00e7\u00f5o 2"}, {"title": "", "message": "T\u00edtulo da notifica\u00e7\u00f5o 3"}, {"title": "", "message": "T\u00edtulo da notifica\u00e7\u00f5o 4"}, {"title": "", "message": "T\u00edtulo da notifica\u00e7\u00f5o 5"}]';
				makeLastNotif(content, "\u00DAltimas notifica\u00e7\u00f5es (exemplo)");
				localStorage['examplenotifs'] = "true";
			}
		} else if (json != localStorage['ultimasnotificacoes']) {
			localStorage['ultimasnotificacoes'] = json;
			makeLastNotif(json, "\u00DAltimas notifica\u00e7\u00f5es");
			if (!localStorage['examplenotifs']) {
				localStorage['examplenotifs'] = "true";
			}
		}
		if (localStorage['examplenotif'] == "true") {
			$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/notif.php?sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&isrespon=' + localStorage["isrespon"] + '&cantinanotif=' + localStorage["cantinanotif"])
			.done(function (json) {
				if (json != localStorage['ultimanotificacao']) {
					localStorage['ultimanotificacao'] = json;
					json = JSON.parse(json);
					if(parseInt(json.id) > parseInt(localStorage["lastNotifId"])) {
						localStorage["lastNotifId"] = json.id;
					}
				}
			});
		}
	});
}

function notification() {
	$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/notif.php?sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&isrespon=' + localStorage["isrespon"] + '&cantinanotif=' + localStorage["cantinanotif"])
	.done(function (json) {
		if (json == "") {
			localStorage['ultimanotificacao'] = json;
			if (!localStorage['examplenotif2']) {
				if(!localStorage.lastNotifId) {
					localStorage['lastNotifId'] = "0";
				}
				var id = parseInt(localStorage['lastNotifId']) + 1;
				var content = '{"id": "' + id + '", "titulo": "Exemplo", "descricao": "Voc\u00ea recebe notifica\u00e7\u00f5es direto da dire\u00e7\u00e3o, ou do representante de sala, l\u00edder de clube ou professor de eletiva"}';
				makeNotif(content);
				localStorage['examplenotif2'] = "true";
			}
		} else if (json != localStorage['ultimanotificacao']) {
			localStorage['ultimanotificacao'] = json;
			makeNotif(json);
			if (!localStorage['examplenotif2']) {
				localStorage['examplenotif2'] = "true";
			}
		}
		if (localStorage['examplenotif'] == "true") {
			$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/notif.php?sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&isrespon=' + localStorage["isrespon"] + '&cantinanotif=' + localStorage["cantinanotif"] + '&all=true')
			.done(function (json) {
				if (json != localStorage['ultimasnotificacoes']) {
					localStorage['ultimasnotificacoes'] = json;
				}
			});
		}
		if (!localStorage['examplenotif']) {
			localStorage['examplenotif'] = "true";
		}
	});
	updateBadge();
}

function makeLastNotif(json, titulo) {
	json = JSON.parse(json);
	var notificationId = null;
	x = parseInt(localStorage["lastNotifId"]) + 1;
	notif = chrome.notifications.create("notif" + x, {
			type : "list",
			iconUrl : 'icons/icon_128.png',
			title : titulo,
			message : '',
			items : json,
			buttons : [{
					title : 'Abrir no RebuApp',
					iconUrl : 'icons/icon_16.png'
				}
			],
			priority : 2
		}, function (id) {
			notificationId = id;
		});
	chrome.notifications.onClicked.addListener(function (notifId) {
		if (notifId == notificationId) {
			window.open('http://apps.aloogle.net/web/rebuapp/notificacoes.php');
			chrome.notifications.clear(notifId, function (wasCleared) {});
		}
	});
	chrome.notifications.onButtonClicked.addListener(function (notifId, buttonIndex) {
		if (buttonIndex == 0) {
			if (notifId == notificationId) {
				window.open('http://apps.aloogle.net/web/rebuapp/notificacoes.php');
				chrome.notifications.clear(notifId, function (wasCleared) {});
			}
		}
	});
}

function makeNotif(json) {
	json = JSON.parse(json);
	if(parseInt(json.id) > parseInt(localStorage["lastNotifId"])) {
	var notificationId = null;
	x = parseInt(json.id);
	notif = chrome.notifications.create("notif" + x, {
			type : "basic",
			iconUrl : "icons/icon_128.png",
			title : json.titulo,
			message : json.descricao,
			buttons : [{
					title : 'Abrir no RebuApp',
					iconUrl : 'icons/icon_16.png'
				}
			],
			priority : 2
		}, function (id) {
			notificationId = id;
		});
	chrome.notifications.onClicked.addListener(function (notifId) {
		if (notifId == notificationId) {
			window.open('http://apps.aloogle.net/web/rebuapp/notificacoes.php');
			chrome.notifications.clear(notifId, function (wasCleared) {});
		}
	});
	chrome.notifications.onButtonClicked.addListener(function (notifId, buttonIndex) {
		if (notifId == notificationId) {
			if (buttonIndex == 0) {
				window.open('http://apps.aloogle.net/web/rebuapp/notificacoes.php');
				chrome.notifications.clear(notifId, function (wasCleared) {});
			}
		}
	});
	localStorage["lastNotifId"] = json.id;
	}
}

setInterval(function () {
	if (localStorage["notifnotificacoes"] == "true") {
		notification()
	}
}, 60000 * 30);

function updateBadge() {
	$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/total.php?sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&isrespon=' + localStorage["isrespon"] + '&cantinanotif=' + localStorage["cantinanotif"])
	.done(function (json) {
		localStorage["total"] = json;
		json = JSON.parse(json);
		if (localStorage["numbericon"] == "notificacoes") {
			setBa(false, json.batitlenotif, json.notificacoes);
		} else if (localStorage["numbericon"] == "eventos") {
			setBa(false, json.batitleeven, json.eventos);
		} else {
			setBa(true, "", "");
		}
	});
}

function setBa(bool, que, number) {
	if (bool == false) {
		if (que != "") {
			chrome.browserAction.setTitle({
				title : 'RebuApp\n' + que
			});
		} else {
			chrome.browserAction.setTitle({
				title : 'RebuApp'
			});
		}
	} else {
		chrome.browserAction.setTitle({
			title : 'RebuApp'
		});
	}
	chrome.browserAction.setBadgeText({
		text : number
	});
	chrome.browserAction.setBadgeBackgroundColor({
		color : '#' + localStorage['cor']
	});
}