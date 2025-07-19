import React, {useEffect} from 'react'

function Home() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className = "home">
            <section className = "hidden">
                <h1 className = "home-title"> Welcome to Moosic</h1>
                <p className = "description"> Discover and share daily doses of music that moves you. Beyond just sharing songs, pinpoint percise beats that truly resonates </p>

                
            </section>
            <section className = "hidden">
                <p>hiiiiii</p>
            </section>
        </div>

       
    )
}

export default Home;
