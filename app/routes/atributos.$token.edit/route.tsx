import { useEffect, useState } from "react";
import { FieldValidator } from "@progress/kendo-react-form";
import { Dialog } from "@progress/kendo-react-dialogs";
import { useNavigate, useParams, useLocation, useOutletContext, useActionData } from "react-router-dom";
import { Form } from "@progress/kendo-react-form";
import { Field, FieldWrapper, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";


interface AtributedContext {
    atributedSelected: { idAtributo: number; nombre: string; nombreCorto: string };
}

const requiredValidator: FieldValidator = (value: any) => {
    return value ? "" : "Este campo es obligatorio.";
};


export default function AtributoEditar() {
    const { atributedSelected } = useOutletContext<AtributedContext>();
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const actionData = useActionData();
    
    const handleClose = () => {
      navigate(-1)
    };

    const [atributedRecive, setAtributedRecive] = useState<any>()
    
 

    useEffect(() => {
        
            setAtributedRecive(atributedSelected);
             

    }, [atributedSelected ]);

    


    return (
        <div>
           
                <Dialog title={"Editar Atributo"} onClose={handleClose}>
                {atributedRecive ? (
                    
                    <Form
                   // initialValues={atributedRecive}
                    onSubmit={(dataItem) => {
                        console.log(dataItem);
                        /* submit(dataItem); */
                    }}
                    render={(formRenderProps)=>{
                        <FormElement>
                            <FieldWrapper>
                            <Field
                                name={"idAtributo"}
                                component={Input}
                                type={"number"}
                                label={"idAtributo"}
                                readOnly
                            />
                            <Field
                                name={"nombre"}
                                component={Input}
                                type={"text"}
                                label={"Nombre"}
                                validator={requiredValidator}
                            />
                            <Field
                                name={"nombreCorto"}
                                component={Input}
                                type={"text"}
                                label={"Nombre corto"}
                                validator={requiredValidator}
                            />

                            </FieldWrapper>
                        </FormElement>
                    }}
                    />
                    
                    //<p>{atributedRecive.idAtributo}</p>
                ) : (
                    <p>Cargando...</p>
                )}
                    <button onClick={handleClose}>Cerrar</button>
                </Dialog>
           
        </div>
    );
}
