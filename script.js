// Espera que o DOM seja completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  // Elementos
  const hamburger = document.querySelector(".hamburger");
  const body = document.body;
  const backToTop = document.createElement("div");
  const dots = document.querySelectorAll(".dot");
  const depoimentos = document.querySelector(".depoimentos-slider");

  // Criar menu mobile
  const mobileMenu = document.createElement("div");
  mobileMenu.className = "mobile-menu";
  mobileMenu.innerHTML = `
        <span class="close-menu">&times;</span>
        <ul>
            <li><a href="#historia">História</a></li>
            <li><a href="#basquete">Esportes</a></li>
            <li><a href="#sonho">Meu Sonho</a></li>
            <li><a href="#apoie" class="btn-apoie">Apoie</a></li>
        </ul>
    `;
  body.appendChild(mobileMenu);

  // Botão voltar ao topo
  backToTop.className = "back-to-top";
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  body.appendChild(backToTop);

  // Controle do menu mobile
  hamburger.addEventListener("click", function () {
    mobileMenu.classList.add("active");
    body.style.overflow = "hidden";
  });

  document.querySelector(".close-menu").addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    body.style.overflow = "";
  });

  // Links do menu mobile
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      body.style.overflow = "";
    });
  });

  // Botão de voltar ao topo
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Animação de elementos ao scroll
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    section.classList.add("hidden");
    observer.observe(section);
  });

  // Slider de depoimentos
  let currentSlide = 0;
  const depoimentosItems = document.querySelectorAll(".depoimento");

  function showSlide(index) {
    if (index >= depoimentosItems.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = depoimentosItems.length - 1;
    } else {
      currentSlide = index;
    }

    // Esconde todos os depoimentos
    depoimentosItems.forEach((item) => {
      item.style.display = "none";
    });

    // Remove a classe active de todos os dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Mostra o depoimento atual
    depoimentosItems[currentSlide].style.display = "block";
    dots[currentSlide].classList.add("active");
  }

  // Inicializa o slider
  showSlide(currentSlide);

  // Adiciona evento de clique aos dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Avança o slide automaticamente a cada 5 segundos
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);

  // Contador animado para as conquistas
  const observerConquistas = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numeroElements = document.querySelectorAll(".numero");

          numeroElements.forEach((numero) => {
            const target = parseInt(numero.textContent);
            let count = 0;
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 20);

            const timer = setInterval(() => {
              count += increment;

              if (count >= target) {
                numero.textContent =
                  target + (target === parseInt(target) ? "" : "+");
                clearInterval(timer);
              } else {
                numero.textContent =
                  Math.floor(count) + (target === parseInt(target) ? "" : "+");
              }
            }, 20);
          });

          observerConquistas.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  const conquistasSection = document.querySelector(".conquistas");
  if (conquistasSection) {
    observerConquistas.observe(conquistasSection);
  }

  // Efeito de digitação para o título da hero
  const heroTitle = document.querySelector(".hero h1");
  const originalText = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  setTimeout(typeWriter, 500);

  // Atualiza a barra de progresso com animação
  const progressBar = document.querySelector(".progresso-atual");
  if (progressBar) {
    const targetWidth = progressBar.style.width;
    progressBar.style.width = "0%";

    const observerProgress = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              progressBar.style.transition = "width 1.5s ease-in-out";
              progressBar.style.width = targetWidth;
            }, 500);
            observerProgress.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observerProgress.observe(document.querySelector(".progresso"));
  }

  // Animação para QR Code
  const qrCode = document.querySelector(".qrcode-container img");
  if (qrCode) {
    qrCode.addEventListener("mouseover", () => {
      qrCode.style.transform = "scale(1.05)";
      qrCode.style.transition = "transform 0.3s";
    });

    qrCode.addEventListener("mouseout", () => {
      qrCode.style.transform = "scale(1)";
    });
  }

  // Parallax na imagem do Hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero && scrolled <= hero.offsetHeight) {
      hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
  });

  // Adiciona classe 'scrolled' ao header quando rolar a página
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Exibir forma de doação ao clicar no botão de apoio
  const btnApoie = document.querySelector(".btn-principal");
  if (btnApoie) {
    btnApoie.addEventListener("click", (e) => {
      e.preventDefault();
      const apoieSection = document.querySelector("#apoie");

      window.scrollTo({
        top: apoieSection.offsetTop - 100,
        behavior: "smooth",
      });

      // Destaque visual temporário
      setTimeout(() => {
        document.querySelector(".apoie-content").classList.add("destaque");
        setTimeout(() => {
          document.querySelector(".apoie-content").classList.remove("destaque");
        }, 1000);
      }, 500);
    });
  }
});

