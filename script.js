/**
 * SCRIPT PRINCIPAL - LANDING PAGE LILIAN PSICANALISTA
 * 
 * Funcionalidades:
 * 1. Efeito de Sombra e Fixação do Header ao Rolar
 * 2. Animação de Surgimento de Elementos (Fade-In Reveal)
 * 3. Acordeão Interativo do FAQ (Perguntas Frequentes)
 * 4. Navegação Suave (Smooth Scroll)
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. EFEITO DE SOMBRA E FIXAÇÃO DO HEADER
  const header = document.getElementById('header');
  
  const handleHeaderScroll = () => {
    if (window.scrollY > 20) {
      header.style.backgroundColor = 'rgba(250, 249, 246, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = '0 4px 20px rgba(46, 59, 50, 0.05)';
      header.style.padding = '1.25rem 0';
    } else {
      header.style.backgroundColor = 'transparent';
      header.style.backdropFilter = 'none';
      header.style.boxShadow = 'none';
      header.style.padding = '2rem 0';
    }
  };
  
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Executa ao carregar a página também

  // 2. ANIMAÇÃO DE SURGIMENTO DE ELEMENTOS (FADE-IN REVEAL)
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const revealOnScroll = () => {
    fadeElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Se o elemento estiver visível a 85% da tela
      if (elementTop < windowHeight * 0.85) {
        el.classList.add('visible');
      }
    });
  };

  // Se o navegador suportar IntersectionObserver, usamos para melhor desempenho
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Para de observar após animar
        }
      });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback para navegadores antigos
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Executa ao carregar
  }

  // 3. ACORDEÃO INTERATIVO DO FAQ
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const answer = question.nextElementSibling;
      const isActive = faqItem.classList.contains('active');
      
      // Fechar todos os FAQs abertos antes de abrir o atual
      faqQuestions.forEach(otherQuestion => {
        const otherItem = otherQuestion.parentElement;
        const otherAnswer = otherQuestion.nextElementSibling;
        
        otherItem.classList.remove('active');
        otherQuestion.setAttribute('aria-expanded', 'false');
        otherAnswer.style.maxHeight = null;
      });
      
      // Abrir o item clicado se ele não estava ativo
      if (!isActive) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        // Calcula a altura exata do conteúdo para a transição suave
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // 4. NAVEGAÇÃO SUAVE PARA LINKS INTERNOS
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Ignorar se for apenas "#" ou "#politicas" / "#termos" (que seriam páginas separadas ou modais)
      if (targetId === '#') return;
      if (targetId === '#politicas' || targetId === '#termos') {
        e.preventDefault();
        alert('Este é um link demonstrativo de políticas de privacidade/termos de uso. Você pode conectá-lo a um arquivo real de acordo com as regulamentações da sua região.');
        return;
      }
      
      e.preventDefault();
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Deslocamento para compensar a altura do Header fixo
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
});
