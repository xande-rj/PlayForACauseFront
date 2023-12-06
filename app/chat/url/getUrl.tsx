// useUrlParams.ts
import { useState, useEffect } from 'react';

export function useUrlParams() {
  const [params, setParams] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Função para obter os parâmetros da URL
    const getUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paramsObj: { [key: string]: string } = {};

      // Itera sobre os parâmetros e adiciona ao objeto paramsObj
      for (const [key, value] of urlParams.entries() as IterableIterator<[string, string]>) {
        paramsObj[key] = value;
      }

      return paramsObj;
    };

    // Atualiza o estado com os parâmetros da URL
    setParams(getUrlParams());
  }, []);

  return params;
}
