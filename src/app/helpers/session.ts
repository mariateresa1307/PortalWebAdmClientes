"use client";
export const getSession = (): {
  token: string;
  expiracion: string;
  loginUsuario: string;
} => {
  if (typeof window === "undefined")
    return { token: "", expiracion: "", loginUsuario: "" };

  const session = JSON.parse(localStorage.getItem("ntu-session") || "{}");
  return session;
};

type AvailablePages = Array<{
  codPpagina: string;
  nombrePagina: string;
}> | [];

export const getAvailablePagesFromSession = (): AvailablePages => {
  if (typeof window === "undefined")
    return [];

  const storedData = JSON.parse(
    localStorage.getItem("ntu-availablePages") || "{}"
  );
  return storedData;
};


export  const findAccion = (name: string, data: any) => {
  const result = data.find((value: any) => value.nombreAccion === name);
  return result ? true: false; 
} 