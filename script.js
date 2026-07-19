(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !isOpen);
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
    }));
  }

  const sendEvent = (name, params = {}) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params);
    }
  };

  const eventDetails = {
    whatsapp_header: { button_location: 'header' },
    whatsapp_hero: { button_location: 'hero' },
    whatsapp_style_coastal: { button_location: 'style_card', style_name: 'coastal_story' },
    whatsapp_style_ivory: { button_location: 'style_card', style_name: 'classic_ivory' },
    whatsapp_style_lavender: { button_location: 'style_card', style_name: 'modern_lavender' },
    whatsapp_inquiry: { button_location: 'inquiry_section' },
    whatsapp_footer: { button_location: 'footer' },
    whatsapp_floating: { button_location: 'floating_button' }
  };

  document.querySelectorAll('.track-event').forEach(element => {
    element.addEventListener('click', () => {
      const key = element.dataset.event || 'site_interaction';
      const common = {
        link_url: element.href || '',
        link_text: (element.textContent || '').trim().slice(0, 80)
      };

      if (key.startsWith('whatsapp_')) {
        sendEvent('whatsapp_click', { ...common, ...(eventDetails[key] || {}) });
      } else if (key === 'view_style_gallery') {
        sendEvent('view_style_gallery', { section_name: 'design_gallery' });
      } else {
        sendEvent(key, common);
      }
    });
  });
})();
