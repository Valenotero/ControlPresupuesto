# Control de Presupuesto Personal

Un sistema para gestionar finanzas personales, construido con React, Vite y TailwindCSS.

## Demo en Vivo

Puedes usar la aplicación directamente en: **[control-presupuesto.vercel.app](https://control-presupuesto.vercel.app)**

## Características

- Dashboard con resumen financiero
- Gestión de transacciones (ingresos y gastos)
- Control de presupuesto mensual
- Análisis por categorías
- Búsqueda y filtros
- Persistencia local de datos
- Diseño responsivo

## Instalación Local

Si quieres ejecutar la aplicación en tu equipo:

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

3. Abrir navegador en `http://localhost:3000`

## Primer Uso

1. Configura tu presupuesto mensual
2. Agrega tus ingresos y gastos
3. Monitorea tu progreso en el dashboard

## Funcionalidades

### Dashboard
- Tarjetas de resumen (presupuesto, ingresos, gastos, balance)
- Barra de progreso del presupuesto
- Indicadores visuales del estado financiero

### Transacciones
- Formulario para agregar ingresos y gastos
- Categorización automática
- Búsqueda y filtrado
- Eliminación con confirmación

### Categorías Incluidas

**Gastos:**
- Alimentación
- Transporte
- Entretenimiento
- Salud
- Educación
- Otros Gastos

**Ingresos:**
- Salario
- Trabajo Independiente
- Inversiones
- Otros Ingresos

## Tecnologías

- React 18
- Vite
- TailwindCSS
- Lucide React (iconos)
- date-fns (fechas)
- Context API (estado global)

## Deployment

La aplicación está desplegada en Vercel. Para desplegar tu propia versión:

1. Crear cuenta en [Vercel](https://vercel.com)
2. Conectar tu repositorio de GitHub
3. Vercel detectará automáticamente la configuración
4. Deploy automático en cada push

## Comandos

```bash
npm run dev      # Desarrollo
npm run build    # Construcción
npm run preview  # Previsualización
npm run lint     # Revisión de código
```

## Almacenamiento

Los datos se guardan en localStorage del navegador. No se envían datos a servidores externos. 