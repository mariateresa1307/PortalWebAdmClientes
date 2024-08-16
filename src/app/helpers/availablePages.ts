import { getAvailablePagesFromSession } from "./session";

export const AvailablePagesMap = {
  Usuarios: "/home",
  Clientes: "/clients",
  "Rep Clientes": "/reports",
  "Rep Operaciones x Usuario": "/reports",
  changePassword: "/users/restorePassword/"
};

export const hasAvailablePage = (page: string) => {
  const availablePagesFromSession = getAvailablePagesFromSession();

  for (const availablePage of availablePagesFromSession) {
    if (AvailablePagesMap[availablePage.nombrePagina] === page) {
      return true;
    }
  }

  return false;
};
