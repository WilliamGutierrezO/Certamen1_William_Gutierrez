tinymce.init({
    selector: '#detalles-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
} );
const reos =[];
const cargarTabla = ()=>{

    const tbody = document.querySelector("#tbody-tabla");
    tbody.innerHTML = "";

    for(let i =0; i< reos.length; ++i){
        let r = reos[i];

        let tr =document.createElement("tr");
    
        let tdNombre = document.createElement("td");
        let tdDetalle = document.createElement("td");
        let tdCiudad = document.createElement("td");
        let tdGravedad = document.createElement("td");
        tdNombre.innerText= r.nombre;
        
    
        
        let ncrimenes = document.createElement("i");
        if((r.ncrimenes>=0) & (r.ncrimenes<=3)){
            gravedad ="Leve";
        }else if((r.ncrimenes>=4) & (r.ncrimenes<=6)){
            gravedad ="Grave";
        }else if((r.ncrimenes>=7) & (r.ncrimenes<=15)){
            gravedad="Peligroso";
        }else if(r.ncrimenes>=16){
            gravedad="Enemigo Social";
        }

        if(gravedad == "Leve"){
            //leve <i class="fas fa-angry"></i>
            ncrimenes.classList.add("fas","fa-angry","text-success","fa-3x");
        }else if(gravedad == "Grave"){
            //<i class="fas fa-tired"></i>
            ncrimenes.classList.add("fas","fa-tired","text-info","fa-3x");
        }else if(gravedad == "Peligroso"){
            //<i class="fas fa-exclamation-triangle"></i>
            ncrimenes.classList.add("fas","fa-exclamation-triangle","text-warning","fa-3x");
        }else if(gravedad =="Enemigo Social"){
            //<i class="fas fa-skull-crossbones"></i>
            ncrimenes.classList.add("fas","fa-skull-crossbones","text-danger","fa-3x");
        }
        tdGravedad.classList.add("text-center");
        tdGravedad.appendChild(ncrimenes);


        tdDetalle.innerHTML = r.detalles;

        
        tr.appendChild(tdNombre);
        tr.appendChild(tdDetalle);
        tr.appendChild(tdCiudad);
        tr.appendChild(tdGravedad);
        tbody.appendChild(tr);
    }



}
document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    let nombre = document.querySelector("#nombre-txt").value;
    let apellido = document.querySelector("#apellido-txt").value;
    let ncrimenes = document.querySelector("#ncrimenes-number").value;
    let ciudad = document.querySelector("#ciudad-select").value;
    let detalles = tinymce.get("detalles-txt").getContent();

    let reo = {};
    reo.nombre = nombre;
    reo.apellido = apellido;
    reo.ncrimenes = ncrimenes;
    reo.detalles = detalles;
    reo.ciudad = ciudad;
    

    reos.push(reo);
    cargarTabla();
    Swal.fire("Registro de Criminal", "El reo fue ingresado al sistema","info");
});