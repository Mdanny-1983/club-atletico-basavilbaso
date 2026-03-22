document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos el botón dentro de .hero
    const btnSocio = document.querySelector(".hero button");
    
    if (btnSocio) {
        btnSocio.addEventListener("click", () => {
            alert("¡Gracias por tu interés! Próximamente habilitaremos el sistema de socios online para el Club.");
        });
    }
});