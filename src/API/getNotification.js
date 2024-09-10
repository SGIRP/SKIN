import { getEstanciaEco, getLicensas, getSociedadeSolicitacoes, getSociedades, getVistorias, getVistoriasUser } from "./StaticGetters"

export const agentNotification=async()=>{
    let societyCount = await getSociedades(false, true)
    let ecoCount = await getEstanciaEco(JSON.parse(sessionStorage.getItem('user')).unidade?.id, '1', true)
    sessionStorage.setItem('societyCount', societyCount?societyCount.count:0)
    sessionStorage.setItem('ecoCount', ecoCount?ecoCount.pendente:0)
}

export const representativeNotification=async()=>{
    let count = await getSociedadeSolicitacoes(JSON.parse(sessionStorage.getItem('sociedade')).id,'Pendente', true)
    sessionStorage.setItem('societyRequestCount', count?count.count:0)
}

export const dlciNotification=async()=>{
    let count = await getLicensas('1', true)
    let count2 = await getVistorias('1',true)
    sessionStorage.setItem('companyCount', count?count.pendentes:0)
    sessionStorage.setItem('vistoriasMarked', count2?count2.agendados:0)
    sessionStorage.setItem('vistoriasEnded', count2?count2.terminados:0)
    sessionStorage.setItem('vistoriasPosterior', count2?count2.posterior:0)
    sessionStorage.setItem('vistoriasDir', count2?count2.dir:0)
}

export const agentMicNotification=async()=>{
    let count =await getVistoriasUser(JSON.parse(sessionStorage.getItem('user')).user, true)
    sessionStorage.setItem('micWaitCount', count?count.pendentes:0)
    sessionStorage.setItem('micMarkedCount', count?count.agendados:0)
}