export const prerender = false; // 🚀 Desactiva el prerender en esta API

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("🚨 Missing Supabase URL or Key");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET({ request }) {
  console.log("✅ API llamada correctamente");

  const url = new URL(request.url);
  const id = url.searchParams.get("id_product") || url.searchParams.get("id");
  console.log("🔍 id_product recibido:", id);

  if (!id) {
    return new Response(JSON.stringify({ error: "Falta el ID del producto" }), {
      status: 400,
    });
  }

  // ENDPOINT DE PRODUCT
  let { data: product, error } = await supabase
    .from("Products")
    .select(
      `
    id_product,
    name,
    description,
    price,
    fake_price,
    material,
    id_dimension,
    Dimension(height, width, length)  -- 🔥 Obtiene las dimensiones en la misma consulta
  `
    )
    .eq("id_product", id)
    .single();

  if (error || !product) {
    console.error("❌ Error al obtener el producto:", error);
    return new Response(JSON.stringify({ error: "Producto no encontrado." }), {
      status: 404,
    });
  }

  //ENDPOINT DE IMAGENES
  let { data: images, error: imagesError } = await supabase
    .from("Product_image")
    .select("id_image, image_url")
    .eq("id_product", id);

  if (imagesError) {
    console.error("❌ Error al obtener las imágenes:", imagesError);
  }
  product.images = images || [];

  console.log("✅ Producto encontrado:", product);

  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
  });
}
