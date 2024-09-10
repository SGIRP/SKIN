import axios from 'axios';
import { notification } from 'antd';

export const getProfilePicture = async () => {
    await axios.get(localStorage.getItem('url') + '/api/user/picture/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`,
            },
            responseType: 'blob'
        })
        .then(response => {
            sessionStorage.setItem('profile', URL.createObjectURL(response.data))
        }).catch(err => {
            
        }
        )
}

export const getProvinces = () => {
    const Provinces = [
        {
            id: '0',
            name: 'Maputo Cidade',
            country: 'Moçambique',
        },
        {
            id: '1',
            name: 'Maputo',
            country: 'Moçambique',
        },
        {
            id: '3',
            name: 'Gaza',
            country: 'Moçambique',
        },
        {
            id: '4',
            name: 'Inhambane',
            country: 'Moçambique',
        },
        {
            id: '5',
            name: 'Sofala',
            country: 'Moçambique',
        },
        {
            id: '6',
            name: 'Manica',
            country: 'Moçambique',
        },
        {
            id: '7',
            name: 'Tete',
            country: 'Moçambique',
        },
        {
            id: '8',
            name: 'Zambezia',
            country: 'Moçambique',
        },
        {
            id: '9',
            name: 'Nampula',
            country: 'Moçambique',
        },
        {
            id: '10',
            name: 'Cabo Delgado',
            country: 'Moçambique',
        },
        {
            id: '11',
            name: 'Niassa',
            country: 'Moçambique',
        },
    ]

    return Provinces;
}

export const getModeTransport = () => {
    const ModeTransport = [
        {
            id: '0',
            name: 'Rodoviário',
        },
        {
            id: '1',
            name: 'Ferroviário',
        },
        {
            id: '2',
            name: 'Aéreo',
        },
        {
            id: '3',
            name: 'Marítimo',
        },
        {
            id: '4',
            name: 'Fluvial',
        },
        {
            id: '5',
            name: 'Lacustre',
        },
        {
            id: '6',
            name: 'Cabos',
        },
        {
            id: '7',
            name: 'Tubagem',
        },
    ]

    return ModeTransport;

}

export const getUnits = async () => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/organograma/unit/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar estâncias'
            })
        })
    return dados;
}

export const getUnit = async (id) => {
    let dados = {}
    await axios.get(localStorage.getItem('url') + '/api/organograma/unit/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }
        ).catch(err => {
            notification.error({
                message: 'Erro ao buscar estância'
            })
        })
    return dados;
}


export const getStates = async () => {
    let dados = {}
    await axios.get(localStorage.getItem('url') + '/api/organograma/states/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }
        ).catch(err => {
            notification.error({
                message: 'Erro ao buscar estados'
            })
        })
    return dados;
}

export const getGroups = async (tipo) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/user/role/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                type: tipo
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar grupos'
            })
        })
    return dados;
}

export const getUsers = async (tipo) => {
    console.log(tipo)
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/user/admin/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                type: tipo
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar usuários'
            })
        })
    return dados;
}

export const getUser = async (id) => {
    let dados = {}
    await axios.get(localStorage.getItem('url') + '/api/user/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }
        ).catch(err => {
            notification.error({
                message: 'Erro ao buscar usuário'
            })
        })
    return dados;
}

export const getHistory = async () => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/user/history/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
            console.log(res.data)
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar historico'
            })
        })
    return dados;
}

export const getNuit = async () => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/exporter/nuit/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
            console.log(res.data)
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar Nuits'
            })
        })
    return dados;
}

export const getPauta = async () => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/exporter/pauta/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
            console.log(res.data)
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar Pautas'
            })
        })
    return dados;
}

