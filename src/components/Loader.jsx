import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Loader = () => {
  // Verificar que el contexto de idioma esté disponible antes de usarlo
  let t = (key) => key; // función por defecto

  try {
    const languageContext = useLanguage();
    t = languageContext.t;
  } catch (error) {
    // Si el contexto no está disponible, usar valores por defecto
    console.warn('LanguageContext no está disponible en Loader, usando valores por defecto');
  }

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="relative flex items-center justify-center w-48 h-48" style={{ perspective: '780px' }}>
        {/* Texto Loading */}
        <span className="absolute text-2xl font-bold text-gray-400 z-10">
          {t('loading')}
        </span>
        
        {/* Círculo 1 */}
        <div 
          className="absolute w-full h-full rounded-full border-b-4 border-blue-500"
          style={{
            animation: 'rotate1 1.15s linear infinite',
            transform: 'rotateX(45deg) rotateY(-45deg) rotateZ(0deg)'
          }}
        ></div>
        
        {/* Círculo 2 */}
        <div 
          className="absolute w-full h-full rounded-full border-r-4 border-purple-500"
          style={{
            animation: 'rotate2 1.15s 0.1s linear infinite',
            transform: 'rotateX(45deg) rotateY(45deg) rotateZ(0deg)'
          }}
        ></div>
        
        {/* Círculo 3 */}
        <div 
          className="absolute w-full h-full rounded-full border-t-4 border-blue-600"
          style={{
            animation: 'rotate3 1.15s 0.15s linear infinite',
            transform: 'rotateX(-60deg) rotateY(0deg) rotateZ(0deg)'
          }}
        ></div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes rotate1 {
            0% {
              transform: rotateX(45deg) rotateY(-45deg) rotateZ(0deg);
            }
            100% {
              transform: rotateX(45deg) rotateY(-45deg) rotateZ(360deg);
            }
          }
          
          @keyframes rotate2 {
            0% {
              transform: rotateX(45deg) rotateY(45deg) rotateZ(0deg);
            }
            100% {
              transform: rotateX(45deg) rotateY(45deg) rotateZ(360deg);
            }
          }
          
          @keyframes rotate3 {
            0% {
              transform: rotateX(-60deg) rotateY(0deg) rotateZ(0deg);
            }
            100% {
              transform: rotateX(-60deg) rotateY(0deg) rotateZ(360deg);
            }
          }
        `
      }} />
    </div>
  );
};

export default Loader; 