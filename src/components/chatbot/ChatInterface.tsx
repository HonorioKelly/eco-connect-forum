
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { MessageSquare, User, Send, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

// Mock respostas do chatbot com base em palavras-chave
const botResponses = {
  "qualidade do ar": "A qualidade do ar é medida através de diversos parâmetros como PM2.5, PM10, ozônio, NO2. Nossos dados mostram variações significativas entre áreas urbanas e rurais.",
  "poluição": "Nossos dados indicam que as principais fontes de poluição são veículos (55%), indústrias (30%) e outras fontes (15%). Você pode verificar os detalhes na seção de dados.",
  "temperatura": "Registramos um aumento médio de 1.5°C nas temperaturas urbanas nos últimos 5 anos. As previsões indicam um aumento adicional de 0.8°C na próxima década.",
  "água": "A qualidade da água é monitorada em 27 pontos diferentes. O IQA (Índice de Qualidade da Água) médio é 72, considerado satisfatório, porém com pontos críticos em áreas industriais.",
  "dados": "Nosso sistema coleta dados de qualidade do ar, água e temperatura de mais de 50 estações de monitoramento distribuídas pelo país. Atualizamos os dados a cada 30 minutos.",
  "ajuda": "Posso ajudar com informações sobre qualidade do ar, água, temperatura, análises de poluição e interpretação dos dados ambientais. Basta perguntar!"
};

// Perguntas sugeridas para o usuário clicar
const suggestedQuestions = [
  "Qual a qualidade do ar hoje?",
  "Qual foi a temperatura média da semana?",
  "Como está a qualidade da água nos rios?",
  "Quais os níveis de poluição registrados este mês?",
  "Quais são os dados ambientais mais recentes?",
  "Quais regiões têm melhor qualidade do ar?"
];

const generateBotResponse = (message: string): string => {
  // Converter a mensagem para minúsculas para facilitar a comparação
  const lowerMessage = message.toLowerCase();
  
  // Verificar por palavras-chave na mensagem
  for (const [keyword, response] of Object.entries(botResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Resposta padrão se nenhuma palavra-chave for encontrada
  return "Desculpe, não tenho informações específicas sobre isso. Posso ajudar com dados sobre qualidade do ar, água, temperatura e poluição. Tente perguntar sobre esses temas.";
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Olá! Sou o EcoBot, assistente virtual do EcoConnect. Como posso ajudar com informações sobre dados ambientais?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Rolar para o final quando novas mensagens são adicionadas
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (messageText: string = input) => {
    if (!messageText.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simular resposta do bot após um breve delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(messageText),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] bg-muted/30 rounded-lg border">
      <div className="bg-muted/20 p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">EcoBot - Assistente Ambiental</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Tire suas dúvidas sobre os dados ambientais
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.isUser ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className={`h-8 w-8 ${message.isUser ? "bg-primary" : "bg-muted"}`}>
                  {message.isUser ? (
                    user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    )
                  ) : (
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <Card
                    className={`p-3 ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </Card>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8 bg-muted">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <Card className="p-3 bg-muted">
                  <p className="text-sm">Digitando...</p>
                </Card>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua pergunta sobre dados ambientais..."
            className="flex-1"
          />
          <Button onClick={() => handleSendMessage()} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Perguntas sugeridas:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleSuggestedQuestionClick(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
