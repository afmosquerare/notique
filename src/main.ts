import { notique } from './notique';

notique.config({
  position: 'top-center',
  duration: 4000
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="font-family: sans-serif; padding: 3rem; text-align: center;">
    <h1>Notique Overloads Test</h1>
    <p style="color: #666; margin-bottom: 2rem;">Prueba de las 5 formas diferentes de llamar a notique</p>
    
    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
      <button id="btn-1" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #10b981; color: white; border: none; border-radius: 6px;">
        1. Solo String (Success)
      </button>
      
      <button id="btn-2" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #3b82f6; color: white; border: none; border-radius: 6px;">
        2. String + Desc (Info)
      </button>

      <button id="btn-3" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #f59e0b; color: white; border: none; border-radius: 6px;">
        3. String + Opciones (Warning)
      </button>

      <button id="btn-4" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #8b5cf6; color: white; border: none; border-radius: 6px;">
        4. String + Desc + Opciones (Info)
      </button>

      <button id="btn-5" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #ef4444; color: white; border: none; border-radius: 6px;">
        5. Objeto Completo (Error)
      </button>
    </div>
  </div>
`;

document.getElementById('btn-1')?.addEventListener('click', () => {
  notique.success('Pago procesado con éxito');
});

document.getElementById('btn-2')?.addEventListener('click', () => {
  notique.info('Nueva actualización', 'Sin barra de progreso animada.', { showProgress: false });
});

document.getElementById('btn-3')?.addEventListener('click', () => {
  notique.warning('Cuidado con la batería', { position: 'bottom-center', duration: 2000 });
});

document.getElementById('btn-4')?.addEventListener('click', () => {
  notique.success('Subida completa', 'Se subieron 15 archivos correctamente.', { position: 'top-left', dismiss: false });
});

document.getElementById('btn-5')?.addEventListener('click', () => {
  notique.error({
    message: 'Error de red',
    description: 'No se pudo conectar con el servidor.',
    position: 'bottom-right',
    duration: 6000
  });
});
