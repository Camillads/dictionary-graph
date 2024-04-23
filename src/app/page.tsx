"use client";

import GraphComponent from "@/components/GraphComponent";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchGraphData = async () => {
      const response = await fetch("/data/graphData.json");
      const dataJson = await response.json();
      setData(dataJson);
    };
    fetchGraphData();
  }, []);

  return <>{!!data && <GraphComponent data={data} />}</>;
}
