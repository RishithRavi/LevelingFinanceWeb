import { Container } from '@/components/Container'


export function Video() {
  return (
    <section
      id="videos"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32 bg-gray-100"
    >
      <Container>
       
        <div className="aspect-w-16 aspect-h-9">

          <iframe src="https://www.youtube.com/embed/xVrOKgVWZIg?vq=hd1080p60" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </div>
      </Container>
    </section>
  )
}
