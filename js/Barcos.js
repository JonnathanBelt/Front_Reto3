function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://150.230.91.85:8080/api/Category/all",
        //url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador Get

function traerInformacionBoats(){
    $.ajax({
        url:"http://150.230.91.85:8080/api/Boat/all",
        //url:"http://localhost:8080/api/Boat/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            pintarRespuestaBoats(response);
        }
    });
}

function pintarRespuestaBoats(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Modelo</td>";
        myTable+="<td>Año</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";


    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+response[i].name+"</td>";
        myTable+="<td>"+response[i].brand+"</td>";
        myTable+="<td>"+response[i].year+"</td>";
        myTable+="<td>"+response[i].description+"</td>";
        myTable+="<td>"+response[i].category.name+"</td>";
        myTable+='<td><button class = "botonBoats2" onclick="borrar(' + response[i].id + ')">Borrar Boat!</button></td>';
        myTable+='<td><button class = "botonBoats2" onclick="cargarDatosBoat(' + response[i].id + ')">Editar Boat!</button></td>';
        myTable+='<td><button class = "botonBoats2" onclick="actualizar(' + response[i].id + ')">Actualizar Boat!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}
// Capturar informacion para Actualizar

function cargarDatosBoat(id) {
    $.ajax({
        dataType: 'json',
        url:"http://150.230.91.85:8080/api/Boat/" + id,
        //url:"http://localhost:8080/api/Boat/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarBoat() {

    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#name2").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://150.230.91.85:8080/api/Boat/save",
                //url:"http://localhost:8080/api/Boat/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}

//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://150.230.91.85:8080/api/Boat/" +idElemento,
            //url:"http://localhost:8080/api/Boat/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#resultado2").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://150.230.91.85:8080/api/Boat/update",
            //url:"http://localhost:8080/api/Boat/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#resultado2").empty();
                listarBoat();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}


