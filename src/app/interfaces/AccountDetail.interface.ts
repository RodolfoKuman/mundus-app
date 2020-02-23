export interface AcountDetail {
    capitaloriginal: string;
    referencia: string;
    tasainteres: string;
    capitalactual: string;
    mesesatrasados?: string;
    ultimopagoregistrado?: string;
    plazocontrato: string;
    fechainicial: string;
    proximamensualidad: string;
    mensualidadrestante?: string;
    fechafinalcontrato: string;
    ultimamensualidadabonada?: string;
    mensualidadesvencidad?: string
}

export interface Desarrollo{
    id_desarrollo_lote: number;
    descripion: string;
}