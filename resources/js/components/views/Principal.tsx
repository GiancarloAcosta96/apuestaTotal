import React, { useEffect, useState } from 'react';
import { ApuestaService } from '../services/ApuestaService';
import { DetailsList, DetailsListLayoutMode, PrimaryButton, SelectionMode, TooltipHost } from '@fluentui/react';
import { Button, FluentProvider } from '@fluentui/react-components';
import { Info24Regular, MoneyRegular } from '@fluentui/react-icons';
import { useBoolean } from "@fluentui/react-hooks";
import { PanelHistorial } from './PanelHistorial';
import { PanelAgregarCliente } from './PanelAgregarCliente';
import { PanelRecargarSaldo } from './PanelRecargarSaldo';
import { PanelAdjuntarVoucher } from './PanelAdjuntarVoucher';

const Principal = (props: any) => {
    const [clientesLista, setClientesLista] = useState([]);
    const [playerId, setPlayerId] = useState("");
    const [isOpenHis, { setTrue: openHis, setFalse: dismissPanelHis }] =
        useBoolean(false);
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = 
        useBoolean(false);
    const [isOpenRecargar, { setTrue: openPanelRecargar, setFalse: dismissPanelRecargar }] = 
        useBoolean(false);
    const [isOpenAdjuntar, { setTrue: openPanelAdjuntar, setFalse: dismissPanelAdjuntar }] = 
        useBoolean(false);

    // Consuta a la bd
    function listarClientes() {
        ApuestaService.listarClientesServ().then((res) => {
            if (res.status == 200) {
                setClientesLista(res.data);
            }
        }).catch((e) => {
            console.error("Error en la solicitud:", e.message);
        });
    }

    const _mostrarTabla = () => {
        listarClientes()
    }

    useEffect(() => {
        _mostrarTabla()
    }, [])

    const columns = [
        { key: 'playerId', name: 'PlayerId', fieldName: 'playerId', minWidth: 50, maxWidth: 100 },
        { key: 'nombre', name: 'Nombre', fieldName: 'nombre', minWidth: 100, maxWidth: 200 },
        { key: 'apellidos', name: 'Apellidos', fieldName: 'apellidos', minWidth: 200, maxWidth: 200 },
        { key: 'dni', name: 'DNI', fieldName: 'dni', minWidth: 200, maxWidth: 200 },
        { key: 'recargas_sum_monto_recarga', name: 'Saldo', fieldName: 'recargas_sum_monto_recarga', minWidth: 200, maxWidth: 200 },
        {
            key: "render",
            label: "Opciones",
            name: "Opciones",
            minWidth: 200,
            onRender: (item) => renderOpciones(item),
        },
    ];

    function renderOpciones(item) {
        return (
            <>
                <TooltipHost content={"Historial Cliente"}>
                    <Button
                        style={{
                            padding: "3px",
                        }}
                        appearance="transparent"
                        icon={<Info24Regular />}
                        onClick={() => {
                            setPlayerId(item.playerId);
                            openHis();
                        }}
                    />
                </TooltipHost>
                <TooltipHost content={"Recargar Saldo"}>
                    <Button
                        style={{
                            padding: "3px",
                        }}
                        appearance="transparent"
                        icon={<MoneyRegular />}
                        onClick={() => {
                            setPlayerId(item.playerId);
                            openPanelRecargar();
                        }}
                    />
                </TooltipHost>

                {/* <TooltipHost content={"Adjuntar Imagen"}>
                    <Button
                        style={{
                            padding: "3px",
                        }}
                        appearance="transparent"
                        icon={<MoneyRegular />}
                        onClick={() => {
                            setPlayerId(item.playerId);
                            openPanelAdjuntar();
                        }}
                    />
                </TooltipHost> */}
            </>
        );
    }

    return (
        <FluentProvider>
            <div>
                <h2>Lista de Clientes</h2>
                <div style={{display:"flex", gap:"5%"}}>
                    <PrimaryButton text="Crear Usuario" onClick={openPanel}/> 
                    <PrimaryButton text="Actualizar" onClick={_mostrarTabla}/> 
                </div>
                <DetailsList
                    items={clientesLista}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                />

                <PanelHistorial
                    isOpen={isOpenHis}
                    onDismiss={dismissPanelHis}
                    playerId={playerId}
                />

                <PanelAgregarCliente
                    isOpen={isOpen}
                    onDismiss={dismissPanel}
                    reload={_mostrarTabla}
                /> 

                <PanelRecargarSaldo
                    isOpen={isOpenRecargar}
                    onDismiss={dismissPanelRecargar}
                    playerId={playerId}
                    reload={_mostrarTabla}
                />

                <PanelAdjuntarVoucher
                    isOpen={isOpenAdjuntar}
                    onDismiss={dismissPanelAdjuntar}
                    playerId={playerId}
                    reload={_mostrarTabla}
                />
            </div>
        </FluentProvider>
    );
}

export default Principal