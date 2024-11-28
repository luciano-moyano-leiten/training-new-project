/* PARTE 1 (NO REQUIERE ACTIONS, SOLO LOADER) 
Crear una ruta atributos.$token donde se realice un FETCH-GET en el LOADER para traer todos los atributos de la AIP en el sweagar. Estos datos deben ser mostrados en una grilla de telerik y esta debe tener una columna con dos botones (uno de editar y otro de delete). Recordar que el GET necesita el token en el HEADER para funcionar.
PARTE 1.2
Al hacer click en un boton de una fila de la grilla debe abrirce un alert con el id del atributo correspondiente a esa fila.
PARTE 2 (NO REQUEIRE LOADEAR, SOLO ACTION)
Crear una ruta anidada para editar el atributo de la fila donde se haga click en editar (atributos.$token.edit). Debe abrir una ventanda de dialogo de Telerik y mostrar el id del atributo seleccionado. Al cerrar la ventana debe volver a la ruta donde esta al grilla.
PARTE 2.2
Crear un formulario dentro de la ruta anidada en la ventana de dialogo para que muestre los datos del atributo de la fila donde se hizo click. Recorda que el id no se peude modificar.
PARTE 2.3
Crear un action para hacer un post al API del swager para guardar cualquier cambio en las propiedades del atributo.
PARTE 3
Idem para delete. */

import { ActionFunction, json, LoaderFunction, Outlet, redirect, useNavigate, useParams } from "react-router-dom";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

type Atributo = {
    idAtributo: number;
    nombre: string;
    nombreCorto: string;
}


export const loader: LoaderFunction = async ({ request, params }) => {
    const token = params.token;
    if (!token) {
        throw new Error("Token is required");
    }
    const response = await fetch(`https://apptesting.leiten.dnscheck.com.ar/Atributos/GetAtributos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        
    });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    const data: Atributo[] = await response.json();
    return json(data);
};



export default function AtributosGrid() {
    const data = useLoaderData() as Atributo[];
    const { token } = useParams()
    const navigate = useNavigate();
    const [atributedSelected, setAtributedSelecteed] = useState({})
    const [atributedSelectedDelete, setAtributedSelecteedDelete] = useState({})

    const handleEdit = (item: Atributo) => {
        setAtributedSelecteed(item)
        navigate(`/atributos/${token}/edit`);
    };

    const handleDelete = (item: Atributo) => {
        setAtributedSelecteedDelete(item)
        navigate(`/atributos/${token}/delete`);
    };

    return (
<>
<Grid data={data}>
    
    
    <GridColumn field="idAtributo" title="ID" />
    <GridColumn field="nombre" title="Nombre" />
    <GridColumn field="nombreCorto" title="Nombre corto" />
    
    <GridColumn
        title="Actions"
        cell={(props) => (
            <td>
                
                <button onClick={() => handleEdit(props.dataItem)}>Editar</button>
                <button onClick={() => handleDelete(props.dataItem)}>Borrar</button>
            </td>
        )}
    />
</Grid>
<Outlet context={{atributedSelected, atributedSelectedDelete}}/>
</>
    );
}

