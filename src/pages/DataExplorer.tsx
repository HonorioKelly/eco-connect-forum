import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AirVent, ThermometerSun, CloudRain, Search, Download, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { EnvironmentalData } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";

const mockData: EnvironmentalData[] = [
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
  {
    id: "4",
    type: "air",
    value: 35,
    unit: "µg/m³",
    location: "Porto Alegre - Centro",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
  {
    id: "5",
    type: "air",
    value: 15,
    unit: "µg/m³",
    location: "Curitiba - Parque Barigui",
    timestamp: new Date().toISOString(),
    status: "good",
  },
  
  {
    id: "6",
    type: "water",
    value: 85,
    unit: "IQA",
    location: "Rio Tietê - Nascente",
    timestamp: new Date().toISOString(),
    status: "good",
  },
  {
    id: "7",
    type: "water",
    value: 42,
    unit: "IQA",
    location: "Rio Tietê - São Paulo",
    timestamp: new Date().toISOString(),
    status: "poor",
  },
  {
    id: "8",
    type: "water",
    value: 68,
    unit: "IQA",
    location: "Baía de Guanabara",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
  {
    id: "9",
    type: "water",
    value: 76,
    unit: "IQA",
    location: "Lago Paranoá - Brasília",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
  {
    id: "10",
    type: "water",
    value: 92,
    unit: "IQA",
    location: "Rio Amazonas - Manaus",
    timestamp: new Date().toISOString(),
    status: "good",
  },
  
  {
    id: "11",
    type: "temperature",
    value: 28.5,
    unit: "°C",
    location: "São Paulo",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
  {
    id: "12",
    type: "temperature",
    value: 32.8,
    unit: "°C",
    location: "Rio de Janeiro",
    timestamp: new Date().toISOString(),
    status: "poor",
  },
  {
    id: "13",
    type: "temperature",
    value: 26.2,
    unit: "°C",
    location: "Curitiba",
    timestamp: new Date().toISOString(),
    status: "good",
  },
  {
    id: "14",
    type: "temperature",
    value: 34.7,
    unit: "°C",
    location: "Fortaleza",
    timestamp: new Date().toISOString(),
    status: "poor",
  },
  {
    id: "15",
    type: "temperature",
    value: 31.3,
    unit: "°C",
    location: "Manaus",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
];

const trendData = {
  air: [
    { name: "Jan", value: 35 },
    { name: "Fev", value: 38 },
    { name: "Mar", value: 42 },
    { name: "Abr", value: 45 },
    { name: "Mai", value: 40 },
    { name: "Jun", value: 30 },
  ],
  water: [
    { name: "Jan", value: 60 },
    { name: "Fev", value: 65 },
    { name: "Mar", value: 62 },
    { name: "Abr", value: 55 },
    { name: "Mai", value: 58 },
    { name: "Jun", value: 63 },
  ],
  temperature: [
    { name: "Jan", value: 26.5 },
    { name: "Fev", value: 27.2 },
    { name: "Mar", value: 28.1 },
    { name: "Abr", value: 29.4 },
    { name: "Mai", value: 30.2 },
    { name: "Jun", value: 31.6 },
  ]
};

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

const DataExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dataType, setDataType] = useState<string>("all");
  const [selectedTab, setSelectedTab] = useState<string>("table");
  const [sortBy, setSortBy] = useState<string>("location");

  const filteredData = mockData.filter(item => {
    const matchesSearch = 
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = 
      dataType === "all" || 
      item.type === dataType;
    
    return matchesSearch && matchesType;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "location") {
      return a.location.localeCompare(b.location);
    } else if (sortBy === "value") {
      return b.value - a.value;
    } else if (sortBy === "status") {
      const statusOrder = { "good": 0, "moderate": 1, "poor": 2, "hazardous": 3 };
      return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
    }
    return 0;
  });

  const getDataIcon = (type: string) => {
    switch (type) {
      case "air":
        return <AirVent className="h-5 w-5" />;
      case "water":
        return <CloudRain className="h-5 w-5" />;
      case "temperature":
        return <ThermometerSun className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getDataTypeLabel = (type: string) => {
    switch (type) {
      case "air":
        return "Qualidade do Ar";
      case "water":
        return "Qualidade da Água";
      case "temperature":
        return "Temperatura";
      default:
        return type;
    }
  };

  const airData = sortedData.filter(item => item.type === "air");
  const waterData = sortedData.filter(item => item.type === "water");
  const temperatureData = sortedData.filter(item => item.type === "temperature");

  const chartData = {
    air: airData.map(item => ({ name: item.location, valor: item.value })),
    water: waterData.map(item => ({ name: item.location, valor: item.value })),
    temperature: temperatureData.map(item => ({ name: item.location, valor: item.value }))
  };

  const handleDownloadData = () => {
    alert("Dados baixados com sucesso!");
  };

  return (
    <Layout requireAuth>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Explorador de Dados</h1>
          <p className="text-muted-foreground">
            Visualize e analise todos os dados ambientais coletados pela nossa rede de sensores.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por localização..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <Select value={dataType} onValueChange={setDataType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de dado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="air">Qualidade do Ar</SelectItem>
                    <SelectItem value="water">Qualidade da Água</SelectItem>
                    <SelectItem value="temperature">Temperatura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="location">Localização</SelectItem>
                    <SelectItem value="value">Valor</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button className="w-full" onClick={handleDownloadData}>
                  <Download className="mr-2 h-4 w-4" />
                  Baixar dados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="table">Tabela</TabsTrigger>
              <TabsTrigger value="chart">Gráficos</TabsTrigger>
              <TabsTrigger value="trends">Tendências</TabsTrigger>
            </TabsList>
            <p className="text-sm text-muted-foreground">
              {sortedData.length} registros encontrados
            </p>
          </div>

          <TabsContent value="table" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {sortedData.map((item) => {
                const progress = getStatusProgress(item.value, item.type);
                return (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        {getDataIcon(item.type)}
                        <CardTitle className="text-base">
                          {getDataTypeLabel(item.type)}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <CardDescription className="mt-0">
                          {item.location}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-bold">
                            {item.value} 
                            <span className="text-sm font-normal text-muted-foreground ml-1">
                              {item.unit}
                            </span>
                          </div>
                          <span className={`eco-badge ${getStatusBadge(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </div>
                        <Progress 
                          value={progress.value} 
                          className={`h-2 ${getStatusColor(progress.status)}`} 
                        />
                        <p className="text-xs text-muted-foreground text-right">
                          Atualizado em {new Date(item.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="chart">
            <div className="grid gap-6">
              {dataType === "all" || dataType === "air" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AirVent className="h-5 w-5" />
                      Qualidade do Ar
                    </CardTitle>
                    <CardDescription>Concentração de poluentes por localidade (µg/m³)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      {chartData.air.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData.air}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="valor" fill="#3a5a40" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-muted-foreground">Nenhum dado disponível</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : null}
              
              {dataType === "all" || dataType === "water" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CloudRain className="h-5 w-5" />
                      Qualidade da Água
                    </CardTitle>
                    <CardDescription>Índice de qualidade da água (IQA) por localidade</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      {chartData.water.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData.water}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="valor" fill="#1a759f" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-muted-foreground">Nenhum dado disponível</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : null}
              
              {dataType === "all" || dataType === "temperature" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ThermometerSun className="h-5 w-5" />
                      Temperatura
                    </CardTitle>
                    <CardDescription>Temperatura (°C) por localidade</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      {chartData.temperature.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData.temperature}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="valor" fill="#e76f51" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-muted-foreground">Nenhum dado disponível</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="grid gap-6">
              {dataType === "all" || dataType === "air" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AirVent className="h-5 w-5" />
                      Tendência da Qualidade do Ar
                    </CardTitle>
                    <CardDescription>Média mensal dos últimos 6 meses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData.air}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#3a5a40" 
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
              
              {dataType === "all" || dataType === "water" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CloudRain className="h-5 w-5" />
                      Tendência da Qualidade da Água
                    </CardTitle>
                    <CardDescription>Média mensal dos últimos 6 meses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData.water}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#1a759f" 
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
              
              {dataType === "all" || dataType === "temperature" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ThermometerSun className="h-5 w-5" />
                      Tendência da Temperatura
                    </CardTitle>
                    <CardDescription>Média mensal dos últimos 6 meses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData.temperature}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#e76f51" 
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DataExplorer;
