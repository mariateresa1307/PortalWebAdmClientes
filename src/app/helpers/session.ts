'use client'
export const getSession = (): {"token":string,"expiracion":string,"loginUsuario":string} => {
    if (typeof window === 'undefined') return {token: "", expiracion: "", loginUsuario: ""}

    const session = JSON.parse(localStorage.getItem("ntu-session") || "{}");
    return session
}