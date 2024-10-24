export default function Example() {
  const width = 250;
  const height = 250;
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-white">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-8">
          <a href="https://dynamicland.org/2024/Intro/">
            <img
              alt="Transistor"
              src="https://yt3.googleusercontent.com/ytc/AIdro_n2PcLV-HnzLgM6ek5Bga1fF9BQjTzkBSoEmbHLMr2KNA=s160-c-k-c0x00ffffff-no-rj"
              width={width}
              height={height}
              className="col-span-2 w-full object-contain lg:col-span-1"
            />
          </a>
          <a href="https://waymo.com">
            <img
              alt="Reform"
              src="https://waymo.com/v2/static/images/logo-with-text-vertical.svg"
              width={width}
              height={height}
              className="col-span-2 w-full object-contain lg:col-span-1"
            />
          </a>
          <a href="https://ycombinator.com">
            <img
              alt="Tuple"
              src="https://pbs.twimg.com/profile_images/1623777064821358592/9CApQWXe_400x400.png"
              width={width}
              height={height}
              className="col-span-2  w-full object-contain lg:col-span-1"
            />
          </a>
          <a href="https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book.html">
            <img
              alt="SavvyCal"
              src="https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/graphics/main-banner.gif"
              width={width}
              height={height}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
          </a>
          <a href="https://deeptlas.ai">
          <img
            alt="deepatlas"
            src="https://www.deepatlas.ai/images/logo-white.svg"
            width={width}
            height={height}
            className="col-span-2 col-start-2  w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        
          </a>
          <a href="https://threejs-journey.com">
          {/* <img
            alt="threejs-journey"
            src="https://threejs-journey.com/assets/images/chapters/chapter-06.webp"
            width={width}
            height={height}
            className="col-span-2 col-start-2  w-full object-contain sm:col-start-auto lg:col-span-1"
          /> */}
          {three_js_journey()}
          {/* /assets/images/illustration-student.webp */}
          </a>
        </div>
      </div>
    </div>
  )
}

