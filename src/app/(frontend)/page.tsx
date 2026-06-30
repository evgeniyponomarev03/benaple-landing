'use client'

import Link from 'next/link'
import {
  CardOneIcon,
  CardTwoIcon,
  CardThreeIcon,
  CardFourIcon,
  MarqueeBagIcon,
  MarqueeHeartIcon,
  MedicalIcon,
  UmbrellaPeopleIcon,
  ReducedIcon,
  ArrowDownIcon,
  GoogleLogo,
  FiveStarsIcon,
  InstagramIconFooter,
  LinkedinIconFooter,
  FacebookIconFooter,
  WhatsappIconFooter,
} from '@/components/icons/Icons'
import './page.css'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {
  CardBottomEllipse,
  HeroBottomEllipse,
  HeroTopEllipse,
  TestimonialsGoogleEllipse,
} from '@/components/Ellipses'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Mousewheel } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import InsuranceContactForm from '@/components/InsuranceContactForm'

gsap.registerPlugin(ScrollTrigger)

const heroSlidesLeft = [
  {
    id: 1,
    type: 'image',
    image: '/hero-media/dubai-city.png',
    alt: 'Earned Trust',
  },
  {
    id: 2,
    type: 'card',
    icon: <MarqueeBagIcon />,
    text: 'Earned Trust',
    title: '4.8/5',
    description: 'Google Star Rating',
  },
  {
    id: 3,
    type: 'image',
    image: '/hero-media/building.png',
    alt: 'Growing Teams',
  },
  {
    id: 4,
    type: 'card',
    icon: <MarqueeHeartIcon />,
    text: 'Growing Teams',
    title: '200K+',
    description: 'Employees insured',
  },
  {
    id: 5,
    type: 'image',
    image: '/hero-media/meeting.png',
    alt: 'Trusted Regionally',
  },
  {
    id: 6,
    type: 'card',
    icon: <MarqueeBagIcon />,
    text: 'Trusted Regionally',
    title: '2,000+',
    description: 'Companies supported',
  },
  {
    id: 7,
    type: 'image',
    image: '/hero-media/building.png',
    alt: 'Market Leader',
  },
  {
    id: 8,
    type: 'card',
    icon: <MarqueeHeartIcon />,
    text: 'Market Leader',
    title: '98%',
    description: 'Client retention rate',
  },
]
const heroSlidesRight = [
  {
    id: 1,
    type: 'image',
    image: '/hero-media/meeting.png',
    alt: 'Local Expertise',
  },
  {
    id: 2,
    type: 'card',
    icon: <MarqueeBagIcon />,
    text: 'Local Expertise',
    title: '15+',
    description: 'Years in UAE',
  },
  {
    id: 3,
    type: 'image',
    image: '/hero-media/building.png',
    alt: 'Wide Network',
  },
  {
    id: 4,
    type: 'card',
    icon: <MarqueeHeartIcon />,
    text: 'Wide Network',
    title: '50+',
    description: 'Insurance partners',
  },
  {
    id: 5,
    type: 'image',
    image: '/hero-media/dubai-city.png',
    alt: 'Dedicated Team',
  },
  {
    id: 6,
    type: 'card',
    icon: <MarqueeBagIcon />,
    text: 'Dedicated Team',
    title: '24/7',
    description: 'Claims support',
  },
  {
    id: 7,
    type: 'image',
    image: '/hero-media/meeting.png',
    alt: 'Real Impact',
  },
  {
    id: 8,
    type: 'card',
    icon: <MarqueeHeartIcon />,
    text: 'Real Impact',
    title: 'AED 500M+',
    description: 'Annual premiums managed',
  },
]


const brandsLeft = [
  { id: 1, image: '/brands/allianz.png', alt: 'Allianz insurance logo' },
  { id: 2, image: '/brands/bupa.png', alt: 'Bupa global insurance logo' },
  { id: 3, image: '/brands/cigna.png', alt: 'Cigna healthcare logo' },
  { id: 4, image: '/brands/dni.png', alt: 'DNI insurance logo' },
  { id: 5, image: '/brands/gig.png', alt: 'GIG gulf insurance logo' },
  { id: 6, image: '/brands/hansemerkur.png', alt: 'HanseMerkur logo' },
  { id: 7, image: '/brands/liva.png', alt: 'Liva insurance logo' },
]
const brandsRight = [
  { id: 1, image: '/brands/maxhealth.png', alt: 'Max Health logo' },
  { id: 2, image: '/brands/metlife.png', alt: 'MetLife insurance logo' },
  { id: 3, image: '/brands/neuron.png', alt: 'Neuron UAE logo' },
  { id: 4, image: '/brands/nextcare.png', alt: 'Nextcare logo' },
  { id: 5, image: '/brands/nlgi.png', alt: 'National Life & General Insurance logo' },
  { id: 6, image: '/brands/russel.png', alt: 'Russel logo' },
  { id: 7, image: '/brands/zurich.png', alt: 'Zurich insurance logo' },
]

const slidesLeft = [
  ...heroSlidesLeft,
  ...heroSlidesLeft,
  ...heroSlidesLeft,
  ...heroSlidesLeft,
]
const slidesRight = [
  ...heroSlidesRight,
  ...heroSlidesRight,
  ...heroSlidesRight,
  ...heroSlidesRight,
]

