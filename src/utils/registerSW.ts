// Función para registrar el Service Worker
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
      
      // Verificar actualizaciones periódicamente
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000); // Cada hora
      
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
    }
  } else {
    console.log('Service workers are not supported.');
  }
}

// Función para mostrar una notificación de actualización disponible
export function showUpdateNotification(registration: ServiceWorkerRegistration) {
  // Crear un elemento de notificación
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 flex items-center';
  notification.innerHTML = `
    <div class="mr-3">Hay una nueva versión disponible</div>
    <button id="update-app" class="bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-medium">
      Actualizar
    </button>
  `;
  
  document.body.appendChild(notification);
  
  // Añadir evento al botón
  document.getElementById('update-app')?.addEventListener('click', () => {
    if (registration.waiting) {
      // Enviar mensaje al service worker para que se active
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    notification.remove();
    window.location.reload();
  });
}

// Función para detectar actualizaciones del service worker
export function listenForUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateNotification(registration);
            }
          });
        }
      });
    });
    
    // Detectar cuando el service worker toma el control
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }
}
