(function() {
  "use strict";
  
  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function checkURLStructure(){
    if(window.location.href.includes('details') && getQueryParam('id')==null){
      return false;
    }else {
      return true;
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    if(checkURLStructure()){
      //do nothing
    }else{
      window.location.href = '/';
    }
  });
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  
  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  let featuresDiv = document.querySelector('#features');

  if(featuresDiv){
    const tabsContainer = document.querySelector('#features .nav-tabs');
    if(tabsContainer){
     populateTabs(tabsContainer);
    }
  }

  function populateTabs(tabsContainer){
    if(tabsContainer){
      fetch('sample.json')
        .then(response => response.json())
        .then(data => {
          const createTab = (type, isActive) => {
            const tab = document.createElement('li');
            const classes = ["col-6","col-md-4","col-lg-2"]
            tab.classList.add('nav-item');
            tab.classList.add('col-6');
            tab.classList.add('col-md-4');
            tab.classList.add('col-lg-2');
            tab.setAttribute("role","presentation");
            const anchorContent = document.createElement('a');
            anchorContent.classList.add('nav-link');
            anchorContent.setAttribute("data-bs-toggle","tab");
            anchorContent.setAttribute("data-bs-target","#"+type);
            anchorContent.setAttribute("role","tab");
            anchorContent.setAttribute("aria-selected","false");
            anchorContent.dataset.tab = type;
            if (isActive) anchorContent.classList.add('active');
            const textH4 = document.createElement('h4');
            textH4.innerHTML=type;
            anchorContent.appendChild(textH4);
            tab.appendChild(anchorContent);
            tabsContainer.appendChild(tab);
        };

        const createContent = (product) => {
            const type = product.type;
            const tabContent = document.querySelector('.tab-content');
            const tabPane = tabContent.querySelector('#'+type);
            const rowContent = tabPane.querySelector('.row');
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('col-lg-3');
            contentDiv.classList.add('col-md-6');
            contentDiv.classList.add('aos-init');
            contentDiv.classList.add('aos-animate');
            contentDiv.setAttribute("data-aos","fade-up");
            contentDiv.setAttribute("data-aos-delay","100");
            contentDiv.innerHTML = `
              <div class="service-item position-relative">
                  <a target="_blank" href="details.html?id=${product.id}" class="stretched-link">
                    <img src="/assets/images/${product.imagePath}" alt="${product.name}"/>
                    <h3 class="text-center">${product.name}</h3>
                  </a>
              </div>`;
            rowContent.appendChild(contentDiv);
        };

        const types = Array.from(new Set(data.products.map(product => product.type)));
        types.forEach((type, index) => createTab(type, index === 0));
        console.log(types);
        data.products.forEach(product => createContent(product));



        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }

  let portfolioDiv = document.querySelector('#portfolio-details');
  if(portfolioDiv){
    populatePortfolioDetails(portfolioDiv);
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  function populatePortfolioDetails(portfolioDiv){
  // Get the product ID from the query parameter
    const productId = getQueryParam('id');
    if(portfolioDiv){
      fetch('sample.json')
      .then(response => response.json())
      .then(data => {
        const updatePortfolioContent = (product) => {
          if(product.id==productId){
            let portfolioImg = document.querySelector('.portfolio-img');
            if(product.imagePath){
              portfolioImg.setAttribute("src","assets/images/"+product.imagePath);
            }else{
              portfolioImg.setAttribute("src","assets/images/default.jpg");
            }
            let serviceHeading = document.querySelector('.service-detail-heading');
            if(serviceHeading){
              serviceHeading.innerHTML=product.type+' Detail';
              document.querySelector('title').innerHTML = product.name + ' ' + product.type+' Detail';
            }

            let basicPrice = document.querySelector('.basic-pricing');
            let specialPricep = document.querySelector('.special-pricing');
            let premiumPrice = document.querySelector('.premium-pricing');
            if(basicPrice && product.pricing_details.basic){
              basicPrice.innerHTML = "Rs. "+product.pricing_details.basic;
            }
            if(specialPricep && product.pricing_details.special){
              specialPricep.innerHTML="Rs. "+product.pricing_details.special;
            }
            if(premiumPrice && product.pricing_details.premium){
              premiumPrice.innerHTML="Rs. "+product.pricing_details.premium;
            }

            let portfolioHeading = document.querySelector('.portfolio-description .heading');
            let portfolioDetails = document.querySelector('.portfolio-description .details');

            if(product.name){
              portfolioHeading.innerHTML = product.name;
            }
            if(product.description){
              portfolioDetails.innerHTML = product.description + `<ul class="insights">${product["Insights:"].map(insight => `<li>${insight.text}</li>`).join('')}</ul>`;
            }

          }
        }
        data.products.forEach(product => updatePortfolioContent(product));
      })
      .catch(error => console.error('Error fetching data:', error));
    }
  }
      

})();


function sendEmail(){
  let forms = document.querySelectorAll('#contactLead')[0];
  forms.querySelector('.loading').classList.add('d-block');
   emailjs.init({
     publicKey: "TC1bVXADx7066O17y",
   });
  
  emailjs.sendForm('service_o1hawac', 'template_rovbsss', '#contactLead').then(
      
    (response) => {
      forms.querySelector('.loading').classList.remove('d-block');
    if (response.text.trim() == 'OK') {
      forms.querySelector('.sent-message').classList.add('d-block');
      forms.reset(); 
    } else {
      throw new Error(response ? response : 'Form submission failed and no error message returned: '); 
    }
    },
    (error) => {
      console.log('FAILED...', error);
    },
  );
}