const brandsSlidesLeft = [
  ...brandsLeft,
  ...brandsLeft,
  ...brandsLeft,
  ...brandsLeft,
  ...brandsLeft,
]
const brandsSlidesRight = [
  ...brandsRight,
  ...brandsRight,
  ...brandsRight,
  ...brandsRight,
  ...brandsRight,
]

const cards = [
  {
    id: 1,
    icon: <CardOneIcon />,
    heading: 'Licensed & Compliant',
    description: (
      <>
        Beneple, licensed as{' '}
        <span>
          FAEU Insurance Brokers LLC (License #92)
        </span>
        , operates with full UAE compliance and the highest
        standards of transparency and data protection.
      </>
    ),
  },
  {
    id: 2,
    icon: <CardTwoIcon />,
    heading: 'Market-wide Access',
    description: (
      <>
        We partner with leading local and global insurers —
        including <span>Allianz</span>, <span>Bupa</span>,
        and <span>Cigna</span> — to offer flexible,
        competitive coverage tailored to your needs and
        budget.
      </>
    ),
  },
  {
    id: 3,
    icon: <CardThreeIcon />,
    heading: 'Specialist Advisors',
    description: (
      <>
        You&apos;ll never get a generic policy. Our expert
        advisors combine <span>sector knowledge</span> and{' '}
        <span>local insight</span> to tailor insurance
        solutions that fit your industry, goals, and budget.
      </>
    ),
  },
  {
    id: 4,
    icon: <CardFourIcon />,
    heading: 'Wellbeing',
    description: (
      <>
        We deliver custom <span>regional solutions</span>{' '}
        with a genuine <span>wellness focus</span> — not
        token programmes, but measurable results that boost
        wellbeing and business performance.
      </>
    ),
  },
]

const servicesCards = [
  {
    id: 1,
    title: (
      <>
        Employee & <br />
        Workplace Benefits
      </>
    ),
  },
  {
    id: 2,
    title: (
      <>
        Corporate Liability &<br /> Risk Management
      </>
    ),
  },
  { id: 3, title: <>Specialized/High-Risk Insurance</> },
  {
    id: 4,
    title: (
      <>
        Property &<br /> Asset Protection
      </>
    ),
  },
]

type Feat = {
  id: number
  title: any
  description: string
  icon: React.ReactNode
  link: string
}

type ServiceFeat = {
  id: number
  icon: React.ReactNode
  description: string
  feats: Feat[]
}

const servicesFeat: ServiceFeat[] = [
  {
    id: 1,
    icon: <UmbrellaPeopleIcon />,
    description:
      "High-impact insurance solutions designed to protect your team's future while helping you attract and retain the best talent in the UAE market.",
    feats: [
      {
        id: 1,
        title: 'Medical Insurance',
        description:
          '– comprehensive health coverage to protect your team\'s physical wellbeing.',
        icon: <MedicalIcon />,
        link: '/medical-insurance',
      },
      {
        id: 2,
        title: "Workmen's Compensation",
        description:
          '– cover workplace injuries and stay UAE labour law compliant.',
        icon: <MedicalIcon />,
        link: '/workmens-compensation',
      },
      {
        id: 3,
        title: 'Gratuity Management',
        description:
          '– fund end-of-service benefits and avoid surprises.',
        icon: <MedicalIcon />,
        link: '/gratuity-management',
      },
      {
        id: 4,
        title: (
          <>
            Group <br /> Life
          </>
        ),
        description:
          "– secure your employees' families in unexpected events.",
        icon: <MedicalIcon />,
        link: '/group-life',
      },
    ],
  },
  {
    id: 2,
    icon: <MedicalIcon />,
    description:
      "Comprehensive protection against professional and legal risks, ensuring your business and its directors stay shielded from the financial impact of unforeseen liabilities.",
    feats: [
      {
        id: 1,
        title: 'Professional Indemnity',
        description:
          '– protect against claims of negligence or inadequate work.',
        icon: <MedicalIcon />,
        link: '/professional-indemnity',
      },
      {
        id: 2,
        title: 'Directors & Officers',
        description:
          '– shield leadership from personal liability claims.',
        icon: <MedicalIcon />,
        link: '/directors-officers',
      },
      {
        id: 3,
        title: 'Third Party Liability',
        description:
          '– cover claims from third parties for injury or damage.',
        icon: <MedicalIcon />,
        link: '/third-party-liability',
      },
      {
        id: 4,
        title: 'Cyber Security',
        description:
          '– protect your business from cyber threats and data breaches.',
        icon: <MedicalIcon />,
        link: '/cyber-security',
      },
    ],
  },
  {
    id: 3,
    icon: <UmbrellaPeopleIcon />,
    description:
      "Bespoke coverage for complex, high-stakes environments providing peace of mind where standard policies fall short, backed by expert risk assessment.",
    feats: [
      {
        id: 1,
        title: 'Kidnap & Ransom',
        description:
          '– protect executives and employees in high-risk environments.',
        icon: <MedicalIcon />,
        link: '/kidnap-ransom',
      },
      {
        id: 2,
        title: 'Defense Base Act Insurance',
        description:
          '– mandatory coverage for overseas government contractors.',
        icon: <MedicalIcon />,
        link: '/defense-base-act',
      },
      {
        id: 3,
        title: 'Event Insurance',
        description:
          '– cover cancellations, liability, and property damage for events.',
        icon: <MedicalIcon />,
        link: '/event-insurance',
      },
    ],
  },
  {
    id: 4,
    icon: <MedicalIcon />,
    description:
      "Secure your physical investments and maintain business continuity with robust policies covering commercial assets, equipment, and protection against revenue-halting interruptions.",
    feats: [
      {
        id: 1,
        title: 'Commercial Property',
        description:
          '– protect buildings, equipment, and inventory from damage.',
        icon: <MedicalIcon />,
        link: '/commercial-property',
      },
      {
        id: 2,
        title: 'Motor Fleet',
        description:
          '– comprehensive fleet insurance for company vehicles with competitive rates.',
        icon: <MedicalIcon />,
        link: '/motor-fleet',
      },
      {
        id: 3,
        title: 'Luxury Insurance Coverage',
        description:
          '– bespoke insurance for high-value assets including fine art, jewellery, yachts, and luxury property.',
        icon: <MedicalIcon />,
        link: '/luxury-insurance',
      },
    ],
  },
]

const steps = [
  {
    id: 1,
    title: 'Tell Us About Your Company',
    description:
      'Lorem ipsum dolor sit amet consectetur. Integer tristique nec sit varius bibendum. Vehicula habitant lobortis feugiat sit nunc et eget cras proin. Est ultricies in adipiscing in iaculis. Sed adipiscing.',
    image: '/steps-media/office.png',
  },
  {
    id: 2,
    title: 'Compare Top Market Quotes',
    description:
      'We leverage our network of 50+ providers to bring you the most competitive quotes, allowing you to compare benefits and premiums side-by-side with full transparency.',
    image: '/steps-media/office.png',
  },
  {
    id: 3,
    title: 'Finalise Your Custom Plan',
    description:
      'Once you\'ve selected the best fit, we handle the heavy lifting. Our team manages the setup, paperwork, and compliance so you can stay focused on your business.',
    image: '/steps-media/office.png',
  },
  {
    id: 4,
    title: 'Ongoing Support & Care',
    description:
      'Our relationship doesn\'t end at sign-up. We provide 24/7 claims support and annual reviews to ensure your coverage grows and stays competitive as your company evolves.',
    image: '/steps-media/office.png',
  },
]

const caseStudies = [
  {
    id: 1,
    industry: 'Healthcare',
    logo: '/brands/cigna.png',
    title: (
      <>
        Beneple are <span>by far the best</span> I&apos;ve come across. Professional, attentive, knowledgeable and friendly.
      </>
    ),
    description:
      'By analysing three years of claim data, Beneple restructured the medical plan to improve wellness benefits while significantly lowering the annual premium for the regional workforce.',
    personName: 'Ross Addison',
    personRole: 'Managing Director at Reverse Psychology',
    imageText: (
      <>
        <span>Reduced</span> insurance costs by{' '}
        <span>18%</span>
      </>
    ),
    imageIcon: <ReducedIcon />,
    imageDescriptionOne: 'Annual Savings',
    imageDescriptionTwo: 'Restructured Plan',
    imagePrice: '$183,382',
    imagePercentage: '18%',
    cardImage: '/case-studies-media/Chart.svg',
  },
  {
    id: 2,
    industry: 'Hospitality',
    logo: '/brands/bupa.png',
    title: (
      <>
        I haven&apos;t had a <span>positive experience</span> until Beneple, honestly, the team is so respectful and so prompt.
      </>
    ),
    description:
      'Beneple consolidated multiple fragmented international medical policies into a single framework, providing the workforce with consistent global care and simplified claims management.',
    personName: 'HR Specialist',
    personRole: 'Hospitality Partner',
    imageText: (
      <>
        <span>Expanded</span> medical coverage by{' '}
        <span>20%</span>
      </>
    ),
    imageIcon: <ReducedIcon />,
    imageDescriptionOne: 'Coverage Increase',
    imageDescriptionTwo: 'Consolidated Policy',
    imagePrice: '20%',
    imagePercentage: '20%',
    cardImage: '/case-studies-media/Chart.svg',
  },
  {
    id: 3,
    industry: 'Corporate Services',
    logo: '/brands/allianz.png',
    title: (
      <>
        Beneple are the <span>most professional</span> insurance brokerage firm I have ever dealt with in the UAE.
      </>
    ),
    description:
      'To support rapid workforce expansion, Beneple implemented a scalable group medical solution ensuring every new hire was fully protected from day one without increasing per-employee costs.',
    personName: 'Operations Director',
    personRole: 'Corporate Services Partner',
    imageText: (
      <>
        <span>42% reduction</span> in turnaround times
      </>
    ),
    imageIcon: <ReducedIcon />,
    imageDescriptionOne: 'Turnaround Reduction',
    imageDescriptionTwo: 'Scalable Solution',
    imagePrice: '42%',
    imagePercentage: '42%',
    cardImage: '/case-studies-media/Chart.svg',
  },
]

const testimonials = [
  {
    id: 1,
    image: '/testimonials-media/person1.jpg',
    name: 'Basma Darwich',
    daysAgo: '3 days ago',
    description:
      "I've worked in HR for over 10 years and never had a positive experience with insurers until Beneple. The team is respectful, prompt, knowledgeable, and refreshingly honest — even in complex situations.",
    companyLogo: '/testimonials-media/google.png',
  },
  {
    id: 2,
    image: '/testimonials-media/person2.jpg',
    name: 'Ross Addison',
    daysAgo: '5 days ago',
    description:
      "The Beneple team are the best I've worked with — professional, attentive, and genuinely focused on our needs, not upselling. They are outstanding: fast, communicative, and spot-on with solutions.",
    companyLogo: '/testimonials-media/google.png',
  },
  {
    id: 3,
    image: '/testimonials-media/person3.jpg',
    name: 'Abdul Gafoor',
    daysAgo: '1 week ago',
    description:
      "Beneple is exceptional — supportive, responsive, and always available. Their professionalism and dedication make everything seamless, and it's a pleasure working with such a reliable, proactive team.",
    companyLogo: '/testimonials-media/google.png',
  },
]

const socials = [
  {
    id: 1,
    name: 'instagram',
    link: 'https://www.instagram.com/beneplehr/',
    icon: <InstagramIconFooter />,
  },
  {
    id: 2,
    name: 'linkedin',
    link: 'https://ae.linkedin.com/company/beneple',
    icon: <LinkedinIconFooter />,
  },
  {
    id: 3,
    name: 'facebook',
    link: 'https://www.facebook.com/beneple/',
    icon: <FacebookIconFooter />,
  },
  {
    id: 4,
    name: 'whatsapp',
    link: 'https://wa.me/97145674500',
    icon: <WhatsappIconFooter />,
  },
]

const footerNavItems = [
  {
    id: 1,
    title: 'Employee & Workplace Benefits',
    items: [
      {
        id: 1,
        title: 'Medical Insurance',
        link: '/medical-insurance',
      },
      {
        id: 2,
        title: 'Workmen’s Compensation',
        link: '/workmens-compensation',
      },
      {
        id: 3,
        title: 'Gratuity Management',
        link: '/gratuity-management',
      },
    ],
  },
  {
    id: 2,
    title: 'Corporate Liability & Risk Management',
    items: [
      {
        id: 1,
        title: 'Professional Indemnity',
        link: '/professional-indemnity',
      },
      {
        id: 2,
        title: 'Directors & Officers',
        link: '/directors-officers',
      },
      {
        id: 3,
        title: 'Third Party Liability',
        link: '/third-party-liability',
      },
      {
        id: 4,
        title: 'Cyber Security',
        link: '/cyber-security',
      },
    ],
  },
  {
    id: 3,
    title: 'Specialized/High-Risk Insurance',
    items: [
      {
        id: 1,
        title: 'Kidnap & Ransom',
        link: '/kidnap-ransom',
      },
      {
        id: 2,
        title: 'Defense Base Act Insurance',
        link: '/defense-base-act',
      },
      {
        id: 3,
        title: 'Event Insurance',
        link: '/event-insurance',
      },
    ],
  },
  {
    id: 4,
    title: 'Property & Asset Protection',
    items: [
      {
        id: 1,
        title: 'Commercial Property',
        link: '/commercial-property',
      },
      {
        id: 2,
        title: 'Motor Fleet',
        link: '/motor-fleet',
      },
      {
        id: 3,
        title: 'Luxury Insurance Coverage',
        link: '/luxury-insurance',
      },
    ],
  },
]

const legals = [
  {
    id: 1,
    title: 'Privacy Policy',
    link: '/privacy-policy',
  },
  {
    id: 2,
    title: 'Terms of use',
    link: '/terms-of-use',
  },
  {
    id: 3,
    title: 'Redress and complaints',
    link: '/redress-and-complaints',
  },
  {
    id: 4,
    title: 'License Number 92',
    link: '/regulatory-compliance',
  },
]

export default function Homepage() {
  let cardCountLeft = 0
  let cardCountRight = 0

  const cardsRef = useRef<HTMLHeadingElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const stepsSwiperRef = useRef<SwiperType | null>(null)
  const testimonialsSwiperRef = useRef<SwiperType | null>(
    null,
  )
  const caseStudiesSwiperRef = useRef<SwiperType | null>(
    null,
  )
  const [activeCard, setActiveCard] = useState<
    number | null
  >(servicesCards[0]?.id || null)
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [expanded, setExpanded] = useState<boolean[]>(
    caseStudies.map(() => false),
  )

  const handleScrollDown = () => {
    const nextSection = document.querySelector('.caseStudy')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [activeCard])

  useEffect(() => {
    const cards =
      cardsRef.current?.querySelectorAll('.card')
    if (!cards) return

    const totalScroll = cards.length * 300

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      // Pin the section
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top top-=100',
        end: `+=${totalScroll}`,
        pin: true,
        pinSpacing: true,
      })

      // Cards come up one by one
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1,
        },
        opacity: 0,
        y: '100vh',
        stagger: 0.5,
        ease: 'power2.out',
      })

      // Heading fades out as cards appear
      gsap.to(headingRef.current, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1,
        },
        opacity: 0,
        y: 0,
        ease: 'none',
      })
    })

    mm.add('(max-width: 1023px)', () => {
      // Reset any transforms on mobile
      gsap.set(cards, { opacity: 1, y: 0 })
      gsap.set(headingRef.current, { opacity: 1, y: 0 })
    })

    return () => mm.revert()
  }, [])

  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let currentIndex = 0
    let isAnimating = false

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${steps.length * 500}`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          if (isAnimating) return

          const targetIndex = Math.round(
            self.progress * (steps.length - 1),
          )

          if (targetIndex !== currentIndex) {
            isAnimating = true
            currentIndex = targetIndex
            stepsSwiperRef.current?.slideTo(targetIndex)
            setActiveIndex(targetIndex)
            setProgress(
              (targetIndex / (steps.length - 1)) * 100,
            )
            setTimeout(() => {
              isAnimating = false
            }, 600)
          }
        },
      })

      setTimeout(() => {
        st.refresh()
        ScrollTrigger.refresh()
      }, 100)

      return () => st.kill()
    })

    return () => mm.revert()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.from(section, {
      opacity: 0,
      y: 100,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, [])

  const trimText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trimEnd() + '...'
  }

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const toggleExpanded = (index: number) => {
    setExpanded((prev) =>
      prev.map((val, i) => (i === index ? !val : val)),
    )
    setTimeout(() => {
      caseStudiesSwiperRef.current?.updateAutoHeight()
    }, 100)
  }

  function handleCountrySelect(countryCode: string) {
    console.log('Selected country code:', countryCode)
  }

  const handleSubjectSelect = (subject: {
    id: string
    name: string
  }) => {
    console.log('Selected subject:', subject)
  }

  return (
    <>
      <main className="mainHome">
        <section className="hero container">
          <div className="heroInner">
            <HeroTopEllipse />
            <div className="contentLeft">
              <p className="subHeading">
                UAE Insurance Specialists
              </p>
              <h1>
                UAE&apos;s Most Trusted <br /><span>Insurance Broker.</span>
              </h1>
              <p className="heroDesc">
                Protect your people. Empower their
                wellbeing. Strengthen your business.
              </p>
              <a href="" className="btn">
                Request a quote today
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="white"
                    strokeWidth="1.71429"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="white"
                    strokeWidth="1.71429"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="contentRight">
              <div style={{ overflow: 'hidden' }}>
                <div className="marquee-up">
                  {slidesLeft.map((slide, i) => {
                    if (slide.type === 'card')
                      cardCountLeft++
                    return (
                      <div
                        key={i}
                        className="marquee-slide"
                        style={{
                          height:
                            i % 2 === 0 ? '320px' : '183px',
                        }}
                      >
                        {slide.type === 'image' ? (
                          <img
                            src={slide.image}
                            alt={slide.alt}
                          />
                        ) : (
                          <div
                            className={`marquee-card ${cardCountLeft % 2 === 0 ? 'marquee-card--alt' : ''}`}
                          >
                            <div className="cardHeader">
                              <div className="marquee-card-icon">
                                {slide.icon}
                              </div>
                              <span>{slide.text}</span>
                            </div>

                            <div className="cardContent">
                              <h3>{slide.title}</h3>
                              <p>{slide.description}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div className="marquee-down">
                  {slidesRight.map((slide, i) => {
                    if (slide.type === 'card')
                      cardCountRight++
                    return (
                      <div
                        key={i}
                        className="marquee-slide"
                        style={{
                          height:
                            i % 2 === 0 ? '320px' : '183px',
                        }}
                      >
                        {slide.type === 'image' ? (
                          <img
                            src={slide.image}
                            alt={slide.alt}
                          />
                        ) : (
                          <div
                            className={`marquee-card ${cardCountRight % 2 === 0 ? 'marquee-card--alt' : ''}`}
                          >
                            <div className="cardHeader">
                              <div className="marquee-card-icon">
                                {slide.icon}
                              </div>
                              <span>{slide.text}</span>
                            </div>

                            <div className="cardContent">
                              <h3>{slide.title}</h3>
                              <p>{slide.description}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <a href="" className="btn heroBtnMobile">
              Request a quote today
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="white"
                  strokeWidth="1.71429"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5L19 12L12 19"
                  stroke="white"
                  strokeWidth="1.71429"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <HeroBottomEllipse />
          </div>
        </section>
        <section className="partners">
          <div className="headings">
            <p className="subHeadingDefault">
              Our trusted partners
            </p>
            <h2>
              Working with{' '}
              <span>
                30+ <br />
                leading insurance
              </span>{' '}
              providers
            </h2>
          </div>

          <div className="brands">
            <div className="w-full">
              <div className="marquee-left">
                {brandsSlidesLeft.map((slide, i) => {
                  return (
                    <div key={i} className="marquee-slide">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <div className="marquee-right">
                {brandsSlidesRight.map((slide, i) => {
                  return (
                    <div key={i} className="marquee-slide">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
        <section className="benefits" ref={cardsRef}>
          <div className="benefitsTop container">
            <div className="benefitsTopLeft">
              <img src="/hero-media/meeting.png" alt="Why choose beneple?" className="benefitsTopImg" />
            </div>
            <div className="benefitsTopRight">
              <p className="subHeadingDefault">Why choose beneple?</p>
              <h2 ref={headingRef} className="headingDefault">
                Local Expertise. <br />
                <span>International Standards.</span> <br />
                Real Wellbeing.
              </h2>
              <p className="introText">
                Beneple was founded to make insurance and employee benefits smarter and more human. Based in Dubai and regulated in the UAE, we partner with top insurers — including Allianz, Bupa, and Cigna — to deliver tailored corporate medical insurance and employee benefits that protect people and support business growth.
              </p>
              <p className="introText">
                We know protection isn’t one-size-fits-all. That’s why we combine global expertise with UAE market insight to design bespoke solutions for your risks — whether you’re a startup or a large enterprise.
              </p>
              <div className="bullets">
                <h4>With Beneple, you get:</h4>
                <ul>
                  <li><strong>Transparent advice</strong> – clear comparisons across insurers.</li>
                  <li><strong>Specialist knowledge</strong> – from SMEs to multinationals.</li>
                  <li><strong>End-to-end support</strong> – from onboarding to claims management.</li>
                </ul>
              </div>
              <p className="wellbeingText">
                Beyond insurance, we help build healthier businesses with <strong>complimentary wellbeing programmes</strong> — from health screenings to mental health support — improving productivity and reducing costs.
              </p>
              <Link href="/why-choose-beneple" className="learnMoreBtn">
                Learn More
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="benefitsBottom container">
            <div className="benefitsBottomLeft">
              <img src="/hero-media/building.png" alt="Feature image" className="benefitsBottomImg" />
            </div>
            <div className="benefitsBottomRight">
              <div className="cards">
                {cards.map((card, i) => {
                  return (
                    <div className="card" key={card.id}>
                      <div className="icon">{card.icon}</div>
                      <div className="cardContent">
                        <h3>{card.heading}</h3>
                        <p>{card.description}</p>
                      </div>
                      <CardBottomEllipse />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="services container">
          <div className="headings">
            <p className="subHeadingDefault">Services</p>
            <h2 className="headingDefault">
              Our insurance <br />
              <span>solutions</span>
            </h2>
          </div>
          <div className="servicesContainer">
            <div className="headingCards">
              {servicesCards.map((card, i) => (
                <div
                  className={`card ${activeCard === card.id ? 'active' : ''}`}
                  key={card.id}
                  onClick={() => setActiveCard(card.id)}
                >
                  <h3>{card.title}</h3>
                </div>
              ))}
            </div>
            <div className="servicesFeat">
              {servicesFeat.map(
                (feat, i) =>
                  activeCard === servicesCards[i]?.id && (
                    <div className="feat" key={feat.id}>
                      <div className="leftContent">
                        <div className="heading">
                          <figure>{feat.icon}</figure>
                          <h3>
                            {activeCard ===
                            servicesCards[i]?.id
                              ? servicesCards[i]?.title
                              : ''}
                          </h3>
                        </div>
                        <p>{feat.description}</p>
                      </div>
                      <div className="rightContent">
                        {feat.feats.map((item) => (
                          <div
                            className="featCards"
                            key={item.id}
                          >
                            <div
                              className={`cardHeading ${!item.icon ? 'cardHeading--full' : ''}`}
                            >
                              <h4>{item.title}</h4>
                              <figure
                                className={`${item.icon ? '' : 'hidden'}`}
                              >
                                {item.icon}
                              </figure>
                            </div>

                            <p>{item.description}</p>
                            <a href={item.link}>
                              <span>
                                <svg
                                  width="10"
                                  height="7"
                                  viewBox="0 0 10 7"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.72833 0.405276L9.53857 3.21552M9.53857 3.21552L6.72833 6.04614M9.53857 3.21552L0.405273 3.21552"
                                    stroke="#45CBEF"
                                    strokeWidth="0.810648"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              Learn More
                            </a>
                          </div>
                        ))}
                      </div>
                      <h3 className="featText">beneple</h3>
                    </div>
                  ),
              )}
            </div>
          </div>
        </section>
        <section
          className="howItWorks container"
          ref={sectionRef}
        >
          <div className="headings">
            <p className="subHeadingDefault">
              How it works
            </p>
            <h2 className="headingDefault">
              4 steps <span>to start</span>
            </h2>
          </div>
          <div className="stepsSlider">
            <span className="stepNumber">
              0{activeIndex + 1}
            </span>

            <Swiper
              mousewheel={{ forceToAxis: true }}
              direction="horizontal"
              onSwiper={(swiper) =>
                (stepsSwiperRef.current = swiper)
              }
              modules={[Mousewheel]}
              slidesPerView={1}
              spaceBetween={16}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex)
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1.1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 1.2,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
              }}
            >
              {steps.map((step) => (
                <SwiperSlide key={step.id}>
                  <div className="step">
                    <div className="stepContent">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <button
                        type="button"
                        onClick={handleScrollDown}
                        className="scrollDownBtn"
                      >
                        <svg
                          width="17"
                          height="29"
                          viewBox="0 0 17 29"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_852_13103)">
                            <path
                              d="M5.33268 16.1898L8.1633 19L10.9736 16.1898M8.1633 19V9.8667"
                              stroke="#45CBEF"
                              strokeWidth="0.810648"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <path
                            d="M16.1667 8.33301V20.667C16.1665 24.993 12.6596 28.4998 8.33366 28.5C4.00754 28.5 0.499851 24.9931 0.499676 20.667V8.33301C0.49985 4.00693 4.00754 0.5 8.33366 0.5C12.5247 0.500171 15.9473 3.79166 16.1569 7.93066L16.1667 8.33301Z"
                            stroke="#45CBEF"
                          />
                          <defs>
                            <clipPath id="clip0_852_13103">
                              <path
                                d="M8.33333 0C12.9357 0 16.6667 3.73096 16.6667 8.33333V20.6667C16.6667 25.269 12.9357 29 8.33333 29C3.73096 29 0 25.269 0 20.6667V8.33333C0 3.73096 3.73096 0 8.33333 0Z"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                    <figure>
                      <img
                        src={step.image}
                        alt={step.title}
                      />
                    </figure>
                  </div>
                </SwiperSlide>
              ))}
              <div className="stepsControls">
                <div className="swiper-pagination">
                  <div
                    className="stepsProgressFill"
                    style={{
                      width: `${((activeIndex + 1) / steps.length) * 100}%`,
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
                <div className="swiper-navigation">
                  <button
                    onClick={() =>
                      stepsSwiperRef.current?.slidePrev()
                    }
                    disabled={activeIndex === 0}
                  >
                    <svg
                      width="12"
                      height="22"
                      viewBox="0 0 12 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 21L1 11L11 1"
                        stroke="#172B5F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      stepsSwiperRef.current?.slideNext()
                    }
                    disabled={
                      activeIndex === steps.length - 1
                    }
                  >
                    <svg
                      width="12"
                      height="22"
                      viewBox="0 0 12 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 21L11 11L1 1"
                        stroke="#172B5F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </Swiper>
          </div>
        </section>
        <section className="wellbeingSection container">
          <div className="wellbeingHeader">
            <p className="subHeadingDefault">Wellbeing benefits</p>
            <h2 className="headingDefault">
              Complimentary Wellbeing <br />
              <span>with every Corporate Medical Insurance Plan</span>
            </h2>
          </div>
          <div className="wellbeingGrid">
            <div className="wellbeingCol">
              <h3>More than just insurance</h3>
              <p>
                Most brokers stop at the policy. At Beneple, every corporate medical insurance plan comes with a complimentary wellbeing programme designed to improve employee health, boost morale, and strengthen your ability to attract and retain top talent in the UAE market.
              </p>
            </div>
            <div className="wellbeingCol">
              <h3>Interested in our wellbeing programmes even if you&apos;re not yet a client?</h3>
              <p>
                We&apos;d love to help. Get in touch to find out more.
              </p>
            </div>
            <div className="wellbeingCol">
              <h3>The business case</h3>
              <p>
                Replacing an employee can cost up to 2.5x their annual salary. Our wellbeing programmes improve engagement, reduce absenteeism, and build a workplace culture that people don&apos;t want to leave.
              </p>
            </div>
          </div>
          <div className="wellbeingCTA">
            <Link href="/contact" className="btn btnPrimary">
              Get Started Today
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="white" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
        <section className="caseStudy">
          <div className="headings">
            <p className="subHeadingDefault">Case study</p>
            <h2 className="headingDefault">
              Trusted by{' '}
              <span>
                Growing <br />
                companies
              </span>
            </h2>
          </div>
          <div className="slider">
            <Swiper
              centeredSlides={true}
              spaceBetween={80}
              modules={[Pagination]}
              onSwiper={(swiper) =>
                (caseStudiesSwiperRef.current = swiper)
              }
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex)
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1.1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 1.5,
                },
                1024: {
                  spaceBetween: 80,
                },
                1180: {
                  slidesPerView: 1.5,
                },
                1900: {
                  slidesPerView: 1.8,
                },
                2566: {
                  slidesPerView: 2.2,
                },
              }}
            >
              {caseStudies.map((study, i) => (
                <SwiperSlide key={study.id}>
                  <div className="caseStudySlide">
                    <div className="caseStudyLeft">
                      <div className="caseStudyMeta">
                        <span className="caseStudyIndustry">
                          {study.industry}
                        </span>
                        <img
                          src={study.logo}
                          alt={study.personName}
                          className="caseStudyLogo"
                        />
                      </div>
                      <h3>{study.title}</h3>
                      <div
                        className={`caseStudyContent ${isMobile && expanded[i] ? 'expanded' : ''}`}
                      >
                        <p className="caseStudyDescription">
                          {isMobile && !expanded[i]
                            ? trimText(
                                study.description,
                                110,
                              )
                            : study.description}
                        </p>
                        {(!isMobile || expanded[i]) && (
                          <div className="caseStudyPerson">
                            <span className="personRole">
                              {study.personRole}
                            </span>
                            <span className="personName">
                              {study.personName}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => toggleExpanded(i)}
                        >
                          {expanded[i]
                            ? 'Read less'
                            : 'Read more'}

                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${expanded[i] ? 'active' : ''}`}
                          >
                            <g clipPath="url(#clip0_752_9177)">
                              <path
                                d="M1 3.5L6 8.5L11 3.5"
                                stroke="#172B5F"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_752_9177">
                                <rect
                                  width="12"
                                  height="12"
                                  fill="white"
                                  transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 12 12)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="caseStudyRight">
                      <div className="caseStudyCard">
                        <div className="cardOverlay">
                          <figure>{study.imageIcon}</figure>
                          <h4>{study.imageText}</h4>
                        </div>
                        <div className="cardStats">
                          <div className="stat">
                            <span className="statDesc">
                              {study.imageDescriptionOne}
                            </span>
                            <span className="statDesc">
                              {study.imageDescriptionTwo}
                            </span>
                          </div>
                          <div className="statTwo">
                            <span className="statPrice">
                              {study.imagePrice}
                            </span>
                            <span className="statPercentage">
                              {study.id === 2 ? '+' : <ArrowDownIcon />}{' '}
                              {study.imagePercentage}
                            </span>
                          </div>
                        </div>
                        <div className="cardImage">
                          <img
                            src={study.cardImage}
                            alt={`${study.industry} savings chart`}
                          />
                        </div>
                        <CardBottomEllipse />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination">
                {caseStudies.map((study, i) => (
                  <img
                    key={study.id}
                    src={study.logo}
                    className={
                      activeIndex === i ? 'active' : ''
                    }
                    onClick={() =>
                      caseStudiesSwiperRef.current?.slideTo(
                        i,
                      )
                    }
                    alt={`${study.industry} logo`}
                  />
                ))}
              </div>
            </Swiper>
          </div>
        </section>

        <section className="testimonials">
          <div className="headings">
            <p className="subHeadingDefault">
              Testimonials
            </p>
            <h2 className="headingDefault">
              Verified <span>Google reviews</span>
              <br /> from our clients
            </h2>
          </div>
          <div className="testimonialsContent container">
            <div className="ratingBanner">
              <div className="googleRating">
                <div className="googleLogo">
                  <GoogleLogo />
                  <span>Rating</span>
                </div>

                <div className="stars">
                  <span className="reviewGrade">5.0</span>
                  <FiveStarsIcon />
                  <span className="reviewCounts">
                    420 reviews
                  </span>
                </div>
              </div>
              <TestimonialsGoogleEllipse />
              <a href="https://www.google.com/search?q=beneple+reviews" target="_blank" rel="noopener noreferrer">Write a Review</a>
            </div>
            <div className="testimonialsSliderWrapper">
              <div className="testimonialsSlider">
                <Swiper
                  slidesPerView={3}
                  slidesPerGroup={3}
                  spaceBetween={24}
                  loop={true}
                  onSwiper={(swiper) =>
                    (testimonialsSwiperRef.current = swiper)
                  }
                  onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex)
                  }}
                  breakpoints={{
                    1280: {
                      slidesPerView: 3,
                    },

                    978: {
                      slidesPerView: 2,
                    },
                    360: {
                      slidesPerView: 1.2,
                      slidesPerGroup: 1,
                    },
                  }}
                >
                  {testimonials.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="testimonialCard">
                        <div className="testimonialTop">
                          <div className="testimonialAuthor">
                            <div className="testimonialAvatar">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="authorImg"
                                />
                              ) : (
                                <span>
                                  {item.name.charAt(0)}
                                </span>
                              )}
                              <img
                                src={item.companyLogo}
                                alt="Google reviews logo"
                                className="testimonialLogo"
                              />
                            </div>
                            <div className="testimonialContent">
                              <h4>{item.name}</h4>
                              <span className="testimonialDays">
                                <FiveStarsIcon />{' '}
                                {item.daysAgo}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="testimonialDescription">
                          {item.description}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="testimonialsControls">
                  <div className="swiper-pagination">
                    <div
                      className="testimonialsProgressFill"
                      style={{
                        width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                  <div className="swiper-navigation">
                    <button
                      onClick={() =>
                        testimonialsSwiperRef.current?.slidePrev()
                      }
                      disabled={activeIndex === 0}
                    >
                      <svg
                        width="12"
                        height="22"
                        viewBox="0 0 12 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 21L1 11L11 1"
                          stroke="#172B5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        testimonialsSwiperRef.current?.slideNext()
                      }
                      disabled={
                        activeIndex ===
                        testimonials.length - 1
                      }
                    >
                      <svg
                        width="12"
                        height="22"
                        viewBox="0 0 12 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 21L11 11L1 1"
                          stroke="#172B5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contactSection">
          <div className="headings">
            <p className="subHeadingDefault">Contact us</p>
            <h2 className="headingDefault">
              Get <span>expert guidance</span> tailored
              <br /> to your business
            </h2>
          </div>
          <InsuranceContactForm />
        </section>
      </main>
      <footer className="footer container">
        <div className="footerSocials">
          <a href="" className="logo">
            <img src={'/beneple-logo.svg'} alt="Beneple logo" />
          </a>
          <div className="socials">
            {socials.map((item) => (
              <a
                href={item.link}
                className="item"
                key={item.id}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footerNav">
          <div className="navWrapper">
            <h3>Our insurance solutions</h3>
            <div className="navContainer">
              {footerNavItems.map((footerItem) => (
                <div className="nav" key={footerItem.id}>
                  <h4>{footerItem.title}</h4>
                  <div className="items">
                    {footerItem.items.map((item) => (
                      <a href={item.link} key={item.id}>
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="navWrapper">
            <h3 className="pl-8">Lets get in touch</h3>
            <div className="contactWrapper">
              <div className="nav">
                <h4>Contact Us</h4>
                <div className="items">
                  <a href="tel:+971 (0) 4567 4500">
                    +971 (0) 4567 4500
                  </a>
                  <a
                    href="mailto:info@beneple.com"
                    className="underline hover:no-underline"
                  >
                    info@beneple.com
                  </a>
                  <a href="">
                    16th Floor, Ubora Tower, Business Bay,
                    Dubai, UAE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>Copyright ©2026 Beneple</p>
          <div className="legals">
            {legals.map((item) => (
              <a href={item.link} key={item.id}>
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