// Adiciona classe CSS para animação
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
        .hidden {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .destaque {
            animation: pulse 1s;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7); }
            70% { box-shadow: 0 0 0 20px rgba(255, 107, 53, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0); }
        }
        
        header.scrolled {
            background-color: #fff;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s, box-shadow 0.3s;
        }
    `;
  document.head.appendChild(style);
});

// Funções para manipulação dos popups
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    // Primeiro definimos display block, depois adicionamos a classe active para acionar a transição
    popup.style.display = "block";

    // Forçamos um reflow antes de adicionar a classe active
    void popup.offsetWidth;

    // Adicionamos a classe active para iniciar a animação
    popup.classList.add("active");

    // Bloqueamos o scroll da página enquanto o popup estiver aberto
    document.body.style.overflow = "hidden";
  }
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    // Removemos a classe active para iniciar a animação de saída
    popup.classList.remove("active");

    // Esperamos a transição terminar antes de esconder o elemento
    setTimeout(() => {
      popup.style.display = "none";

      // Reativamos o scroll da página
      document.body.style.overflow = "";
    }, 300); // Este tempo deve corresponder à duração da transição no CSS
  }
}

// Fechamento de popup ao clicar fora do conteúdo
document.addEventListener("click", function (event) {
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    if (popup.classList.contains("active") && event.target === popup) {
      const popupId = popup.getAttribute("id");
      closePopup(popupId);
    }
  });
});

// Fechamento do popup com a tecla ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup.active");
    if (activePopup) {
      const popupId = activePopup.getAttribute("id");
      closePopup(popupId);
    }
  }
});

// Funcionalidade para o FAQ
document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");
  if (faqQuestions && faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.parentElement;

        // Verifica se o item clicado já está ativo
        const isActive = faqItem.classList.contains("active");

        // Fecha todos os itens
        document.querySelectorAll(".faq-item").forEach((item) => {
          // Remove a classe active de todos os itens
          item.classList.remove("active");

          // Reseta todos os ícones para o estado inicial (+)
          const icon = item.querySelector(".faq-toggle i");
          if (icon) {
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
          }
        });

        // Se o item não estava ativo antes, ativa-o agora
        if (!isActive) {
          faqItem.classList.add("active");

          // Altera o ícone para (-)
          const toggleIcon = question.querySelector(".faq-toggle i");
          if (toggleIcon) {
            toggleIcon.classList.remove("fa-plus");
            toggleIcon.classList.add("fa-minus");
          }
        }
      });
    });
  }
});

// Animação para os itens da timeline
const timelineItems = document.querySelectorAll(".timeline-item");
if (timelineItems.length > 0) {
  const observerTimeline = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          setTimeout(() => {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }, 300 * Array.from(timelineItems).indexOf(entry.target));
          observerTimeline.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  timelineItems.forEach((item, index) => {
    item.style.opacity = 0;
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observerTimeline.observe(item);
  });
}

// Animação para os benefícios
const beneficioItems = document.querySelectorAll(".beneficio-item");
if (beneficioItems.length > 0) {
  const observerBeneficios = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }, 150 * Array.from(beneficioItems).indexOf(entry.target));
          observerBeneficios.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  beneficioItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observerBeneficios.observe(item);
  });
}

// Função para copiar chave PIX
document.addEventListener("DOMContentLoaded", function () {
  const btnCopiarPix = document.getElementById("copiar-pix");
  if (btnCopiarPix) {
    btnCopiarPix.addEventListener("click", function () {
      const chavePix = ""; //colocar a chave pix para copiar aqui;
      navigator.clipboard
        .writeText(chavePix)
        .then(function () {
          // Mudar o texto do botão temporariamente
          const textoOriginal = btnCopiarPix.innerHTML;
          btnCopiarPix.innerHTML =
            '<i class="fas fa-check"></i> Chave PIX Copiada!';
          btnCopiarPix.style.backgroundColor = "#28a745";

          // Voltar ao estado original após 2 segundos
          setTimeout(function () {
            btnCopiarPix.innerHTML = textoOriginal;
            btnCopiarPix.style.backgroundColor = "";
          }, 2000);
        })
        .catch(function () {
          alert(
            "Não foi possível copiar a chave PIX. Por favor, tente novamente."
          );
        });
    });
  }
});
