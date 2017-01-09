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
// Última modificação em: 08/04/2015 20:03
$(function () {
	$('#back').click(function () {
		window.history.back();
	});
	
	$('#open').click(function () {
		window.open("http://apps.aloogle.net/web/rebuapp/cantina.php");
	});
	
	$('#facebook').click(function () {
		window.open("https://www.facebook.com/pages/Gera%C3%A7%C3%A3o-Sa%C3%BAde/388344088010898");
	});
	
	$('#cardapio').click(function () {
		window.open("popuppage.html?oque=cantinacardapio&nome=Card%C3%A1pio", "_self");
	});
	
	$('#promocoes').click(function () {
		window.open("popuppage.html?oque=cantinapromocoes&nome=Promo%C3%A7%C3%B5es", "_self");
	});
	
	$('#nome').html("Cantina");
	
	$('hr').css('background-color', '#' + localStorage['cor']);
	
    $('body').css('background-image', 'none');
});
