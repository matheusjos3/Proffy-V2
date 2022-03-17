export function isEmpty(value: any) {
    if (value === '' || value === null || value === undefined || value.length <= 0 ) {
        throw 'Alguns dados estão vázios.'
    }
}