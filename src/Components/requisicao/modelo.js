import React, {useEffect} from 'react';
import './modelo.css';
import numeroPorExtenso from 'numero-por-extenso';
import { data } from 'autoprefixer';
import dayjs from 'dayjs';
import Barcode from 'react-barcode';

const ModeloRequisicao = ({ data, bill }) => {

    useEffect(() => {
        console.log(data);
    }, [data]);

    const getDataAtual = () => {
        if(data?.expense?.data){
            const meses = [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro",
            ];
    
            const data2 = dayjs(data?.data_criacao).toDate();
            const dia = data2.getDate();
            const mes = meses[data2.getMonth()];
            const ano = data2.getFullYear();
    
            return `${dia} de ${mes} de ${ano}`;
        } else{
            return '';
        }
    }

    const formatarMoeda = (valor) => {
        return valor.toLocaleString("pt-PT", {
            style: "currency",
            currency: "MZN",
        });
    }

    const valorPorExtenso = (valor) => {
        return numeroPorExtenso.porExtenso(valor);
    }

    return (
        <div>
            <div class="pagina">
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">
                                <div class="logo-container">
                                    <img class="logoUem" src={require('../../assets/logo/logo-v2.png')} alt="uem" />
                                    <p style={{ fontSize: '14pt', fontWeight: 'bold' }}>{JSON.parse(sessionStorage.getItem("user")).ent}</p>
                                </div>
                            </th>
                        </tr>
                        <div class="qrCode">
                            <Barcode 
                            value={Number(data?.expense?.bar_code.slice(-10))}
                            displayValue={false}
                            width={1.5}
                            height={40}
                            />
                        </div>
                        <tr>
                            <th colspan="2"><b style={{ fontSize: '13pt' }}>Pedido de Fundos à Tesouraria</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="2">
                                <b>
                                    <p>Nᵒ.{data?.id}/{JSON.parse(sessionStorage.getItem("user")).entID}/{new Date().getFullYear()} &nbsp;&nbsp;&nbsp;&nbsp; Rubrica nᵒ <span style={{ color: 'red' }}>______{data?.expense?.expense_type?.codigo}____
                                    </span>Sector
                                        requisitante: <span style={{ color: 'red' }}>{data?.expense?.sector}</span>
                                    </p>
                                    <p>Fundos do Orçamento de Funcionamento</p>
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: '100px', width: '50%' }}><b>A favor: {data?.expense?.fornecedor?.name}</b></td>
                            <td style={{ width: '50%' }}><b>Data: {getDataAtual()}</b></td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <p>Requisita-se o valor de: <u><b>{formatarMoeda(parseFloat(data?.expense?.valor))}({valorPorExtenso(parseFloat(data?.expense?.valor))})</b></u>______________
                                </p>
                                <p>________________________________________________________________________________________________
                                </p>
                                <p><b>Pagamento de</b>: {data?.expense?.descricao}___________________</p>
                                <b>
                                    <p>1. Pagamento por {bill?.type=='1'?'Cheque':'Transferência Bancária'} {bill?.banco} nᵒ.{bill?.numero}</p>
                                </b>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ height: '100px', width: '50%', verticalAlign: 'top' }}><b>O Requisitante:</b></td>
                            <td style={{ height: '100px', width: '50%', verticalAlign: 'top' }}><b>Parecer do Chefe do DAF:</b></td>
                        </tr>
                        <tr>
                            <td style={{ height: '100px', width: '50%', verticalAlign: 'top' }}><b>Recebido em:</b></td>
                            <td style={{ height: '100px', width: '50%', verticalAlign: 'top' }}><b>Autorizado:</b></td>
                        </tr>
                        <tr>
                            <td style={{ height: '100px', width: '50%', verticalAlign: 'top' }}><b>Observações:</b></td>
                            <td style={{ height: '100px', width: '50%', verticalAlign: 'top' }}><b>Data:</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ModeloRequisicao;