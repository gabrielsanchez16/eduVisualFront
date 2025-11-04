import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, BookOpen, Beaker, History, Calculator, Brain, Image as ImageIcon } from 'lucide-react';

const PromptsGuide = () => {
  const subjects = [
    {
      title: "Matemáticas",
      icon: <Calculator className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      prompts: [
        "Explica el teorema de Pitágoras con un diagrama y ejemplos de la vida real",
        "Muestra cómo resolver ecuaciones cuadráticas paso a paso con gráficas",
        "Crea un mapa conceptual sobre funciones y sus tipos"
      ]
    },
    {
      title: "Ciencias Naturales",
      icon: <Beaker className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      prompts: [
        "Explica la fotosíntesis con un diagrama del proceso completo",
        "Muestra las capas de la atmósfera con una ilustración detallada",
        "Compara la célula animal y vegetal con diagramas lado a lado"
      ]
    },
    {
      title: "Historia",
      icon: <History className="w-6 h-6" />,
      color: "from-amber-500 to-amber-600",
      prompts: [
        "Crea una línea de tiempo de la Revolución Francesa con eventos clave",
        "Muestra un mapa de las rutas de exploración del siglo XV",
        "Ilustra la organización social en la época colonial"
      ]
    },
    {
      title: "Literatura",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      prompts: [
        "Crea un diagrama de los personajes principales de El Quijote",
        "Muestra las características del Romanticismo con ejemplos visuales",
        "Ilustra la estructura de un texto argumentativo paso a paso"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent mb-6 shadow-elegant">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
            Guía de Prompts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Aprende a crear prompts efectivos para generar explicaciones visuales e imágenes que te ayuden a entender mejor cualquier tema
          </p>
        </div>

        {/* What are Prompts Section */}
        <Card className="mb-10 shadow-elegant animate-fade-in border-t-4 border-t-primary">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">¿Qué son los Prompts?</CardTitle>
            <CardDescription className="text-base">Instrucciones que le das a la IA para obtener mejores respuestas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-lg">
              Un <strong className="text-foreground">prompt</strong> es la pregunta o instrucción que le das a la inteligencia artificial. 
              Mientras más claro y específico seas, mejores serán las explicaciones e imágenes que recibirás.
            </p>
            <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-l-primary">
              <p className="text-sm text-muted-foreground italic">
                💡 Piensa en el prompt como si le estuvieras explicando a un amigo exactamente qué necesitas aprender.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Good Prompts Guide */}
        <Card className="mb-10 shadow-elegant animate-fade-in bg-gradient-to-br from-card to-secondary/5">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-accent" />
              ¿Cómo hacer un buen Prompt?
            </CardTitle>
            <CardDescription className="text-base">Características de prompts efectivos para aprender mejor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-background rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-foreground">Específico</h4>
                    <p className="text-sm text-muted-foreground">En lugar de "Explica la célula", di "Explica las partes de una célula animal con un diagrama"</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-background rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">💬</span>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-foreground">Claro</h4>
                    <p className="text-sm text-muted-foreground">Usa un lenguaje directo y sencillo, como si hablaras con un amigo</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-background rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🖼️</span>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-foreground">Visual</h4>
                    <p className="text-sm text-muted-foreground">Activa "Generar imagen" y pide diagramas, mapas conceptuales o ilustraciones</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-background rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">📚</span>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-foreground">Contextual</h4>
                    <p className="text-sm text-muted-foreground">Menciona que eres estudiante de grado décimo si necesitas un nivel específico</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples by Subject */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3 gradient-text">Ejemplos por Materia</h2>
            <p className="text-muted-foreground text-lg">Inspírate con estos ejemplos prácticos para cada asignatura</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {subjects.map((subject, index) => (
              <Card 
                key={index} 
                className="shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in border-l-4 overflow-hidden"
                style={{ borderLeftColor: subject.color }}
              >
                <CardHeader className="bg-gradient-to-r from-muted/30 to-transparent">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 rounded-lg bg-background shadow-sm">
                      {subject.icon}
                    </div>
                    <span>{subject.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {subject.prompts.map((prompt, pIndex) => (
                      <div 
                        key={pIndex} 
                        className="p-4 bg-muted/30 rounded-xl hover:bg-muted/60 transition-all duration-200 border border-border/50"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                            Ejemplo {pIndex + 1}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/90 italic">"{prompt}"</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Generate Images */}
        <Card className="mb-12 shadow-xl animate-fade-in border-2 border-secondary/50 bg-gradient-to-br from-secondary/5 via-background to-accent/5">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-accent shadow-elegant">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">¿Cómo Generar Imágenes?</CardTitle>
                <CardDescription className="text-base mt-1">Aprende paso a paso a usar la generación visual</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-6 bg-background rounded-xl shadow-sm border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2 text-foreground">Activa el botón "Generar imagen"</h4>
                  <p className="text-muted-foreground leading-relaxed">En la parte inferior del chat, haz clic en el botón con el ícono de imagen para activar el modo visual</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-background rounded-xl shadow-sm border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2 text-foreground">Escribe tu pregunta</h4>
                  <p className="text-muted-foreground leading-relaxed">Pide explicaciones que se beneficien de una imagen:</p>
                  <div className="mt-2 p-3 bg-muted/50 rounded-lg border-l-4 border-l-accent">
                    <p className="text-sm italic text-foreground">"Explica el ciclo del agua con un diagrama"</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-background rounded-xl shadow-sm border-2 border-secondary/20 hover:border-secondary/40 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2 text-foreground">Recibe texto + imagen</h4>
                  <p className="text-muted-foreground leading-relaxed">La IA generará tanto una explicación escrita como una imagen educativa para ayudarte a comprender mejor el tema</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="shadow-xl animate-fade-in bg-gradient-to-br from-accent/10 via-background to-primary/10 border-2 border-accent/30">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <Lightbulb className="w-8 h-8 text-accent" />
              </div>
              Consejos Útiles
            </CardTitle>
            <CardDescription className="text-base">Tips para aprovechar al máximo EduVisual AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg shadow-sm">
                <span className="text-2xl flex-shrink-0">💡</span>
                <span className="text-sm leading-relaxed">Si la respuesta no es clara, pide que te lo expliquen de otra forma o con más detalles</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg shadow-sm">
                <span className="text-2xl flex-shrink-0">🎨</span>
                <span className="text-sm leading-relaxed">Combina preguntas de texto con solicitudes de imágenes para mejor comprensión</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg shadow-sm">
                <span className="text-2xl flex-shrink-0">🔄</span>
                <span className="text-sm leading-relaxed">Experimenta con diferentes formas de preguntar lo mismo hasta obtener la mejor respuesta</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background/80 rounded-lg shadow-sm">
                <span className="text-2xl flex-shrink-0">🌟</span>
                <span className="text-sm leading-relaxed">Pide ejemplos prácticos relacionados con tu vida cotidiana para entender mejor</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PromptsGuide;
