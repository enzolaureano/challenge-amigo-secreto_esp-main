// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
document.addEventListener("DOMContentLoaded", () => {
    let amigos = JSON.parse(localStorage.getItem("amigos")) || []; // Lista de amigos
    let sorteados = JSON.parse(localStorage.getItem("sorteados")) || []; // Lista de sorteados
    let mostrarNombres = JSON.parse(localStorage.getItem("mostrarNombres")) ?? true; // Estado del switch

    function actualizarLista() {
        const lista = document.getElementById("listaAmigos");
        lista.innerHTML = "";

        amigos.forEach((amigo, index) => {
            const li = document.createElement("li");

            // Mostrar nombres o asteriscos según el estado del switch
            li.textContent = mostrarNombres ? amigo : "****";

            li.style.cursor = "pointer";

            if (sorteados.includes(amigo)) {
                li.style.textDecoration = "line-through"; // Tachar el nombre
                li.style.color = "gray"; // Cambiar color a gris
                li.style.cursor = "default"; // Deshabilitar interacción
            } else {
                li.addEventListener("click", () => eliminarAmigo(index)); // Permitir eliminación solo si no está sorteado
            }

            lista.appendChild(li);
        });

        localStorage.setItem("amigos", JSON.stringify(amigos));
        localStorage.setItem("sorteados", JSON.stringify(sorteados));
    }

    window.agregarAmigo = function () {
        const input = document.getElementById("amigo");
        const nombre = input.value.trim();

        if (!nombre) {
            alert("Por favor, ingresa un nombre válido.");
            return;
        }

        if (amigos.includes(nombre)) {
            alert("Ese nombre ya ha sido agregado.");
            return;
        }

        amigos.push(nombre);
        input.value = "";
        actualizarLista();
    };

    window.eliminarAmigo = function (index) {
        if (confirm(`¿Seguro que quieres eliminar a "${amigos[index]}"?`)) {
            amigos.splice(index, 1);
            actualizarLista();
        }
    };

    window.sortearAmigo = function () {
        // Filtrar amigos que no han sido sorteados
        const disponibles = amigos.filter(amigo => !sorteados.includes(amigo));

        if (disponibles.length === 0) {
            alert("Todos los amigos ya fueron sorteados.");
            return;
        }

        const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
        const amigoSecreto = disponibles[indiceAleatorio];

        sorteados.push(amigoSecreto); // Marcar como sorteado
        actualizarLista(); // Refrescar la lista visualmente

        const resultado = document.getElementById("resultado");
        resultado.innerHTML = `<li><strong>🎉 ¡Felicidades! Tu amigo secreto es: ${amigoSecreto} 🎉</strong></li>`;
    };

    // Función para alternar entre mostrar y ocultar nombres
    window.toggleNombres = function () {
        mostrarNombres = !mostrarNombres;
        localStorage.setItem("mostrarNombres", JSON.stringify(mostrarNombres));
        actualizarLista();
    };

    window.limpiarLista = function () {
        if (confirm("¿Seguro que quieres borrar toda la lista de amigos?")) {
            amigos = [];
            sorteados = [];
            localStorage.removeItem("amigos");
            localStorage.removeItem("sorteados");
            actualizarLista();
        }
    };

    actualizarLista();
});