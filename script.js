// Função para formatar data em português
function formatDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Sao_Paulo'
    };
    
    return date.toLocaleDateString('pt-BR', options);
}

// Função para formatar hora
function formatTime(date) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
    };
    
    return date.toLocaleTimeString('pt-BR', options);
}

// Atualizar data e hora
function updateDateTime() {
    const now = new Date();
    const dateElement = document.getElementById('current-date');
    const lastUpdateElement = document.getElementById('last-update');
    
    if (dateElement) {
        dateElement.textContent = formatDate(now);
    }
    
    if (lastUpdateElement) {
        lastUpdateElement.textContent = `${formatDate(now)} às ${formatTime(now)}`;
    }
}

// Animação de entrada para os cards
function animateCards() {
    const cards = document.querySelectorAll('.news-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Animação para os indicadores de mercado
function animateMarketIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    
    indicators.forEach((indicator, index) => {
        setTimeout(() => {
            indicator.style.opacity = '1';
            indicator.style.transform = 'translateX(0)';
        }, index * 200);
        
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateX(-20px)';
        indicator.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

// Efeito de hover nos cards de contexto
function addContextCardEffects() {
    const contextCards = document.querySelectorAll('.context-card');
    
    contextCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#667eea';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '#e2e8f0';
        });
    });
}

// Simulação de atualização de dados em tempo real
function simulateRealTimeUpdates() {
    const dollarValue = document.querySelector('.indicator .value');
    const dollarChange = document.querySelector('.indicator .change');
    
    if (dollarValue && dollarChange) {
        setInterval(() => {
            // Simula pequenas variações no dólar
            const currentValue = parseFloat(dollarValue.textContent.replace('R$ ', '').replace(',', '.'));
            const variation = (Math.random() - 0.5) * 0.02; // Variação de -0.01 a +0.01
            const newValue = (currentValue + variation).toFixed(2);
            const changePercent = ((variation / currentValue) * 100).toFixed(2);
            
            dollarValue.textContent = `R$ ${newValue.replace('.', ',')}`;
            
            // Atualiza a classe de mudança
            dollarChange.className = 'change';
            if (variation > 0) {
                dollarChange.classList.add('positive');
                dollarChange.textContent = `+${changePercent}%`;
            } else if (variation < 0) {
                dollarChange.classList.add('negative');
                dollarChange.textContent = `${changePercent}%`;
            } else {
                dollarChange.classList.add('neutral');
                dollarChange.textContent = '0%';
            }
            
            // Efeito visual de atualização
            dollarValue.style.background = '#667eea';
            dollarValue.style.color = 'white';
            dollarValue.style.padding = '2px 6px';
            dollarValue.style.borderRadius = '4px';
            dollarValue.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                dollarValue.style.background = 'transparent';
                dollarValue.style.color = '#1a1a1a';
                dollarValue.style.padding = '0';
            }, 1000);
        }, 30000); // Atualiza a cada 30 segundos
    }
}

// Adicionar efeito de loading
function showLoadingEffect() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
        card.style.backgroundSize = '200% 100%';
        card.style.animation = 'loading 1.5s infinite';
    });
    
    // Remove o efeito após 2 segundos
    setTimeout(() => {
        newsCards.forEach(card => {
            card.style.background = '';
            card.style.animation = '';
        });
    }, 2000);
}

// Adicionar CSS para animação de loading
function addLoadingCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        .news-card.loading {
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// Função para adicionar tooltips aos indicadores de impacto
function addImpactTooltips() {
    const impactElements = document.querySelectorAll('.impact');
    
    impactElements.forEach(element => {
        const impactType = element.classList.contains('high') ? 'Alto' : 
                          element.classList.contains('medium') ? 'Médio' : 'Baixo';
        
        const tooltipText = {
            'Alto': 'Notícia com grande impacto no mercado financeiro',
            'Médio': 'Notícia com impacto moderado nos indicadores econômicos',
            'Baixo': 'Notícia com impacto limitado no cenário econômico'
        };
        
        element.title = tooltipText[impactType];
        
        // Adiciona efeito visual no hover
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
}

// Função para scroll suave
function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Atualizar data e hora
    updateDateTime();
    
    // Adicionar CSS de loading
    addLoadingCSS();
    
    // Mostrar efeito de loading inicial
    showLoadingEffect();
    
    // Inicializar animações após o loading
    setTimeout(() => {
        animateCards();
        animateMarketIndicators();
        addContextCardEffects();
        addImpactTooltips();
        addSmoothScroll();
        
        // Iniciar simulação de atualizações em tempo real
        simulateRealTimeUpdates();
    }, 2000);
    
    // Atualizar data a cada minuto
    setInterval(updateDateTime, 60000);
});

// Adicionar funcionalidade de refresh
document.addEventListener('keydown', (e) => {
    if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        e.preventDefault();
        showLoadingEffect();
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
});

// Adicionar indicador de conexão
function addConnectionIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #10b981;
        z-index: 1000;
        box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        animation: pulse 2s infinite;
    `;
    indicator.title = 'Sistema online - Dados atualizados em tempo real';
    document.body.appendChild(indicator);
}

// Inicializar indicador de conexão
setTimeout(addConnectionIndicator, 3000);
