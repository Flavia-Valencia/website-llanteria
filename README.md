# 🛞 Sitio Web para Centro de Llantas El Frenazo
El proyecto consiste en el desarrollo de un sitio web para una llantería ubicada en San Miguel, El Salvador, con el objetivo de dar a conocer el negocio y facilitar el contacto con sus clientes mediante:
- Catálogo de llantas con búsqueda y filtros
- Información de los servicios del taller
- Contacto directo por WhatsApp

El sitio es de consulta pública, por lo que no requiere inicio de sesión.


## Objetivo
Diseñar un sitio web que presente de forma clara las llantas y los servicios del taller, y que permita a los clientes encontrar su medida, ubicar el local y comunicarse con el negocio de forma rápida desde cualquier dispositivo.


## Tecnologías a utilizar
- HTML -> Estructura del sitio
- CSS -> Diseño visual y adaptación a celular (responsive)
- JS -> Búsqueda, filtros y botón flotante de WhatsApp
- Google Fonts -> Tipografías Bowlby One SC y Montserrat
- Google Maps -> Mapa de ubicación del local
- WhatsApp (wa.me) -> Contacto directo con el negocio


## Secciones del sitio
- **Inicio:** portada con la imagen principal
- **Catálogo:** llantas con buscador, filtro por medida y orden por precio o medida
- **Servicios:** montaje y desmontaje de llantas, cambio de aceite y más
- **Nosotros:** presentación del negocio
- **Contacto:** dirección, teléfono, correo, horarios y mapa

#### Botón flotante de WhatsApp
- Aparece al bajar de la sección de inicio y se oculta al volver arriba
- Abre una conversación con el número del negocio y un mensaje predefinido


## Instalación y Ejecución
Pasos detallados para ejecutar el proyecto en un entorno local. No requiere instalar nada adicional.

#### 1. Clonar el repositorio:
En la terminal de Visual Studio Code ejecutar:

```bash
git clone https://github.com/TU-USUARIO/website-llanteria.git
```

#### 2. Abrir la carpeta del proyecto:

```bash
cd website-llanteria
```

#### 3. Ejecutar el sitio:
Opción A: abrir el archivo `index.html` directamente en el navegador.

Opción B: levantar un servidor local con Python:

```bash
python3 -m http.server 8000
```

Luego abrir en el navegador:

```txt
http://localhost:8000
```


## Estructura del proyecto

```txt
website-llanteria/
├── index.html          # Página principal y JavaScript
├── css/
│   └── index.css       # Estilos del sitio
├── includes/
│   └── img/            # Logo, imagen principal y fotos de las llantas
└── README.md
```


## Personalización

#### Número y mensaje de WhatsApp
En `index.html`, buscar el enlace con clase `btn-whatsapp`:

```html
<a class="btn-whatsapp" id="btnWhatsapp"
   href="https://wa.me/50368680000?text=...">
```

- Cambiar `50368680000` por el número real, con código de país y sin signos ni espacios.
- Cambiar el texto después de `?text=` para modificar el mensaje (los espacios van como `%20`).

#### Cuándo aparece el botón
En el script al final de `index.html`, ajustar el valor `0.6` de `window.innerHeight * 0.6`. Un número mayor hace que aparezca antes.

#### Colores
Definidos al inicio de `css/index.css`:

```css
:root {
    --rojo: #a30d1b;
    --rojo-claro: #d7192d;
    --oscuro: #191a1d;
    --gris: #f2f3f5;
    --texto: #333333;
}
```

#### Agregar una llanta al catálogo
Duplicar una tarjeta `<article>` dentro de `#catalogo` y actualizar imagen, medida, nombre y precio. El buscador y el filtro la detectan automáticamente.


## 📍 Datos del Negocio
- **Ubicación:** San Miguel, El Salvador
- **Teléfono:** +503 6868 0000
- **Correo:** elfrenazo@gmail.com
- **Horario:** lunes a viernes de 7:00 a. m. a 5:00 p. m.; sábado de 7:00 a. m. a 5:00 p. m.


## Equipo Responsable
En caso de dudas con el proyecto, contactar a:
- **Nombre:** NOMBRE DEL INTEGRANTE
- **Correo:** [correo@ejemplo.com](mailto:correo@ejemplo.com)


## Version del Sistema
v1.0 – Versión inicial

## Autor(es)
Centro de Llantas El Frenazo - Equipo de Desarrollo