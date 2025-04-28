
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, UserRound, Mail, MapPin, Shield, Bell, Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: "São Paulo, Brasil",
    bio: "Entusiasta ambiental e membro ativo do EcoConnect.",
    notifications: {
      email: true,
      forum: true,
      data: false,
    },
    privacy: {
      showEmail: false,
      showLocation: true,
    },
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const handleUpdateProfile = () => {
    // In a real app, this would be an API call
    toast.success("Perfil atualizado com sucesso!");
  };
  
  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    // In a real app, this would be an API call
    toast.success("Senha atualizada com sucesso!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  return (
    <Layout requireAuth>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4 space-y-6">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mt-4">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="flex items-center gap-1 text-sm mt-2">
                  <MapPin className="h-3 w-3" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm">{userProfile.bio}</p>
                </div>
                <div className="mt-4 w-full">
                  <Button variant="outline" className="w-full">
                    Editar Avatar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Membro desde</span>
                  <span className="text-sm">{new Date(user?.createdAt || Date.now()).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Posts no fórum</span>
                  <span className="text-sm">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Comentários</span>
                  <span className="text-sm">12</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Nível de acesso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/10 text-primary rounded p-2 text-center font-medium">
                  {user?.role === "admin" ? "Administrador" : "Usuário"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center">
                  <UserRound className="h-4 w-4 mr-2" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Preferências
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Segurança
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>
                      Atualize suas informações de perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Seu nome completo"
                          className="pl-8"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-8"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localização</Label>
                      <div className="relative">
                        <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="Cidade, Estado"
                          className="pl-8"
                          value={userProfile.location}
                          onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Conte um pouco sobre você..."
                        value={userProfile.bio}
                        onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleUpdateProfile}>Salvar Alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notificações</CardTitle>
                    <CardDescription>
                      Configure como deseja receber atualizações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber emails sobre atualizações importantes
                        </p>
                      </div>
                      <Switch
                        checked={userProfile.notifications.email}
                        onCheckedChange={(checked) => 
                          setUserProfile({
                            ...userProfile,
                            notifications: {
                              ...userProfile.notifications,
                              email: checked
                            }
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Fórum</Label>
                        <p className="text-sm text-muted-foreground">
                          Ser notificado sobre respostas em suas discussões
                        </p>
                      </div>
                      <Switch
                        checked={userProfile.notifications.forum}
                        onCheckedChange={(checked) => 
                          setUserProfile({
                            ...userProfile,
                            notifications: {
                              ...userProfile.notifications,
                              forum: checked
                            }
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Alertas de Dados</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber alertas sobre mudanças críticas nos dados ambientais
                        </p>
                      </div>
                      <Switch
                        checked={userProfile.notifications.data}
                        onCheckedChange={(checked) => 
                          setUserProfile({
                            ...userProfile,
                            notifications: {
                              ...userProfile.notifications,
                              data: checked
                            }
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacidade</CardTitle>
                    <CardDescription>
                      Controle quais informações são visíveis para outros usuários
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Mostrar Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que outros usuários vejam seu email
                        </p>
                      </div>
                      <Switch
                        checked={userProfile.privacy.showEmail}
                        onCheckedChange={(checked) => 
                          setUserProfile({
                            ...userProfile,
                            privacy: {
                              ...userProfile.privacy,
                              showEmail: checked
                            }
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Mostrar Localização</Label>
                        <p className="text-sm text-muted-foreground">
                          Permitir que outros usuários vejam sua localização
                        </p>
                      </div>
                      <Switch
                        checked={userProfile.privacy.showLocation}
                        onCheckedChange={(checked) => 
                          setUserProfile({
                            ...userProfile,
                            privacy: {
                              ...userProfile.privacy,
                              showLocation: checked
                            }
                          })
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleUpdateProfile}>Salvar Preferências</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>
                      Atualize sua senha para manter sua conta segura
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setPasswordError("");
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setPasswordError("");
                        }}
                      />
                      {passwordError && (
                        <p className="text-sm text-destructive mt-1">{passwordError}</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleUpdatePassword}>Atualizar Senha</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sessões Ativas</CardTitle>
                    <CardDescription>
                      Gerencie os dispositivos conectados à sua conta
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-4">
                        <div>
                          <p className="font-medium">Este dispositivo</p>
                          <p className="text-sm text-muted-foreground">
                            Último acesso: {new Date().toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <Button variant="outline" disabled>Sessão Atual</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
