export function getLocalStorageUser() {
    const storageUser = localStorage.getItem('ssn_pyd')
    return storageUser ? JSON.parse(storageUser) : null
}

export function getLocalStorageToken() {
    const storageToken = localStorage.getItem('ssn_tkn')
    return storageToken ? storageToken : null
}

export function setLocalStorageUser(value: string) {
    localStorage.setItem('ssn_pyd', value)
}

export function setLocalStorageToken(value: string) {
    localStorage.setItem('ssn_tkn', value)
}

export function clearLocalStorageApp() {
    localStorage.removeItem('ssn_pyd')
    localStorage.removeItem('ssn_tkn')
}  