import {  DefaultButton, IDatePickerStrings, PrimaryButton, Spinner, SpinnerSize, TextField, Toggle, defaultDatePickerStrings, useFocusRects } from '@fluentui/react';
import { Panel } from '@fluentui/react/lib/Panel';
import React, {  useEffect, useState } from 'react';
import { ICliente, IRecargar } from '../interfaz/IApuesta';
import { ApuestaService } from '../services/ApuestaService'
import { Field, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
// import { DatePicker } from '@fluentui/react-datepicker-compat';
const buttonStyles = { root: { marginRight: 8 } };

export const infoDatePicker: IDatePickerStrings = {
    ...defaultDatePickerStrings,
    months: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octtubre', 'Noviembre', 'Diciembre'
    ],
    shortMonths: [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ],
    shortDays: [
      "D", "L","M","M","J","V","S"
    ],
    days: [
      "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
    ],
    isRequiredErrorMessage: "Seleccione una fecha válida"
  };

export const PanelRecargarSaldo = (props: any) => {
    const [hiddenSpinner, setHiddenSpinner] = useState(false);
    const [contenedor, setContenedor] = useState(false);
    const [formFill, setFormFill] = useState(true);
    const [dataRecargarSaldo, setDataRecargarSaldo] = useState<IRecargar>({
        monto_recarga: "",
        banco: "",
        fecha:"",
        hora:"",
        canalAtencion:""
    });
    //Formato d fecha
    const _formatDate_DDMMYY = (date?: Date): string => {
        return !date
          ? ""
          : (date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`) +
              "/" +
              (date.getMonth() + 1 > 9
                ? date.getMonth() + 1
                : `0${date.getMonth() + 1}`) +
              "/" +
              date.getFullYear();
      };
    const [fechaProgramada, setFechaProgramada] = useState<Date | null>();

    useEffect(() => {
        validarForm();
      }, [dataRecargarSaldo, props.isOpen]);

    const validarForm = () => {
        if (dataRecargarSaldo == null) setFormFill(true);
        if (dataRecargarSaldo !== null) {
          if (
            dataRecargarSaldo.monto_recarga != "" &&
            dataRecargarSaldo.banco != "" &&
            dataRecargarSaldo.fecha != "" &&
            dataRecargarSaldo.hora != "" &&
            dataRecargarSaldo.canalAtencion
          ) {
            setFormFill(false);
          } else {
            setFormFill(true);
          }
        }
      };
    

    //Realizo la recargaa
    function recargar() {
        const newValidacion: IRecargar = { 
            ...dataRecargarSaldo, 
        };
        setHiddenSpinner(true);
        setContenedor(true);
        ApuestaService.recargarSaldo(props.playerId,newValidacion)
            .then((res) => {
                if(res.status === 200) {
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
        setDataRecargarSaldo({
            monto_recarga:"",
            banco:"",
            fecha:"",
            hora: "",
            canalAtencion:""
        })
    }

    const _onChangeTextField = (nombreTextField: string | undefined, evento: any, nuevoValor: string | undefined) => {
        if (evento !== undefined) {
            if (nuevoValor !== undefined) {
                switch (nombreTextField) {
                    case "monto_recarga":
                        setDataRecargarSaldo({
                            ...dataRecargarSaldo,
                            monto_recarga: nuevoValor,
                        });
                        break;

                    case "banco":
                        setDataRecargarSaldo({
                            ...dataRecargarSaldo,
                            banco: nuevoValor,
                        });
                        break;

                    case "canalAtencion":
                        setDataRecargarSaldo({
                            ...dataRecargarSaldo,
                            canalAtencion: nuevoValor,
                        });
                        break;

                    case "hora":
                        const formatoHoraValido = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
                        if (formatoHoraValido.test(nuevoValor)) {
                            setDataRecargarSaldo({
                                ...dataRecargarSaldo,
                                hora: nuevoValor,
                            });
                        } else {
                            const horaConSegundos = nuevoValor + ":00";
                            setDataRecargarSaldo({
                                ...dataRecargarSaldo,
                                hora: horaConSegundos,
                            });
                        }
                        break;
                }
            }
        }
    };

    const cuerpo = React.useCallback(
        () => (
            <div>
                <PrimaryButton 
                 disabled={formFill}
                 onClick={recargar} styles={buttonStyles}>
                    Guardar
                </PrimaryButton>
                <DefaultButton onClick={props.onDismiss}>Cancelar</DefaultButton>
            </div>
        ),
        [props.dismissPanel, dataRecargarSaldo],
    );

    return (
        <FluentProvider theme={webLightTheme}>
            <Panel
                headerText="Recargar Saldo"
                isOpen={props.isOpen}
                onDismiss={props.onDismiss}
                isLightDismiss={true}
                isHiddenOnDismiss={true}
                closeButtonAriaLabel="Close"
                onRenderFooterContent={cuerpo}
                isFooterAtBottom={true}
            >
                 {/* <pre>{JSON.stringify(dataRecargarSaldo, null,2)}</pre>  */}
                <br />
                <div hidden={!hiddenSpinner}>
                <Spinner size={SpinnerSize.large} />
                </div>

                <div hidden={contenedor}>
                <TextField
                    label="Ingrese el monto en soles"
                    onChange={(e, o) => _onChangeTextField("monto_recarga", e, o)}
                    value={dataRecargarSaldo?.monto_recarga}
                />

                <TextField
                style={{marginBottom:"5px"}}
                    label="Ingrese el banco"
                    onChange={(e, o) => _onChangeTextField("banco", e, o)}
                    value={dataRecargarSaldo?.banco}
                />

                <TextField
                style={{marginBottom:"5px"}}
                    label="Canal de atención"
                    onChange={(e, o) => _onChangeTextField("canalAtencion", e, o)}
                    value={dataRecargarSaldo?.canalAtencion}
                />
                <br/>
                <Field style={{ fontWeight: "600" }} label="Fecha de recarga">
                <DatePicker
                  placeholder="Seleccione una fecha"
                  strings={infoDatePicker}
                  formatDate={(arg) => _formatDate_DDMMYY(arg)}
                  onSelectDate={(date?: any) => {
                    if (date != undefined) {
                      let year = date.getFullYear();
                      let month = date.getMonth() + 1;
                      let day = date.getDate();
                      let formattedDate = `${year}-${month
                        .toString()
                        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                      setDataRecargarSaldo({
                        ...dataRecargarSaldo,
                        fecha: formattedDate,
                      });
                      setFechaProgramada(date);
                    }
                  }}
                  value={fechaProgramada}
                //   minDate={tomorrow}
                />
              </Field>
                <br/>
                <TextField
                    type='time'
                    label="Ingrese la hora"
                    onChange={(e, o) => _onChangeTextField("hora", e, o)}
                    value={dataRecargarSaldo?.hora}
                />
                </div>
            </Panel>
        </FluentProvider>
    );
};
