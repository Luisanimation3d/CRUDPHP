const appDiv = document.querySelector('#app');
const listarButton = document.querySelector('#listar');
const crearButton = document.querySelector('#crear');

// button.addEventListener('click', ()=>{
//     const xhr = new XMLHttpRequest();
//     const data = [1,{name:1,hola:"Hello, world"}]
//     xhr.open('POST', 'server.php', true);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.onload = ()=>{
//         if(xhr.status===200){
//             console.log(xhr.responseText)
//         }
//     }
//     xhr.send('datos='+JSON.stringify(data));
// })

listarButton.addEventListener('click', ()=>{
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = ()=>{
        if(xhr.status===200){
            console.log(xhr.responseText)
            const responseText = JSON.parse(xhr.responseText)
            appDiv.innerHTML = `<table><thead><tr><th>Id</th><th>Nombre</th><th>Precio</th><th>Acciones</th></tr></thead><tbody id="tBody"></tbody></table>`
            const tBody = document.querySelector("#tBody");
            tBody.innerHTML = ''
            for( let registro in responseText){
                tBody.innerHTML +=`<tr><td>${responseText[registro].id + 1}</td><td>${responseText[registro].name}</td><td>${responseText[registro].price}</td><td><button onclick="editarButton(${responseText[registro].id})">Editar</button><button onclick="eliminarButton(${responseText[registro].id})">Eliminar</button></td></tr>`
            }
        }
    }
    const datosEnviados = [
        2
    ]
    xhr.send('datos='+JSON.stringify(datosEnviados));
})

crearButton.addEventListener('click', ()=>{
    appDiv.innerHTML = `<h3>Registrar</h3><form id="formData">
        <input type="text" id="name" placeholder="Nombre"/>
        <input type="number" id="price" placeholder="Precio" step="any" value=""/>
        <button type="submit" id="buttonCrear">Crear</button>
    </form>`
    const fomrularioCrear = document.querySelector('#formData');
    fomrularioCrear.addEventListener('submit', (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'server.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = () => {
            if (xhr.status === 200) {
                listarButton.click();
            }
        }
        const datosEnviados = [
            1,
            {
                name: document.getElementById('name').value,
                price: document.getElementById('price').value
            }
        ]
        xhr.send('datos='+JSON.stringify(datosEnviados));
    })
})


function editarButton(id){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const datosEnviados = [
        3,
        id
    ]
    xhr.onload = () => {
        if (xhr.status === 200) {
            Editar(JSON.parse(xhr.responseText))
        }
    }
    xhr.send('datos='+JSON.stringify(datosEnviados));
}


function Editar(response){
    appDiv.innerHTML = `<h3>Editar</h3><form id="formData">
        <input type="text" id="name" placeholder="Nombre" value="${response.name}"/>
        <input type="number" id="price" placeholder="Precio" step="any" value="${response.price}"/>
        <button type="submit" id="buttonCrear">Editar</button>
    </form>`
    const formEditar = document.querySelector("#formData");
    formEditar.addEventListener('submit', (e)=>{
        e.preventDefault();
        const camposEditados = [
            4,
            {
                id: response.id,
                name: document.querySelector("#name").value,
                price: document.querySelector("#price").value
            }
        ]
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'server.php', true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.onload = ()=>{
            if (xhr.status === 200){
                listarButton.click();
            }
        }
        xhr.send('datos='+JSON.stringify(camposEditados
        ))
    })
}


function eliminarButton(id){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const datosEnviados = [
        5,
        id
    ]
    xhr.onload = () => {
        if (xhr.status === 200) {
           listarButton.click();
        }
    }
    xhr.send('datos='+JSON.stringify(datosEnviados));
}