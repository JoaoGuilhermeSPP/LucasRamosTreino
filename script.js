// ============================================
// LANDING PAGE - LUCAS RAMOS
// JavaScript - Form Handling & WhatsApp Integration
// ============================================

// Número do WhatsApp do profissional
const WHATSAPP_NUMBER = '5522998055386';

// Função para abrir o formulário com interesse pré-selecionado
function openForm(interesse) {
    const selectElement = document.getElementById('interesse');
    selectElement.value = interesse;
    document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('nome').focus();
}

// Função para rolar até o formulário
function scrollToForm() {
    document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('nome').focus();
}
const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    index++;
    if (index >= slides.length) {
        index = 0;
    }
}

// troca a cada 3 segundos
setInterval(showSlide, 3000);

// Manipulador do formulário de contato
document.getElementById('contatoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obter valores do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const interesse = document.getElementById('interesse').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação básica
    if (!nome || !email || !idade || !interesse) {
        alert('Por favor, preencha todos os campos obrigatórios (*)');
        return;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido');
        return;
    }

    // Validação de idade
    if (idade < 1 || idade > 150) {
        alert('Por favor, insira uma idade válida');
        return;
    }

    // Construir mensagem para WhatsApp
    let mensagemWhatsApp = `Olá Lucas! 👋\n\n`;
    mensagemWhatsApp += `Meu nome é ${nome}\n`;
    mensagemWhatsApp += `Meu e-mail é ${email}\n`;
    mensagemWhatsApp += `Tenho ${idade} anos\n`;
    mensagemWhatsApp += `Interesse: ${interesse}\n`;
    
    if (mensagem) {
        mensagemWhatsApp += `\nMensagem:\n${mensagem}\n`;
    }

    mensagemWhatsApp += `\nGostaria de saber mais sobre seus serviços!`;

    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);

    // Construir URL do WhatsApp
    const urlWhatsApp = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${mensagemCodificada}&type=phone_number&app_absent=0`;

    // Limpar formulário
    document.getElementById('contatoForm').reset();
    document.getElementById('interesse').value = '';

    // Redirecionar para WhatsApp
    window.open(urlWhatsApp, '_blank');
});

// Adicionar efeito de animação ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos ao entrar na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar cards de serviço
    document.querySelectorAll('.servico-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observar links sociais
    document.querySelectorAll('.social-link').forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(link);
    });
});

// Efeito de scroll suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Adicionar classe ativa ao link de navegação durante scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Validação em tempo real do formulário
document.getElementById('email').addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '';
    }
});

document.getElementById('idade').addEventListener('blur', function() {
    const idade = parseInt(this.value);
    if (this.value && (idade < 1 || idade > 150)) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '';
    }
});
