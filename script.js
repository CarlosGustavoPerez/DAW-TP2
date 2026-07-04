const URL = "https://rickandmortyapi.com/api/character";

const btnPersonajes = document.getElementById("btnPersonajes");
const btnBuscar = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("tabla");
const contador = document.getElementById("contador");
const spinnerContainer = document.getElementById("spinnerContainer");

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function mostrarPersonajes(personajes) {
    resultado.innerHTML = "";
    personajes.forEach(personaje => {
        resultado.innerHTML += `
            <tr>
                <td><img src="${personaje.image}" alt="${personaje.name}"></td>
                <td>${personaje.name}</td>
                <td>${personaje.status}</td>
                <td>${personaje.species}</td>
                <td>${personaje.gender}</td>
            </tr>
        `;
    });
}

btnPersonajes.addEventListener("click", async () => {
    // Limpieza de inputs
    document.getElementById("name").value = "";
    document.getElementById("status").value = "";
    document.getElementById("species").value = "";
    document.getElementById("type").value = "";
    document.getElementById("gender").value = "";

    mensaje.textContent = "";
    contador.textContent = "";
    tabla.classList.add("tabla-oculta");
    spinnerContainer.style.display = "flex";

    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        await esperar(1500); 
        
        spinnerContainer.style.display = "none";
        tabla.classList.remove("tabla-oculta");
        mostrarPersonajes(data.results);
        contador.textContent = `Mostrando ${data.results.length} personajes de un total de ${data.info.count}`;
    } catch (error) {
        await esperar(1000);
        spinnerContainer.style.display = "none";
        mensaje.textContent = "Error al obtener personajes";
        mensaje.className = "error";
    }
});

btnBuscar.addEventListener("click", async () => {
    mensaje.textContent = "";
    contador.textContent = "";
    tabla.classList.add("tabla-oculta");
    resultado.innerHTML = "";
    spinnerContainer.style.display = "flex";

    const name = document.getElementById("name").value.trim();
    const status = document.getElementById("status").value.trim();
    const species = document.getElementById("species").value.trim();
    const type = document.getElementById("type").value.trim();
    const gender = document.getElementById("gender").value.trim();
    
    const query = `?name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`;
    
    try {
        const response = await fetch(URL + query);
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        await esperar(1500);
        
        spinnerContainer.style.display = "none";
        tabla.classList.remove("tabla-oculta");
        mostrarPersonajes(data.results);
        contador.textContent = `Encontrados ${data.info.count} personajes (Mostrando los primeros ${data.results.length})`;
    } catch (error) {
        await esperar(1000);
        spinnerContainer.style.display = "none";
        mensaje.textContent = "No se encontraron personajes o ocurrió un error.";
        mensaje.className = "error";
    }
});