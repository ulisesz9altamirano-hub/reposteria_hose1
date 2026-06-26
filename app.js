// CONFIGURACIÓN: Poné acá tu número de WhatsApp
const TELEFONO_REPOSTERIA = "5492615325448"; 

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. CONTROL DE RELLENOS (MÁXIMO 3)
    // ==========================================
    const itemsRellenos = document.querySelectorAll(".lista-rellenos ul li");

    itemsRellenos.forEach(item => {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => {
            const seleccionados = document.querySelectorAll(".lista-rellenos ul li.seleccionado");

            if (item.classList.contains("seleccionado")) {
                item.classList.remove("seleccionado");
                item.style.backgroundColor = "transparent";
                item.style.fontWeight = "normal";
            } else {
                if (seleccionados.length >= 3) {
                    alert("¡Sólo podés elegir hasta 3 rellenos!");
                    return;
                }
                item.classList.add("seleccionado");
                item.style.backgroundColor = "#ffe6ea"; // Se pinta rosado al tocarlo
                item.style.fontWeight = "bold";
            }
        });
    });


    // ==========================================
    // 2. CREAR EL SELECTOR DE KILOS EN PANTALLA
    // ==========================================
    const infoTorta = document.querySelector(".Torta-info");

    // Creamos un renglón para los kilos
    const contenedorKilos = document.createElement("div");
    contenedorKilos.style.marginTop = "15px";
    contenedorKilos.style.display = "flex";
    contenedorKilos.style.alignItems = "center";
    contenedorKilos.style.gap = "10px";

    // Texto que dice "Cantidad de Kilos:"
    const labelKilos = document.createElement("label");
    labelKilos.textContent = "Cantidad de Kilos: ";
    labelKilos.style.fontWeight = "bold";

    // El cuadradito (input) para subir/bajar los kilos
    const inputKilos = document.createElement("input");
    inputKilos.type = "number";
    inputKilos.value = "1"; // Empieza en 1 kg
    inputKilos.min = "1";   // No deja poner menos de 1
    inputKilos.max = "10";  // Límite de 10 kg
    inputKilos.style.width = "60px";
    inputKilos.style.padding = "5px";

    // Metemos el texto y el cuadradito en la pantalla
    contenedorKilos.appendChild(labelKilos);
    contenedorKilos.appendChild(inputKilos);
    infoTorta.appendChild(contenedorKilos);


    // ==========================================
    // 3. CREAR EL BOTÓN DE COMPRA DE LA TORTA
    // ==========================================
    const btnTorta = document.createElement("button");
    btnTorta.textContent = "Encargar Torta Personalizada";
    btnTorta.className = "btn-comprar"; 
    btnTorta.style.marginTop = "10px";
    btnTorta.style.padding = "10px 20px";
    infoTorta.appendChild(btnTorta);


    // ==========================================
    // 4. ACCIÓN AL SPRECIAR EL BOTÓN DE LA TORTA
    // ==========================================
    btnTorta.addEventListener("click", () => {
        const rellenosElegidos = Array.from(document.querySelectorAll(".lista-rellenos ul li.seleccionado"))
                                      .map(li => li.textContent.trim());

        if (rellenosElegidos.length === 0) {
            alert("Por favor, seleccioná al menos 1 relleno de la lista.");
            document.querySelector(".desplegable-rellenos").open = true;
            return;
        }

        // Leemos cuántos kilos dice el cuadradito de la pantalla
        const kilos = parseInt(inputKilos.value) || 1;

        // Calculamos precio total ($14.500 el kilo)
        const precioTotal = kilos * 15000;
        const textoRellenos = rellenosElegidos.join(", ");
        
        // Armamos el WhatsApp
        const mensajeFinal = `Hola! Quisiera pedir una *Torta Personalizada* de *${kilos} kg*.\n\n` +
                             `Los rellenos que elegí son: *${textoRellenos}*.\n` +
                             `Precio total aproximado: *$${precioTotal.toLocaleString('es-AR')}*.`;

        enviarWhatsApp(mensajeFinal);
    });


    // ==========================================
    // 5. BOTONES PARA LAS OTRAS TARTAS (LEMON PIE, ETC.)
    // ==========================================
    const tarjetasProductos = document.querySelectorAll(".producto-grid .producto-card");

    tarjetasProductos.forEach(tarjeta => {
        const bodyProducto = tarjeta.querySelector(".producto-body");
        const nombreProducto = tarjeta.querySelector("img").getAttribute("alt") || "Tarta Especial";

        const contenedorBotones = document.createElement("div");
        contenedorBotones.style.marginTop = "10px";
        contenedorBotones.style.display = "flex";
        contenedorBotones.style.gap = "10px";

        const btnGrande = document.createElement("button");
        btnGrande.textContent = "Pedir 26cm";
        btnGrande.className = "btn-pedido-tarta";
        
        const btnChico = document.createElement("button");
        btnChico.textContent = "Pedir 22cm";
        btnChico.className = "btn-pedido-tarta";

        contenedorBotones.appendChild(btnGrande);
        contenedorBotones.appendChild(btnChico);
        bodyProducto.appendChild(contenedorBotones);

        btnGrande.addEventListener("click", () => {
            enviarWhatsApp(`Hola! Quisiera encargar una tarta *${nombreProducto}* en tamaño grande de *26cm* ($14.500).`);
        });

        btnChico.addEventListener("click", () => {
            enviarWhatsApp(`Hola! Quisiera encargar una tarta *${nombreProducto}* en tamaño chico de *22cm* ($9.000).`);
        });
    });

    function enviarWhatsApp(mensaje) {
        const url = `https://api.whatsapp.com/send?phone=${TELEFONO_REPOSTERIA}&text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    }
});
