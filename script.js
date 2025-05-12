document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    const navLinks = document.querySelectorAll('header nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    const toggleButtons = document.querySelectorAll('.toggle-attractions');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const placeCard = this.closest('.place-card');
            const attractions = placeCard.querySelector('.attractions');
            
            attractions.classList.toggle('active');
            
            if (attractions.classList.contains('active')) {
                this.textContent = 'Hide Attractions';
            } else {
                this.textContent = 'View Attractions';
            }
        });
    });
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    const scrollTopButton = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('active');
        } else {
            scrollTopButton.classList.remove('active');
        }
    });
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.place-card, .gallery-item, .about-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
    
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

function createTimelineEffect() {
    const timeline = document.querySelector('.timeline');
    const placeCards = document.querySelectorAll('.place-card');
    
    if (!timeline || placeCards.length === 0) return;
    
    if (window.innerWidth > 992) {
        placeCards.forEach((card, index) => {
            if (index % 2 === 0) {
                card.classList.add('left');
            } else {
                card.classList.add('right');
            }
        });
    }
}

window.addEventListener('load', createTimelineEffect);
window.addEventListener('resize', createTimelineEffect);

function setupImagePreview() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.classList.add('image-preview-modal');
            
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('close-modal');
            closeBtn.innerHTML = '&times;';
            
            const image = document.createElement('img');
            image.src = this.src;
            
            const caption = document.createElement('p');
            caption.textContent = this.parentElement.querySelector('.gallery-overlay h3').textContent;
            
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(image);
            modalContent.appendChild(caption);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 10);
            
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            function closeModal() {
                modal.style.opacity = '0';
                modalContent.style.transform = 'translateY(-50px)';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });
}

window.addEventListener('load', setupImagePreview);
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .image-preview-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        transform: translateY(-50px);
        transition: transform 0.3s ease;
    }
    
    .modal-content img {
        max-width: 100%;
        max-height: 80vh;
        display: block;
        margin: 0 auto;
        border: 5px solid white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }
    
    .modal-content p {
        color: white;
        text-align: center;
        margin-top: 15px;
        font-size: 1.2rem;
    }
    
    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .close-modal:hover {
        color: #0077b6;
    }
    
    .place-card.animate, .gallery-item.animate, .about-content.animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);