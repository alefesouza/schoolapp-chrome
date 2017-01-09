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
// Última modificação em: 09/03/2015 20:20
chrome.omnibox.onInputChanged.addListener(
	function (text, suggest) {
	suggest([{
				content : " " + text,
				description : "Digite sua busca na biblioteca do RebuApp"
			},
		]);
});

chrome.omnibox.onInputEntered.addListener(
	function (text) {
	window.open('http://apps.aloogle.net/web/rebuapp/busca.php?q=' + text);
});

if (localStorage["notiflastnotificacoes"] == "true") {
	notifLatest()
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
		localStorage["cor"] = json.cor;
		updateBagde();
	})
	.fail(function () {
		localStorage["sala"] = "";
		localStorage["clube"] = "";
		localStorage["eletiva"] = "";
		localStorage["painel"] = "false";
		localStorage["isrespon"] = "false";
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
	$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/notif.php?sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&isrespon=' + localStorage["isrespon"] + '&all=true')
	.done(function (json) {
		if (json != localStorage['ultimasnotificacoes']) {
			localStorage['ultimasnotificacoes'] = json;
			var notificationId = null;
			x = parseInt(localStorage["lastNumber"]) + 1;
			notif = chrome.notifications.create("notif" + x, {
					type : "list",
					iconUrl : 'icons/icon_128.png',
					title : '\u00DAltimas notifica\u00e7\u00f5es',
					message : '',
					items : JSON.parse(localStorage.getItem("ultimasnotificacoes")),
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
			updateBagde();

			if (localStorage['examplenotif'] == "true") {
				$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/notif.php?sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&isrespon=' + localStorage["isrespon"])
				.done(function (json) {
					if (json != localStorage['ultimanotificacao']) {
						localStorage['ultimanotificacao'] = json;
					}
				});
			}
		}
	});
}

function notification() {
	$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/notif.php?sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&isrespon=' + localStorage["isrespon"])
	.done(function (json) {
		if (json != localStorage['ultimanotificacao']) {
			localStorage['ultimanotificacao'] = json;
			if (!localStorage["lastNumber"]) {
				localStorage["lastNumber"] = 0;
			}
			var notificationId = null;
			x = parseInt(localStorage["lastNumber"]) + 1;
			notif = chrome.notifications.create("post" + x, {
					type : "basic",
					iconUrl : "icons/icon_128.png",
					title : JSON.parse(localStorage.getItem("ultimanotificacao")).titulo,
					message : JSON.parse(localStorage.getItem("ultimanotificacao")).descricao,
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
			localStorage["lastNumber"] = x;
			updateBagde();

			if (localStorage['examplenotif'] == "true") {
				$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/notif.php?sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&isrespon=' + localStorage["isrespon"] + '&all=true')
				.done(function (json) {
					if (json != localStorage['ultimasnotificacoes']) {
						localStorage['ultimasnotificacoes'] = json;
					}
				});
			}
			if (!localStorage['examplenotif']) {
				localStorage['examplenotif'] = "true";
			}
		}
	});
}

setInterval(function () {
	if (localStorage["notifnotificacoes"] == "true") {
		notification()
	}
}, 60000 * 30);

function updateBagde() {
	$.ajax('http://apps.aloogle.net/web/rebuapp/json/gc/total.php?sala=' + localStorage["sala"] + '&clube=' + localStorage["clube"] + '&eletiva=' + localStorage["eletiva"] + '&isrespon=' + localStorage["isrespon"])
	.done(function (json) {
		localStorage["total"] = json;
		json = JSON.parse(json);
		if (localStorage["numbericon"] == "notificacoes") {
			setBa(false, json.batitleeven, json.notificacoes);
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
