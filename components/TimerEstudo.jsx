import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Vibration } from "react-native";

export default function TimerEstudo() {
  // === ESTADOS PRINCIPAIS ===
  const [tempoMinutos, setTempoMinutos] = useState("30");
  const [segundosRestantes, setSegundosRestantes] = useState(25 * 60);
  const [ativo, setAtivo] = useState(false);
  const [sessoesCompletas, setSessoesCompletas] = useState(0);
  const [totalEstudadoSegundos, setTotalEstudadoSegundos] = useState(0);

  const tempoInicialRef = useRef(25 * 60);

  // Atualiza automaticamente o tempo quando o valor inicial muda no código
useEffect(() => {
  if (!ativo) {
    const minsNum = parseInt(tempoMinutos || "0", 10);
    const novoTempo = minsNum * 60;
    setSegundosRestantes(novoTempo);
    tempoInicialRef.current = novoTempo;
  }
}, [tempoMinutos]);


  // ===== INTERVALO DE CONTAGEM =====
  useEffect(() => {
    if (ativo && segundosRestantes > 0) {
      const id = setInterval(() => {
        setSegundosRestantes((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [ativo, segundosRestantes]);

  // ===== QUANDO CHEGA A ZERO =====
  useEffect(() => {
    if (segundosRestantes === 0 && ativo) {
      setAtivo(false);
      setSessoesCompletas((prev) => prev + 1);
      setTotalEstudadoSegundos((prev) => prev + tempoInicialRef.current);
      Vibration.vibrate(1000);
    }
  }, [segundosRestantes, ativo]);

  // ===== CONTROLES =====
  const handleIniciar = () => {
    if (segundosRestantes === 0) {
      const minsNum = parseInt(tempoMinutos || "0", 10);
      const novoTempo = minsNum * 60;
      setSegundosRestantes(novoTempo);
      tempoInicialRef.current = novoTempo;
    }
    setAtivo(true);
  };

  const handlePausar = () => setAtivo(false);

  const handleResetar = () => {
    const minsNum = parseInt(tempoMinutos || "0", 10);
    const novoTempo = minsNum * 60;
    setSegundosRestantes(novoTempo);
    tempoInicialRef.current = novoTempo;
    setAtivo(false);
  };

  const handleChangeMinutos = (text) => {
    const somenteNumero = text.replace(/[^0-9]/g, "");
    setTempoMinutos(somenteNumero);
    if (!ativo) {
      const minsNum = parseInt(somenteNumero || "0", 10);
      const novoTempo = minsNum * 60;
      setSegundosRestantes(novoTempo);
      tempoInicialRef.current = novoTempo;
    }
  };

  // ===== FORMATAR DISPLAY =====
  const minutos = Math.floor(segundosRestantes / 60);
  const segundos = segundosRestantes % 60;
  const tempoFormatado = `${String(minutos).padStart(2, "0")}:${String(
    segundos
  ).padStart(2, "0")}`;

  const isCritico = segundosRestantes <= 60 && segundosRestantes > 0;
  const displayStyle = [
    styles.timerDisplay,
    isCritico ? styles.timerDisplayCritico : null,
    segundosRestantes === 0 ? styles.timerDisplayAcabou : null,
  ];

  const acabouMensagem = segundosRestantes === 0 ? "Sessão concluída! 🎉" : "";

  // ===== ESTATÍSTICAS =====
  const horasTotais = Math.floor(totalEstudadoSegundos / 3600);
  const minutosTotais = Math.floor((totalEstudadoSegundos % 3600) / 60);
  const segundosTotais = totalEstudadoSegundos % 60;

  const totalFormatado =
    horasTotais > 0
      ? `${String(horasTotais).padStart(2, "0")}:${String(
          minutosTotais
        ).padStart(2, "0")}:${String(segundosTotais).padStart(2, "0")}`
      : `${String(minutosTotais).padStart(2, "0")}:${String(
          segundosTotais
        ).padStart(2, "0")}`;

  // ===== RENDER =====
  return (
    <View style={styles.container}>
      <View style={styles.configBox}>
        <Text style={styles.label}>Minutos da sessão</Text>
        <TextInput
          style={styles.input}
          value={tempoMinutos}
          onChangeText={handleChangeMinutos}
          keyboardType="numeric"
          editable={!ativo}
        />
      </View>

      <View style={displayStyle}>
        <Text style={styles.timerText}>{tempoFormatado}</Text>
      </View>

      {!!acabouMensagem && <Text style={styles.acabouTexto}>{acabouMensagem}</Text>}

      <View style={styles.controlsRow}>
        {!ativo ? (
          <TouchableOpacity
            style={[styles.btn, styles.btnStart]}
            onPress={handleIniciar}
          >
            <Text style={styles.btnText}>Iniciar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.btn, styles.btnPause]}
            onPress={handlePausar}
          >
            <Text style={styles.btnText}>Pausar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.btn, styles.btnReset]}
          onPress={handleResetar}
        >
          <Text style={styles.btnText}>Resetar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>Estatísticas</Text>
        <Text style={styles.statsText}>
          Sessões completas: {sessoesCompletas}
        </Text>
        <Text style={styles.statsText}>
          Tempo total estudado: {totalFormatado}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  configBox: {
    width: "100%",
    maxWidth: 320,
    marginBottom: 24,
  },
  label: {
    color: "#cbd5e1",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#475569",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    textAlign: "center",
  },
  timerDisplay: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#1e293b",
    borderWidth: 4,
    borderColor: "#38bdf8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  timerDisplayCritico: {
    backgroundColor: "#450a0a",
    borderColor: "#dc2626",
  },
  timerDisplayAcabou: {
    backgroundColor: "#14532d",
    borderColor: "#22c55e",
  },
  timerText: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
    fontVariant: ["tabular-nums"],
  },
  acabouTexto: {
    color: "#22c55e",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  controlsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  btn: {
    minWidth: 100,
    backgroundColor: "#334155",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnStart: {
    backgroundColor: "#16a34a",
  },
  btnPause: {
    backgroundColor: "#eab308",
  },
  btnReset: {
    backgroundColor: "#475569",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  statsBox: {
    backgroundColor: "#1e293b",
    width: "100%",
    maxWidth: 320,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#475569",
    padding: 16,
  },
  statsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  statsText: {
    color: "#cbd5e1",
    fontSize: 16,
    marginBottom: 4,
  },
});
