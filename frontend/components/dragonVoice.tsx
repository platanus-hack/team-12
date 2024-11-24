import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Mic } from "lucide-react";
import { askAI } from "@/api/dragonAI";

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVoiceInput = async () => {
    setResponse(null);
    setIsListening(true);

    // Check if the browser supports Web Speech API
    if (!("webkitSpeechRecognition" in window)) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      setIsListening(false);
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "es-ES";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event: any) => {
      setIsListening(false);
      const userQuestion = event.results[0][0].transcript;
      console.log("Pregunta del usuario:", userQuestion);

      try {
        setIsLoading(true);

        const aiResponse = await askAI(userQuestion, "None");

        setResponse(aiResponse);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setResponse("Error fetching AI response");
      } finally {
        setIsLoading(false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Error en el reconocimiento de voz:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        variant="outline"
        size="lg"
        onClick={handleVoiceInput}
        className="flex items-center gap-2 mb-4"
        disabled={isListening || isLoading}
      >
        <Mic className="w-6 h-6" />
        {isListening ? "Escuchando..." : "Hazme una pregunta 📣"}
      </Button>

      {isLoading && (
        <div className="flex items-center gap-2">
          <Loader className="animate-spin" /> Pensando...
        </div>
      )}

      {response && (
        <div className="bg-white shadow-md p-4 rounded-md max-w-md text-center">
          <p className="text-lg font-bold">Respuesta:</p>
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
}
