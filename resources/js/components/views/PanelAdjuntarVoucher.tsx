import { ActivityItem, DefaultButton, PrimaryButton, Spinner, SpinnerSize, TextField, Toggle, setVirtualParent, useFocusRects } from '@fluentui/react';
import { Panel } from '@fluentui/react/lib/Panel';
import React, {  useEffect, useState } from 'react';
import { IAdjuntar, ICliente } from '../interfaz/IApuesta';
import { ApuestaService } from '../services/ApuestaService'
import { Button, Link } from '@fluentui/react-components';
import { ArrowUpload24Filled } from '@fluentui/react-icons';
import axios from 'axios';
const buttonStyles = { root: { marginRight: 8 } };

export interface IFile {
    nombre: string;
    tamanio: number;
    tipo: string;
  }

  export interface IDetalleArchivo {
    imagen: string;
    extension: string;
  }

export const PanelAdjuntarVoucher = (props: any) => {
    const [hiddenSpinner, setHiddenSpinner] = useState(false);
    const [contenedor, setContenedor] = useState(false);
    const [formFill, setFormFill] = useState(true);
    const [fileDetail, setfileDetail] = useState<IFile>(null!);
    const [detalleArchivo, setDetalleArchivo] = useState<IDetalleArchivo>(null!);
    const [dataAdjuntar, setDataAdjuntar] = useState<IAdjuntar>({
        imagen: "abc"
    });

    useEffect(() => {
        validarForm();
      }, [dataAdjuntar]);

    const validarForm = () => {
        if (dataAdjuntar == null) setFormFill(true);
        if (dataAdjuntar !== null) {
          if (
            dataAdjuntar.imagen != ""
          ) {
            setFormFill(false);
          } else {
            setFormFill(true);
          }
        }
      };
    

    //AQuí creo al cliente
    // function crear() {
    //     const newValidacion: IAdjuntar = { 
    //         ...dataAdjuntar, 
    //     };
    //     setHiddenSpinner(true);
    //     setContenedor(true);
    //     ApuestaService.adjuntarImagen("1049", detalleArchivo)
    //         .then((res) => {
    //             if(res.status === 200) {
    //                 props.onDismiss();
    //                 props.reload();
    //                 setContenedor(false)
    //                 setHiddenSpinner(false);
    //                 cleanInputs()
    //             }
    //         })
    //         .catch((e) => {
    //             console.error("Error en la solicitud:", e.message);        
    //         });
    // }

    function cleanInputs() {
        setDataAdjuntar({
            imagen:""
        })
    }


    const cuerpo = React.useCallback(
        () => (
            <div>
                <PrimaryButton
                //  disabled={formFill}
                //   onClick={crear} styles={buttonStyles}
                  >
                    Guardar
                </PrimaryButton>
                <DefaultButton onClick={props.onDismiss}>Cancelar</DefaultButton>
            </div>
        ),
        [props.dismissPanel, dataAdjuntar],
    );


    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            alert('Selecciona un archivo primero.');
            return;
        }

        const formData = new FormData();
        formData.append('imagen', selectedFile);

        try {
            const response = await axios.post(`http://localhost:8000/api/clientes/1049/imagenes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('URL de la imagen:', response.data.url);
            alert('Imagen cargada correctamente.');
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            alert('Error al cargar la imagen.');
        }
    };


    return (
        <div>
            <Panel
                headerText="Adjuntar Imagen"
                isOpen={props.isOpen}
                onDismiss={props.onDismiss}
                isLightDismiss={true}
                isHiddenOnDismiss={true}
                closeButtonAriaLabel="Close"
                onRenderFooterContent={cuerpo}
                isFooterAtBottom={true}
            >
                <pre>{JSON.stringify(dataAdjuntar, null,2)}</pre>
                <pre>{JSON.stringify(detalleArchivo, null,2)}</pre>
                <br />

                <div hidden={!hiddenSpinner}>
                <Spinner size={SpinnerSize.large} />
                </div>

                <div hidden={contenedor}>
                {/* <TextField
                    label="Nombres"
                    onChange={(e, o) => _onChangeTextField("nombre", e, o)}
                    value={dataCrearCliente?.nombre}
                /> */}
               <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Cargar Imagen</button>
        </div>

                </div>
            </Panel>
        </div>
    );
};
