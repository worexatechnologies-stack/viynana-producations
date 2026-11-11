import { lazy, Suspense, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Disc,
  Film,
  Headphones,
  Instagram,
  LayoutGrid,
  Menu,
  Mic,
  Palette,
  Pause,
  Play,
  Plus,
  Send,
  Smartphone,
  Target,
  TrendingUp,
  Tv,
  UserRound,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './App.css'

const MobileNavigation = lazy(() => import('./MobileNavigation'))

gsap.registerPlugin(ScrollTrigger)

type Project = {
  slug: string
  name: string
  category: string
  year: string
  description: string
  image: string
  imageAlt: string
  className: string
  video?: string
}

const projects: Project[] = [
  {
    slug: 'after-the-light',
    name: 'After the Light',
    category: 'Commercial Films',
    year: '2025',
    description: 'A cinematic study in movement, light, and the moments in between.',
    image: '/images/model-shoot/01-emerald-saree-model.jpg',
    imageAlt: 'A lone figure beneath a vivid dusk sky',
    className: 'project-tall',
    video: '/showreel-hero-4k.mp4',
  },
  {
    slug: 'form-and-feeling',
    name: 'Form & Feeling',
    category: 'Product Photography',
    year: '2025',
    description: 'A tactile portrait of objects made to be held onto.',
    image: '/images/product-shoot/01-melanex-serum.jpg',
    imageAlt: 'Thoughtfully arranged contemporary cosmetic packaging',
    className: 'project-wide',
    video: '/videos/product-chopping-board.mp4',
  },
  {
    slug: 'made-of-morning',
    name: 'Made of Morning',
    category: 'Brand Campaigns',
    year: '2024',
    description: 'Finding a little more room for the rituals that matter.',
    image: '/images/model-shoot/02-black-sequin-saree.jpg',
    imageAlt: 'Editorial model in black sequin saree',
    className: 'project-wide',
  },
]


function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuLoaded, setMenuLoaded] = useState(false)
  const location = useLocation()
  const links = [
    { label: 'About', href: '#about' },
    { label: 'Model shoot', href: '#model-shoot' },
    { label: 'Product shoot', href: '#product-shoot' },
    { label: 'Branding shoot', href: '#branding-shoot' },
    { label: 'Podcast shoot', href: '#podcast-shoot' },
    { label: 'Influencer shoot', href: '#influencer-shoot' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    setMenuOpen(false)
    if (location.hash) {
      requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [location])

  return (
    <header className="site-header">
      <Link aria-label="Viyana Productions home" className="brand-logo-link" to="/">
        <img
          alt="Viyana Productions"
          className="brand-logo-img"
          height="44"
          src="/images/viyana-logo-dark.png"
          width="170"
        />
      </Link>
      
      <Link className="header-cta" to={location.pathname === '/' ? '#contact' : '/#contact'}>
        Start a project <ArrowUpRight size={15} strokeWidth={1.7} />
      </Link>
      <button
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        className="menu-toggle"
        onClick={() => {
          setMenuLoaded(true)
          setMenuOpen((open) => !open)
        }}
        type="button"
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      {menuLoaded && (
        <Suspense fallback={null}>
          <MobileNavigation
            isOpen={menuOpen}
            links={links.map((link) => ({
              label: link.label,
              to: location.pathname === '/' ? link.href : `/${link.href}`,
            }))}
            onNavigate={() => setMenuOpen(false)}
          />
        </Suspense>
      )}
    </header>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span className="eyebrow-bullet" />{children}</p>
}

// Performance optimization: Automatically pause video when scrolled out of viewport, play when visible
function useVideoInView(videoRef: React.RefObject<HTMLVideoElement | null>, shouldPlay: boolean = true) {
  useEffect(() => {
    const video = videoRef.current
    if (!video || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (shouldPlay && video.paused) {
              video.play().catch(() => {})
            }
          } else {
            if (!video.paused) {
              video.pause()
            }
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [videoRef, shouldPlay])
}

function Hero() {
  const [isHeroMuted, setIsHeroMuted] = useState(true)
  const [isHeroPlaying, setIsHeroPlaying] = useState(true)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  useVideoInView(heroVideoRef, isHeroPlaying)

  const toggleHeroPlay = () => {
    if (!heroVideoRef.current) return
    if (isHeroPlaying) {
      heroVideoRef.current.pause()
      setIsHeroPlaying(false)
    } else {
      heroVideoRef.current.play()
      setIsHeroPlaying(true)
    }
  }

  const toggleHeroMute = () => {
    if (!heroVideoRef.current) return
    heroVideoRef.current.muted = !isHeroMuted
    setIsHeroMuted(!isHeroMuted)
  }

  const cards = [
    {
      icon: <TrendingUp size={17} />,
      title: 'More Visibility',
      desc: 'Cinematic Direction',
    },
    {
      icon: <UserRound size={17} />,
      title: 'Model Shoots',
      desc: 'Portraits & Motion',
    },
    {
      icon: <Camera size={17} />,
      title: 'Product Shoots',
      desc: 'Tactile Precision',
    },
    {
      icon: <Award size={18} />,
      title: 'Better Growth',
      desc: 'Long-Term Impact',
    },
  ]

  return (
    <section className="hero" id="home">
      <div className="hero-split">
        {/* Left Side: Modern headline, content & 4 cards matching reference */}
        <div className="hero-content-side">
          <h1 className="hero-ref-title">
            Your Cinematic Media<br />
            Partner in <span className="hero-accent">Bangalore.</span>
          </h1>

          <p className="hero-ref-desc">
            Viyana Productions is an independent creative film and commercial production company in Bangalore that helps brands increase visual impact, create unforgettable model stories, and produce luxury product campaigns. We provide commercial films, editorial model shoots, product photography, creative direction, and high-end video production designed around measurable brand growth.
          </p>

          <div className="hero-ref-cards">
            {cards.map((card) => (
              <div className="hero-ref-card" key={card.title}>
                <div className="hero-ref-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="hero-ref-actions">
            <a className="hero-primary-btn" href="#model-shoot">
              Explore Model Shoot <ArrowUpRight size={15} />
            </a>
            <a className="hero-secondary-btn" href="#product-shoot">
              Product Shoot Work <ArrowDownRight size={15} />
            </a>
          </div>
        </div>

        {/* Right Side: Landing page video in curved modern container */}
        <div className="hero-video-side">
          <div className="hero-ref-video-wrap">
            <video
              aria-label="Cinematic production visual reel"
              autoPlay
              className="hero-ref-video"
              loop
              muted={isHeroMuted}
              playsInline
              poster="/images/model-shoot/01-emerald-saree-model.jpg"
              preload="metadata"
              ref={heroVideoRef}
              src="/showreel-hero-4k.mp4"
            />
            <div className="hero-image-shade" />

            <span className="hero-ref-video-tag">
              <span className="live-dot" /> 4K Showreel Film
            </span>

            <div className="hero-ref-controls">
              <button
                aria-label={isHeroMuted ? 'Unmute hero video' : 'Mute hero video'}
                className="hero-ref-pill"
                onClick={toggleHeroMute}
                type="button"
              >
                {isHeroMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                <span>{isHeroMuted ? 'Unmute' : 'Mute'}</span>
              </button>
            </div>

            <button
              aria-label={isHeroPlaying ? 'Pause hero reel' : 'Play hero reel'}
              className="hero-ref-play"
              onClick={toggleHeroPlay}
              type="button"
            >
              {isHeroPlaying ? <Pause fill="currentColor" size={18} /> : <Play fill="currentColor" size={18} />}
            </button>

            <div className="hero-ref-caption-bar">
              <div>
                <strong>Viyana Productions</strong>
                <span>Bangalore Studio Master · 4K</span>
              </div>
              <span className="hero-ref-badge">Studio Master</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const modelShootVideos = [
  {
    id: 'film-showcase',
    title: 'Viyana Production Showcase',
    note: 'Fashion study · Studio & movement',
    badge: '01 / Master Film',
    src: '/viyana-production-final-video.mp4',
    tag: 'Feature Film',
  },
  {
    id: 'commercial-reel',
    title: 'Commercial Campaign Reel',
    note: 'Brand & fashion story · 4K',
    badge: '02 / 4K Campaign',
    src: '/viyana-commercial-reel.mp4',
    tag: 'Commercial Reel',
  },
  {
    id: 'creative-narrative',
    title: 'Creative Narrative Study',
    note: 'Cultural emotion · Visual rhythm',
    badge: '03 / Narrative Cut',
    src: '/viyana-ganesha.mp4',
    tag: 'Creative Story',
  },
]

type ModelShootImage = {
  id: string
  title: string
  category: string
  tag: string
  image: string
  alt: string
  description: string
  badge: string
}

const modelShootImages: ModelShootImage[] = [
  {
    id: 'emerald-saree-heritage',
    title: 'Emerald Silk & Temple Gold Jewellery',
    category: 'Heritage Saree',
    tag: 'Silk Saree & Temple Gold',
    badge: '01 / Heritage Master',
    image: '/images/model-shoot/01-emerald-saree-model.jpg',
    alt: 'Viyana Productions model portrait in emerald green saree with antique gold temple jewellery',
    description: 'Rich jewel tones, handwoven silk drapes, and heritage gold craftsmanship captured with warm directional studio lighting.',
  },
  {
    id: 'black-sequin-studio',
    title: 'Midnight Sequin & Diamond Editorial',
    category: 'Contemporary',
    tag: 'Contemporary Saree & Solitaire',
    badge: '02 / Studio Editorial',
    image: '/images/model-shoot/02-black-sequin-saree.jpg',
    alt: 'Viyana Productions editorial model in black sequin saree with diamond necklace',
    description: 'Subtle shimmer, dramatic contrast, and contemporary styling highlighting modern ethnic evening wear.',
  },
  {
    id: 'temple-heritage-profile',
    title: 'Architectural Shadow & Handloom Drape',
    category: 'Heritage Saree',
    tag: 'Classic Drape & Carved Stone',
    badge: '03 / Classical Silhouette',
    image: '/images/model-shoot/03-temple-heritage-pose.jpg',
    alt: 'Viyana Productions model in classical temple architecture pose with traditional gold accessories',
    description: 'Chiaroscuro studio lighting and textural stone backdrops accentuating authentic cultural grace.',
  },
]

function ModelShoot() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [modelLightboxIndex, setModelLightboxIndex] = useState<number | null>(null)

  const activeVideo = modelShootVideos[activeVideoIndex]
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const modelSliderRef = useRef<HTMLDivElement>(null)
  useVideoInView(mainVideoRef, isPlaying)

  const handlePrev = () => {
    setActiveVideoIndex((prev) => (prev === 0 ? modelShootVideos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveVideoIndex((prev) => (prev === modelShootVideos.length - 1 ? 0 : prev + 1))
  }

  const togglePlay = () => {
    if (!mainVideoRef.current) return
    if (isPlaying) {
      mainVideoRef.current.pause()
      setIsPlaying(false)
    } else {
      mainVideoRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!mainVideoRef.current) return
    mainVideoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    if (mainVideoRef.current) {
      mainVideoRef.current.currentTime = 0
      mainVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [activeVideoIndex])

  const scrollModelSlider = (direction: 'prev' | 'next') => {
    if (!modelSliderRef.current) return
    const container = modelSliderRef.current
    const card = container.querySelector<HTMLElement>('.model-shot-slide')
    const step = card ? card.offsetWidth + 22 : 340
    const maxScroll = container.scrollWidth - container.clientWidth

    if (direction === 'next') {
      if (container.scrollLeft + step >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: step, behavior: 'smooth' })
      }
    } else {
      if (container.scrollLeft <= 15) {
        container.scrollTo({ left: maxScroll, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: -step, behavior: 'smooth' })
      }
    }
  }

  const filteredModelImages = activeFilter === 'All'
    ? modelShootImages
    : modelShootImages.filter((m) => m.category === activeFilter)

  const handleModelLightboxPrev = () => {
    if (modelLightboxIndex === null) return
    setModelLightboxIndex((prev) => (prev === 0 ? modelShootImages.length - 1 : (prev ?? 1) - 1))
  }

  const handleModelLightboxNext = () => {
    if (modelLightboxIndex === null) return
    setModelLightboxIndex((prev) => (prev === modelShootImages.length - 1 ? 0 : (prev ?? 0) + 1))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modelLightboxIndex === null) return
      if (e.key === 'Escape') setModelLightboxIndex(null)
      if (e.key === 'ArrowLeft') handleModelLightboxPrev()
      if (e.key === 'ArrowRight') handleModelLightboxNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modelLightboxIndex])

  return (
    <section className="model-shoot section-pad" id="model-shoot">
      <div className="model-shoot-heading" data-reveal>
        <div>
          <Eyebrow>Model shoot · Portraits &amp; movement</Eyebrow>
          <h2 className="section-title">Model Shoot <em>Work.</em></h2>
        </div>
        <p className="section-note">Portraits with personality, beauty with a point of view.<br />A model shoot made to feel human, confident and full of life.</p>
      </div>

      <div className="model-shoot-layout">
        <figure className="model-film" data-reveal>
          <div className="model-film-container">
            <video
              aria-label={activeVideo.title}
              autoPlay
              className="model-main-video"
              key={activeVideo.src}
              loop
              muted={isMuted}
              playsInline
              poster="/images/model-shoot/01-emerald-saree-model.jpg"
              preload="metadata"
              ref={mainVideoRef}
              src={activeVideo.src}
            />
            <div className="model-film-tag">
              <span className="live-dot" />
              <span>{activeVideo.tag} · {activeVideo.badge}</span>
            </div>

            {/* Quick Floating Previous & Next Buttons */}
            <button
              aria-label="Previous video"
              className="model-video-arrow model-video-prev"
              onClick={handlePrev}
              type="button"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              aria-label="Next video"
              className="model-video-arrow model-video-next"
              onClick={handleNext}
              type="button"
            >
              <ChevronRight size={22} />
            </button>

            {/* In-video quick mute & play controls */}
            <div className="model-video-actions">
              <button
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                className="model-video-pill"
                onClick={toggleMute}
                type="button"
              >
                {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
              <button
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="model-video-pill"
                onClick={togglePlay}
                type="button"
              >
                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          </div>

          {/* Model Film Navigation Bar with Previous / Next Buttons */}
          <div className="model-film-nav-bar">
            <button
              aria-label="Previous model film"
              className="model-nav-btn"
              onClick={handlePrev}
              type="button"
            >
              <ChevronLeft size={16} />
              <span>Previous Film</span>
            </button>

            <div className="model-nav-indicators">
              {modelShootVideos.map((video, idx) => (
                <button
                  aria-label={`Jump to film ${idx + 1}: ${video.title}`}
                  className={`model-nav-dot ${activeVideoIndex === idx ? 'active' : ''}`}
                  key={video.id}
                  onClick={() => setActiveVideoIndex(idx)}
                  type="button"
                >
                  <span className="dot-num">0{idx + 1}</span>
                  <span className="dot-label">{video.tag}</span>
                </button>
              ))}
            </div>

            <button
              aria-label="Next model film"
              className="model-nav-btn"
              onClick={handleNext}
              type="button"
            >
              <span>Next Film</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <figcaption>
            <div>
              <strong>{activeVideo.title}</strong>
              <span className="model-film-sub">{activeVideo.note}</span>
            </div>
            <span>{activeVideo.badge}</span>
          </figcaption>
        </figure>

        <div className="model-shoot-copy" data-reveal>
          <span className="model-shoot-mark">V / 02</span>
          <p>Honest expressions. Easy movement. Light that lets every detail breathe.</p>
          <div className="model-shoot-meta">
            <span className="model-shoot-credit">Portraits and campaign films<br />by Viyana Productions</span>
            <div className="model-reel-selector">
              <span className="selector-label">Cycle Films:</span>
              <div className="selector-buttons">
                {modelShootVideos.map((video, idx) => (
                  <button
                    aria-label={`Select ${video.title}`}
                    className={`selector-btn ${activeVideoIndex === idx ? 'active' : ''}`}
                    key={video.id}
                    onClick={() => setActiveVideoIndex(idx)}
                    type="button"
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Shoot Stills & Portraits */}
      <div className="model-stills-section" data-reveal>
        <div className="model-stills-controls-bar">
          <div className="model-stills-meta">
            <span className="model-shoot-index">Editorial Stills &amp; Portraits · 01 — 03</span>
            <p className="model-stills-desc">
              From handloom emerald silks and antique temple gold to contemporary solitaire styling, every portrait captures human presence with cinema precision.
            </p>
          </div>

          <div className="model-stills-actions">
            <div className="model-category-filters">
              {['All', 'Heritage Saree', 'Contemporary'].map((filter) => (
                <button
                  className={`model-filter-chip ${activeFilter === filter ? 'active' : ''}`}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  type="button"
                >
                  {filter === 'All' ? `All (${modelShootImages.length})` : filter}
                </button>
              ))}
            </div>

            {/* Previous and Next Navigation Buttons for Model Shoot Stills */}
            <div className="model-slider-nav-btns">
              <button
                aria-label="Previous model photo"
                className="model-slider-btn"
                onClick={() => scrollModelSlider('prev')}
                type="button"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>
              <button
                aria-label="Next model photo"
                className="model-slider-btn"
                onClick={() => scrollModelSlider('next')}
                type="button"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* One-Line Horizontal Slider Track with Edge Arrows */}
        <div className="model-slider-wrapper">
          <button
            aria-label="Previous model image"
            className="model-carousel-arrow model-carousel-prev"
            onClick={() => scrollModelSlider('prev')}
            type="button"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            aria-label="Next model image"
            className="model-carousel-arrow model-carousel-next"
            onClick={() => scrollModelSlider('next')}
            type="button"
          >
            <ChevronRight size={22} />
          </button>

          <div className="model-slider-track" ref={modelSliderRef}>
            {filteredModelImages.map((item) => {
              const originalIndex = modelShootImages.findIndex((p) => p.id === item.id)
              return (
                <figure
                  className={`model-shot-slide model-shot-${originalIndex + 1}`}
                  key={item.id}
                  onClick={() => setModelLightboxIndex(originalIndex)}
                >
                  <div className="model-shot-image">
                    <img
                      alt={item.alt}
                      decoding="async"
                      loading="lazy"
                      src={item.image}
                    />
                    <span className="model-shot-number">0{originalIndex + 1}</span>
                    <span className="model-shot-badge">{item.badge}</span>
                    <span className="model-shot-zoom">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <figcaption>
                    <div>
                      <span className="model-shot-tag">{item.tag}</span>
                      <h3>{item.title}</h3>
                      <p className="model-shot-caption">{item.description}</p>
                    </div>
                    <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {modelLightboxIndex !== null && (
        <div className="product-lightbox-overlay" onClick={() => setModelLightboxIndex(null)}>
          <div className="product-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Close lightbox"
              className="lightbox-close-btn"
              onClick={() => setModelLightboxIndex(null)}
              type="button"
            >
              <X size={20} />
            </button>

            <button
              aria-label="Previous photo"
              className="lightbox-nav-arrow lightbox-prev"
              onClick={handleModelLightboxPrev}
              type="button"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="lightbox-image-container">
              <img
                alt={modelShootImages[modelLightboxIndex].alt}
                src={modelShootImages[modelLightboxIndex].image}
              />
            </div>

            <button
              aria-label="Next photo"
              className="lightbox-nav-arrow lightbox-next"
              onClick={handleModelLightboxNext}
              type="button"
            >
              <ChevronRight size={22} />
            </button>

            <div className="lightbox-info-bar">
              <div className="lightbox-details">
                <span className="lightbox-count">
                  0{modelLightboxIndex + 1} / 0{modelShootImages.length} · {modelShootImages[modelLightboxIndex].badge}
                </span>
                <h3>{modelShootImages[modelLightboxIndex].title}</h3>
                <p>{modelShootImages[modelLightboxIndex].description}</p>
              </div>

              <div className="lightbox-thumbnails">
                {modelShootImages.map((m, idx) => (
                  <button
                    aria-label={`View photo ${idx + 1}`}
                    className={`lightbox-thumb-btn ${modelLightboxIndex === idx ? 'active' : ''}`}
                    key={m.id}
                    onClick={() => setModelLightboxIndex(idx)}
                    type="button"
                  >
                    <img alt="" src={m.image} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

const productShootImages = [
  {
    name: 'Melanex Pigment Architecture Face Serum',
    type: 'Serum · 30 ml',
    category: 'Serum',
    image: '/images/product-shoot/01-melanex-serum.jpg',
    alt: 'Dermera Melanex Pigment Architecture face serum bottle',
    description: 'Tranexamic acid and licorice formulation captured with studio mirror reflections and sharp macro detail.',
  },
  {
    name: 'Genex Advanced PDRN+ Revitalizing Serum',
    type: 'Serum · 30 ml',
    category: 'Serum',
    image: '/images/product-shoot/06-genex-serum.jpg',
    alt: 'Dermera Genex Advanced PDRN+ Revitalizing face serum bottle',
    description: 'Frosted matte finish with delicate pastel amber gradient, showcasing precision dispenser typography.',
  },
  {
    name: 'Luminex Luminous Face Wash',
    type: 'Cleanser · 100 ml',
    category: 'Cleanser',
    image: '/images/product-shoot/02-luminex-face-wash.jpg',
    alt: 'Dermera Luminex luminous face wash tube and packaging box',
    description: 'High-contrast studio lighting capturing the rich metallic gold foil and deep charcoal black luxury carton.',
  },
  {
    name: 'Dewexa Dermal Bio Cloud Cream',
    type: 'Moisturizer · 50 g',
    category: 'Cream',
    image: '/images/product-shoot/03-dewexa-cloud-cream.jpg',
    alt: 'Dermera Dewexa Dermal Bio Cloud Cream jar and crimson box',
    description: 'Polished gold metallic lid paired with crimson red textured box, angled with razor-sharp reflection.',
  },
  {
    name: 'Spiculex Advanced Bio Micro Needle Serum',
    type: 'Micro Needle Serum · 30 ml',
    category: 'Serum',
    image: '/images/product-shoot/04-spiculex-serum.jpg',
    alt: 'Dermera Spiculex Advanced Bio micro needle serum bottle and box',
    description: 'Amber glass bottle paired with artisanal textured box, highlighting micro-needle bio formulation details.',
  },
  {
    name: 'Dewexa Bio Cloud Cream — Angle View',
    type: 'Packaging & Perspective Study · 50 g',
    category: 'Cream',
    image: '/images/product-shoot/05-dewexa-detail.jpg',
    alt: 'Dermera Dewexa Bio Cloud Cream studio perspective view',
    description: 'Perspective 3D angle composition showcasing gold metallic reflection, box typography, and glass jar depth.',
  },
]

type ProductVideo = {
  id: string
  title: string
  tag: string
  category: string
  src: string
  badge: string
  description: string
}

const productShootVideos: ProductVideo[] = [
  {
    id: 'chopping-board',
    title: 'Precision Craft & Kitchenware — Chopping Board Commercial',
    tag: 'Commercial Film',
    category: 'Commercial Ads',
    src: '/videos/product-chopping-board.mp4',
    badge: '01 / Chopping Board Film',
    description: 'Dynamic studio lighting, rich organic wood textures, and tactile commercial motion captured for premium kitchenware.',
  },
  {
    id: 'commercial-render',
    title: 'Product Motion & Macro Studio Render',
    tag: 'Product Reel',
    category: 'Motion & CGI',
    src: '/videos/product-commercial-render.mp4',
    badge: '02 / 3D Macro Motion',
    description: 'High-contrast studio lighting highlighting product silhouettes, reflections, and cinematic brand pacing.',
  },
  {
    id: 'final-output-master',
    title: 'Luxury Product Commercial & Visual Motion Master',
    tag: 'Commercial Master',
    category: 'Product Cinema',
    src: '/videos/product-final-output.mp4',
    badge: '03 / Commercial Master',
    description: 'High-fidelity cinema lighting, crisp packaging reflections, and rhythmic commercial pacing engineered for luxury conversion.',
  },
]

function ProductShoot() {
  const [activeProductVideoIndex, setActiveProductVideoIndex] = useState(0)
  const [isProductVideoMuted, setIsProductVideoMuted] = useState(true)
  const [isProductVideoPlaying, setIsProductVideoPlaying] = useState(true)
  const productVideoRef = useRef<HTMLVideoElement>(null)
  useVideoInView(productVideoRef, isProductVideoPlaying)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const activeProductVideo = productShootVideos[activeProductVideoIndex]

  const handleProductPrev = () => {
    setActiveProductVideoIndex((prev) => (prev === 0 ? productShootVideos.length - 1 : prev - 1))
  }

  const handleProductNext = () => {
    setActiveProductVideoIndex((prev) => (prev === productShootVideos.length - 1 ? 0 : prev + 1))
  }

  const toggleProductPlay = () => {
    if (!productVideoRef.current) return
    if (isProductVideoPlaying) {
      productVideoRef.current.pause()
      setIsProductVideoPlaying(false)
    } else {
      productVideoRef.current.play()
      setIsProductVideoPlaying(true)
    }
  }

  const toggleProductMute = () => {
    if (!productVideoRef.current) return
    productVideoRef.current.muted = !isProductVideoMuted
    setIsProductVideoMuted(!isProductVideoMuted)
  }

  useEffect(() => {
    if (productVideoRef.current) {
      productVideoRef.current.currentTime = 0
      productVideoRef.current.play().then(() => setIsProductVideoPlaying(true)).catch(() => {})
    }
  }, [activeProductVideoIndex])

  const handleLightboxPrev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev === 0 ? productShootImages.length - 1 : (prev ?? 1) - 1))
  }

  const handleLightboxNext = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev === productShootImages.length - 1 ? 0 : (prev ?? 0) + 1))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') handleLightboxPrev()
      if (e.key === 'ArrowRight') handleLightboxNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  return (
    <section className="product-shoot section-pad" id="product-shoot">
      <div className="product-shoot-heading" data-reveal>
        <div>
          <Eyebrow>Product films &amp; photography · Studio master</Eyebrow>
          <h2 className="section-title">Product Shoot <em>Work.</em></h2>
        </div>
        <p className="section-note">
          Tactile macro lighting, cinematic textures, and motion reels.<br />
          From commercial product films to high-end Dermera packaging photography.
        </p>
      </div>

      {/* Commercial Product Cinema Video Player with Previous & Next Controls */}
      <div className="product-film-layout" data-reveal>
        <figure className="product-film">
          <div className="product-cinema-container">
            <video
              aria-label={activeProductVideo.title}
              autoPlay
              className="product-cinema-video"
              key={activeProductVideo.src}
              loop
              muted={isProductVideoMuted}
              playsInline
              poster="/images/product-shoot/01-melanex-serum.jpg"
              preload="metadata"
              ref={productVideoRef}
              src={activeProductVideo.src}
            />

            <div className="product-film-tag">
              <span className="live-dot" />
              <span>{activeProductVideo.tag} · {activeProductVideo.badge}</span>
            </div>

            {/* Quick Floating Previous & Next Buttons */}
            <button
              aria-label="Previous product video"
              className="product-video-arrow product-video-prev"
              onClick={handleProductPrev}
              type="button"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              aria-label="Next product video"
              className="product-video-arrow product-video-next"
              onClick={handleProductNext}
              type="button"
            >
              <ChevronRight size={22} />
            </button>

            {/* In-video quick mute & play controls */}
            <div className="product-video-actions">
              <button
                aria-label={isProductVideoMuted ? 'Unmute video' : 'Mute video'}
                className="product-video-pill"
                onClick={toggleProductMute}
                type="button"
              >
                {isProductVideoMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                <span>{isProductVideoMuted ? 'Unmute' : 'Mute'}</span>
              </button>
              <button
                aria-label={isProductVideoPlaying ? 'Pause video' : 'Play video'}
                className="product-video-pill"
                onClick={toggleProductPlay}
                type="button"
              >
                {isProductVideoPlaying ? <Pause size={12} /> : <Play size={12} />}
                <span>{isProductVideoPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          </div>

          <figcaption>
            <div>
              <strong>{activeProductVideo.title}</strong>
              <span className="product-film-sub">{activeProductVideo.description}</span>
            </div>
            <span>{activeProductVideo.badge}</span>
          </figcaption>
        </figure>

        {/* Side Panel: Context & Details */}
        <div className="product-film-side">
          <div className="product-side-card">
            <span className="product-side-mark">PROD / 10</span>
            <h3 className="product-side-title">Motion That Sells Texture &amp; Craft.</h3>
            <p className="product-side-desc">
              Every curve, reflection, and tactile grain captured in crisp studio resolution. Our commercial product films blend cinematic lighting with high-precision macro movement.
            </p>
            <div className="film-active-meta-pill">
              <span className="film-active-index">Film 0{activeProductVideoIndex + 1} / 0{productShootVideos.length}</span>
              <span className="film-active-title">{activeProductVideo.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Stills: Continuous Horizontal Ribbon Auto-Moving Right to Left */}
      <div className="product-stills-section" data-reveal>
        <div className="product-marquee-showcase">
          <div className="product-marquee-track-wrap">
            <div className="product-marquee-track">
              {[...productShootImages, ...productShootImages].map((product, idx) => {
                const originalIndex = idx % productShootImages.length
                return (
                  <div
                    className="product-marquee-card"
                    key={`${product.image}-${idx}`}
                    onClick={() => setLightboxIndex(originalIndex)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="product-marquee-img-box">
                      <img alt={product.alt} loading="lazy" src={product.image} />
                      <span className="product-marquee-zoom">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                                      </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive High-Speed Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          aria-modal="true"
          className="product-lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
        >
          <div
            className="product-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close high-res preview"
              className="lightbox-close-btn"
              onClick={() => setLightboxIndex(null)}
              type="button"
            >
              <X size={20} />
            </button>

            <button
              aria-label="Previous product photo"
              className="lightbox-nav-arrow lightbox-prev"
              onClick={handleLightboxPrev}
              type="button"
            >
              <ChevronLeft size={26} />
            </button>

            <button
              aria-label="Next product photo"
              className="lightbox-nav-arrow lightbox-next"
              onClick={handleLightboxNext}
              type="button"
            >
              <ChevronRight size={26} />
            </button>

            <div className="lightbox-image-container">
              <img
                alt={productShootImages[lightboxIndex].alt}
                className="lightbox-main-img"
                src={productShootImages[lightboxIndex].image}
              />
            </div>

            <div className="lightbox-info-bar">
              <div className="lightbox-meta">
                <span className="lightbox-count">
                  0{lightboxIndex + 1} / 0{productShootImages.length} · {productShootImages[lightboxIndex].type}
                </span>
                <h3>{productShootImages[lightboxIndex].name}</h3>
                <p>{productShootImages[lightboxIndex].description}</p>
              </div>

              {/* Instant jump thumbnails */}
              <div className="lightbox-thumbnails">
                {productShootImages.map((thumb, idx) => (
                  <button
                    aria-label={`Jump to photo ${idx + 1}`}
                    className={`lightbox-thumb ${lightboxIndex === idx ? 'active' : ''}`}
                    key={thumb.image}
                    onClick={() => setLightboxIndex(idx)}
                    type="button"
                  >
                    <img alt="" src={thumb.image} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ========================================================
   Branding Shoot & Content Creation Section
   ======================================================== */
const brandingShootReels = [
  {
    id: 'brand-commercial-film',
    title: 'Viyana Brand Commercial & Visual Narrative Reel',
    tag: 'Hero Brand Film',
    badge: '01 / Commercial Master',
    src: '/viyana-commercial-reel.mp4',
    description: 'High-production brand film engineered with strong emotional hooks, bold cinematography, and deliberate commercial pacing.',
  },
  {
    id: 'social-growth-reels',
    title: 'Social-First Vertical Reels & Performance UGC Suite',
    tag: '9:16 Social Reel',
    badge: '02 / Social Content',
    src: '/showreel-hero-4k.mp4',
    description: 'High-retention 9:16 vertical video suites tailored for Instagram Reels, YouTube Shorts, and paid Meta performance ads.',
  },
  {
    id: 'founder-executive-story',
    title: 'Founder Narrative & Executive Thought-Leadership',
    tag: 'Founder Story',
    badge: '03 / Leadership Story',
    src: '/videos/product-commercial-render.mp4',
    description: 'Documentary-style founder origins and executive storytelling designed to build unshakeable customer and investor trust.',
  },
]

type BrandingImage = {
  id: string
  title: string
  category: string
  tag: string
  image: string
  alt: string
  description: string
  badge: string
}

const brandingShootImages: BrandingImage[] = [
  {
    id: 'dtc-packaging-launch',
    title: 'DTC Brand Packaging & Visual System',
    category: 'DTC Content',
    tag: 'Product Ecosystem & Packaging',
    badge: '01 / DTC Launch',
    image: '/images/product-shoot/01-melanex-serum.jpg',
    alt: 'DTC skincare brand packaging visual system created by Viyana Productions',
    description: 'Clean reflection lighting and razor-sharp macro photography engineered to build instant consumer desire.',
  },
  {
    id: 'dewexa-luxury-cream',
    title: 'Tactile Macro Product & Packaging Study',
    category: 'DTC Content',
    tag: 'Cosmetic Architecture & Light',
    badge: '02 / Texture Study',
    image: '/images/product-shoot/03-dewexa-cloud-cream.jpg',
    alt: 'Dewexa dermal bio cloud cream studio packaging visual by Viyana Productions',
    description: 'Gold metallic reflection and textured packaging captured with high-fidelity studio optics.',
  },
  {
    id: 'lifestyle-contextual-campaign',
    title: 'Heritage Lifestyle & Contextual Campaign',
    category: 'Brand Identity',
    tag: 'Cultural Heritage & Modern Styling',
    badge: '03 / Heritage Lookbook',
    image: '/images/model-shoot/01-emerald-saree-model.jpg',
    alt: 'Viyana Productions lifestyle and brand campaign in emerald silk and gold jewellery',
    description: 'Human emotion paired with cultural elegance for high-engagement brand campaigns.',
  },
  {
    id: 'editorial-contemporary-saree',
    title: 'Contemporary Editorial & Campaign Lookbook',
    category: 'Brand Identity',
    tag: 'High Fashion & Art Direction',
    badge: '04 / Editorial Campaign',
    image: '/images/model-shoot/02-black-sequin-saree.jpg',
    alt: 'Contemporary editorial saree lookbook photographed by Viyana Productions',
    description: 'Dramatic chiaroscuro studio lighting engineered for national brand campaigns.',
  },
  {
    id: 'serum-dispenser-study',
    title: 'Packaging Typography & Macro Bottle Form',
    category: 'DTC Content',
    tag: 'Studio Lighting & Optics',
    badge: '05 / Macro Optics',
    image: '/images/product-shoot/06-genex-serum.jpg',
    alt: 'Genex revitalizing face serum packaging detail photographed by Viyana Productions',
    description: 'Precision macro lighting highlighting typography, frosted glass, and formulation clarity.',
  },
]

function BrandingShoot({ onSelectService }: { onSelectService?: (service: string) => void }) {
  const [activeReelIndex, setActiveReelIndex] = useState(0)
  const [isReelMuted, setIsReelMuted] = useState(true)
  const [isReelPlaying, setIsReelPlaying] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [brandingLightboxIndex, setBrandingLightboxIndex] = useState<number | null>(null)

  const activeReel = brandingShootReels[activeReelIndex]
  const reelVideoRef = useRef<HTMLVideoElement>(null)
  const brandingSliderRef = useRef<HTMLDivElement>(null)
  useVideoInView(reelVideoRef, isReelPlaying)

  const handlePrevReel = () => {
    setActiveReelIndex((prev) => (prev === 0 ? brandingShootReels.length - 1 : prev - 1))
  }

  const handleNextReel = () => {
    setActiveReelIndex((prev) => (prev === brandingShootReels.length - 1 ? 0 : prev + 1))
  }

  const toggleReelPlay = () => {
    if (!reelVideoRef.current) return
    if (isReelPlaying) {
      reelVideoRef.current.pause()
      setIsReelPlaying(false)
    } else {
      reelVideoRef.current.play()
      setIsReelPlaying(true)
    }
  }

  const toggleReelMute = () => {
    if (!reelVideoRef.current) return
    reelVideoRef.current.muted = !isReelMuted
    setIsReelMuted(!isReelMuted)
  }

  useEffect(() => {
    if (reelVideoRef.current) {
      reelVideoRef.current.currentTime = 0
      reelVideoRef.current.play().then(() => setIsReelPlaying(true)).catch(() => {})
    }
  }, [activeReelIndex])

  const scrollBrandingSlider = (direction: 'prev' | 'next') => {
    if (!brandingSliderRef.current) return
    const container = brandingSliderRef.current
    const card = container.querySelector<HTMLElement>('.branding-shot-slide')
    const step = (card ? card.offsetWidth + 22 : 340)
    const maxScroll = container.scrollWidth - container.clientWidth

    if (direction === 'next') {
      if (container.scrollLeft + step >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: step, behavior: 'smooth' })
      }
    } else {
      if (container.scrollLeft <= 15) {
        container.scrollTo({ left: maxScroll, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: -step, behavior: 'smooth' })
      }
    }
  }

  const filteredImages = activeFilter === 'All'
    ? brandingShootImages
    : brandingShootImages.filter((b) => b.category === activeFilter)

  const handleBrandingLightboxPrev = () => {
    if (brandingLightboxIndex === null) return
    setBrandingLightboxIndex((prev) => (prev === 0 ? brandingShootImages.length - 1 : (prev ?? 1) - 1))
  }

  const handleBrandingLightboxNext = () => {
    if (brandingLightboxIndex === null) return
    setBrandingLightboxIndex((prev) => (prev === brandingShootImages.length - 1 ? 0 : (prev ?? 0) + 1))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (brandingLightboxIndex === null) return
      if (e.key === 'Escape') setBrandingLightboxIndex(null)
      if (e.key === 'ArrowLeft') handleBrandingLightboxPrev()
      if (e.key === 'ArrowRight') handleBrandingLightboxNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [brandingLightboxIndex])

  return (
    <section className="branding-shoot section-pad" id="branding-shoot">
      <div className="branding-shoot-heading" data-reveal>
        <div>
          <Eyebrow>Branding shoot &amp; Content creation · Digital identity</Eyebrow>
          <h2 className="section-title branding-title">Branding Shoot &amp; <em>Content Creation.</em></h2>
        </div>
        <p className="section-note">
          From high-hook vertical social reels to premium founder films and brand lookbooks.<br />
          We engineer visual content designed for modern digital consumption, brand equity, and commercial conversion.
        </p>
      </div>

      {/* Main Branding Cinema Video Player & Side Suite Panel */}
      <div className="branding-film-layout" data-reveal>
        <figure className="branding-film">
          <div className="branding-cinema-container">
            <video
              aria-label={activeReel.title}
              autoPlay
              className="branding-cinema-video"
              key={activeReel.src}
              loop
              muted={isReelMuted}
              playsInline
              poster="/images/model-shoot/02-black-sequin-saree.jpg"
              preload="metadata"
              ref={reelVideoRef}
              src={activeReel.src}
            />

            <div className="branding-film-tag">
              <span className="live-dot" />
              <span>{activeReel.tag} · {activeReel.badge}</span>
            </div>

            {/* Quick Floating Previous & Next Buttons */}
            <button
              aria-label="Previous branding reel"
              className="branding-video-arrow branding-video-prev"
              onClick={handlePrevReel}
              type="button"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              aria-label="Next branding reel"
              className="branding-video-arrow branding-video-next"
              onClick={handleNextReel}
              type="button"
            >
              <ChevronRight size={22} />
            </button>

            {/* In-video quick mute & play controls */}
            <div className="branding-video-actions">
              <button
                aria-label={isReelMuted ? 'Unmute video' : 'Mute video'}
                className="branding-video-pill"
                onClick={toggleReelMute}
                type="button"
              >
                {isReelMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                <span>{isReelMuted ? 'Unmute' : 'Mute'}</span>
              </button>
              <button
                aria-label={isReelPlaying ? 'Pause video' : 'Play video'}
                className="branding-video-pill"
                onClick={toggleReelPlay}
                type="button"
              >
                {isReelPlaying ? <Pause size={12} /> : <Play size={12} />}
                <span>{isReelPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          </div>

          <figcaption>
            <div>
              <strong>{activeReel.title}</strong>
              <span className="branding-film-sub">{activeReel.description}</span>
            </div>
            <span>{activeReel.badge}</span>
          </figcaption>
        </figure>

        {/* Side Panel: Content Suite Packages & Pillar Cards */}
        <div className="branding-film-side">
          <div className="branding-side-card">
            <span className="branding-side-mark">BRAND / 02</span>
            <h3 className="branding-side-title">Engineered For Modern Digital Growth.</h3>
            <p className="branding-side-desc">
              We create cohesive visual libraries that power high-converting social campaigns, web launches, founder profiles, and retail lookbooks.
            </p>
            <div className="film-active-meta-pill">
              <span className="film-active-index">Reel 0{activeReelIndex + 1} / 0{brandingShootReels.length}</span>
              <span className="film-active-title">{activeReel.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Branding Stills & Lookbook Slider with Previous & Next Navigation Buttons */}
      <div className="branding-stills-section" data-reveal>
        <div className="branding-stills-controls-bar">
          <div className="branding-stills-meta">
            <span className="branding-shoot-index">Brand Stills &amp; Lookbooks · 01 — 05</span>
            <p className="branding-stills-desc">
              Contextual brand imagery, executive leadership portraits, and aesthetic packaging details designed for omnichannel presence.
            </p>
          </div>

          <div className="branding-stills-actions">
            <div className="branding-category-filters">
              {['All', 'Brand Identity', 'DTC Content', 'Founder Story'].map((filter) => (
                <button
                  className={`branding-filter-chip ${activeFilter === filter ? 'active' : ''}`}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  type="button"
                >
                  {filter === 'All' ? `All (${brandingShootImages.length})` : filter}
                </button>
              ))}
            </div>

            {/* Previous and Next Navigation Buttons */}
            <div className="branding-slider-nav-btns">
              <button
                aria-label="Previous branding photo"
                className="branding-slider-btn"
                onClick={() => scrollBrandingSlider('prev')}
                type="button"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>
              <button
                aria-label="Next branding photo"
                className="branding-slider-btn"
                onClick={() => scrollBrandingSlider('next')}
                type="button"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Wrapper with Edge Chevron Arrows */}
        <div className="branding-slider-wrapper">
          <button
            aria-label="Previous image"
            className="branding-carousel-arrow branding-carousel-prev"
            onClick={() => scrollBrandingSlider('prev')}
            type="button"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            aria-label="Next image"
            className="branding-carousel-arrow branding-carousel-next"
            onClick={() => scrollBrandingSlider('next')}
            type="button"
          >
            <ChevronRight size={22} />
          </button>

          <div className="branding-slider-track" ref={brandingSliderRef}>
            {filteredImages.map((item) => {
              const originalIndex = brandingShootImages.findIndex((p) => p.id === item.id)
              return (
                <figure
                  className={`branding-shot-slide branding-shot-${originalIndex + 1}`}
                  key={item.id}
                  onClick={() => setBrandingLightboxIndex(originalIndex)}
                >
                  <div className="branding-shot-image">
                    <img
                      alt={item.alt}
                      decoding="async"
                      loading="lazy"
                      src={item.image}
                    />
                    <span className="branding-shot-number">0{originalIndex + 1}</span>
                    <span className="branding-shot-badge">{item.badge}</span>
                    <span className="branding-shot-zoom">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <figcaption>
                    <div>
                      <span className="branding-shot-tag">{item.tag}</span>
                      <h3>{item.title}</h3>
                      <p className="branding-shot-caption">{item.description}</p>
                    </div>
                    <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {brandingLightboxIndex !== null && (
        <div className="product-lightbox-overlay" onClick={() => setBrandingLightboxIndex(null)}>
          <div className="product-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Close lightbox"
              className="lightbox-close-btn"
              onClick={() => setBrandingLightboxIndex(null)}
              type="button"
            >
              <X size={20} />
            </button>

            <button
              aria-label="Previous photo"
              className="lightbox-nav-arrow lightbox-prev"
              onClick={handleBrandingLightboxPrev}
              type="button"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="lightbox-image-container">
              <img
                alt={brandingShootImages[brandingLightboxIndex].alt}
                src={brandingShootImages[brandingLightboxIndex].image}
              />
            </div>

            <button
              aria-label="Next photo"
              className="lightbox-nav-arrow lightbox-next"
              onClick={handleBrandingLightboxNext}
              type="button"
            >
              <ChevronRight size={22} />
            </button>

            <div className="lightbox-info-bar">
              <div className="lightbox-details">
                <span className="lightbox-count">
                  0{brandingLightboxIndex + 1} / 0{brandingShootImages.length} · {brandingShootImages[brandingLightboxIndex].badge}
                </span>
                <h3>{brandingShootImages[brandingLightboxIndex].title}</h3>
                <p>{brandingShootImages[brandingLightboxIndex].description}</p>
              </div>

              <div className="lightbox-thumbnails">
                {brandingShootImages.map((b, idx) => (
                  <button
                    aria-label={`View photo ${idx + 1}`}
                    className={`lightbox-thumb-btn ${brandingLightboxIndex === idx ? 'active' : ''}`}
                    key={b.id}
                    onClick={() => setBrandingLightboxIndex(idx)}
                    type="button"
                  >
                    <img alt="" src={b.image} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="branding-shoot-outro" data-reveal>
        <span>Looking for a monthly content creation retainer or complete brand visual relaunch?</span>
        <button
          className="branding-cta-inline-btn"
          onClick={() => onSelectService?.('02 Cinematic Content Shoot')}
          type="button"
        >
          <span>Book a Branding Shoot</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  )
}

/* ========================================================
   Podcast Shoot Section - Embedded Videos (2 Lines)
   ======================================================== */
const podcastYoutubeVideos = [
  {
    id: 'TxPzxJCl37o',
    src: 'https://www.youtube.com/embed/TxPzxJCl37o?si=8h2XT5mSPGRIxd7-',
  },
  {
    id: 'ot6-O-UoyVk',
    src: 'https://www.youtube.com/embed/ot6-O-UoyVk?si=lRp90muWFq_x-zay',
  },
]

const podcastInstagramReels = [
  {
    id: 'De6xjqugCR8',
    url: 'https://www.instagram.com/reel/De6xjqugCR8/?exln=MTVvNWV4dzJ3dnhodg==',
  },
  {
    id: 'De1xXjtjK8R',
    url: 'https://www.instagram.com/reel/De1xXjtjK8R/?exln=MW9xOTMzcXVidHZjdg==',
  },
]

function PodcastShoot({ onSelectService: _onSelectService }: { onSelectService?: (service: string) => void }) {
  const youtubeSliderRef = useRef<HTMLDivElement>(null)
  const instaSliderRef = useRef<HTMLDivElement>(null)

  const scrollLine = (ref: React.RefObject<HTMLDivElement | null>, direction: 'prev' | 'next') => {
    if (!ref.current) return
    const container = ref.current
    const cards = Array.from(container.children) as HTMLElement[]
    if (!cards.length) return

    const currentScroll = container.scrollLeft
    const maxScroll = container.scrollWidth - container.clientWidth

    if (direction === 'next') {
      const nextCard = cards.find((c) => c.offsetLeft > currentScroll + 20)
      if (nextCard) {
        container.scrollTo({ left: nextCard.offsetLeft, behavior: 'smooth' })
      } else {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      }
    } else {
      const prevCards = cards.filter((c) => c.offsetLeft < currentScroll - 20)
      if (prevCards.length > 0) {
        const target = prevCards[prevCards.length - 1]
        container.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
      } else {
        container.scrollTo({ left: maxScroll, behavior: 'smooth' })
      }
    }
  }

  const handlePrev = () => {
    scrollLine(youtubeSliderRef, 'prev')
    scrollLine(instaSliderRef, 'prev')
  }

  const handleNext = () => {
    scrollLine(youtubeSliderRef, 'next')
    scrollLine(instaSliderRef, 'next')
  }

  return (
    <section className="podcast-shoot section-pad" id="podcast-shoot">
      <div className="podcast-shoot-heading" data-reveal>
        <div>
          <Eyebrow>Podcast Shoot</Eyebrow>
          <h2 className="section-title">Podcast <em>Shoot.</em></h2>
        </div>

        {/* Previous & Next Navigation Buttons */}
        <div className="podcast-top-nav-btns">
          <button
            aria-label="Previous podcast video"
            className="podcast-nav-arrow-btn"
            onClick={handlePrev}
            type="button"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          <button
            aria-label="Next podcast video"
            className="podcast-nav-arrow-btn"
            onClick={handleNext}
            type="button"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="podcast-content-layout" data-reveal>
        {/* Line 1: YouTube Videos in 1 Line */}
        <div className="podcast-line-wrap">
          <button
            aria-label="Previous YouTube video"
            className="podcast-edge-btn podcast-edge-prev"
            onClick={() => scrollLine(youtubeSliderRef, 'prev')}
            type="button"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            aria-label="Next YouTube video"
            className="podcast-edge-btn podcast-edge-next"
            onClick={() => scrollLine(youtubeSliderRef, 'next')}
            type="button"
          >
            <ChevronRight size={22} />
          </button>

          <div className="podcast-youtube-line" ref={youtubeSliderRef}>
            {podcastYoutubeVideos.map((video) => (
              <div className="podcast-youtube-card" key={video.id}>
                <div className="podcast-youtube-wrap">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="podcast-youtube-iframe"
                    frameBorder="0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src={video.src}
                    title="YouTube video player"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Line 2: Instagram Videos in 1 Line */}
        <div className="podcast-line-wrap">
          <button
            aria-label="Previous Instagram reel"
            className="podcast-edge-btn podcast-edge-prev"
            onClick={() => scrollLine(instaSliderRef, 'prev')}
            type="button"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            aria-label="Next Instagram reel"
            className="podcast-edge-btn podcast-edge-next"
            onClick={() => scrollLine(instaSliderRef, 'next')}
            type="button"
          >
            <ChevronRight size={22} />
          </button>

          <div className="podcast-insta-line" ref={instaSliderRef}>
            {podcastInstagramReels.map((reel) => (
              <div className="podcast-insta-card" key={reel.id}>
                <div className="podcast-insta-crop-wrap">
                  <iframe
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    className="podcast-insta-iframe"
                    frameBorder="0"
                    loading="eager"
                    scrolling="no"
                    src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                    title={`Instagram Reel ${reel.id}`}
                  />
                </div>
                {/* Fallback direct link button */}
                <a
                  className="podcast-visit-insta-link"
                  href={reel.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Instagram size={14} />
                  <span>Watch on Instagram</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========================================================
   Influencer Shoot & Creator Series Section
   ======================================================== */
interface InfluencerNativeReel {
  isNative: true
  id: string
  videoSrc: string
  title: string
  tag: string
  badge: string
}

interface InfluencerEmbedReel {
  isNative: false
  id: string
  url: string
}

type InfluencerReel = InfluencerNativeReel | InfluencerEmbedReel

const influencerReels: InfluencerReel[] = [
  {
    isNative: true,
    id: 'viyana-influencer-feature',
    videoSrc: '/Final.mp4',
    title: 'Featured Influencer Film · 4K Edition',
    tag: 'Creator Showcase',
    badge: '01 / Featured Reel',
  },
  {
    isNative: false,
    id: 'DfPiKmuMugc',
    url: 'https://www.instagram.com/reel/DfPiKmuMugc/?exln=MXdzcmd4MTB1YXVjYw==',
  },
  {
    isNative: false,
    id: 'DfCi048T8Jz',
    url: 'https://www.instagram.com/reel/DfCi048T8Jz/?dlrf=NHFnNzgxanY5dGpp',
  },
  {
    isNative: false,
    id: 'De9Vwv6CBSj',
    url: 'https://www.instagram.com/reel/De9Vwv6CBSj/?dlrf=MW1zNThlbXlhcnN4Zw==',
  },
  {
    isNative: false,
    id: 'DeuCeLIzMWk',
    url: 'https://www.instagram.com/reel/DeuCeLIzMWk/?psln=MXZucjJlc2pwMHQ3ZQ==',
  },
]

function InfluencerShoot({ onSelectService: _onSelectService }: { onSelectService?: (service: string) => void }) {
  const influencerSliderRef = useRef<HTMLDivElement>(null)
  const [nativeMuted, setNativeMuted] = useState(true)
  const [nativePlaying, setNativePlaying] = useState(false)
  const nativeVideoRef = useRef<HTMLVideoElement>(null)
  useVideoInView(nativeVideoRef, nativePlaying)

  const toggleNativePlay = () => {
    if (!nativeVideoRef.current) return
    if (nativeVideoRef.current.paused) {
      nativeVideoRef.current.play().then(() => setNativePlaying(true)).catch(() => {})
    } else {
      nativeVideoRef.current.pause()
      setNativePlaying(false)
    }
  }

  const toggleNativeMute = () => {
    if (!nativeVideoRef.current) return
    nativeVideoRef.current.muted = !nativeMuted
    setNativeMuted(!nativeMuted)
  }

  // Ensure video reliably plays on mount and when scrolled into view
  useEffect(() => {
    const video = nativeVideoRef.current
    if (!video) return

    video.defaultMuted = true
    video.muted = true
    video.playsInline = true

    const tryAutoPlay = () => {
      video.play().then(() => setNativePlaying(true)).catch(() => {
        // Autoplay policy prevented playback until user interaction
        setNativePlaying(false)
      })
    }

    tryAutoPlay()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            tryAutoPlay()
          }
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const scrollInfluencerSlider = (direction: 'prev' | 'next') => {
    if (!influencerSliderRef.current) return
    const container = influencerSliderRef.current
    const cards = Array.from(container.querySelectorAll<HTMLElement>('.influencer-reel-card'))
    if (!cards.length) return

    const currentScroll = container.scrollLeft
    const maxScroll = container.scrollWidth - container.clientWidth

    if (direction === 'next') {
      const nextCard = cards.find((c) => c.offsetLeft > currentScroll + 20)
      if (nextCard) {
        container.scrollTo({ left: nextCard.offsetLeft - 16, behavior: 'smooth' })
      } else {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      }
    } else {
      const prevCards = cards.filter((c) => c.offsetLeft < currentScroll - 20)
      if (prevCards.length > 0) {
        const target = prevCards[prevCards.length - 1]
        container.scrollTo({ left: target.offsetLeft - 16, behavior: 'smooth' })
      } else {
        container.scrollTo({ left: maxScroll, behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="influencer-shoot section-pad" id="influencer-shoot">
      <div className="influencer-shoot-heading" data-reveal>
        {/* Previous & Next Navigation Buttons Kept First */}
        <div className="influencer-top-nav-btns">
          <button
            aria-label="Previous reel"
            className="influencer-nav-arrow-btn"
            onClick={() => scrollInfluencerSlider('prev')}
            type="button"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          <button
            aria-label="Next reel"
            className="influencer-nav-arrow-btn"
            onClick={() => scrollInfluencerSlider('next')}
            type="button"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div>
          <Eyebrow>Influencer &amp; Creator Reels</Eyebrow>
          <h2 className="section-title">Influencer Shoot <em>Reels.</em></h2>
        </div>
      </div>

      <div className="influencer-slider-wrapper" data-reveal>
        <button
          aria-label="Previous reel"
          className="influencer-edge-btn influencer-edge-prev"
          onClick={() => scrollInfluencerSlider('prev')}
          type="button"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          aria-label="Next reel"
          className="influencer-edge-btn influencer-edge-next"
          onClick={() => scrollInfluencerSlider('next')}
          type="button"
        >
          <ChevronRight size={22} />
        </button>

        <div className="influencer-reels-track" ref={influencerSliderRef}>
          {influencerReels.map((reel) => (
            reel.isNative ? (
              <div className="influencer-reel-card influencer-native-reel-card" key={reel.id}>
                <div
                  className="influencer-video-crop-wrap influencer-native-crop-wrap"
                  onClick={toggleNativePlay}
                  role="button"
                  tabIndex={0}
                >
                  <video
                    aria-label={reel.title}
                    autoPlay
                    className="influencer-native-video"
                    loop
                    muted={nativeMuted}
                    onPause={() => setNativePlaying(false)}
                    onPlay={() => setNativePlaying(true)}
                    onVolumeChange={(e) => setNativeMuted(e.currentTarget.muted)}
                    playsInline
                    poster="/images/model-shoot/03-temple-heritage-pose.jpg"
                    preload="metadata"
                    ref={nativeVideoRef}
                    src={reel.videoSrc}
                  />
                  <div className="influencer-native-tag">
                    <span className="live-dot" />
                    <span>{reel.tag} · {reel.badge}</span>
                  </div>

                  {/* Centered Play Button when Paused */}
                  {!nativePlaying && (
                    <div className="influencer-center-play-overlay">
                      <div className="influencer-center-play-circle">
                        <Play fill="#ffffff" size={26} />
                      </div>
                      <span className="influencer-center-play-text">Tap to Play Reel</span>
                    </div>
                  )}

                  {/* Native Video Controls */}
                  <div className="influencer-video-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      aria-label={nativeMuted ? 'Unmute reel' : 'Mute reel'}
                      className="influencer-video-pill"
                      onClick={toggleNativeMute}
                      type="button"
                    >
                      {nativeMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                      <span>{nativeMuted ? 'Unmute' : 'Mute'}</span>
                    </button>
                    <button
                      aria-label={nativePlaying ? 'Pause reel' : 'Play reel'}
                      className="influencer-video-pill"
                      onClick={toggleNativePlay}
                      type="button"
                    >
                      {nativePlaying ? <Pause size={12} /> : <Play size={12} />}
                      <span>{nativePlaying ? 'Pause' : 'Play'}</span>
                    </button>
                  </div>
                </div>

                {/* Direct 4K Watch / Play Action Button matching Instagram button */}
                <button
                  className="influencer-visit-insta-link influencer-native-link"
                  onClick={toggleNativePlay}
                  type="button"
                >
                  {nativePlaying ? <Pause size={14} /> : <Play size={14} />}
                  <span>{nativePlaying ? 'Pause Reel' : 'Play Full Reel · 4K'}</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            ) : (
              <div className="influencer-reel-card" key={reel.id}>
                {/* Cropped Video Container - Only Pure Video, Hides Bottom Comments & Likes */}
                <div className="influencer-video-crop-wrap">
                  <iframe
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    className="instagram-pure-reel-iframe"
                    frameBorder="0"
                    loading="lazy"
                    scrolling="no"
                    src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                    title={`Instagram Reel ${reel.id}`}
                  />
                </div>

                {/* Minimal Clean Visit on Instagram Button */}
                <a
                  className="influencer-visit-insta-link"
                  href={reel.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Instagram size={14} />
                  <span>Visit on Instagram</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const [rotationOffset, setRotationOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [aboutLightboxIndex, setAboutLightboxIndex] = useState<number | null>(null)
  const [isShowreelOpen, setIsShowreelOpen] = useState(false)
  const showreelVideoRef = useRef<HTMLVideoElement>(null)
  const [isReelMuted, setIsReelMuted] = useState(false)

  // 9 real portfolio works from Viyana Productions
  const chakraWorksPool = [
    {
      id: 'emerald-saree',
      type: 'image',
      title: 'Emerald Silk & Temple Gold Jewellery',
      subtitle: 'Model Shoot · Heritage Campaign',
      image: '/images/model-shoot/01-emerald-saree-model.jpg',
      alt: 'Model portrait in emerald silk saree and antique gold jewellery by Viyana Productions',
      badge: '01 / Heritage Master',
    },
    {
      id: 'black-sequin',
      type: 'image',
      title: 'Midnight Sequin & Diamond Editorial',
      subtitle: 'Model Shoot · Contemporary Saree',
      image: '/images/model-shoot/02-black-sequin-saree.jpg',
      alt: 'Editorial model in black sequin saree by Viyana Productions',
      badge: '02 / Studio Editorial',
    },
    {
      id: 'temple-silhouette',
      type: 'image',
      title: 'Architectural Shadow & Handloom Drape',
      subtitle: 'Model Shoot · Classical Silhouette',
      image: '/images/model-shoot/03-temple-heritage-pose.jpg',
      alt: 'Model in classical temple architecture pose by Viyana Productions',
      badge: '03 / Cultural Grace',
    },
    {
      id: 'melanex-serum',
      type: 'image',
      title: 'Melanex Pigment Architecture Face Serum',
      subtitle: 'Product Shoot · 30 ML Studio Master',
      image: '/images/product-shoot/01-melanex-serum.jpg',
      alt: 'Melanex Face Serum bottle with studio mirror reflection',
      badge: '04 / Macro Cosmetics',
    },
    {
      id: 'luminex-cleanser',
      type: 'image',
      title: 'Luminex Luminous Face Wash & Luxury Carton',
      subtitle: 'Product Shoot · Gold Foil Packaging Study',
      image: '/images/product-shoot/02-luminex-face-wash.jpg',
      alt: 'Luminex face wash tube and charcoal luxury carton',
      badge: '05 / Luxury Packaging',
    },
    {
      id: 'dewexa-cream',
      type: 'image',
      title: 'Dewexa Dermal Bio Cloud Cream',
      subtitle: 'Product Shoot · Luxury Packaging & Texture',
      image: '/images/product-shoot/03-dewexa-cloud-cream.jpg',
      alt: 'Dewexa Cloud Cream jar and textured packaging',
      badge: '06 / Tactile Packaging',
    },
    {
      id: 'spiculex-bottle',
      type: 'image',
      title: 'Spiculex Advanced Bio Micro Needle Serum',
      subtitle: 'Product Shoot · Amber Glass Studio Study',
      image: '/images/product-shoot/04-spiculex-serum.jpg',
      alt: 'Spiculex Advanced Bio micro needle serum bottle',
      badge: '07 / Glass & Optics',
    },
    {
      id: 'dewexa-detail',
      type: 'image',
      title: 'Dewexa Packaging Perspective & 3D Depth Study',
      subtitle: 'Product Shoot · Angle & Depth',
      image: '/images/product-shoot/05-dewexa-detail.jpg',
      alt: 'Dewexa Bio Cloud Cream studio perspective view',
      badge: '08 / Perspective Study',
    },
    {
      id: 'genex-serum',
      type: 'image',
      title: 'Genex Advanced PDRN+ Revitalizing Serum',
      subtitle: 'Product Shoot · Frosted Matte & Amber Gradient',
      image: '/images/product-shoot/06-genex-serum.jpg',
      alt: 'Genex Advanced PDRN+ Revitalizing face serum bottle',
      badge: '09 / Precision Dispenser',
    },
  ]

  // Auto-change images in the chakra slices every 3.5 seconds
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setRotationOffset((prev) => (prev + 1) % chakraWorksPool.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [isHovered, chakraWorksPool.length])

  // 8 Slices covering full 360-degree circle with exact symmetric geometry
  const fullChakraSlices = [
    { id: 1, path: 'M 619.9 326.5 A 300 300 0 0 1 536.7 527.5 L 410.3 406.4 A 125 125 0 0 0 445.0 322.7 Z', imgX: 402, imgY: 314, imgW: 226, imgH: 221 },
    { id: 2, path: 'M 527.5 536.7 A 300 300 0 0 1 326.5 619.9 L 322.7 445.0 A 125 125 0 0 0 406.4 410.3 Z', imgX: 314, imgY: 402, imgW: 221, imgH: 226 },
    { id: 3, path: 'M 313.5 619.9 A 300 300 0 0 1 112.5 536.7 L 233.6 410.3 A 125 125 0 0 0 317.3 445.0 Z', imgX: 104, imgY: 402, imgW: 221, imgH: 226 },
    { id: 4, path: 'M 103.3 527.5 A 300 300 0 0 1 20.1 326.5 L 195.0 322.7 A 125 125 0 0 0 229.7 406.4 Z', imgX: 12, imgY: 314, imgW: 226, imgH: 221 },
    { id: 5, path: 'M 20.1 313.5 A 300 300 0 0 1 103.3 112.5 L 229.7 233.6 A 125 125 0 0 0 195.0 317.3 Z', imgX: 12, imgY: 104, imgW: 226, imgH: 221 },
    { id: 6, path: 'M 112.5 103.3 A 300 300 0 0 1 313.5 20.1 L 317.3 195.0 A 125 125 0 0 0 233.6 229.7 Z', imgX: 104, imgY: 12, imgW: 221, imgH: 226 },
    { id: 7, path: 'M 326.5 20.1 A 300 300 0 0 1 527.5 103.3 L 406.4 229.7 A 125 125 0 0 0 322.7 195.0 Z', imgX: 314, imgY: 12, imgW: 221, imgH: 226 },
    { id: 8, path: 'M 536.7 112.5 A 300 300 0 0 1 619.9 313.5 L 445.0 317.3 A 125 125 0 0 0 410.3 233.6 Z', imgX: 402, imgY: 104, imgW: 226, imgH: 221 },
  ]

  const handleSliceClick = (sliceIdx: number) => {
    const itemIndex = (rotationOffset + sliceIdx) % chakraWorksPool.length
    setAboutLightboxIndex(itemIndex)
  }

  return (
    <section className="about-section section-pad" id="about">
      <div className="about-heading" data-reveal>
        <div>
          <Eyebrow>Bangalore Creative Studio · Photography &amp; Cinema</Eyebrow>
          <h2 className="section-title">About <em>Us.</em></h2>
        </div>
      </div>

      <div className="about-studio-layout" data-reveal>
        {/* Left Side: FULL 360° ROTATING CHAKRA WHEEL with STATIONARY CENTER LOGO */}
        <div className="about-wheel-side">
          <div
            className="about-full-chakra-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg
              aria-label="Viyana Productions full circular rotating chakra showcase wheel"
              className="about-full-chakra-svg"
              role="img"
              viewBox="0 0 640 640"
            >
              <defs>
                {fullChakraSlices.map((slice) => (
                  <clipPath id={`full-chakra-clip-${slice.id}`} key={slice.id}>
                    <path d={slice.path} />
                  </clipPath>
                ))}
                <filter id="chakra-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#caa867" floodOpacity="0.22" />
                </filter>
              </defs>

              {/* 1. OUTER ROTATING RING OF 8 SLICES */}
              <g className={`full-chakra-outer-ring ${isHovered ? 'paused' : ''}`}>
                {fullChakraSlices.map((slice, idx) => {
                  const item = chakraWorksPool[(rotationOffset + idx) % chakraWorksPool.length]
                  return (
                    <g
                      className="chakra-slice-group"
                      key={slice.id}
                      onClick={() => handleSliceClick(idx)}
                      role="button"
                      tabIndex={0}
                    >
                      {/* Outline and Background */}
                      <path
                        className="chakra-slice-border"
                        d={slice.path}
                        fill="#f7f3ec"
                        stroke="#ffffff"
                        strokeWidth="3.5"
                      />
                      {/* Auto-Changing Real Work Image */}
                      <image
                        className="chakra-slice-img-fade"
                        clipPath={`url(#full-chakra-clip-${slice.id})`}
                        height={slice.imgH}
                        href={item.image}
                        xlinkHref={item.image}
                        key={`${slice.id}-${item.image}`}
                        preserveAspectRatio="xMidYMid slice"
                        width={slice.imgW}
                        x={slice.imgX}
                        y={slice.imgY}
                      />
                      {/* Hover Tint */}
                      <path
                        className="chakra-slice-hover-tint"
                        clipPath={`url(#full-chakra-clip-${slice.id})`}
                        d={slice.path}
                      />
                    </g>
                  )
                })}
              </g>

              {/* 2. STATIONARY CENTER HUB: Perfectly Level, Upright & Clean Logo */}
              <g className="full-chakra-center-hub">
                {/* Outer decorative ring */}
                <circle cx="320" cy="320" r="128" fill="#fdfbf7" stroke="#e8e2d7" strokeWidth="2" />
                {/* Inner crisp white circle */}
                <circle cx="320" cy="320" r="118" fill="#ffffff" stroke="#caa867" strokeWidth="2" />

                {/* Viyana Official Logo Clean & Centered */}
                <image
                  className="full-chakra-hub-logo"
                  height="54"
                  href="/images/viyana-logo-dark.png"
                  xlinkHref="/images/viyana-logo-dark.png"
                  preserveAspectRatio="xMidYMid meet"
                  width="120"
                  x="260"
                  y="240"
                />

                <text className="full-chakra-hub-title" textAnchor="middle" x="320" y="315">
                  YOUR STORY. OUR LENS
                </text>
                <text className="full-chakra-hub-sub" textAnchor="middle" x="320" y="335">
                  FROM PORTRAITS TO CAMPAIGNS
                </text>
                <text className="full-chakra-hub-sub" textAnchor="middle" x="320" y="353">
                  CAPTURED WITH HEART
                </text>
                <text className="full-chakra-hub-hint" textAnchor="middle" x="320" y="380">
                  TAP SLICE FOR 4K DETAIL ↗
                </text>
                <text className="full-chakra-hub-status" textAnchor="middle" x="320" y="402">
                  {isHovered ? '❚❚ ROTATION PAUSED' : '● ROTATING CHAKRA'}
                </text>
              </g>
            </svg>

            {/* Quick 4K Studio Showreel Floating Button */}
            <button
              aria-label="Play 4K Studio Showreel"
              className="about-wheel-showreel-pill"
              onClick={() => setIsShowreelOpen(true)}
              type="button"
            >
              <Play size={13} />
              <span>Watch 4K Showreel</span>
            </button>
          </div>
        </div>

        {/* Right Side: Editorial Manifesto, Studio Pillars & Book Session CTA */}
        <div className="about-editorial-side">
          <div className="about-brand-tag">
            <span>VIYANA PHOTOGRAPHY &amp; CINEMA</span>
          </div>

          <h3 className="about-manifesto-title">
            We Create Visuals That Make <em>Stories Matter.</em>
          </h3>

          <p className="about-lede">
            Viyana is an independent creative film, photography, and commercial production studio in Bangalore dedicated to bringing brands, stories, and human emotion to life through deliberate cinema craftsmanship.
          </p>

          <p className="about-desc">
            We believe every brand, model narrative, and product carries a story worth telling. Our approach combines deliberate art direction, master cinema optics, and human intimacy to craft visuals that don&apos;t just capture attention — they leave an indelible impression.
          </p>

          <p className="about-desc">
            From intimate model and portrait campaigns to high-precision product commercials and brand lookbooks, we engineer work that connects deeply, drives desire, and endures.
          </p>

          {/* 3 Studio Excellence Pillars */}
          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <span className="about-pillar-num">01</span>
              <h4>Cinematic Storytelling</h4>
              <p>Real emotion, unstaged beauty, and directional light crafted to elevate brand desire.</p>
            </div>
            <div className="about-pillar-card">
              <span className="about-pillar-num">02</span>
              <h4>Studio &amp; Location Optics</h4>
              <p>4K master cinema primes, tactile lighting rigs, and film-calibrated colors.</p>
            </div>
            <div className="about-pillar-card">
              <span className="about-pillar-num">03</span>
              <h4>Omnichannel Masters</h4>
              <p>16:9 Commercial cinema, 9:16 viral vertical reels, and editorial stills.</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="about-actions-row">
            <a className="about-book-btn" href="#contact">
              <span>BOOK YOUR SESSION TODAY</span>
              <ArrowUpRight size={16} />
            </a>
            <button
              className="about-showreel-trigger-btn"
              onClick={() => setIsShowreelOpen(true)}
              type="button"
            >
              <Play size={14} />
              <span>Play 4K Showreel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox for Inspecting Real Chakra Work in High Resolution */}
      {aboutLightboxIndex !== null && (
        <div className="product-lightbox-overlay" onClick={() => setAboutLightboxIndex(null)}>
          <div className="product-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Close lightbox"
              className="lightbox-close-btn"
              onClick={() => setAboutLightboxIndex(null)}
              type="button"
            >
              <X size={20} />
            </button>

            <button
              aria-label="Previous work"
              className="lightbox-nav-arrow lightbox-prev"
              onClick={() => setAboutLightboxIndex((prev) => (prev === 0 ? chakraWorksPool.length - 1 : (prev ?? 1) - 1))}
              type="button"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="lightbox-image-container">
              <img
                alt={chakraWorksPool[aboutLightboxIndex].alt}
                src={chakraWorksPool[aboutLightboxIndex].image}
              />
            </div>

            <button
              aria-label="Next work"
              className="lightbox-nav-arrow lightbox-next"
              onClick={() => setAboutLightboxIndex((prev) => (prev === chakraWorksPool.length - 1 ? 0 : (prev ?? 0) + 1))}
              type="button"
            >
              <ChevronRight size={22} />
            </button>

            <div className="lightbox-info-bar">
              <div className="lightbox-details">
                <span className="lightbox-count">
                  0{aboutLightboxIndex + 1} / 0{chakraWorksPool.length} · {chakraWorksPool[aboutLightboxIndex].badge}
                </span>
                <h3>{chakraWorksPool[aboutLightboxIndex].title}</h3>
                <p>{chakraWorksPool[aboutLightboxIndex].subtitle}</p>
              </div>

              <div className="lightbox-thumbnails">
                {chakraWorksPool.map((item, idx) => (
                  <button
                    aria-label={`View work ${idx + 1}`}
                    className={`lightbox-thumb-btn ${aboutLightboxIndex === idx ? 'active' : ''}`}
                    key={item.id}
                    onClick={() => setAboutLightboxIndex(idx)}
                    type="button"
                  >
                    <img alt="" src={item.image} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4K Studio Showreel Video Modal */}
      {isShowreelOpen && (
        <div className="product-lightbox-overlay" onClick={() => setIsShowreelOpen(false)}>
          <div className="about-showreel-modal" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Close showreel"
              className="lightbox-close-btn"
              onClick={() => setIsShowreelOpen(false)}
              type="button"
            >
              <X size={22} />
            </button>

            <div className="about-showreel-video-wrap">
              <video
                aria-label="Viyana Productions 4K Studio Showreel"
                autoPlay
                className="about-modal-video"
                controls
                loop
                muted={isReelMuted}
                playsInline
                preload="none"
                ref={showreelVideoRef}
                src="/showreel-hero-4k.mp4"
              />
            </div>

            <div className="about-showreel-meta">
              <div>
                <span className="showreel-meta-tag">Flagship Cinema Master · 4K</span>
                <h4>Viyana Productions — Studio Showreel</h4>
              </div>
              <button
                className="showreel-audio-toggle"
                onClick={() => {
                  if (showreelVideoRef.current) {
                    showreelVideoRef.current.muted = !isReelMuted
                    setIsReelMuted(!isReelMuted)
                  }
                }}
                type="button"
              >
                {isReelMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isReelMuted ? 'Unmute' : 'Mute'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}


type ServiceItem = {
  number: string
  title: string
  category: 'Films & Ads' | 'Shoots & Series' | 'Studio & Sound'
  color: string
  bgLight: string
  desc: string
  tag: string
  icon: ReactNode
}

const servicesList: ServiceItem[] = [
  {
    number: '01',
    title: 'Commercial Ads',
    category: 'Films & Ads',
    color: '#e11d48',
    bgLight: '#ffe4e6',
    desc: 'High-impact broadcast and digital commercials engineered to build brand desire and drive conversion.',
    tag: 'Broadcast & Digital',
    icon: <Clapperboard size={20} />,
  },
  {
    number: '02',
    title: 'Cinematic Content Shoot',
    category: 'Films & Ads',
    color: '#2563eb',
    bgLight: '#dbeafe',
    desc: 'Ultra-high-definition cinematic visual reels with anamorphic framing, artful movement, and dramatic lighting.',
    tag: '4K Cinema Reel',
    icon: <Film size={20} />,
  },
  {
    number: '03',
    title: 'Advertisement',
    category: 'Films & Ads',
    color: '#ea580c',
    bgLight: '#ffedd5',
    desc: 'Distinctive multi-channel advertising campaigns crafted around a single unforgettable brand idea.',
    tag: 'Campaign Strategy',
    icon: <Target size={20} />,
  },
  {
    number: '04',
    title: 'Models Portfolio Shoots',
    category: 'Shoots & Series',
    color: '#9333ea',
    bgLight: '#f3e8ff',
    desc: 'Editorial model books, agency lookbooks, and high-fashion portrait sessions celebrating natural movement.',
    tag: 'Editorial & Agency',
    icon: <UserRound size={20} />,
  },
  {
    number: '05',
    title: 'Vertical Series',
    category: 'Shoots & Series',
    color: '#0891b2',
    bgLight: '#cffafe',
    desc: 'Fast-paced 9:16 cinematic series designed specifically for mobile reels, shorts, and vertical streaming.',
    tag: '9:16 Vertical Content',
    icon: <Smartphone size={20} />,
  },
  {
    number: '06',
    title: 'Web Series',
    category: 'Films & Ads',
    color: '#059669',
    bgLight: '#d1fae5',
    desc: 'Multi-episode episodic storytelling with rich character arcs, streaming episodic pacing, and grade-A color.',
    tag: 'OTT & Web Drama',
    icon: <Tv size={20} />,
  },
  {
    number: '07',
    title: 'Short Films',
    category: 'Shoots & Series',
    color: '#db2777',
    bgLight: '#fce7f3',
    desc: 'Festival-grade narrative short films exploring raw human emotion, auteur visual rhythm, and unforgettable endings.',
    tag: 'Festival Cut',
    icon: <Clapperboard size={20} />,
  },
  {
    number: '08',
    title: 'Film Production',
    category: 'Films & Ads',
    color: '#4f46e5',
    bgLight: '#e0e7ff',
    desc: 'Full-scale end-to-end production: script development, casting, location scouting, crew, and DCI-P3 mastering.',
    tag: 'Full Feature',
    icon: <Play size={20} />,
  },
  {
    number: '09',
    title: 'Graphic Design',
    category: 'Studio & Sound',
    color: '#d97706',
    bgLight: '#fef3c7',
    desc: 'Distinctive visual identities, motion titles, brand toolkits, typography systems, and key art packaging design.',
    tag: 'Identity & Typography',
    icon: <Palette size={20} />,
  },
  {
    number: '10',
    title: 'Product Shoot',
    category: 'Shoots & Series',
    color: '#ca8a04',
    bgLight: '#fef9c3',
    desc: 'Tactile macro studio photography and motion reels bringing out reflections, packaging, and luxury textures.',
    tag: 'Macro Still & Motion',
    icon: <Camera size={20} />,
  },
  {
    number: '11',
    title: 'Influencer Shoot',
    category: 'Shoots & Series',
    color: '#e05624',
    bgLight: '#fff2ea',
    desc: 'High-energy lifestyle and creator shoots tailored to capture authentic personality and massive digital engagement.',
    tag: 'Creator & Social',
    icon: <Instagram size={20} />,
  },
  {
    number: '12',
    title: 'Studio Rental',
    category: 'Studio & Sound',
    color: '#0d9488',
    bgLight: '#ccfbf1',
    desc: 'Fully equipped Bangalore production floor with soundproofing, custom backdrops, cinema lighting grids, and vanity suites.',
    tag: 'Bangalore Soundstage',
    icon: <Building2 size={20} />,
  },
  {
    number: '13',
    title: 'Podcast Production',
    category: 'Studio & Sound',
    color: '#7c3aed',
    bgLight: '#ede9fe',
    desc: 'Multi-camera 4K visual podcast recording, broadcast-grade multi-track audio, dynamic switches, and viral social cuts.',
    tag: 'Multi-Cam 4K Audio',
    icon: <Mic size={20} />,
  },
]

function Services({ onSelectService }: { onSelectService?: (serviceTitle: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Films & Ads' | 'Shoots & Series' | 'Studio & Sound'>('All')
  const [isPaused, setIsPaused] = useState(false)
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee')

  const filteredServices = activeCategory === 'All'
    ? servicesList
    : servicesList.filter((s) => s.category === activeCategory)

  // Duplicate items into 2 identical halves to create a completely seamless infinite loop
  const repsPerHalf = Math.max(1, Math.ceil(10 / filteredServices.length))
  const halfList = Array.from({ length: repsPerHalf }, () => filteredServices).flat()
  const marqueeList = [...halfList, ...halfList]

  return (
    <section className="services section-pad" id="services">
      <div className="section-intro" data-reveal>
        <div>
          <Eyebrow>What we bring to the table · 13 Creative Disciplines</Eyebrow>
          <h2 className="section-title">Services.</h2>
        </div>
        <p className="section-note">
          Thirteen specialized production pathways.<br />
          From commercial television sets to soundstage engineering.
        </p>
      </div>

      {/* Filter Tabs for Ultra-Fast Navigation & Mobile Responsiveness */}
      <div className="services-filter-bar" data-reveal>
        {[
          { key: 'All', label: 'All Services (13)' },
          { key: 'Films & Ads', label: 'Films & Ads (5)' },
          { key: 'Shoots & Series', label: 'Shoots & Series (5)' },
          { key: 'Studio & Sound', label: 'Studio & Sound (3)' },
        ].map((tab) => (
          <button
            className={`service-filter-btn ${activeCategory === tab.key ? 'active' : ''}`}
            key={tab.key}
            onClick={() => setActiveCategory(tab.key as typeof activeCategory)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Controls Bar: Live Moving Line Status + Pause/Resume + View Toggle */}
      <div className="services-controls-bar" data-reveal>
        <span className="services-status-badge">
          <span className="live-dot" />
          <span>Continuous line · Moving right to left</span>
          <span className="services-hover-hint">(hover card to pause)</span>
        </span>

        <div className="services-actions-group">
          <button
            className={`services-action-btn ${isPaused ? 'active' : ''}`}
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume auto-movement' : 'Pause auto-movement'}
            type="button"
          >
            {isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            className="services-action-btn"
            onClick={() => setViewMode(viewMode === 'marquee' ? 'grid' : 'marquee')}
            title="Toggle between moving line and grid view"
            type="button"
          >
            <LayoutGrid size={13} />
            <span>{viewMode === 'marquee' ? 'Grid view' : 'One line'}</span>
          </button>
        </div>
      </div>

      {/* Services Showcase: Single Line Moving Automatically from Right to Left */}
      {viewMode === 'marquee' ? (
        <div className="services-marquee-wrapper" data-reveal>
          <div className={`services-marquee-track ${isPaused ? 'is-paused' : ''}`}>
            {marqueeList.map((service, index) => (
              <article
                className="service-card-13"
                key={`${service.number}-${index}`}
                style={{ '--service-color': service.color } as React.CSSProperties}
              >
                <div className="service-card-top">
                  <span className="service-num-badge">{service.number}</span>
                  <div
                    className="service-icon-circle"
                    style={{ background: service.bgLight, color: service.color }}
                  >
                    {service.icon}
                  </div>
                </div>

                <div className="service-card-body">
                  <span className="service-tag-pill">{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>

                <div className="service-card-actions-wrap">
                  <button
                    aria-label={`Inquire about ${service.title}`}
                    className="service-card-action"
                    onClick={() => onSelectService?.(`${service.number} ${service.title}`)}
                    type="button"
                  >
                    <span>Book this service</span>
                    <ArrowUpRight size={15} />
                  </button>
                  {service.number === '10' && (
                    <a className="service-card-anchor-link" href="#product-shoot">
                      <span>Watch Product Videos</span>
                      <ArrowDownRight size={13} />
                    </a>
                  )}
                  {service.number === '04' && (
                    <a className="service-card-anchor-link" href="#model-shoot">
                      <span>Watch Model Films</span>
                      <ArrowDownRight size={13} />
                    </a>
                  )}
                  {service.number === '02' && (
                    <a className="service-card-anchor-link" href="#branding-shoot">
                      <span>Explore Branding &amp; Content</span>
                      <ArrowDownRight size={13} />
                    </a>
                  )}
                  {service.number === '13' && (
                    <a className="service-card-anchor-link" href="#podcast-shoot">
                      <span>Explore Podcast Studio</span>
                      <ArrowDownRight size={13} />
                    </a>
                  )}
                  {service.number === '11' && (
                    <a className="service-card-anchor-link" href="#influencer-shoot">
                      <span>Watch Influencer Reels</span>
                      <ArrowDownRight size={13} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="services-grid-13">
          {filteredServices.map((service) => (
            <article
              className="service-card-13"
              data-reveal
              key={service.number}
              style={{ '--service-color': service.color } as React.CSSProperties}
            >
              <div className="service-card-top">
                <span className="service-num-badge">{service.number}</span>
                <div
                  className="service-icon-circle"
                  style={{ background: service.bgLight, color: service.color }}
                >
                  {service.icon}
                </div>
              </div>

              <div className="service-card-body">
                <span className="service-tag-pill">{service.tag}</span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>

              <div className="service-card-actions-wrap">
                <button
                  aria-label={`Inquire about ${service.title}`}
                  className="service-card-action"
                  onClick={() => onSelectService?.(`${service.number} ${service.title}`)}
                  type="button"
                >
                  <span>Book this service</span>
                  <ArrowUpRight size={15} />
                </button>
                {service.number === '10' && (
                  <a className="service-card-anchor-link" href="#product-shoot">
                    <span>Watch Product Videos</span>
                    <ArrowDownRight size={13} />
                  </a>
                )}
                {service.number === '04' && (
                  <a className="service-card-anchor-link" href="#model-shoot">
                    <span>Watch Model Films</span>
                    <ArrowDownRight size={13} />
                  </a>
                )}
                {service.number === '02' && (
                  <a className="service-card-anchor-link" href="#branding-shoot">
                    <span>Explore Branding &amp; Content</span>
                    <ArrowDownRight size={13} />
                  </a>
                )}
                {service.number === '13' && (
                  <a className="service-card-anchor-link" href="#podcast-shoot">
                    <span>Explore Podcast Studio</span>
                    <ArrowDownRight size={13} />
                  </a>
                )}
                {service.number === '11' && (
                  <a className="service-card-anchor-link" href="#influencer-shoot">
                    <span>Watch Influencer Reels</span>
                    <ArrowDownRight size={13} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="services-outro" data-reveal>
        <span>Looking for a tailored blend of multiple services? We build custom project packages.</span>
        <a className="text-link" href="#contact">Discuss your requirements <ArrowUpRight size={17} /></a>
      </div>
    </section>
  )
}

function Contact({ preselectedService }: { preselectedService?: string }) {
  const [selectedService, setSelectedService] = useState('01 Commercial Ads')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService)
    }
  }, [preselectedService])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const email = String(formData.get('email') ?? '')
    const service = String(formData.get('service') ?? selectedService)
    const message = String(formData.get('message') ?? '')
    const subject = encodeURIComponent(`Project Inquiry: ${service} from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSelected Service: ${service}\n\nMessage:\n${message}`)
    window.location.href = `mailto:info.viyanaproductions@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="contact-heading" data-reveal>
        <div>
          <Eyebrow>Start a project · Bangalore Flagship Studio</Eyebrow>
          <h2 className="section-title">Contact <em>Us.</em></h2>
        </div>
      </div>

      <div className="contact-studio-layout" data-reveal>
        {/* Left Column: Context, Working Hours & Studio Details */}
        <div className="contact-info-col">
          <h3 className="contact-subheadline">
            Let's Make <em>Something</em> Remarkable.
          </h3>

          <p className="contact-lede">
            Have a commercial film, model campaign, product shoot, or bespoke visual project in mind? Share your vision and our team in Bangalore will connect within 24 hours.
          </p>

          <div className="contact-details-grid">
            <div className="contact-detail-card">
              <span className="detail-card-label">Direct Mail</span>
              <a className="detail-card-value text-link" href="mailto:info.viyanaproductions@gmail.com">
                info.viyanaproductions@gmail.com
              </a>
              <span className="detail-card-hint">Inquiries, proposals &amp; pitches</span>
            </div>

            <div className="contact-detail-card">
              <span className="detail-card-label">Bangalore Studio</span>
              <a
                className="detail-card-value text-link contact-location-link"
                href="https://www.google.com/maps/search/?api=1&query=4th+Floor,+Gopalan+Workspace,+Kathriguppe+Main+Rd,+3rd+Phase,+Banashankari+3rd+Stage,+Banashankari,+Bengaluru,+Karnataka+560085"
                rel="noreferrer"
                target="_blank"
                title="Open Bangalore Studio in Google Maps"
              >
                4th Floor, Gopalan Workspace, Kathriguppe Main Rd, 3rd Phase, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085
                <ArrowUpRight size={13} style={{ display: 'inline', marginLeft: 4 }} />
              </a>
              <span className="detail-card-hint">Open for visits by appointment · Tap for Google Maps directions</span>
            </div>

            <div className="contact-detail-card">
              <span className="detail-card-label">Studio Availability</span>
              <span className="detail-card-badge">
                <span className="live-dot" /> Mon – Sat: 9:00 AM – 7:30 PM
              </span>
              <span className="detail-card-hint">Shoot bookings open for 2026</span>
            </div>

            <div className="contact-detail-card">
              <span className="detail-card-label">Response Guarantee</span>
              <span className="detail-card-value">
                Usually within 24 hours
              </span>
              <span className="detail-card-hint">Direct line with our creative producer</span>
            </div>
          
          {/* Direct Social Channels */}
          <div className="contact-social-bar">
            <span className="contact-social-label">Official Studio Channels:</span>
            <div className="contact-social-links">
              <a
                className="contact-social-btn"
                href="https://www.instagram.com/viyana.productions?utm_source=qr&xtok=bWR1eTBxZHVpOGp3"
                rel="noreferrer"
                target="_blank"
              >
                <Instagram size={14} />
                <span>@viyana.productions</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                className="contact-social-btn"
                href="https://www.linkedin.com/company/viyana-production/"
                rel="noreferrer"
                target="_blank"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
</div>
        </div>

        {/* Right Column: Sleek Luxury Production Inquiry Form */}
        <div className="contact-form-col">
          <div className="contact-form-card">
            <form className="contact-form-inner" onSubmit={handleSubmit}>
              <div className="form-card-header">
                <h3>Start a Production Enquiry</h3>
                <p>Tell us what you are envisioning. All 13 services available.</p>
              </div>

              {/* Name & Email in 2 columns */}
              <div className="contact-input-row">
                <div className="contact-field-group">
                  <label htmlFor="contact-name">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    autoComplete="name"
                    id="contact-name"
                    name="name"
                    required
                    type="text"
                  />
                </div>

                <div className="contact-field-group">
                  <label htmlFor="contact-email">
                    Your Email Address <span className="req">*</span>
                  </label>
                  <input
                    autoComplete="email"
                    id="contact-email"
                    name="email"
                    required
                    type="email"
                  />
                </div>
              </div>

              {/* Service Selector Dropdown */}
              <div className="contact-field-group">
                <label htmlFor="contact-service">
                  Selected Service <span className="req">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="contact-service"
                    name="service"
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                    value={selectedService}
                  >
                    <option disabled value="">Select one of 13 studio disciplines</option>
                    {servicesList.map((s) => (
                      <option key={s.number} value={`${s.number} ${s.title}`}>
                        {s.number} · {s.title} ({s.tag})
                      </option>
                    ))}
                    <option value="Custom Multi-Service Package">Custom Multi-Service Package</option>
                  </select>
                </div>
              </div>

              {/* Message / Project Scope Textarea */}
              <div className="contact-field-group">
                <label htmlFor="contact-message">
                  Your Message / Project Scope <span className="req">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                />
              </div>

              {/* Submit Button & Privacy Reassurance */}
              <div className="contact-submit-area">
                <button className="contact-send-btn" type="submit">
                  <span>{sent ? 'Opening Email Client…' : 'Send Project Enquiry'}</span>
                  <Send size={16} />
                </button>
                <span className="submit-subtext">No spam. Your project details stay 100% confidential.</span>
              </div>

              {sent && (
                <p aria-live="polite" className="form-feedback-card">
                  ✓ Opening your email client to dispatch your enquiry. If it didn&apos;t open automatically, write directly to <strong>info.viyanaproductions@gmail.com</strong>.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link aria-label="Viyana Productions home" className="brand-logo-link" to="/">
            <img
              alt="Viyana Productions"
              className="brand-logo-img"
              height="44"
              src="/images/viyana-logo-dark.png"
              width="170"
            />
          </Link>
          <p>Independent by nature.<br />Thoughtful by design.</p>
        </div>

        <div className="footer-column">
          <span className="footer-label">Find your way</span>
          <a href="#about">About</a>
          <a href="#model-shoot">Model shoot</a>
          <a href="#product-shoot">Product shoot</a>
          <a href="#branding-shoot">Branding &amp; Content</a>
          <a href="#podcast-shoot">Podcast shoot</a>
          <a href="#influencer-shoot">Influencer shoot</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-column">
          <span className="footer-label">Studio Location</span>
          <strong className="footer-loc-name">Viyana Productions Studio</strong>
          <a
            className="footer-loc-address"
            href="https://www.google.com/maps/search/?api=1&query=4th+Floor,+Gopalan+Workspace,+Kathriguppe+Main+Rd,+3rd+Phase,+Banashankari+3rd+Stage,+Banashankari,+Bengaluru,+Karnataka+560085"
            rel="noreferrer"
            target="_blank"
            title="Open studio location in Google Maps"
          >
            4th Floor, Gopalan Workspace,<br />
            Kathriguppe Main Rd, 3rd Phase,<br />
            Banashankari 3rd Stage, Banashankari,<br />
            Bengaluru, Karnataka 560085
            <ArrowUpRight size={12} style={{ display: 'inline', marginLeft: 4 }} />
          </a>
          <span className="footer-loc-badge">Bengaluru HQ · Tap for Map</span>
        </div>

        <div className="footer-column">
          <span className="footer-label">Say hello</span>
          <a href="mailto:info.viyanaproductions@gmail.com">
            info.viyanaproductions@gmail.com <ArrowUpRight size={13} />
          </a>
          <span>India · Working everywhere</span>
        </div>

        <div className="footer-column">
          <span className="footer-label">Follow along</span>
          <a href="https://www.instagram.com/viyana.productions?utm_source=qr&xtok=bWR1eTBxZHVpOGp3" rel="noreferrer" target="_blank">
            Instagram <ArrowUpRight size={13} />
          </a>
          <a href="https://www.linkedin.com/company/viyana-production/" rel="noreferrer" target="_blank">
            LinkedIn <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Viyana Productions</span>
        <span>Bangalore, Karnataka · Made with intention, in India.</span>
        <a href="#home">Back to the beginning <ArrowRight size={14} /></a>
      </div>
    </footer>
  )
}

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) {
    return <main className="not-found"><Eyebrow>Nothing here just yet</Eyebrow><h1>That story isn't in the edit.</h1><Link className="text-link" to="/"><ArrowLeft size={17} /> Back to home</Link></main>
  }
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <main className="project-detail">
      <div className="detail-intro">
        <Link className="text-link" to="/"><ArrowLeft size={16} /> Back to home</Link>
        <Eyebrow>{project.category} · {project.year}</Eyebrow>
        <h1>{project.name}<span>.</span></h1>
        <p>{project.description}</p>
      </div>
      <div className="detail-image"><img alt={project.imageAlt} src={project.image} /></div>
      <div className="detail-copy">
        <Eyebrow>A little about this one</Eyebrow>
        <h2>A good story can begin anywhere.</h2>
        <p>{project.description} We worked together to find the point of view, bring the right people into the room, and make something worth spending a little time with.</p>
        <Link className="text-link" to="/#contact">Have a story of your own? <ArrowUpRight size={17} /></Link>
      </div>
      <Link className="next-project" to={`/work/${nextProject.slug}`}>
        <img alt="" loading="lazy" src={nextProject.image} />
        <span className="next-project-shade" />
        <span className="next-project-copy"><span>Up next · {nextProject.category}</span><strong>{nextProject.name}</strong><span>Meet the next story <ArrowUpRight size={15} /></span></span>
      </Link>
    </main>
  )
}

function HomePage() {
  const [selectedService, setSelectedService] = useState('01 Commercial Ads')

  const handleSelectService = (service: string) => {
    setSelectedService(service)
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="home-page">
      <Hero />
      <About />
      <div className="luxury-section-divider" />
      <ModelShoot />
      <ProductShoot />
      <BrandingShoot onSelectService={handleSelectService} />
      <PodcastShoot onSelectService={handleSelectService} />
      <InfluencerShoot onSelectService={handleSelectService} />
      <Services onSelectService={handleSelectService} />
      <Contact preselectedService={selectedService} />
      <div className="luxury-section-divider" />
    </main>
  )
}

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isTouchMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024)
    let lenis: Lenis | null = null
    let update: ((time: number) => void) | null = null

    // On desktop pointer devices, enable smooth mouse wheel lerp.
    // On mobile touchscreens, native 120Hz momentum scrolling provides 0ms touch latency and zero jank.
    if (!isTouchMobile) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
      lenis.on('scroll', ScrollTrigger.update)
      update = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(update)
      gsap.ticker.lagSmoothing(0)
    }

        const context = gsap.context(() => {
      const isMobile = window.innerWidth <= 768
      // Generous dynamic offset for prominent, unmistakable entrance from both sides
      const xOffset = isMobile ? 55 : 125

      // 1. Headings: Eyebrow + Title glide prominently from LEFT, notes / action buttons glide from RIGHT
      gsap.utils.toArray<HTMLElement>('.model-shoot-heading, .product-shoot-heading, .branding-shoot-heading, .podcast-shoot-heading, .influencer-shoot-heading, .about-heading, .contact-heading, .section-intro').forEach((heading) => {
        const leftEl = heading.querySelector('div:first-child') || heading
        const rightEl = heading.querySelector('.section-note, .influencer-top-nav-btns, .podcast-top-nav-btns, p')

        gsap.from(leftEl, {
          autoAlpha: 0,
          x: -xOffset,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
        })

        if (rightEl && rightEl !== leftEl) {
          gsap.from(rightEl, {
            autoAlpha: 0,
            x: xOffset,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
          })
        }
      })

      // 2. Hero Section: Left content sweeps from LEFT, Right cinema player sweeps from RIGHT
      gsap.from('.hero-content-side', {
        autoAlpha: 0,
        x: -xOffset,
        duration: 1.15,
        ease: 'power3.out',
      })
      gsap.from('.hero-video-side', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.15,
        delay: 0.1,
        ease: 'power3.out',
      })

      // 3. About Us: Left Rotating Chakra Wheel from LEFT, Right Editorial Story from RIGHT
      gsap.from('.about-wheel-side', {
        autoAlpha: 0,
        x: -xOffset,
        scale: 0.94,
        duration: 1.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-studio-layout', start: 'top 85%', once: true },
      })
      gsap.from('.about-editorial-side', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-studio-layout', start: 'top 85%', once: true },
      })

      // 4. Model Shoot: Left video reel from LEFT, Right specifications & copy from RIGHT
      gsap.from('.model-film', {
        autoAlpha: 0,
        x: -xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.model-shoot-layout', start: 'top 85%', once: true },
      })
      gsap.from('.model-shoot-copy', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.model-shoot-layout', start: 'top 85%', once: true },
      })
      gsap.from('.model-stills-controls-bar', {
        autoAlpha: 0,
        x: -xOffset,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.model-stills-section', start: 'top 88%', once: true },
      })
      gsap.from('.model-slider-wrapper', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.model-stills-section', start: 'top 88%', once: true },
      })

      // 5. Product Shoot: Left cinema container from LEFT, Right product details from RIGHT
      gsap.from('.product-cinema-container', {
        autoAlpha: 0,
        x: -xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.product-film-layout', start: 'top 85%', once: true },
      })
      gsap.from('.product-film-side', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.product-film-layout', start: 'top 85%', once: true },
      })
      gsap.from('.product-stills-section', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.product-stills-section', start: 'top 88%', once: true },
      })

      // 6. Branding Shoot: Left cinema video from LEFT, Right details from RIGHT
      gsap.from('.branding-film', {
        autoAlpha: 0,
        x: -xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.branding-film-layout', start: 'top 85%', once: true },
      })
      gsap.from('.branding-film-side', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.branding-film-layout', start: 'top 85%', once: true },
      })
      gsap.from('.branding-stills-controls-bar', {
        autoAlpha: 0,
        x: -xOffset,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.branding-stills-section', start: 'top 88%', once: true },
      })
      gsap.from('.branding-slider-wrapper', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.branding-stills-section', start: 'top 88%', once: true },
      })

      // 7. Podcast Shoot: YouTube top line from LEFT, Instagram bottom line from RIGHT
      gsap.from('.podcast-line-wrap:first-child', {
        autoAlpha: 0,
        x: -xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.podcast-content-layout', start: 'top 85%', once: true },
      })
      gsap.from('.podcast-line-wrap:last-child', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.podcast-content-layout', start: 'top 80%', once: true },
      })

      // 8. Influencer Shoot: Featured reel from LEFT, Instagram reels track from RIGHT
      gsap.from('.influencer-native-reel-card', {
        autoAlpha: 0,
        x: -xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.influencer-slider-wrapper', start: 'top 86%', once: true },
      })
      gsap.from('.influencer-reel-card:not(.influencer-native-reel-card)', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.05,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.influencer-slider-wrapper', start: 'top 86%', once: true },
      })

      // 9. Services: Filter Bar from LEFT, Marquee/Grid from RIGHT
      gsap.from('.services-filter-bar', {
        autoAlpha: 0,
        x: -xOffset,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services-filter-bar', start: 'top 88%', once: true },
      })
      gsap.from('.services-marquee-wrapper, .services-grid', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services-controls-bar', start: 'top 86%', once: true },
      })

      // 10. Contact Us: Info Column from LEFT, Contact Form Card from RIGHT
      gsap.from('.contact-info-col', {
        autoAlpha: 0,
        x: -xOffset,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-studio-layout', start: 'top 85%', once: true },
      })
      gsap.from('.contact-form-card', {
        autoAlpha: 0,
        x: xOffset,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-studio-layout', start: 'top 85%', once: true },
      })

      // 11. Luxury Section Dividers: Expand outward from center
      gsap.from('.luxury-section-divider', {
        scaleX: 0,
        transformOrigin: 'center center',
        duration: 0.95,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.luxury-section-divider', start: 'top 90%', once: true },
      })
    }, rootRef)

    return () => {
      context.revert()
      if (update) gsap.ticker.remove(update)
      if (lenis) lenis.destroy()
    }
  }, [])

  return (
    <div ref={rootRef}>
      <Navigation />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<ProjectDetail />} path="/work/:slug" />
        <Route element={<ProjectDetail />} path="*" />
      </Routes>
      <Footer />
    </div>
  )
}
