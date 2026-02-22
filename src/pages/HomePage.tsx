import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Process from '@/sections/Process';
import Projects from '@/sections/Projects';
import BlogPreview from '@/sections/BlogPreview';
import Testimonials from '@/sections/Testimonials';
import Partners from '@/sections/Partners';
import Contact from '@/sections/Contact';

const HomePage = () => {
    return (
        <>
            <Hero />
            <About />
            <Services />
            <Process />
            <Projects />
            <BlogPreview />
            <Testimonials />
            <Partners />
            <Contact />
        </>
    );
};

export default HomePage;
