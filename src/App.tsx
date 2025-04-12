import { useMemo, useState } from "react";

interface Articulo {
  id: number;
  name: string;
  price: number;
  count: number;
  status: "deseo" | "comprado" | "cancelado";
}

function obtenerNuevoArticulo(articulo?: Partial<Articulo>): Articulo {
  return {
    id: Date.now(),
    name: "",
    price: 0,
    count: 1,
    status: "deseo",
    ...articulo,
  };
}

const NEW_ARTICULO: Articulo = {
  id: 0,
  name: "",
  price: 0,
  count: 0,
  status: "cancelado",
};
const initialArticulos: Articulo[] = [
  {
    id: 1,
    name: "Cámara digital",
    price: 100,
    count: 1,
    status: "deseo",
  },
  {
    id: 2,
    name: "Celular",
    price: 100,
    count: 1,
    status: "deseo",
  },
];

function App() {
  const [articulos, setArticulos] = useState<Articulo[]>(
    () => initialArticulos
  );

  const total = useMemo(() => {
    // @TODO: Retornar la suma de los precios de los artículos
    return articulos.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  }, [articulos]);

  const articulosValidos = useMemo(() => {
    // @TODO: Retornar true si todos los artículos son válidos
    return !articulos.some((articulo) => {
      return (
        !articulo.name ||
        articulo.price <= 0 ||
        articulo.count <= 0 ||
        !articulo.status
      );
    });
  }, [articulos]);

  function agregarArticulo() {
    setArticulos((prev) => {
      const idtoAdd = prev.length ? prev[prev.length - 1].id + 1 : 0;
      return [...prev, { ...NEW_ARTICULO, id: idtoAdd }];
    });
  }

  function editarArticulo(articuloModificado: Articulo) {
    setArticulos((articulos) => {
      // @TODO: Retornar un nuevo arreglo con el artículo editado
      return articulos.map((articulo) => {
        if (articulo.id === articuloModificado.id) return articuloModificado;
        return articulo;
      });
    });
  }

  function eliminarArticulo(articuloAEliminar: Articulo) {
    setArticulos((articulos) => {
      // @TODO: Retornar un nuevo arreglo sin el artículo
      return articulos.filter((articulo) => {
        return articulo.id != articuloAEliminar.id;
      });
    });
  }

  return (
    <main>
      <h1>Wincy</h1>
      <ul>
        {articulos.map((articulo) => (
          <li key={articulo.id}>
            <input
              value={articulo.name}
              onChange={(event) =>
                editarArticulo({ ...articulo, name: event.target.value })
              }
            />
            <input
              style={{ width: 96 }}
              value={articulo.price}
              onChange={(event) =>
                editarArticulo({
                  ...articulo,
                  price: Number(event.target.value),
                })
              }
            />
            <input
              style={{ width: 96 }}
              value={articulo.count}
              onChange={(event) =>
                editarArticulo({
                  ...articulo,
                  count: Number(event.target.value),
                })
              }
            />
            <select
              value={articulo.status}
              onChange={(event) =>
                editarArticulo({
                  ...articulo,
                  status: event.target.value as Articulo["status"],
                })
              }
            >
              <option value="wish">Deseo</option>
              <option value="bought">Comprado</option>
              <option value="cancelled">Cancelado</option>
            </select>
            <button onClick={() => eliminarArticulo(articulo)}>Borrar</button>
          </li>
        ))}
      </ul>
      <button onClick={agregarArticulo}>Agregar artículo</button>
      <p>Artículos válidos?: {articulosValidos ? "✅" : "⛔"}</p>
      <p>Total: ${total}</p>
    </main>
  );
}

export default App;
