import { notique } from './notique';

notique.config({
  position: 'top-center',
  duration: 4000,
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<style> 

  .notique{
    border-radius: 0;    
  }
.notique-error {
   background-color: red !important; 
   border: none;
    color: black;
  }
  .notique-success {
    color: #000;
  }

   </style> 
  <div style="font-family: sans-serif; padding: 3rem; text-align: center;">
    <h1>Notique Overloads Test</h1>
    <p style="color: #666; margin-bottom: 2rem;">Testing the 7 different ways to call notique</p>
    
    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
      <button id="btn-1" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #10b981; color: white; border: none; border-radius: 6px;">
        1. String only (Success)
      </button>
      
      <button id="btn-2" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #3b82f6; color: white; border: none; border-radius: 6px;">
        2. String + Desc (Info)
      </button>

      <button id="btn-3" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #f59e0b; color: white; border: none; border-radius: 6px;">
        3. String + Options (Warning)
      </button>

      <button id="btn-4" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #8b5cf6; color: white; border: none; border-radius: 6px;">
        4. String + Desc + Options (Custom)
      </button>

      <button id="btn-5" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #ef4444; color: white; border: none; border-radius: 6px;">
        5. Full Object (Error)
      </button>
      <button id="btn-7" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #14b8a6; color: white; border: none; border-radius: 6px;">
        7. Persistent Toast (Info)
      </button>

      <button id="btn-8" style="padding: 10px 20px; font-size: 15px; cursor: pointer; background: #ec4899; color: white; border: none; border-radius: 6px;">
        8. Top Center (Warning)
      </button>
    </div>
  </div>
`;

document.getElementById('btn-1')?.addEventListener('click', () => {
  notique.success('Payment processed successfully');
});

document.getElementById('btn-2')?.addEventListener('click', () => {
  notique.info('New update available', 'No animated progress bar.', { showProgress: false });
});

document.getElementById('btn-3')?.addEventListener('click', () => {
  notique.warning('Low battery warning', { position: 'bottom-center', duration: 2000 });
});

document.getElementById('btn-4')?.addEventListener('click', () => {
  notique.custom('Upload complete', '15 files uploaded successfully.', { position: 'top-left', dismiss: false });
});

document.getElementById('btn-5')?.addEventListener('click', () => {
  notique.error({
    message: 'Network error',
    description: 'Could not connect to the server.',
    position: 'bottom-right',
    duration: 6000
  });
});

document.getElementById('btn-7')?.addEventListener('click', () => {
  notique.info('Persistent Notification', 'This toast will not disappear on its own and cannot be dismissed.', {
    dismiss: false,
    duration: 999999,
    showProgress: false,
    position: 'bottom-left'
  });
});

document.getElementById('btn-8')?.addEventListener('click', () => {
  notique.warning('Custom Text Color', 'This warning uses a dark text color for better contrast.', {
    textColor: '#111827',
    position: 'top-center'
  });
});
