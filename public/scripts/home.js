//* when presing a buttom pass to the next page
/*function nextPage() {
    window.location.href = "/distance_race.html";
}
*/

/*function saveName() {
    var name = document.getElementById("name").value;
    localStorage.setItem("name", name);
}
*/

// Espera a que el DOM esté completamente cargado antes de añadir el manejador de eventos
document.addEventListener("DOMContentLoaded", function () {
	// Obtén el botón por su ID
	var button = document.getElementById("nextPageButton");

	// Añade un manejador de evento 'click' al botón
	button.addEventListener("click", function () {
		// Cambia la URL en la siguiente línea por la dirección a la que quieres redirigir
		window.location.href = "/distance_race.html";
	});
});

document.addEventListener("DOMContentLoaded", function () {
	var botonGuardar = document.getElementById("guardarNombre");

	botonGuardar.addEventListener("click", function () {
		// Obtiene el valor del input donde el usuario introduce su nombre
		var nombre = document.getElementById("nombreUsuario").value;

		// Guarda el nombre en el localStorage
		localStorage.setItem("nombre", nombre);

		// Opcional: mostrar una confirmación o realizar alguna acción después de guardar
		alert("Nombre guardado: " + nombre);
	});
});
