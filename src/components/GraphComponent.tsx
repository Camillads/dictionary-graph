import React, { useEffect, useRef, useState } from "react";
import { DataSet, Network } from "vis-network/standalone";

const GraphComponent = ({ data }: any) => {
  const graphRef = useRef<any>(null);
  const networkRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const normalizeWord = (text: string) => {
    return decodeURIComponent(text);
  };

  useEffect(() => {
    if (!graphRef.current) return;

    setLoading(true);

    const nodes = new DataSet(
      data?.map((entry: { word: any }) => ({
        id: normalizeWord(entry?.word),
        label: normalizeWord(entry?.word),
      }))
    );

    const edges = new DataSet(
      data.reduce(
        (
          acc: any[],
          entry: { synonyms: any[]; word: any; antonyms: any[] }
        ) => {
          acc.push(
            ...entry.synonyms.map((synonym) => ({
              from: normalizeWord(entry.word),
              to: synonym,
              color: "green",
            })),
            ...entry.antonyms.map((antonym) => ({
              from: normalizeWord(entry.word),
              to: antonym,
              color: "red",
            }))
          );
          return acc;
        },
        []
      )
    );

    const container = graphRef.current;
    var options = {};

    const netWorkData: any = {
      nodes: nodes,
      edges: edges,
    };

    const network = new Network(container, netWorkData, options);
    networkRef.current = network;

    setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => {
      network.destroy();
    };
  }, [data]);

  useEffect(() => {
    if (networkRef.current) {
      console.log("Instância da rede:", networkRef.current);
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          Aguarde uns instante que os dados serão carregados...
        </div>
      )}
      <div
        className="flex items-center"
        ref={graphRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default GraphComponent;
