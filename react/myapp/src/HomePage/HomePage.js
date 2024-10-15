import React, {useEffect } from "react";
import "./HomePage.css";
import HeroSection from "./HeroSection";

function Home() {
    useEffect(() => {
        document.body.classList.add('homePageStyles');
        return () => {
            document.body.classList.remove('homePageStyles');
        };
    }, []);

    return (
        <>
            <HeroSection />
        </>
    );
}

export default Home;

