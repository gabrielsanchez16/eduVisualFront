import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, generateImage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // System prompt optimizado para educación visual
    const systemPrompt = `Eres EduVisual AI, un asistente educativo especializado en enseñanza para estudiantes de grado décimo (15-16 años).

Tu objetivo es facilitar el aprendizaje a través de explicaciones visuales y claras, ya que muchos estudiantes aprenden mejor con imágenes que solo con texto.

REGLAS IMPORTANTES:
1. Usa un lenguaje claro, amigable y apropiado para adolescentes
2. Divide conceptos complejos en pasos simples
3. Sé motivador y positivo en tus respuestas
4. Relaciona conceptos con situaciones cotidianas de los estudiantes
5. Cuando el usuario active "Generar imagen", DEBES crear una imagen educativa clara y didáctica que complemente tu explicación
6. Las imágenes deben ser diagramas, ilustraciones o representaciones visuales que faciliten la comprensión del tema

Materias que puedes ayudar a enseñar: Matemáticas, Ciencias, Historia, Literatura, Química, Física, Biología, entre otras.

IMPORTANTE: Cuando se solicite generar imagen, crea una imagen educativa relevante al tema sin excusas.`;

     // Determine which model to use
    const model = generateImage ? "google/gemini-2.5-flash-image-preview" : "google/gemini-2.5-flash";

    console.log("Using model:", model, "Generate image:", generateImage);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: !generateImage, // No streaming when generating images
        ...(generateImage && { modalities: ["image", "text"] })
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Límite de uso excedido. Por favor, intenta de nuevo en unos momentos." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Se requiere agregar créditos. Contacta al administrador." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Error al conectar con el servicio de IA" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // If generating images, return JSON response
    if (generateImage) {
      const data = await response.json();
      console.log("Image generation response:", data.choices?.[0]?.message?.images ? "Image present" : "No image");
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Otherwise, stream the response
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
