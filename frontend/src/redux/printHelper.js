import { useReactToPrint } from 'react-to-print';

export const usePrintHandler = (componentRef, setLoading) => {
  return useReactToPrint({
    content: () => {
        console.log('ComponentRef:', componentRef.current);
        return componentRef.current;
    },
    onBeforePrint: () => {
      setLoading(true);
    },
    onAfterPrint: () => {
      setLoading(false);
    },
  });
};
