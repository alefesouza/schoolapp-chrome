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
// Última modificação em: 07/04/2015 22:32
window.onload = function () {
	var botoes = JSON.parse(localStorage["botoes"]);
	for (var i = 0; i < botoes.length; i++) {
		document.getElementById(botoes[i]).checked = true;
	}

	$('input').change(function () {
			if (this.checked == true) {
				var what = botoes.push(this.id);
				localStorage["botoes"] = JSON.stringify(botoes);
			} else {
				var index = botoes.indexOf(this.id);
				botoes.splice(index, 1);
				localStorage["botoes"] = JSON.stringify(botoes);
			}
			botoes = JSON.parse(localStorage["botoes"]);
	});
}