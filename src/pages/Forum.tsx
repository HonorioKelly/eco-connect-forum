
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/layout/Layout";
import { ForumPost } from "@/types";
import { User, MessageSquare, ThumbsUp, Calendar, Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

// Mock data
const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "Preocupação com a qualidade do ar em São Paulo",
    content: "Nos últimos dias, tenho notado um aumento significativo na poluição do ar no centro de São Paulo. Alguém mais está acompanhando esses dados? O que podemos fazer para mitigar esse problema?",
    authorId: "1",
    authorName: "Maria Silva",
    authorAvatar: "/placeholder.svg",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 12,
    comments: [
      {
        id: "1",
        content: "Também tenho percebido isso. Os dados mostram um aumento de 30% na concentração de partículas finas.",
        authorId: "2",
        authorName: "João Santos",
        authorAvatar: "/placeholder.svg",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        postId: "1"
      },
      {
        id: "2",
        content: "Acredito que devemos pressionar as autoridades locais para implementar políticas de restrição veicular mais rígidas.",
        authorId: "3",
        authorName: "Ana Oliveira",
        authorAvatar: "/placeholder.svg",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        postId: "1"
      }
    ],
    tags: ["Qualidade do Ar", "São Paulo", "Poluição"]
  },
  {
    id: "2",
    title: "Resultados alarmantes na qualidade da água do Rio Tietê",
    content: "Os últimos dados de monitoramento do Rio Tietê mostram uma deterioração na qualidade da água. Precisamos discutir soluções urgentes para este problema que afeta milhões de pessoas.",
    authorId: "3",
    authorName: "Ana Oliveira",
    authorAvatar: "/placeholder.svg",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    comments: [
      {
        id: "3",
        content: "É realmente preocupante. Estou acompanhando este tema há anos e nunca vi indicadores tão ruins.",
        authorId: "1",
        authorName: "Maria Silva",
        authorAvatar: "/placeholder.svg",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        postId: "2"
      }
    ],
    tags: ["Qualidade da Água", "Rio Tietê", "Poluição"]
  },
  {
    id: "3",
    title: "Aumento das temperaturas no Sudeste",
    content: "Alguém mais notou como as temperaturas estão mais altas que o normal para esta época do ano? Os dados do último mês mostram uma média 2,5°C acima do esperado.",
    authorId: "2",
    authorName: "João Santos",
    authorAvatar: "/placeholder.svg",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 8,
    comments: [],
    tags: ["Temperatura", "Mudanças Climáticas", "Sudeste"]
  }
];

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState("recent");
  const [newComment, setNewComment] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "", tags: "" });

  const filteredPosts = mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (selectedTab === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (selectedTab === "popular") {
      return b.likes - a.likes;
    }
    return 0;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim() || !isAuthenticated) return;
    
    // In a real app, this would be an API call
    console.log(`Adding comment to post ${postId}: ${newComment}`);
    
    // Reset form
    setNewComment("");
    
    // Show success message (in a real app)
    alert("Comentário adicionado com sucesso!");
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim() || !isAuthenticated) return;
    
    // In a real app, this would be an API call
    console.log("Creating new post:", newPost);
    
    // Reset form
    setNewPost({ title: "", content: "", tags: "" });
    
    // Show success message (in a real app)
    alert("Post criado com sucesso!");
  };

  return (
    <Layout requireAuth>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Fórum EcoConnect</h1>
          <p className="text-muted-foreground">
            Discuta sobre os dados ambientais, compartilhe informações e contribua com a comunidade.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Search and filter */}
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
              <div className="relative flex-1">
                <Input
                  placeholder="Buscar discussões..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="recent">Recentes</TabsTrigger>
                  <TabsTrigger value="popular">Populares</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Posts list */}
            <div className="space-y-4">
              {sortedPosts.length > 0 ? (
                sortedPosts.map((post) => (
                  <Card key={post.id} className="animate-fade-in">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between">
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <ThumbsUp className="h-5 w-5" />
                          </Button>
                          <span className="text-sm font-medium">{post.likes}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-muted px-2 py-1 rounded text-xs flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-1">
                      <p>{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start pt-2">
                      <div className="flex justify-between w-full text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                            <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {post.authorName}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.createdAt)}
                        </div>
                      </div>

                      <Separator className="my-4" />

                      {/* Comments */}
                      <div className="w-full">
                        <h4 className="text-sm font-medium flex items-center gap-1 mb-3">
                          <MessageSquare className="h-4 w-4" />
                          Comentários ({post.comments.length})
                        </h4>

                        <div className="space-y-4">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="bg-muted p-3 rounded">
                              <p className="text-sm">{comment.content}</p>
                              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {comment.authorName}
                                </div>
                                <div>{formatDate(comment.createdAt)}</div>
                              </div>
                            </div>
                          ))}

                          {isAuthenticated && (
                            <div className="flex gap-2">
                              <Textarea
                                placeholder="Adicione um comentário..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-[80px]"
                              />
                              <Button 
                                className="self-end" 
                                onClick={() => handleAddComment(post.id)}
                                disabled={!newComment.trim()}
                              >
                                Enviar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="py-8">
                  <CardContent className="flex flex-col items-center justify-center text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Nenhuma discussão encontrada</h3>
                    <p className="text-muted-foreground">
                      {searchQuery ? "Tente uma busca diferente" : "Seja o primeiro a iniciar uma discussão!"}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-4">
            {/* New post card */}
            {isAuthenticated && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Iniciar Nova Discussão</CardTitle>
                  <CardDescription>
                    Compartilhe suas observações e dúvidas com a comunidade
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Título</label>
                    <Input
                      placeholder="Título da discussão"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Conteúdo</label>
                    <Textarea
                      placeholder="Compartilhe seus pensamentos..."
                      className="min-h-[120px]"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tags</label>
                    <Input
                      placeholder="Separar com vírgulas: ex: água, temperatura"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Adicione tags para facilitar a busca
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleCreatePost}
                    disabled={!newPost.title.trim() || !newPost.content.trim()}
                  >
                    Publicar Discussão
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Popular tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Qualidade do Ar", "Água", "Temperatura", "Poluição", "São Paulo", 
                    "Rio de Janeiro", "Meio Ambiente", "Reciclagem", "Fauna", "Flora"]
                    .map((tag, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSearchQuery(tag)}
                        className="text-xs"
                      >
                        {tag}
                      </Button>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Atividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discussões:</span>
                    <span className="font-medium">{mockPosts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comentários:</span>
                    <span className="font-medium">
                      {mockPosts.reduce((acc, post) => acc + post.comments.length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Membros ativos:</span>
                    <span className="font-medium">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forum;
