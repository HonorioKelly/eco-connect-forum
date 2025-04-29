
import { Layout } from "@/components/layout/Layout";
import { ChatInterface } from "@/components/chatbot/ChatInterface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, MessageSquare } from "lucide-react";

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
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Sugestões de perguntas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="p-2 bg-muted/50 rounded-md hover:bg-muted cursor-pointer">
                    Como está a qualidade do ar em São Paulo?
                  </li>
                  <li className="p-2 bg-muted/50 rounded-md hover:bg-muted cursor-pointer">
                    Quais são os principais poluentes da água no Rio Tietê?
                  </li>
                  <li className="p-2 bg-muted/50 rounded-md hover:bg-muted cursor-pointer">
                    Como a temperatura mudou nos últimos 5 anos?
                  </li>
                  <li className="p-2 bg-muted/50 rounded-md hover:bg-muted cursor-pointer">
                    Quais são as fontes de poluição mais comuns?
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
