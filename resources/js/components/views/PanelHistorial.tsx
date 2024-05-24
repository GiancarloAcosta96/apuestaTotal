import { Label, Panel, PanelType, Spinner, SpinnerSize } from "@fluentui/react";
import { useEffect, useState } from "react";
import { CalendarLtr24Regular } from "@fluentui/react-icons";
import React from "react";
import { ApuestaService } from "../services/ApuestaService";
import { IHistorial } from "../interfaz/IApuesta";

export const PanelHistorial = (props: any) => {

    useEffect(() => {
        lsHistorial();
        setHiddenSpinner(false);
    }, [props.playerId]);

    const [his, setHis] = useState<IHistorial[]>([]);
    const [hiddenSpinner, setHiddenSpinner] = useState(false);
    const [color, setColor] = useState("rgb(238, 39, 36)");
    const [contenedor, setContenedor] = useState(false);


    function lsHistorial() {
        setContenedor(true)
        ApuestaService.obtenerHistorial(props.playerId).then((res) => {
            if (res.status === 200) {
                setContenedor(false);
                setHiddenSpinner(true);
                setHis(res.data);
            }
        });
    }

    return (
        <>
            <Panel
                headerText="Historial de recargas"
                isOpen={props.isOpen}
                onDismiss={props.onDismiss}
                isLightDismiss={true}
                isHiddenOnDismiss={true}
                closeButtonAriaLabel="Close"
                // onRenderFooterContent={cuerpo}
                isFooterAtBottom={true}
            >
                <br />
                <div hidden={hiddenSpinner}>
                    <Spinner size={SpinnerSize.large} />
                </div>

                <div hidden={contenedor}>
                    {his && his.length > 0 ?(
                        his.map((vs) => (
                            <div key={vs.recargaId}>
                                <div
                                    id="contenedorGeneral"
                                    style={{ display: "flex", gap: "35px", fontSize: "15px" }}>
                                    {/* Iconos */}
                                    <div
                                        id="iconos"
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}>
                                        <div
                                            style={{
                                                fontSize: "20px",
                                                backgroundColor: "#e2f4fc",
                                                padding: "20%",
                                                borderRadius: "20%",
                                                color: color,
                                            }}
                                            id="calendario">
                                            <CalendarLtr24Regular />
                                        </div>
                                        <hr
                                            style={{
                                                border: "none",
                                                borderLeft: "1px solid #999",
                                                height: "100%",
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "5px",
                                        }}>
                                        <b style={{ marginBottom: "5px", fontSize:"18px" }}>{vs.fecha}</b>
                                        <div>
                                            <b>Monto recargado </b>
                                            <br />
                                            <span>S/ {vs.monto_recarga}</span>
                                        </div>
                                        <div>
                                            <b>Banco</b>
                                            <br />
                                            <span>{vs.banco}</span>
                                        </div>
                                        <div>
                                            <b>Canal de atención</b>
                                            <br />
                                            <span>{vs.canalAtencion}</span>
                                        </div>
                                        <div>
                                            <b>Hora de recarga</b>
                                            <br />
                                            <span>{vs.hora}</span>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        ))) : <h3>No se han realizado recargas</h3>
                        }
                </div>
            </Panel>
        </>
    );
};
