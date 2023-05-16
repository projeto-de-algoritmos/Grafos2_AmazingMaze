import React, { useState, useEffect } from "react";

export default function Cronometro({ destino }) {
    const [tempo, setTempo] = useState(0);

    const formatarTempo = (segundos) => {
        const minutos = Math.floor((segundos % 3600) / 60);
        const segundosRestantes = segundos % 60;

        return `${minutos
            .toString()
            .padStart(2, "0")}:${segundosRestantes.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        let interval;

        if (!destino.alcancado) {
            interval = setInterval(() => {
                setTempo((prevTempo) => prevTempo + 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [destino.alcancado]);

    return <div>{formatarTempo(tempo)}</div>;
}