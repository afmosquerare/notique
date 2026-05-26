export interface NotiqueOptions {
  message: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  duration?: number;
  icon?: string | false;
  dismiss?: boolean;
  color?: string;
  textColor?: string;
  className?: string;
  showProgress?: boolean;
}

const cir = '<path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z"/>';
const C: Record<string, [string, string]> = {
  success: ['<path d="m9 12 2 2 4-4"/>' + cir, '#10b981'],
  error: ['<path d="m15 9-6 6M9 9l6 6"/>' + cir, '#ef4444'],
  info: ['<path d="M12 16v-4M12 8h.01"/>' + cir, '#3b82f6'],
  warning: ['<path d="m21.7 18-8-14a2 2 0 00-3.4 0l-8 14A2 2 0 004 21h16a2 2 0 001.7-3zM12 9v4M12 17h.01"/>', '#f59e0b'],
};

let injected = 0;
let D: Partial<NotiqueOptions> = {
  position: 'bottom-right',
  duration: 3000,
  dismiss: true,
  showProgress: true
};

const cr = (t: string) => document.createElement(t);

function show(raw: any, fallback: string) {
  if (typeof window === 'undefined') return;
  
  if (!injected++) {
    document.head.insertAdjacentHTML('afterbegin', `<style>
      .nq-c{position:fixed;display:flex;flex-direction:column;gap:12px;z-index:9999;pointer-events:none}
      .nq-tr,.nq-br{right:20px;align-items:flex-end}
      .nq-tl,.nq-bl{left:20px;align-items:flex-start}
      .nq-tc,.nq-bc{left:50%;transform:translateX(-50%);align-items:center}
      .nq-tr,.nq-tl,.nq-tc{top:20px}
      .nq-br,.nq-bl,.nq-bc{bottom:20px}
      .nq-t{max-width:600px;pointer-events:auto;position:relative;overflow:hidden;padding:12px 16px;border-radius:8px;color:#fff;font:500 14px/1.4 system-ui,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.15);display:flex;align-items:flex-start;gap:10px;opacity:0;transition:opacity .3s,transform .3s cubic-bezier(.175,.885,.32,1.27)}
      .nq-s{opacity:1!important;transform:none!important}
      .nq-i{flex-shrink:0;margin-top:1px}
      .nq-i svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
      .nq-p{position:absolute;bottom:0;left:0;height:3px;background:rgba(255,255,255,.35);animation:nq-p linear forwards}
      @keyframes nq-p{from{width:100%}to{width:0}}
      @media(max-width:480px){.nq-c{left:12px!important;right:12px!important;transform:none!important;align-items:stretch!important}}
    </style>`);
  }

  const o = Object.assign({}, D, typeof raw === 'string' ? { message: raw } : raw);
  const type = o.type ?? fallback;
  const pos = o.position!;
  const dur = o.duration!;
  const prefix = pos.split('-').map((w: string) => w[0]).join('');
  const [svg, defColor] = C[type];

  let wrap = document.querySelector(`.nq-${prefix}`);
  if (!wrap) {
    document.body.insertAdjacentHTML('beforeend', `<div class="nq-c nq-${prefix}"></div>`);
    wrap = document.querySelector(`.nq-${prefix}`);
  }

  const el = cr('div');
  el.className = `notique nq-t ${o.className || ''}`;
  el.setAttribute('role', 'alert');
  el.setAttribute('aria-live', type === 'error' || type === 'warning' ? 'assertive' : 'polite');
  el.style.cssText = `background:${o.color ?? defColor};transform:translateY(${pos[0] === 't' ? '-' : ''}16px) scale(.95)`;
  if (o.textColor) el.style.color = o.textColor;

  if (o.icon !== false) {
    const icon = cr('span');
    icon.className = 'nq-i';
    icon.innerHTML = o.icon ?? `<svg viewBox="0 0 24 24">${svg}</svg>`;
    el.appendChild(icon);
  }

  const text = cr('div');
  text.style.flexGrow = '1';
  const msg = cr('div');
  msg.textContent = o.message;
  if (o.description) {
    msg.style.fontWeight = '600';
    const desc = cr('div');
    desc.textContent = o.description;
    desc.style.cssText = 'font-size:.875em;opacity:.85;margin-top:3px';
    text.appendChild(msg);
    text.appendChild(desc);
  } else {
    text.appendChild(msg);
  }
  el.appendChild(text);

  if (o.showProgress !== false) {
    el.insertAdjacentHTML('beforeend', `<div class="nq-p" style="animation-duration:${dur}ms"></div>`);
  }

  pos[0] === 't' ? wrap!.prepend(el) : wrap!.appendChild(el);
  el.offsetHeight;
  el.classList.add('nq-s');

  const remove = () => {
    el.classList.remove('nq-s');
    el.addEventListener('transitionend', () => {
      el.remove();
      if (!wrap!.childElementCount) wrap!.remove();
    }, { once: true });
  };

  if (o.dismiss !== false) el.onclick = remove;
  setTimeout(remove, dur);
}

export interface NotiqueMethod {
  (message: string): void;
  (message: string, options: Omit<NotiqueOptions, 'message'>): void;
  (message: string, description: string): void;
  (message: string, description: string, options: Omit<NotiqueOptions, 'message' | 'description'>): void;
  (options: NotiqueOptions): void;
}

const method = (type: string): NotiqueMethod => (a?: any, b?: any, c?: any) => show(
  typeof a === 'string' ? (typeof b === 'string' ? { message: a, description: b, ...(c||{}) } : { message: a, ...(b||{}) }) : a,
  type
);

export const notique = {
  config: (options: Partial<NotiqueOptions>) => { Object.assign(D, options); },
  success: method('success'),
  error: method('error'),
  info: method('info'),
  warning: method('warning'),
  custom: method('info')
};