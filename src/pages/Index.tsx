
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AirVent, ThermometerSun, CloudRain, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: AirVent,
      title: "Qualidade do Ar",
      description: "Monitore índices de poluição e qualidade do ar em tempo real em diversas localidades.",
    },
    {
      icon: CloudRain,
      title: "Qualidade da Água",
      description: "Acompanhe indicadores de qualidade da água em rios, lagos e reservatórios.",
    },
    {
      icon: ThermometerSun,
      title: "Temperatura",
      description: "Visualize dados de temperatura e contribua para o monitoramento de mudanças climáticas.",
    },
  ];

  const testimonials = [
    {
      quote: "O EcoConnect transformou a forma como nossa comunidade monitora a qualidade ambiental local.",
      author: "Ana Silva, Engenheira Ambiental",
    },
    {
      quote: "Poder acompanhar os dados de qualidade do ar da minha região tem sido essencial para minha saúde.",
      author: "Carlos Mendes, Morador",
    },
    {
      quote: "A plataforma facilitou muito nosso trabalho de pesquisa sobre qualidade da água.",
      author: "Dra. Fernanda Santos, Pesquisadora",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-eco-green-light/20 to-eco-blue-light/10 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Monitore e Compartilhe Dados Ambientais
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Acompanhe a qualidade do ar, da água e a temperatura em tempo real. Junte-se à nossa comunidade de ambientalistas e contribua para um futuro mais sustentável.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button 
                  size="lg" 
                  onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
                  className="bg-eco-green hover:bg-eco-green-dark"
                >
                  {isAuthenticated ? "Acessar Dashboard" : "Começar Agora"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/about")}
                >
                  Saiba mais
                </Button>
              </div>
            </div>
            <div className="mx-auto flex w-full items-center justify-center lg:order-last">
              <div className="rounded-lg overflow-hidden shadow-xl border">
                <img 
                  src="/placeholder.svg" 
                  alt="Dashboard de dados ambientais" 
                  width="550" 
                  height="310"
                  className="aspect-video object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Recursos do EcoConnect
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Nossa plataforma oferece uma variedade de ferramentas para monitoramento ambiental e discussão comunitária.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="eco-card flex flex-col items-center text-center animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                O que dizem nossos usuários
              </h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div key={index} className="eco-card bg-card/60 backdrop-blur-sm">
                <div className="relative">
                  <span className="text-4xl leading-none text-muted-foreground/30 font-serif">"</span>
                  <blockquote className="mb-4 italic text-muted-foreground">{item.quote}</blockquote>
                  <footer className="text-sm font-medium">{item.author}</footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Junte-se à nossa comunidade
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-primary-foreground/80">
              Registre-se agora para acessar dados ambientais em tempo real e participar de discussões significativas sobre sustentabilidade.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
              variant="secondary"
              className="mt-4"
            >
              {isAuthenticated ? "Acessar Dashboard" : "Criar uma conta"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