export const getEmpresa = async (id) => {
    let dados = {}
    try {
        await axios.get(localStorage.getItem('url') + '/api/exporter/empresa/' + id + '/',
            {
                headers: {
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
            }).then(res => {
                dados = res.data
            }
            )
    } catch (error) {
        dados = null
    }
    return dados;
}

export const getEmpresas = async () => {
    let dados = []
    try {
        await axios.get(localStorage.getItem('url') + '/api/exporter/empresa/',
            {
                headers: {
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
            }).then(res => {
                dados = res.data
            }
            )
    } catch (error) {
        dados = null
    }
    return dados;
}

export const getNuitDetails = async (id) => {
    let dados = {}
    try {
        await axios.get(localStorage.getItem('url') + '/api/exporter/nuit/' + id + '/',
            {
                headers: {
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
            }).then(res => {
                dados = res.data
            }
            )
    } catch (error) {
        dados = null
    }
    return dados;
}

export const getRamoAtividade = async () => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/exporter/ramoatividade/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
            console.log(res.data)
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar Ramos de Atividade'
            })
        })
    return dados;
}

export const getAtividades = async () => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/exporter/atividade/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
            console.log(res.data)
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar Atividades'
            })
        })
    return dados;
}

export const getSociedade = async (id) => {
    let dados = {}
    await axios.get(localStorage.getItem('url') + '/api/sociedade/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
            console.log(res.data)
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getSociedadeMembers = async (id) => {
    let dados = {}
    await axios.get(localStorage.getItem('url') + '/api/sociedade/membros/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
            console.log(res.data)
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getDespachante = async (id) => {
    let dados = {}
    await axios.get(localStorage.getItem('url') + '/api/sociedade/membro/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
            console.log(res.data)
        }).catch(err => {
            dados = null
            notification.error({
                message: 'Erro ao buscar despachante'
            })
        }
        )
    return dados;
}

export const getSociedades = async (type, count) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/sociedade/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                active: type,
                count: count ? true : false
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar sociedades'
            })
        })
    return dados;
}

export const getSociedadesList = async (type, count) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/sociedade/list/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                active: type,
                count: count ? true : false
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar sociedades'
            })
        })
    return dados;
}

export const getSociedadeSolicitacoes = async (id, type, count) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/exporter/sociedade/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                type: type,
                count: count ? true : false
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            notification.error({
                message: 'Erro ao buscar solicitações'
            })
        })
    return dados;
}


export const getExporterMembers = async (id) => {
    let dados = {}
    await axios.get(localStorage.getItem('url') + '/api/exporter/despachante/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getDespachanteAgentes = async (id) => {
    let dados = {}
    await axios.get(localStorage.getItem('url') + '/api/sociedade/despachante/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getAcordos = async (id) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/license/acordo/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getRegimes = async (id) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/license/regime/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getExporterLicensas = async (id) => {
    let dados = {}
    await axios.get(localStorage.getItem('url') + '/api/exporter/license/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getLicensas = async (type, count) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/license/list/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                type: type,
                count: count ? true : false
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getLicensasDespachante = async (id) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/sociedade/despachante/licensas/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getLicensa = async (id) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/license/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getVistoriasUser = async (id, count) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/license/allocate/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                user: id,
                count: count ? true : false
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getVistoria = async (id) => {
    let dados = {}
    await axios.get(localStorage.getItem('url') + '/api/license/allocate/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getVistorias = async (type, count) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/license/vistorias/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                type: type,
                count: count ? true : false
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getEstanciaEco = async (id, type, count) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/organograma/eco/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                type: type,
                count: count ? true : false
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getEcoDespachante = async (id) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/sociedade/despachante/eco/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getEcoAgente = async (id) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/exporter/eco/' + id + '/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
            console.log(res.data)
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getCertificado = async (ref) => {
    let dados = []
    let id = ref
    await axios.get(localStorage.getItem('url') + '/api/eco/reference/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                reference: id
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getCertificados = async (type) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/eco/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                type: type
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getNotifications = async (count, nova) => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/notification/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            },
            params: {
                count: count ? true : false,
                new: nova ? true : false
            }
        }).then(res => {
            dados = res.data
        }).catch(err => {
            dados = null
        }
        )
    return dados;
}

export const getLicensaHistory = async () => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/license/history/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }
        ).catch(err => {
            notification.error({
                message: 'Erro ao buscar historico'
            })
        })
    return dados;
}

export const getEcoHistory = async () => {
    let dados = []
    await axios.get(localStorage.getItem('url') + '/api/eco/history/',
        {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            dados = res.data
        }
        ).catch(err => {
            notification.error({
                message: 'Erro ao buscar historico'
            })
        })
    return dados;
}
