# Control de Presupuesto Personal

Un sistema avanzado para gestionar finanzas personales con autenticación de usuarios, múltiples monedas, internacionalización y **análisis visual con gráficos**. Construido con React, Vite, TailwindCSS, Firebase y Recharts.

## Demo en Vivo

Puedes usar la aplicación directamente en: **[control-presupuesto.vercel.app](https://control-presupuesto.vercel.app)**

## Características Principales

- **Autenticación de usuarios** con registro e inicio de sesión
- **Base de datos en la nube** - tus datos se sincronizan entre dispositivos
- **Dashboard con resumen financiero** en tiempo real
- **Gestión de transacciones** (ingresos y gastos) con categorías
- **Control de presupuesto mensual** con alertas y barras de progreso
- **📊 Análisis visual con gráficos interactivos**
- **📈 Múltiples tipos de gráficos** - barras, líneas, donas, estadísticas
- **Análisis por categorías** con desglose visual
- **Múltiples monedas** - EUR, USD, GBP, MXN, ARS, COP, y más
- **Cambio de idioma** - Español e Inglés
- **Búsqueda y filtros** avanzados
- **Diseño responsivo** para móviles y escritorio
- **Persistencia en la nube** con Firebase

## Nuevas Funcionalidades

### 🔐 Sistema de Autenticación
- Registro con email y contraseña
- Inicio de sesión seguro
- Datos privados por usuario
- Perfil de usuario personalizable

### 📊 **Análisis Visual con Gráficos**
- **Gráfico de barras** - Tendencia mensual de ingresos vs gastos
- **Gráficos de dona** - Distribución por categorías (ingresos y gastos)
- **Gráfico de área** - Evolución del balance a lo largo del tiempo
- **Tarjetas estadísticas** - KPIs y métricas importantes
- **Tabla de resumen** - Datos mensuales detallados
- **Tres pestañas de análisis**: Resumen, Categorías y Tendencias

### 💱 Soporte Multi-moneda
- **14 monedas disponibles**: EUR, USD, GBP, JPY, MXN, ARS, COP, CLP, PEN, BRL, CAD, CHF, CNY, INR
- Formato automático según la moneda seleccionada
- Configuración persistente por usuario

### 🌍 Internacionalización
- **Español** e **Inglés** completos
- Cambio de idioma en tiempo real
- Traducciones contextuales

## Instalación Local

### Prerrequisitos
- Node.js 16+
- Cuenta de Firebase (gratis)

### Configuración

1. **Clonar e instalar dependencias:**
```bash
git clone [tu-repositorio]
cd control-presupuesto
npm install
```

2. **Configurar Firebase:**
   - Sigue las instrucciones en `FIREBASE_SETUP.md`
   - Crea un archivo `.env` con tu configuración de Firebase

3. **Iniciar desarrollo:**
```bash
npm run dev
```

4. **Abrir navegador:** `http://localhost:3000`

## Primer Uso

1. **Crear cuenta** o iniciar sesión
2. **Seleccionar moneda** y idioma en preferencias
3. **Configurar presupuesto mensual**
4. **Agregar transacciones** (ingresos y gastos)
5. **Ver análisis** haciendo clic en el botón "Gráficos"
6. **Monitorear progreso** en el dashboard

## 📊 Funcionalidades de Análisis

### Dashboard Principal
- Tarjetas de resumen con moneda personalizada
- Indicadores visuales del estado del presupuesto
- Barras de progreso con alertas por colores
- Estado financiero en tiempo real

### Gráficos y Visualizaciones
- **Pestaña Análisis**: Tarjetas estadísticas + gráfico de tendencia mensual
- **Pestaña Categorías**: Gráficos de dona para gastos e ingresos por categoría
- **Pestaña Tendencias**: Evolución del balance + tabla de datos mensuales

### Sistema de Transacciones
- Formularios intuitivos con validación
- Categorización automática traducida
- Búsqueda por descripción y categoría
- Filtros por tipo (ingreso/gasto)
- Eliminación con confirmación

### Gestión de Categorías
Categorías predefinidas traducidas:

**Gastos:** Alimentación, Transporte, Entretenimiento, Salud, Educación, Otros
**Ingresos:** Salario, Freelance, Inversiones, Otros

### Preferencias de Usuario
- Cambio de idioma instantáneo
- Selección de moneda con 14 opciones
- Configuración persistente en la nube

## Tecnologías

### Frontend
- **React 18** - Framework principal
- **Vite** - Build tool y desarrollo
- **TailwindCSS** - Framework de estilos
- **Recharts** - Gráficos interactivos
- **Lucide React** - Iconos modernos

### Backend/Database
- **Firebase Auth** - Autenticación
- **Firestore** - Base de datos NoSQL
- **Firebase Hosting** - Deploy (opcional)

### Librerías Adicionales
- **react-hot-toast** - Notificaciones
- **date-fns** - Manejo de fechas
- **UUID** - Identificadores únicos

## Deployment en Vercel

La aplicación está configurada para deployment automático:

1. **Fork del repositorio**
2. **Conectar con Vercel**
3. **Configurar variables de entorno** de Firebase
4. **Deploy automático** en cada push

### Variables de Entorno para Deploy
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

## Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción para producción
npm run preview  # Previsualización de construcción
npm run lint     # Revisión de código
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── Auth/              # Login, Register, AuthPage
│   ├── Charts/            # Componentes de gráficos
│   │   ├── MonthlyTrendChart.jsx
│   │   ├── CategoryPieChart.jsx
│   │   ├── BalanceLineChart.jsx
│   │   └── StatisticsCards.jsx
│   ├── Preferences/       # Modal de preferencias
│   ├── Analytics.jsx      # Modal principal de análisis
│   ├── Dashboard.jsx      # Dashboard principal
│   ├── Header.jsx         # Cabecera con usuario
│   ├── BudgetOverview.jsx # Tarjetas de resumen
│   ├── BudgetForm.jsx     # Formulario de presupuesto
│   ├── TransactionForm.jsx # Formulario de transacciones
│   ├── TransactionList.jsx # Lista con filtros
│   └── CategoryBreakdown.jsx # Análisis por categorías
├── context/
│   ├── AuthContext.jsx    # Autenticación y usuario
│   ├── BudgetContext.jsx  # Lógica de presupuesto
│   ├── LanguageContext.jsx # Traducciones
│   └── CurrencyContext.jsx # Formato de monedas
├── hooks/
│   └── useChartData.js    # Hook para procesar datos de gráficos
├── config/
│   └── firebase.js        # Configuración Firebase
└── App.jsx               # Componente raíz
```

## 📈 Tipos de Gráficos Incluidos

1. **Gráfico de Barras** - Compara ingresos vs gastos por mes
2. **Gráficos de Dona** - Muestra distribución porcentual por categorías
3. **Gráfico de Área** - Evolución del balance a lo largo del tiempo
4. **Tarjetas Estadísticas** - KPIs importantes como promedios y totales
5. **Tabla de Datos** - Resumen numérico de los últimos meses

## Seguridad y Privacidad

- **Datos encriptados** en Firebase
- **Reglas de seguridad** Firestore
- **Autenticación robusta** con Firebase Auth
- **Acceso restringido** - solo el usuario ve sus datos
- **No tracking** de terceros

## Contribución

Para contribuir al proyecto:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## Licencia

Proyecto de uso personal y educativo.

---

**¡Toma control total de tus finanzas con usuarios, múltiples monedas, sincronización en la nube y análisis visual con gráficos! 📊💰** 