function three_js_journey(props) {

  return (<a href="https://threejs-journey.com/" class="main-logo is-light fill-white" data-router-set="">
                    <div class="logo"><svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 58.5 66.6" style="enable-background:new 0 0 58.5 66.6;" xml:space="preserve">
    <path class="face-1" d="M23.1,55.7l16.1-9.3c0,0,0,0,0,0c1.1-0.7,1.8-1.9,1.8-3.1l0.1-19.1L23.1,34.4V55.7z"></path>
    <path class="face-2" d="M21.3,10L2.9,20.5l18,10.2l18.4-10.5c0,0,0,0-0.1,0l-17.4-10C21.7,10.1,21.5,10.1,21.3,10z"></path>
    <path class="face-3" d="M1.8,46.7L18,56.6c0,0,0,0,0,0c0.3,0.2,0.5,0.3,0.8,0.3V34.5L0,23.8v19.7C0,44.9,0.7,46.1,1.8,46.7z"></path>
    <path class="triangle-1" d="M56.8,30.4l-11.4-6.6l-0.1,19.2l11.5-6.7c1-0.6,1.7-1.7,1.7-2.9C58.5,32.1,57.9,31,56.8,30.4z"></path>
    <path class="triangle-2" d="M0,50.7v12.6c0,1.2,0.6,2.3,1.7,2.9c0.5,0.3,1.1,0.5,1.7,0.5c0.6,0,1.2-0.2,1.7-0.5l10.4-6L0,50.7z"></path>
    <path class="triangle-3" d="M16.4,7L5.1,0.5c-1-0.6-2.3-0.6-3.4,0C0.6,1.1,0,2.2,0,3.4v13.2L16.4,7z"></path>
</svg>
</div>
                    {/* <div class="text"><svg width="160" height="22" viewBox="0 0 160 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="letter t" d="M7.52113 7.98393V5.22393H5.47413V1.93493H1.79413V5.22393H0.161133V7.98393H1.79413V13.1359C1.79413 15.7809 2.55313 17.2069 5.24413 17.2069C6.27913 17.2069 6.85413 17.0919 7.52113 16.9539V14.1939C5.95713 14.1939 5.47413 14.1939 5.47413 12.8599V7.98393H7.52113Z" fill="white"></path>
<path class="letter h" d="M16.2516 4.85593C14.3656 4.85593 13.2156 5.84493 12.5946 6.92593H12.5486V0.554932H8.86861V16.9999H12.5486V10.1919C12.5486 8.55893 13.5146 7.84593 14.6876 7.84593C16.0216 7.84593 16.5966 8.44393 16.5966 10.2149V16.9999H20.2766V9.04193C20.2766 6.35093 18.7356 4.85593 16.2516 4.85593Z" fill="white"></path>
<path class="letter r" d="M28.5868 5.01693C27.2988 5.01693 26.2868 5.84493 25.7118 7.15593H25.6658V5.22393H21.9858V16.9999H25.6658V11.5259C25.6658 9.01893 27.6668 7.98393 29.5528 8.32893H29.5988V5.10893C29.1848 5.01693 28.9088 5.01693 28.5868 5.01693Z" fill="white"></path>
<path class="letter e" d="M36.2469 14.6079C34.9359 14.6079 33.7169 13.7339 33.7169 12.0779H42.1809C42.1809 7.79993 40.1339 4.85593 36.1089 4.85593C32.3599 4.85593 30.0369 7.52393 30.0369 11.1119C30.0369 14.7919 32.4059 17.3679 36.3159 17.3679C39.5129 17.3679 41.3529 15.8039 41.9969 13.4349H38.3399C38.1099 14.0099 37.5119 14.6079 36.2469 14.6079ZM36.1089 7.38593C37.5119 7.38593 38.5009 8.21393 38.5009 9.84693H33.7169C33.7169 8.21393 34.7059 7.38593 36.1089 7.38593Z" fill="white"></path>
<path class="letter e" d="M49.117 14.6079C47.806 14.6079 46.587 13.7339 46.587 12.0779H55.051C55.051 7.79993 53.004 4.85593 48.979 4.85593C45.23 4.85593 42.907 7.52393 42.907 11.1119C42.907 14.7919 45.276 17.3679 49.186 17.3679C52.383 17.3679 54.223 15.8039 54.867 13.4349H51.21C50.98 14.0099 50.382 14.6079 49.117 14.6079ZM48.979 7.38593C50.382 7.38593 51.371 8.21393 51.371 9.84693H46.587C46.587 8.21393 47.576 7.38593 48.979 7.38593Z" fill="white"></path>
<path class="letter dot" d="M57.9878 17.2069C59.0688 17.2069 59.9428 16.4479 59.9428 15.2519C59.9428 14.0789 59.0688 13.2969 57.9878 13.2969C56.8838 13.2969 56.0328 14.0789 56.0328 15.2519C56.0328 16.4479 56.8838 17.2069 57.9878 17.2069Z" fill="white"></path>
<path class="letter j" d="M63.718 3.82093C64.753 3.82093 65.558 3.26893 65.558 2.18793C65.558 1.12993 64.753 0.554932 63.718 0.554932C62.683 0.554932 61.878 1.12993 61.878 2.18793C61.878 3.26893 62.683 3.82093 63.718 3.82093ZM61.878 5.22393V16.7239C61.878 18.0579 61.395 18.0579 59.831 18.0579V20.8179C60.498 20.9559 61.073 21.0709 62.108 21.0709C64.799 21.0709 65.558 19.6449 65.558 16.9999V5.22393H61.878Z" fill="white"></path>
<path class="letter s" d="M73.1069 9.57093C71.2899 9.17993 70.5539 9.15693 70.5539 8.32893C70.5539 7.75393 71.0829 7.38593 72.1179 7.38593C73.3139 7.38593 73.8199 7.89193 73.9349 8.83493H77.3849C77.2699 6.76493 75.7979 4.85593 72.0259 4.85593C68.7139 4.85593 66.8739 6.48893 66.8739 8.62793C66.8739 11.0889 69.0819 11.8249 71.0829 12.2619C72.9459 12.6759 74.0499 12.8139 74.0499 13.8259C74.0499 14.4929 73.4749 14.8379 72.4399 14.8379C70.9909 14.8379 70.2089 14.2629 70.0939 13.0899H66.6439C66.7589 15.4819 68.3689 17.3679 72.5779 17.3679C75.8439 17.3679 77.7299 16.0109 77.7299 13.5269C77.7299 10.8589 75.4299 10.0769 73.1069 9.57093Z" fill="white"></path>
<path class="letter j" d="M86.2079 2.99293C86.7369 2.99293 87.3579 2.60193 87.3579 1.88893C87.3579 1.17593 86.7369 0.784931 86.2079 0.784931C85.7019 0.784931 85.0579 1.17593 85.0579 1.88893C85.0579 2.60193 85.7019 2.99293 86.2079 2.99293ZM85.2879 5.26993V17.9889C85.2879 19.3229 84.9199 19.4379 83.3559 19.3229V20.7029C84.0229 20.8869 84.4829 20.9559 85.0579 20.9559C86.6219 20.9559 87.1279 19.7599 87.1279 17.8049V5.26993H85.2879Z" fill="white"></path>
<path class="letter o" d="M94.9749 17.3219C91.3869 17.3219 89.2249 14.7919 89.2249 11.1349C89.2249 7.47793 91.3869 4.94793 94.9749 4.94793C98.5399 4.94793 100.702 7.47793 100.702 11.1349C100.702 14.7919 98.5399 17.3219 94.9749 17.3219ZM94.9749 15.7119C97.5969 15.7119 98.8619 13.6419 98.8619 11.1349C98.8619 8.62793 97.5969 6.55793 94.9749 6.55793C92.3299 6.55793 91.0649 8.62793 91.0649 11.1349C91.0649 13.6419 92.3299 15.7119 94.9749 15.7119Z" fill="white"></path>
<path class="letter u" d="M110.334 5.26993V12.5839C110.334 14.4009 108.954 15.7119 106.884 15.7119C105.044 15.7119 104.331 14.5159 104.331 12.9979V5.26993H102.491V13.4579C102.491 16.1489 104.285 17.3219 106.424 17.3219C108.425 17.3219 109.667 16.4249 110.288 15.5969H110.334V16.9999H112.174V5.26993H110.334Z" fill="white"></path>
<path class="letter r" d="M119.84 4.94793C118.161 4.94793 117.218 6.05193 116.597 7.59293H116.551V5.26993H114.711V16.9999H116.551V10.7439C116.551 8.23693 118.322 6.44293 120.875 6.85693H120.921V5.01693C120.599 4.97093 120.277 4.94793 119.84 4.94793Z" fill="white"></path>
<path class="letter n" d="M128.345 4.94793C126.344 4.94793 125.102 5.84493 124.481 6.67293H124.435V5.26993H122.595V16.9999H124.435V9.68593C124.435 7.86893 125.815 6.55793 127.885 6.55793C129.725 6.55793 130.438 7.75393 130.438 9.27193V16.9999H132.278V8.81193C132.278 6.12093 130.484 4.94793 128.345 4.94793Z" fill="white"></path>
<path class="letter e" d="M139.737 15.7119C137.184 15.7119 135.919 13.7339 135.919 11.6179H145.188C145.188 7.45493 143.394 4.94793 139.714 4.94793C136.287 4.94793 134.079 7.22493 134.079 11.1349C134.079 14.8149 136.241 17.3219 139.806 17.3219C142.727 17.3219 144.406 15.5739 145.004 13.3889H143.164C142.957 14.1939 142.083 15.7119 139.737 15.7119ZM139.714 6.55793C141.922 6.55793 143.348 8.12193 143.348 10.0079H135.919C135.919 8.12193 137.506 6.55793 139.714 6.55793Z" fill="white"></path>
<path class="letter y" d="M156.721 5.26993H154.651L151.27 14.8379H151.224L147.636 5.26993H145.566L150.005 16.0339C150.465 17.1839 149.982 18.1729 149.499 18.7019C148.878 19.3689 148.165 19.4379 147.153 19.3459H146.877V20.7259C147.176 20.8179 147.705 20.9559 148.441 20.9559C150.603 20.9559 151.201 19.2309 151.707 17.9659L156.721 5.26993Z" fill="white"></path>
</svg> */}
{/* </div> */}
                    
                </a>)
}