# Configuración de Firebase

Para que la aplicación funcione correctamente con autenticación y base de datos, necesitas configurar Firebase.

## Pasos de configuración:

### 1. Crear proyecto en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear proyecto"
3. Sigue los pasos del asistente

### 2. Configurar Authentication
1. En Firebase Console, ve a "Authentication"
2. Haz clic en "Comenzar"
3. En la pestaña "Sign-in method", habilita "Email/Password"

### 3. Configurar Firestore Database
1. En Firebase Console, ve a "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" por ahora
4. Elige una ubicación cercana

### 4. Obtener configuración
1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. En la pestaña "General", baja hasta "Tus aplicaciones"
3. Haz clic en "Agregar app" → "Web"
4. Registra tu app con un nombre
5. Copia la configuración que aparece

### 5. Variables de entorno
Crea un archivo `.env` en la raíz del proyecto con:

```
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 6. Reglas de Firestore (Producción)
Para producción, actualiza las reglas en Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own documents
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Budgets are private to each user
    match /budgets/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Transactions are private to each user
    match /transactions/{transactionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Estructura de datos en Firestore:

### Colección `users`
```
users/{userId} {
  name: string,
  email: string,
  preferences: {
    language: 'es' | 'en',
    currency: string
  },
  createdAt: timestamp
}
```

### Colección `budgets`
```
budgets/{userId} {
  amount: number,
  userId: string,
  updatedAt: timestamp
}
```

### Colección `transactions`
```
transactions/{transactionId} {
  userId: string,
  description: string,
  amount: number,
  type: 'income' | 'expense',
  category: string,
  date: timestamp,
  id: string
}
``` 