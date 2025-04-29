
import { Layout } from "@/components/layout/Layout";
import { ChatInterface } from "@/components/chatbot/ChatInterface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

const Chatbot = () => {
  return (
    <Layout requireAuth>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Assistente Virtual</h1>
          <p className="text-muted-foreground">
            Tire suas dúvidas sobre os dados ambientais com nosso assistente virtual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ChatInterface />
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Sobre o EcoBot
                </CardTitle>
                <CardDescription>
                  Assistente especializado em dados ambientais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  O EcoBot foi desenvolvido para ajudar com dúvidas sobre os dados ambientais coletados em nossa plataforma.
                  Ele pode responder perguntas sobre qualidade do ar, água, temperatura, tendências e muito mais.
                </p>
                <div className="mt-4">
                  <p className="text-sm">
                    O assistente utiliza um sistema de reconhecimento de palavras-chave para fornecer informações
                    precisas sobre diversos tópicos ambientais. Experimente fazer perguntas sobre:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
                    <li>Qualidade do ar em diferentes regiões</li>
                    <li>Temperatura e mudanças climáticas recentes</li>
                    <li>Qualidade da água em rios e lagos</li>
                    <li>Níveis de poluição e seus impactos</li>
                    <li>Dados estatísticos ambientais</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
