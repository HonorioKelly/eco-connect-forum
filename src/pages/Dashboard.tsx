import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AirVent, ThermometerSun, CloudRain, AlertTriangle, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { EnvironmentalData } from "@/types";
import { Layout } from "@/components/layout/Layout";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from "recharts";

const mockAirData: EnvironmentalData[] = [
  {
    id: "1",
    type: "air",
    value: 45,
    unit: "µg/m³",
    location: "São Paulo - Centro",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
  {
    id: "2",
    type: "air",
    value: 22,
    unit: "µg/m³",
    location: "Rio de Janeiro - Ipanema",
    timestamp: new Date().toISOString(),
    status: "good",
  },
  {
    id: "3",
    type: "air",
    value: 75,
    unit: "µg/m³",
    location: "Belo Horizonte - Centro",
    timestamp: new Date().toISOString(),
    status: "poor",
  },
];

const mockWaterData: EnvironmentalData[] = [
  {
    id: "4",
    type: "water",
    value: 85,
    unit: "IQA",
    location: "Rio Tietê - Nascente",
    timestamp: new Date().toISOString(),
    status: "good",
  },
  {
    id: "5",
    type: "water",
    value: 42,
    unit: "IQA",
    location: "Rio Tietê - São Paulo",
    timestamp: new Date().toISOString(),
    status: "poor",
  },
  {
    id: "6",
    type: "water",
    value: 68,
    unit: "IQA",
    location: "Baía de Guanabara",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
];

const mockTemperatureData: EnvironmentalData[] = [
  {
    id: "7",
    type: "temperature",
    value: 28.5,
    unit: "°C",
    location: "São Paulo",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
  {
    id: "8",
    type: "temperature",
    value: 32.8,
    unit: "°C",
    location: "Rio de Janeiro",
    timestamp: new Date().toISOString(),
    status: "poor",
  },
  {
    id: "9",
    type: "temperature",
    value: 26.2,
    unit: "°C",
    location: "Curitiba",
    timestamp: new Date().toISOString(),
    status: "good",
  },
];

const chartData = [
  {
    name: "Jan",
    ar: 40,
    agua: 75,
    temperatura: 25,
  },
  {
    name: "Fev",
    ar: 45,
    agua: 72,
    temperatura: 26,
  },
  {
    name: "Mar",
    ar: 50,
    agua: 68,
    temperatura: 27,
  },
  {
    name: "Abr",
    ar: 55,
    agua: 65,
    temperatura: 28,
  },
  {
    name: "Mai",
    ar: 60,
    agua: 62,
    temperatura: 29,
  },
  {
    name: "Jun",
    ar: 65,
    agua: 58,
    temperatura: 30,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "good":
      return "bg-green-500";
    case "moderate":
      return "bg-yellow-500";
    case "poor":
      return "bg-orange-500";
    case "hazardous":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "good":
      return "bg-green-100 text-green-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "poor":
      return "bg-orange-100 text-orange-800";
    case "hazardous":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusProgress = (value: number, type: string) => {
  if (type === "air") {
    if (value <= 50) return { value: (value / 50) * 100, status: "good" };
    if (value <= 100) return { value: ((value - 50) / 50) * 100, status: "moderate" };
    if (value <= 150) return { value: ((value - 100) / 50) * 100, status: "poor" };
    return { value: 100, status: "hazardous" };
  } else if (type === "water") {
    if (value >= 80) return { value: ((value - 80) / 20) * 100, status: "good" };
    if (value >= 50) return { value: ((value - 50) / 30) * 100, status: "moderate" };
    if (value >= 20) return { value: ((value - 20) / 30) * 100, status: "poor" };
    return { value: 100, status: "hazardous" };
  } else {
    if (value <= 25) return { value: (value / 25) * 100, status: "good" };
    if (value <= 32) return { value: ((value - 25) / 7) * 100, status: "moderate" };
    if (value <= 40) return { value: ((value - 32) / 8) * 100, status: "poor" };
    return { value: 100, status: "hazardous" };
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [alerts, setAlerts] = useState<EnvironmentalData[]>([]);

  useEffect(() => {
    const criticalItems = [
      ...mockAirData.filter(item => item.status === "poor" || item.status === "hazardous"),
      ...mockWaterData.filter(item => item.status === "poor" || item.status === "hazardous"),
      ...mockTemperatureData.filter(item => item.status === "poor" || item.status === "hazardous"),
    ];
    setAlerts(criticalItems);
  }, []);

  const renderDataCard = (title: string, icon: React.ReactNode, data: EnvironmentalData[]) => (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          {icon}
          <CardTitle className="ml-2">{title}</CardTitle>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <a href={`/data#${title.toLowerCase()}`}>Ver todos</a>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 divide-y">
          {data.map((item) => {
            const progress = getStatusProgress(item.value, item.type);
            return (
              <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                    <h4 className="text-sm font-medium">{item.location}</h4>
                  </div>
                  <span className={`eco-badge ${getStatusBadge(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">
                    {item.value} <span className="text-sm text-muted-foreground">{item.unit}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <Progress value={progress.value} className={`h-2 ${getStatusColor(progress.status)}`} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout requireAuth>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta, {user?.name}! Aqui está o monitoramento atual dos dados ambientais.
          </p>
        </div>
        
        {alerts.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              {alerts.length} pontos de monitoramento apresentam condições preocupantes.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="air">Qualidade do Ar</TabsTrigger>
            <TabsTrigger value="water">Qualidade da Água</TabsTrigger>
            <TabsTrigger value="temperature">Temperatura</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {renderDataCard("Ar", <AirVent className="h-4 w-4" />, mockAirData)}
              {renderDataCard("Água", <CloudRain className="h-4 w-4" />, mockWaterData)}
              {renderDataCard("Temperatura", <ThermometerSun className="h-4 w-4" />, mockTemperatureData)}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Tendências Ambientais</CardTitle>
                <CardDescription>Dados dos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="ar" stroke="#3a5a40" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="agua" stroke="#1a759f" />
                      <Line type="monotone" dataKey="temperatura" stroke="#e76f51" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="air" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Qualidade do Ar Detalhada</CardTitle>
                <CardDescription>Valores atuais de poluição do ar (µg/m³)</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockAirData.map(item => ({
                      name: item.location,
                      valor: item.value,
                      limite: 50
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="valor" fill="#3a5a40" />
                      <Bar dataKey="limite" fill="#a3b18a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="water" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Qualidade da Água Detalhada</CardTitle>
                <CardDescription>Índice de qualidade da água (IQA)</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockWaterData.map(item => ({
                      name: item.location,
                      valor: item.value,
                      ideal: 80
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="valor" fill="#1a759f" />
                      <Bar dataKey="ideal" fill="#76c893" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="temperature" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Temperatura Detalhada</CardTitle>
                <CardDescription>Registros de temperatura (°C)</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockTemperatureData.map(item => ({
                      name: item.location,
                      temperatura: item.value,
                      media: 27.5
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="temperatura" fill="#e76f51" />
                      <Bar dataKey="media" fill="#fefae0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
