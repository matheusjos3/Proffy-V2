export default function toReal(value: number) {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}