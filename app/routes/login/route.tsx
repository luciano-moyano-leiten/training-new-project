import {  Outlet, useActionData, useSubmit } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form"; // Replace with the actual path to FieldWrapper
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { useState } from "react";
import {redirect, ActionFunction } from "@remix-run/node";

type ActionData = {
    // Define the properties of ActionData here
    message?: string;
    error?: string;
};


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const requestBody = JSON.stringify({ codUsr: username, passWord: password });

    
    const response = await fetch("https://apptesting.leiten.dnscheck.com.ar/Contexto/Contexto/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: requestBody,
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        return json({ error: errorData.message || "Login failed" }, { status: response.status });
    }
    
    const data = await response.json();
    const token = data.sessionId;


    return redirect(`/atributos/${token}`);
    
}

export default function Login() {
    const actionData = useActionData<ActionData>();
    const submit = useSubmit();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h1>Este es un Login</h1>
            <Form onSubmit={(dataItem) => {
                console.log(dataItem);
                submit(dataItem, { method: "post" });
            }}
                render={(formRenderProps) => (
                    <FormElement>
                        <FieldWrapper>
                            <Field
                                component={Input}
                                id="username"
                                name="username"
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value )}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Field
                                component={Input}
                                id="password"
                                name="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value )}
                            />
                        </FieldWrapper>
                        
                        {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
                    <div className="k-form-buttons">
                            <button
                                type={'submit'}
                                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                                disabled={!formRenderProps.allowSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </FormElement>
                )}
                />
                <Outlet/>
        </div>
    );
}

