import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

type MobileNavigationProps = {
  isOpen: boolean
  links: { label: string; to: string }[]
  onNavigate: () => void
}

export default function MobileNavigation({ isOpen, links, onNavigate }: MobileNavigationProps) {
  const handleClick = (to: string) => {
    onNavigate()
    if (to.startsWith('#') || to.startsWith('/#')) {
      const targetId = to.replace('/#', '#')
      const el = document.querySelector(targetId)
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        })
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          animate={{ opacity: 1, y: 0 }}
          aria-label="Mobile navigation"
          className="mobile-nav"
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {links.map((link, index) => (
            <a
              href={link.to}
              key={link.to}
              onClick={(e) => {
                e.preventDefault()
                handleClick(link.to)
              }}
            >
              <span>0{index + 1}</span>
              {link.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
