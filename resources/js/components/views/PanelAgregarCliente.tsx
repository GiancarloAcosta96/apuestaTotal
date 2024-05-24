import { DefaultButton, PrimaryButton, Spinner, SpinnerSize, TextField, Toggle, useFocusRects } from '@fluentui/react';
import { Panel } from '@fluentui/react/lib/Panel';
import React, {  useEffect, useState } from 'react';
import { ICliente } from '../interfaz/IApuesta';
import { ApuestaService } from '../services/ApuestaService'
const buttonStyles = { root: { marginRight: 8 } };

export const PanelAgregarCliente = (props: any) => {
    const [hiddenSpinner, setHiddenSpinner] = useState(false);
    const [contenedor, setContenedor] = useState(false);
    const [formFill, setFormFill] = useState(true);
    const [dataCrearCliente, setDataCrearCliente] = useState<ICliente>({
        nombre: "",
        apellidos: "",
        dni:""
    });

    useEffect(() => {
        validarForm();
      }, [dataCrearCliente]);

    const validarForm = () => {
        if (dataCrearCliente == null) setFormFill(true);
        if (dataCrearCliente !== null) {
          if (
            dataCrearCliente.nombre != "" &&
            dataCrearCliente.apellidos != "" &&
            dataCrearCliente.dni != ""
          ) {
            setFormFill(false);
          } else {
            setFormFill(true);
          }
        }
      };
    

    //AQuí creo al cliente
    function crear() {
        const newValidacion: ICliente = { 
            ...dataCrearCliente, 
        };
        setHiddenSpinner(true);
        setContenedor(true);
        ApuestaService.crearCliente(newValidacion)
            .then((res) => {
                if(res.status === 201) {
                    props.onDismiss();
                    props.reload();
                    setContenedor(false)
                    setHiddenSpinner(false);
                    cleanInputs()
                }
            })
            .catch((e) => {
                console.error("Error en la solicitud:", e.message);        
            });
    }

    function cleanInputs() {
        setDataCrearCliente({
            nombre:"",
            apellidos:"",
            dni:""
        })
    }

    const _onChangeTextField = (nombreTextField: string | undefined, evento: any, nuevoValor: string | undefined) => {
        if (evento !== undefined) {
            if (nuevoValor !== undefined) {
                switch (nombreTextField) {
                    case "nombre":
                        setDataCrearCliente({
                            ...dataCrearCliente,
                            nombre: nuevoValor,
                        });
                        break;

                    case "apellidos":
                        setDataCrearCliente({
                            ...dataCrearCliente,
                            apellidos: nuevoValor,
                        });
                        break;

                    case "dni":
                    setDataCrearCliente({
                        ...dataCrearCliente,
                        dni: nuevoValor,
                    });
                    break;
                }
            }
        }
    };

    const cuerpo = React.useCallback(
        () => (
            <div>
                <PrimaryButton disabled={formFill} onClick={crear} styles={buttonStyles}>
                    Guardar
                </PrimaryButton>
                <DefaultButton onClick={props.onDismiss}>Cancelar</DefaultButton>
            </div>
        ),
        [props.dismissPanel, dataCrearCliente],
    );

    return (
        <div>
            <Panel
                headerText="Crea un usuario"
                isOpen={props.isOpen}
                onDismiss={props.onDismiss}
                isLightDismiss={true}
                isHiddenOnDismiss={true}
                closeButtonAriaLabel="Close"
                onRenderFooterContent={cuerpo}
                isFooterAtBottom={true}
            >
                <br />

                <div hidden={!hiddenSpinner}>
                <Spinner size={SpinnerSize.large} />
                </div>

                <div hidden={contenedor}>
                <TextField
                    label="Nombres"
                    onChange={(e, o) => _onChangeTextField("nombre", e, o)}
                    value={dataCrearCliente?.nombre}
                />
                <TextField
                    label="Apellidos"
                    onChange={(e, o) => _onChangeTextField("apellidos", e, o)}
                    value={dataCrearCliente?.apellidos}
                />
                <TextField
                    label="DNI"
                    onChange={(e, o) => _onChangeTextField("dni", e, o)}
                    value={dataCrearCliente?.dni}
                />
                </div>
            </Panel>
        </div>
    );
};
