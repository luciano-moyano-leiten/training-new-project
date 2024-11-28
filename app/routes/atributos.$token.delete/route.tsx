import { Dialog } from "@progress/kendo-react-dialogs";
import { useLocation, useNavigate, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";

// Define the AtributedContext type
interface AtributedContext {
    atributedSelectedDelete: {idAtributo: number}
}

export default function AtributoDelete(){
    const {atributedSelectedDelete} = useOutletContext<AtributedContext>()
    const navigate = useNavigate();
    const location = useLocation();

    const handleClose = () => {
        navigate(-1)
    };

    const [atributedDelete, setAtributedDelete] = useState<any>()


    useEffect(()=>{
        setAtributedDelete(atributedSelectedDelete);
    }, [atributedSelectedDelete]);


    return (
        <div>
           
                <Dialog title={"Editar Atributo"} onClose={handleClose}>
                {atributedDelete ? (
                    <p>{atributedDelete.idAtributo}</p>
                ) : (
                    <p>Cargando...</p>
                )}
                    <button onClick={handleClose}>Cerrar</button>
                </Dialog>
           
        </div>
    );

}