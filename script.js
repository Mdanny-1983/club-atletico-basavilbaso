document.addEventListener('DOMContentLoaded', () => {
    const nroSocio = "S-" + Math.floor(Math.random() * 90000 + 10000);
    const nroSocioElem = document.getElementById('numeroSocio');
    if (nroSocioElem) nroSocioElem.value = nroSocio;

    const hoy = new Date();
    const fechaElem = document.getElementById('fechaSolicitud');
    if (fechaElem) fechaElem.value = hoy.toLocaleDateString();
});

document.getElementById('socioForm').addEventListener('submit', function(e) {
    const datos = {
        numero: document.getElementById('numeroSocio').value,
        fecha: document.getElementById('fechaSolicitud').value,
        nombre: document.getElementById('nombre').value,
        dni: document.getElementById('dni').value,
        celular: document.getElementById('celular').value
    };

    enviarWhatsApp(datos);
    generarPDF(datos);
});

function enviarWhatsApp(d) {
    const nroDany = "5493445574590"; 
    const mensaje = `*Nuevo Socio CAB*%0A*Nombre:* ${d.nombre}%0A*DNI:* ${d.dni}%0A*Socio N°:* ${d.numero}%0A*Cel:* ${d.celular}`;
    const url = `https://wa.me/${nroDany}?text=${mensaje}`;
    window.open(url, '_blank');
}

function generarPDF(d) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ 
        orientation: 'l', 
        unit: 'mm', 
        format: [85, 54] 
    });

    // LOGO REAL DEL CLUB (Convertido a Base64 para que no falle)
    const logoBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEAAQADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDBAIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2N3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqGhcXHyMnkyicPExWElKSFtJXE1OT0RDRGR0h4N3ODk90dFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5JWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP0/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z";

    // --- Diseño del Carnet ---
    // Franja Superior Verde
    doc.setFillColor(45, 106, 79); 
    doc.rect(0, 0, 85, 14, 'F');
    
    // Franja Inferior Roja
    doc.setFillColor(230, 57, 70); 
    doc.rect(0, 50, 85, 4, 'F');

    // Título
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text("CLUB ATLÉTICO BASAVILBASO", 5, 9);

    // Insertar Logo (Ahora sí aparecerá siempre)
    doc.addImage(logoBase64, 'JPEG', 68, 1, 12, 12); 

    // Datos
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text(`SOCIO NRO: ${d.numero}`, 10, 22);
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(d.nombre.toUpperCase(), 10, 32);
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(`DNI: ${d.dni}`, 10, 40);
    doc.text(`EMISIÓN: ${d.fecha}`, 10, 46);

    doc.save(`Carnet_${d.nombre.replace(/ /g, "_")}.pdf`);
}